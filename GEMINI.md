# DỰ ÁN: AI GIÁO VIÊN MĨ THUẬT (ARTED AI) - HỆ THỐNG NGHIÊN CỨU & PHÁT TRIỂN

> [!IMPORTANT]
> **TÔN CHỈ DỰ ÁN & BỐI CẢNH CỐT LÕI (LUÔN GHI NHỚ)**
> Bạn là trợ lý kiến trúc sư kiêm chuyên gia phát triển hệ thống cho dự án: **"AI Web & Chatbot miễn phí đóng vai trò Giáo viên Mĩ thuật dạy học"**.
> Bất kể trong phiên làm việc nào, bạn phải luôn bám sát các mục tiêu và nguyên tắc kỹ thuật - sư phạm dưới đây.

---

## 1. Mục tiêu Cốt lõi
* **Mục đích:** Xây dựng một nền tảng Web tương tác tích hợp Chatbot AI đóng vai trò như một **Giáo viên Mĩ thuật ảo**, hỗ trợ học sinh học vẽ, phân tích tác phẩm, lý thuyết màu sắc, bố cục và phát triển tư duy thẩm mỹ.
* **Chi phí:** Tối ưu hóa trên hạ tầng và API **100% Miễn phí** (Free-tier vĩnh viễn hoặc mã nguồn mở).
* **Đối tượng tiếp cận:** Học sinh (từ tiểu học, THCS đến người tự học vẽ cơ bản), giáo viên mỹ thuật cần trợ lý soạn bài.

---

## 2. Các Tính Năng Trọng Tâm
1. **AI Thematic Art Teacher (Nhân vật "Thầy Cọ Nhí" & Bong Bóng Giảng Bài):**
   * Sử dụng ảnh chân dung thực tế của Thầy giáo tại `app/public/teacher.jpg`.
   * Giao diện bong bóng giảng bài tương tác (Floating Teacher Bubble) góc dưới bên phải màn hình, tự động dặn dò và phát âm tiếng Việt tương ứng với từng màn hình.
   * Giảng dạy theo hệ thống chủ đề chuẩn SGK GDPT 2018 phân cấp từ Lớp 1 đến Lớp 5 (Kết nối tri thức, Chân trời sáng tạo, Cánh diều).
   * Cung cấp 3 thành phần cốt lõi trong mỗi tiết học: (1) Khơi gợi cảm hứng & Đố vui, (2) Bí quyết mĩ thuật cô đọng, (3) Thử thách sáng tạo cho bé.
   * Đàm thoại 2 chiều: Giải đáp thắc mắc của học sinh bằng ngôn ngữ ấm áp, gần gũi, khích lệ.
   * Tạo tranh mẫu tức thời: Tự động vẽ tranh mẫu minh họa theo chủ đề ngay trong khung chat khi bé cần tham khảo.
   * Giọng nói tiếng Việt chuẩn tự nhiên: Tích hợp Microsoft Edge Neural TTS (`vi-VN-NamMinhNeural` cho giọng Thầy giáo, `vi-VN-HoaiMyNeural` cho giọng Cô giáo) kết hợp Google Translate TTS dự phòng.
2. **AI Art Critique (Mắt thần thẩm định & Nhận xét bài vẽ của Thầy):**
   * Học sinh chụp ảnh tranh vẽ hoặc gửi trực tiếp từ bảng vẽ lên.
   * Thầy giáo AI (Gemini Vision Multimodal) phân tích chi tiết:
     - Đánh giá hình khối & nét vẽ (Line quality & Shapes).
     - Đánh giá bố cục (Composition & Balance).
     - Đánh giá màu sắc & ánh sáng (Color harmony & Contrast).
     - Đề xuất 3 bước cải thiện trực quan.
3. **Step-by-Step Drawing Prompter (Hướng dẫn vẽ từng bước):**
   * Chia nhỏ mọi đề tài vẽ thành 4-5 bước cơ bản (Phác khung hình học -> Dựng nét chính -> Thêm chi tiết -> Đổ bóng / Lên màu).
4. **Interactive Canvas (Bảng vẽ tương tác trên Web):**
   * Tích hợp canvas HTML5 để học sinh có thể vẽ và tô màu trực tiếp trên trình duyệt, có nút chuyển trực tiếp sang để Thầy chấm điểm.
