# BÁO CÁO TRẠNG THÁI DỰ ÁN CỌ NHÍ STUDIO (PROJECT_STATE.md)

> **Cập nhật hệ thống:** 2026-11-12 20:30:00 (Giờ Việt Nam)  
> **Kiến trúc:** React 19 + Vite 8 + Tailwind CSS + Strict TypeScript (Zero `any`)  
> **Tiêu chuẩn:** GDPT 2018 • Công văn 2345/BGDĐT • Thông tư 27/2020/TT-BGDĐT • SMAS Viettel

---

## CẬP NHẬT MỚI NHẤT (2026-11-12)
- **Thanh công cụ trình chiếu (Presentation Toolbar) chuyển sang dạng dọc theo cạnh slide**:
  - Không che khuất chữ bài giảng ở đáy màn hình.
  - Hỗ trợ đổi chiều Dọc / Ngang linh hoạt (`onToggleOrientation`), lưu cấu hình vào LocalStorage.
  - Hỗ trợ thu gọn thành nút icon nhỏ gọn (`onCollapse`) và mở rộng tức thì.
  - Kiến trúc phân rã thành các module sạch < 200 dòng code: `PresentationToolbar.jsx`, `PresentationVerticalToolbar.jsx`, `PresentationHorizontalToolbar.jsx`.
- **Cam Chấm Tranh & Đồng bộ Sổ Điểm Thường Xuyên TT27**:
  - Bổ sung chọn Tuần học (Tuần 1-35) và nút bấm nhanh Mức [ 🏆 T ], [ ⭐ H ], [ 📝 C ].
  - Nâng cấp thuật toán phân tích màu sắc và độ phủ nét vẽ giúp đề xuất mức đánh giá chính xác chuẩn TT27.
  - Cập nhật hàm `saveCameraEvaluationToSmas` lưu điểm chính xác vào cột Tuần (`weeklyLevels[week]`) theo tên học sinh (chuẩn hóa NFC/NFD/không dấu).
  - Tự động kích hoạt sự kiện `conhi-smas-updated` để Sổ theo dõi thường xuyên 35 tuần cập nhật ngay lập tức.

---

## 1. Project Overview & Scope
- **Mục tiêu:** Web Application chuyên biệt hỗ trợ giáo viên tiểu học soạn bài giảng mĩ thuật tương tác, trình chiếu chuyên nghiệp chuẩn thương mại 16:9, bảng vẽ thị phạm 4 bước, chấm tranh camera AI, và quản lý sổ điểm học sinh đồng bộ định dạng SMAS Viettel.
- **Phạm vi hoàn thiện 10 Phases:**
  - [x] Phase 1: Quản trị trạng thái (`PROJECT_STATE.md`) & Rào chắn an toàn (`verify.sh`, `verify.bat`)
  - [x] Phase 2: Khóa Data Contract & Nghiệp vụ Sư phạm VN (CV 2345, TT27, SGK Kết nối tri thức - `src/types/presentation.ts`, `src/utils/smasValidator.ts`)
  - [x] Phase 3: Engine Trình Chiếu Khóa Tỷ Lệ 16:9 & Subpixel Antialiasing (`PresentationStage.tsx`, `useStageScale.ts`)
  - [x] Phase 4: Điều khiển diễn giả, Presenter View, USB Clicker & Focus Guard (`usePresenterControls.ts`, `PresenterViewModal.tsx`)
  - [x] Phase 5: Bộ công cụ lớp học: Bút vẽ Canvas, Laser ảo, Hẹn giờ thảo luận (`ClassroomTimer.tsx`, `SlideDrawingCanvas.tsx`)
  - [x] Phase 6: Auto-Save Resilience, Crash Recovery Banner & State Feedback Zero-State (`useAutoSaveDraft.ts`, `CrashRecoveryBanner.tsx`, `StateFeedback.tsx`)
  - [x] Phase 7: Engine Xuất bản: PDF chuẩn in ấn A4 & Standalone HTML chạy offline USB (`exportEngine.ts`, `htmlSlideExportService.js`)
  - [x] Phase 8: Virtualization DOM 3 slide, Media Lifecycle tự ngắt & PWA Service Worker 100% (`useSlideVirtualization.ts`, `public/sw.js`)
  - [x] Phase 9: Kiểm định thị giác đa màn hình & Cẩm nang giáo viên toàn diện (`scripts/visual-check.ts`, `README.md`)
  - [x] Phase 10: Chạy kiểm định `./verify.bat`, 0 lỗi biên dịch, cập nhật nút Trợ Giảng AI 3D chuẩn hình mẫu & Bàn giao (`HANDOFF.json`)

---

## 2. Approved Libraries & Tools
- **Giao diện & Biểu tượng:** React 19, Lucide React, Tailwind CSS 3, Canvas-Confetti
- **Trình chiếu & Tài liệu:** PPTXGenJS, JSZip, SheetJS (`xlsx`)
- **Âm thanh & Giọng đọc:** Web Speech API, `speechService` (Nam Minh & Hoài My)
- **Kiểm định chất lượng:** TypeScript 5.8+ (`tsc --noEmit`), Oxlint, Node.js Test Runner (`node test.cjs`), Vite 8
