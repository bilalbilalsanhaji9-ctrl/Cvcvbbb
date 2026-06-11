# PowerShell Offline Mini-Server for TELC Memorizer
# Runs natively on Windows 10 & 11 without any installation or elevated admin privileges.

$port = 28463
$distPath = Join-Path $PSScriptRoot "dist"

if (-not (Test-Path $distPath)) {
    Write-Error "مجلد التوزيع 'dist' غير موجود! الرجاء بناء التطبيق أولاً."
    Exit 1
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$port/")

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "     TELC Memorizer - تشغيل الخادم المحلي الصامت      " -ForegroundColor Yellow
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "الخادم يعمل الآن على الرابط: http://127.0.0.1:$port/" -ForegroundColor Green
Write-Host "اضغط Ctrl + C لتوقيف الخادم يدوياً." -ForegroundColor White
Write-Host "=======================================================" -ForegroundColor Cyan

try {
    $listener.Start()
} catch {
    Write-Error "تعذر بدء تشغيل الخادم المحلي على المنفذ $port. قد يكون مبرمجاً مسبقاً أو قيد الاستخدام."
    Exit 1
}

# Keep track of listener
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/" -or $localPath -eq "") {
            $localPath = "/index.html"
        }

        # Handle Vite sub-assets and root structures
        $filePath = Join-Path $distPath $localPath

        # SPA Fallback: if file doesn't exist, serve index.html to avoid 404 on browser-side routes
        if (-not (Test-Path $filePath -PathType Leaf)) {
            $filePath = Join-Path $distPath "index.html"
        }

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()

            # Set precise MIME Types for CSS, JS, and Fonts to prevent browser blocking
            $contentType = "application/octet-stream"
            switch ($extension) {
                ".html" { $contentType = "text/html; charset=utf-8" }
                ".js"   { $contentType = "application/javascript; charset=utf-8" }
                ".css"  { $contentType = "text/css; charset=utf-8" }
                ".png"  { $contentType = "image/png" }
                ".jpg"  { $contentType = "image/jpeg" }
                ".jpeg" { $contentType = "image/jpeg" }
                ".gif"  { $contentType = "image/gif" }
                ".svg"  { $contentType = "image/svg+xml; charset=utf-8" }
                ".webp" { $contentType = "image/webp" }
                ".json" { $contentType = "application/json; charset=utf-8" }
                ".woff" { $contentType = "font/woff" }
                ".woff2"{ $contentType = "font/woff2" }
                ".ttf"  { $contentType = "font/ttf" }
            }

            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    } catch {
        # Catch and mute connection interruptions on loopback (closing window etc).
    }
}