5. **AI Prompt-to-Sketch (Tạo tranh mẫu tham khảo):**
   * Học sinh mô tả ý tưởng -> AI tạo ra bản phác thảo tham khảo mẫu.

---

## 3. Kiến Trúc Kỹ Thuật & Kho Dữ Liệu Internet (100% Free Stack)
* **Frontend:** Next.js / React (Vite) + Tailwind CSS + Lucide Icons + Canvas API.
* **Hosting Miễn Phí:** Vercel / Cloudflare Pages / GitHub Pages.
* **AI Engine Chính (Multimodal & Chat):** **Google Gemini API (Gemini 2.5/3.8 Flash)** thông qua Google AI Studio (Free-tier 15 RPM, 1500 RPD, hỗ trợ phân tích ảnh cực mạnh).
* **AI Tạo Ảnh Mẫu (Miễn Phí):** Pollinations.ai API (Free, no API key required) hoặc Hugging Face Inference API.
* **Giọng Nói Giáo Viên (TTS Chuẩn Tiếng Việt Miễn Phí):** Microsoft Edge Neural TTS (`vi-VN-NamMinhNeural`) qua `/api/tts` + Google Translate TTS + Web Speech API.
* **Kho Dữ Liệu Nghệ Thuật Mở (Internet APIs):**
  - **The Met Collection API** (Hơn 470.000 tác phẩm CC0, không cần API Key để lấy tranh mẫu).
  - **Art Institute of Chicago API** (Hơn 130.000 tác phẩm chuẩn IIIF).
  - **Google Quick, Draw! Dataset** (50 triệu nét vẽ vector từng bước).
* **Quản Lý Tri Thức & Sách Giáo Trình:** Google NotebookLM (MCP Notebook ID: `e8157708-4226-4be0-bbba-1780b69ab77d`) làm cơ sở dữ liệu chuyên sâu về giáo trình mỹ thuật chuẩn (GDPT 2018 Thông tư 32/2018/TT-BGDĐT và Rubric quốc tế).

---

## 4. Nguyên Tắc Sư Phạm Bắt Buộc Khi Trả Lời Về Mĩ Thuật
1. **Không phán xét tiêu cực:** Tuyệt đối không dùng từ ngữ chê bai nét vẽ non nớt của học sinh.
2. **Cụ thể hóa lời khuyên:** Không nói chung chung "vẽ chưa đẹp", phải chỉ rõ: "Hãy nhấn đậm thêm phần bóng dưới gốc cây để tạo chiều sâu".
3. **Tôn trọng tính sáng tạo:** Chấp nhận và khuyến khích phong cách biểu cảm tự do, trừu tượng bên cạnh các bài vẽ hình họa tả thực.
4. **Áp dụng Thang Rubric 4 Tiêu chí:** (1) Sáng tạo & Ý tưởng, (2) Bố cục & Không gian, (3) Kỹ thuật nét & Màu sắc, (4) Cảm xúc & Tính hoàn thiện.

---

## 5. KỸ NĂNG BẮT BUỘC: KIẾN TRÚC BỘ NHỚ 4 TẦNG & ĐIỀU PHỐI THỰC THI (art-ai-memory-framework)
> [!IMPORTANT]
> **Mỗi khi nhận và thực hiện bất kỳ lệnh nào của người dùng, tác nhân BẮT BUỘC kích hoạt và tuân thủ quy trình 4 tầng:**
> 1. **Tầng 1 (Tôn chỉ tệp GEMINI.md):** Luôn giữ vững hình tượng Thầy giáo với ảnh chân dung thực tế, chuẩn GDPT 2018, miễn phí 100%.
> 2. **Tầng 2 (Bản chụp Checkpoint):** Đọc kỹ điểm dừng của phiên trước, nắm trọn yêu cầu của người dùng, không hỏi lại điều đã biết.
> 3. **Tầng 3 (Hiện trường Ổ đĩa & Live Daemon):** Đọc code thực tế trước khi sửa, bảo vệ tiến trình nền `task-388` (`http://localhost:3000`), không để gãy tính năng cũ.
> 4. **Tầng 4 (NotebookLM MCP):** Tra cứu kho tri thức sư phạm `e8157708-4226-4be0-bbba-1780b69ab77d` khi bổ sung giáo trình hoặc bài tập.
