@echo off
chcp 65001 > nul
title ART AI - Thầy Giáo Mĩ Thuật Dạy Học (Lớp 1-5)

echo ========================================================
echo       🎨 ART AI - THẦY GIÁO MĨ THUẬT TIỂU HỌC 🎒
echo   Phiên bản dành cho Máy tính Windows (Desktop App)
echo ========================================================
echo.
echo Đang khởi động hệ thống ART AI...

cd /d "%~dp0\app"

REM Kiểm tra Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LỖI] Chưa tìm thấy Node.js trên máy. Hãy cài đặt Node.js từ https://nodejs.org
    pause
    exit /b
)

REM Kiểm tra build nếu chưa có
if not exist "dist" (
    echo Đang đóng gói ứng dụng lần đầu...
    call npm run build
)

REM Khởi động server chạy nền
echo Đang kích hoạt máy chủ ART AI tại http://localhost:3000...
start /B node server.js >nul 2>&1

REM Chờ 2 giây để server sẵn sàng
timeout /t 2 /nobreak >nul

REM Mở ứng dụng dưới dạng Desktop App độc lập qua Microsoft Edge hoặc Chrome
where msedge >nul 2>nul
if %errorlevel% equ 0 (
    echo Đang mở ứng dụng Thầy giáo Mĩ thuật...
    start msedge.exe --app="http://localhost:3000" --window-size=1200,800
    exit
)

where chrome >nul 2>nul
if %errorlevel% equ 0 (
    start chrome.exe --app="http://localhost:3000" --window-size=1200,800
    exit
)

REM Dự phòng mở trình duyệt mặc định
start http://localhost:3000
exit
