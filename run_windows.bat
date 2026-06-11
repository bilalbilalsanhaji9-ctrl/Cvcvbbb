@echo off
title TELC Memorizer Offline Standalone App Control
chcp 65001 >nul
color 0b

echo ====================================================================
echo         ★ TELC Memorizer Desktop App - تشغيل أوفلاين 100%% ★
echo ====================================================================
echo.
echo [1/3] جاري التحقق من ملفات التطبيق المحلية...

:: Check if build outputs exist
if not exist "%~dp0dist\index.html" (
    echo [تنبيه] لم يتم العثور على ملفات النسخة الجاهزة في مجلد dist.
    echo جاري محاولة بناء التطبيق تلقائياً...
    npm run build
    if errorlevel 1 (
        echo [خطأ] تعذر بناء ملفات التطبيق. يرجى التأكد من تثبيت الحزم مسبقاً.
        pause
        exit /b 1
    )
)

echo [نجاح] تم التحقق من مجلد التوزيع المحترف (dist) بنجاح.
echo.
echo [2/3] جاري تشغيل الخادم المحلي الآمن والخفيف (PowerShell Streamer)...

:: Port for offline server
set PORT=28463

:: Launch PowerShell Mini-Server in a separate minimized window
start "TELC Memorizer Local Server Backend" /min powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server_offline.ps1"

:: Wait brief moment for loopback interface socket to bind
timeout /t 2 /nobreak >nul

echo [نجاح] تم تشغيل الخادم الصامت بنجاح على المنفذ %PORT%.
echo.
echo [3/3] جاري البحث عن متصفح مدعوم لتشغيله كـ (Standalone Desktop App)...

:: Search for MS Edge (Default Windows browser)
set BROWSER_PATH=""
for %%F in (
    "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
    "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
    "%LocalAppData%\Microsoft\Edge\Application\msedge.exe"
) do (
    if exist %%F set BROWSER_PATH="%%F"
)

:: Search for Google Chrome if Edge is missing
if %BROWSER_PATH% == "" (
    for %%F in (
        "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
        "%ProgramFiles%\Google\Chrome\Application\chrome.exe"
        "%LocalAppData%\Google\Chrome\Application\chrome.exe"
    ) do (
        if exist %%F set BROWSER_PATH="%%F"
    )
)

if not %BROWSER_PATH% == "" (
    echo [نجاح] تم العثور على المتصفح: %BROWSER_PATH%
    echo جاري فتح واجهة التطبيق داخل نافذة نظام مستقلة تماماً (App Mode)...
    echo.
    echo *****************************************************************
    echo * لتوقيف الخادم وإغلاق التطبيق بالكامل، يمكنك إغلاق هذه النافذة السوداء. *
    echo *****************************************************************
    
    :: Launch in standalone app mode (hides tags, search bar and margins like WebView2!)
    start "" %BROWSER_PATH% --app="http://127.0.0.1:%PORT%/" --user-data-dir="%temp%\TELC_Memorizer_Profile"
) else (
    echo [تنبيه] لم نجد متصفح Edge أو Chrome في المسارات الافتراضية.
    echo جاري فتح الرابط باستخدام المتصفح الافتراضي لنظامك...
    start "" "http://127.0.0.1:%PORT%/"
)

echo.
echo الخدمة نشطة الآن. استمتع بحفظ المنهجيات والتدرب كلمة بكلمة أوفلاين!
echo اضغط على أي زر لإيقاف الخادم وإغلاق التطبيق...
pause >nul

:: Cleanup task on exit
echo جاري إغلاق خادم PowerShell والعمليات المرتبطة...
powershell -NoProfile -Command "Stop-Process -Name powershell -Force -ErrorAction SilentlyContinue"
echo تم الإغلاق بنجاح.
exit
