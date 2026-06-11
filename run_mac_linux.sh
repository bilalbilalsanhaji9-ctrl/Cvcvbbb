#!/bin/bash

echo "======================================================="
echo "         TELC Memorizer - تشغيل التطبيق بدون نت          "
echo "======================================================="
echo ""
echo "جاري البحث عن بيئة تشغيل محلية لتشغيل التطبيق بشكل آمن..."
echo ""

if command -v python3 &>/dev/null; then
    echo "[نجاح] تم العثور على Python 3! جاري بث التطبيق محلياً..."
    echo "سيتم فتح المتصفح على الرابط: http://localhost:8000"
    (sleep 1 && open "http://localhost:8000" || xdg-open "http://localhost:8000") &
    python3 -m http.server 8000 --directory dist
elif command -v python &>/dev/null; then
    echo "[نجاح] تم العثور على Python! جاري بث التطبيق محلياً..."
    echo "سيتم فتح المتصفح على الرابط: http://localhost:8000"
    (sleep 1 && open "http://localhost:8000" || xdg-open "http://localhost:8000") &
    python -m http.server 8000 --directory dist
elif command -v node &>/dev/null; then
    echo "[نجاح] تم العثور على Node.js! جاري بث التطبيق محلياً..."
    echo "سيتم فتح المتصفح على الرابط: http://localhost:3000"
    (sleep 1 && open "http://localhost:3000" || xdg-open "http://localhost:3000") &
    npx serve -s dist -l 3000
else
    echo "[تنبيه] لم يتم العثور على Python أو Node.js مثبتين في نظامك."
    echo "لتشغيل التطبيق بكامل فعاليته ومميزاته كـ PWA، ننصح بتثبيت Python أو فتح:"
    echo "مجلد (dist) ثم انقر مرتين لتشغيل ملف (index.html)"
    echo ""
fi
