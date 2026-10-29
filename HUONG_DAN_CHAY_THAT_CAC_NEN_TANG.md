# HƯỚNG DẪN CHẠY THẬT ỨNG DỤNG "ART AI - THẦY GIÁO MĨ THUẬT" TRÊN CÁC NỀN TẢNG

Hệ thống **ART AI** đã được đóng gói sản xuất (Production Build) hoàn chỉnh, tương thích 100% với các nền tảng sau:

---

## 📱 NỀN TẢNG 1: ĐIỆN THOẠI & MÁY TÍNH BẢNG (ANDROID & iOS / iPAD)
Ứng dụng đã được tích hợp chuẩn **PWA (Progressive Web App)** với Service Worker và Web App Manifest:

### Dành cho Android (Samsung, Xiaomi, Oppo, Google Pixel...):
1. Dùng trình duyệt **Chrome** trên điện thoại truy cập vào địa chỉ web của app (hoặc qua mạng nội bộ Wi-Fi `http://192.168.1.15:3000`).
2. Trình duyệt sẽ hiện thông báo: **"Cài đặt ART AI"** hoặc bấm vào dấu 3 chấm góc phải -> chọn **"Thêm vào màn hình chính" (Cài đặt ứng dụng)**.
3. Một biểu tượng app mang chân dung **Thầy Cọ Nhí** sẽ xuất hiện trên màn hình điện thoại như một ứng dụng tải từ Google Play Store, mở lên toàn màn hình (không có thanh URL trình duyệt).

### Dành cho iPhone / iPad (iOS):
1. Mở trình duyệt **Safari** và truy cập vào link web.
2. Bấm vào nút **Chia sẻ** (biểu tượng ô vuông có mũi tên chỉ lên ở dưới màn hình).
3. Cuộn xuống và chọn **"Thêm vào MH chính" (Add to Home Screen)**.
4. Ứng dụng sẽ hoạt động mượt mà như một ứng dụng iOS nguyên bản.

---

## 💻 NỀN TẢNG 2: MÁY TÍNH WINDOWS (CHẠY 1 CHẠM NHƯ ỨNG DỤNG DESKTOP)
Bạn không cần gõ lệnh phức tạp mỗi khi muốn mở ứng dụng:
1. Mở thư mục dự án: `c:\Users\win 10 pro\Downloads\hệ thống nghiên cứu`.
2. Bấm đúp chuột vào tệp: **[`CHAY_APP_ART_AI.bat`](./CHAY_APP_ART_AI.bat)**.
3. Ứng dụng sẽ tự động kích hoạt server ngầm và mở ngay một cửa sổ Desktop độc lập của Microsoft Edge (không hiện thanh địa chỉ, không có tab duyệt web), hiển thị trọn vẹn lớp học của Thầy giáo mĩ thuật!

---

## 🌐 NỀN TẢNG 3: ĐƯA LÊN INTERNET MIỄN PHÍ VĨNH VIỄN (VERCEL / CLOUDFLARE)
Mã nguồn đã được cấu hình sẵn tệp [`app/vercel.json`](./app/vercel.json) và Serverless Function [`app/api/tts.js`](./app/api/tts.js).

### Triển khai lên Vercel (Miễn phí 100%):
* **Cách 1: Triển khai qua lệnh Vercel CLI:**
  ```bash
  cd app
  npx vercel
  ```
  *(Đăng nhập tài khoản Vercel miễn phí và bấm Enter 3 lần, bạn sẽ nhận được đường link công khai dạng `https://art-ai-kids.vercel.app` để gửi cho học sinh toàn quốc).*

* **Cách 2: Đẩy lên GitHub rồi kết nối Vercel:**
  1. Đẩy thư mục mã nguồn lên GitHub của bạn.
  2. Đăng nhập [vercel.com](https://vercel.com) -> Bấm **Add New Project** -> Chọn kho GitHub vừa tạo.
  3. Bấm **Deploy**. Vercel sẽ tự động build `dist/` và kích hoạt hàm phát âm thanh tiếng Việt `/api/tts` hoàn toàn tự động.

---

## 🐳 NỀN TẢNG 4: MÁY CHỦ RIÊNG / DOCKER / RENDER (STANDALONE PRODUCTION)
Nếu bạn muốn chạy trên máy chủ VPS, Cloud Server Linux/Windows hoặc Render.com:
```bash
cd app
npm run build
npm run start
```
Máy chủ [`app/server.js`](./app/server.js) sẽ phục vụ toàn bộ giao diện tĩnh và API xử lý giọng nói tiếng Việt với hiệu năng cao và bộ nhớ đệm tự động.
