@echo off
chcp 65001 >nul
echo =========================================================================
echo       LIÊN KẾT & ĐẨY DỰ ÁN ART AI LÊN GITHUB CỦA BẠN
echo =========================================================================
echo.
echo Bước 1: Nếu chưa đăng nhập GitHub CLI, hãy chọn [Y] để đăng nhập bằng trình duyệt.
set /p DANGNHAP="Bạn có muốn đăng nhập GitHub ngay bây giờ? (Y/N): "
if /i "%DANGNHAP%"=="Y" (
    gh auth login -w -p https
)

echo.
echo Bước 2: Tự động tạo kho lưu trữ GitHub mới và đẩy mã nguồn lên:
set /p TAO_MOI="Tự động tạo repo mới trên GitHub của bạn? (Y/N): "
if /i "%TAO_MOI%"=="Y" (
    gh repo create art-ai-giao-vien-mi-thuat --public --source=. --remote=origin --push
    goto hoantat
)

echo.
echo Hoặc nhập trực tiếp link kho lưu trữ đã tạo sẵn trên GitHub:
set /p REPO_URL="Nhập GitHub Repo URL (ví dụ: https://github.com/ten-ban/art-ai.git): "
if "%REPO_URL%"=="" goto ketthuc

git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

:hoantat
echo.
echo =========================================================================
echo   ĐÃ ĐẨY TOÀN BỘ MÃ NGUỒN LÊN GITHUB THÀNH CÔNG!
echo =========================================================================

:ketthuc
pause
