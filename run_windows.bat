@echo off
title TELC Memorizer Offline Launcher
echo =======================================================
echo          TELC Memorizer - تشغيل التطبيق بدون نت          
echo =======================================================
echo.
echo جاري البحث عن بيئة تشغيل محلية لتجنب قيود الحماية في المتصفح...
echo.

:: Check for python
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [نجاح] تم العثور على Python! جاري تشغيل خادم محلي وبث التطبيق...
    echo سيتم فتح المتصفح تلقائياً على الرابط: http://localhost:8000
    start "" "http://localhost:8000"
    python -m http.server 8000 --directory dist
    goto end
)

:: Check for node (if python is not found)
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [نجاح] تم العثور على Node.js! جاري تشغيل خادم محلي...
    echo سيتم فتح المتصفح تلقائياً على الرابط: http://localhost:3000
    start "" "http://localhost:3000"
    npx serve -s dist -l 3000
    goto end
)

echo [تنبيه] لم يتم العثور على Python أو Node.js مثبتين في نظامك.
echo لتشغيل التطبيق بشكل سليم وآمن بدون نت، يمكنك تثبيت Python أو ببساطة:
echo 1. افتح مجلد (dist) المرفق.
echo 2. انقر نقراً مزدوجاً على الملف (index.html) لتشغيله في متصفحك مباشرة.
echo.
echo (ملاحظة: بعض المتصفحات مثل Chrome قد تقيد بعض الميزات كالخطوط والمؤثرات عند فتح الملف مباشرة بدون خادم محلي بسبب سياسات الأمان).
echo.
pause

:end
