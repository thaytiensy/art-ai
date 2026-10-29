# BÁO CÁO NGHIÊN CỨU & THIẾT KẾ HỆ THỐNG: AI GIÁO VIÊN MĨ THUẬT DẠY HỌC (ARTED AI)

## I. TỔNG QUAN Ý TƯỞNG & TÍNH KHẢ THI
### 1. Ý tưởng cốt lõi
Xây dựng một nền tảng Web có tích hợp Chatbot AI thông minh hoạt động như một **Giáo viên Mĩ thuật cá nhân hóa (Virtual Art Teacher)** hoàn toàn miễn phí. Hệ thống không chỉ trò chuyện lý thuyết mà còn có khả năng "nhìn" (Computer Vision) để nhận xét, chấm điểm bài vẽ của học sinh và hướng dẫn từng bước vẽ từ đơn giản đến nâng cao.

### 2. Tính khả thi kỹ thuật (100% Miễn phí)
* **Vision & Chat AI:** Sử dụng **Google Gemini 2.5/3.8 Flash API** (Miễn phí 15 yêu cầu/phút, 1.500 yêu cầu/ngày). Gemini vượt trội về phân tích thị giác, có thể nhận diện bố cục, màu sắc, nét vẽ trong tranh vẽ tay của học sinh.
* **Tạo tranh mẫu (Image Generation):** Sử dụng **Pollinations.ai** (API hoàn toàn miễn phí, không giới hạn, không cần API Key) hoặc Hugging Face SDXL-Turbo để vẽ mẫu minh họa cho học sinh tham khảo ý tưởng.
* **Giọng nói giảng dạy (Text-to-Speech):** Sử dụng **Web Speech API** tích hợp sẵn trong trình duyệt (Chrome/Edge/Cốc Cốc), chạy hoàn toàn trên máy người dùng không tốn phí máy chủ.
* **Lưu trữ & Tri thức:** Kết hợp **Google NotebookLM** làm kho lưu trữ giáo án mĩ thuật và tài liệu chuẩn.
* **Hosting & Triển khai:** Triển khai Frontend trên **Vercel** hoặc **Cloudflare Pages** (Băng thông miễn phí không giới hạn cho dự án giáo dục cá nhân).

---

## II. THIẾT KẾ NHÂN CÁCH SƯ PHẠM (AI TEACHER PERSONA)
* **Tên giáo viên:** *Thầy/Cô Artie* (hoặc *Họa Sĩ Cọ Nhí*).
* **Tính cách:** Ấm áp, kiên nhẫn, giàu cảm hứng nghệ thuật, ngôn từ sinh động, gần gũi với học sinh.
* **Quy chuẩn phản hồi sư phạm (Positive Critique Model):**
  1. **Bước 1 - Ghi nhận & Tán thưởng (Praise):** Tìm ra ít nhất 2 điểm sáng tạo hoặc điểm làm tốt trong bức tranh (ví dụ: cách phối màu rực rỡ, nét vẽ tự tin, ý tưởng độc đáo).
  2. **Bước 2 - Phân tích & Gợi ý cải thiện (Constructive Advice):** Chỉ ra 1-2 điểm kỹ thuật có thể làm tốt hơn (ví dụ: luật xa gần, độ đậm nhạt của bóng đổ, tỷ lệ cân đối) kèm hướng dẫn cách sửa chi tiết.
  3. **Bước 3 - Truyền cảm hứng & Thử thách kế tiếp (Encourage & Challenge):** Động viên học sinh tiếp tục hoàn thiện và gợi ý một chi tiết thú vị có thể vẽ thêm.

---

## III. CÁC TÍNH NĂNG CỐT LÕI CỦA WEB & CHATBOT

### 1. "Mắt thần Mĩ thuật" (Art Critique Vision)
* Học sinh chụp ảnh bài vẽ bằng điện thoại/webcam hoặc tải ảnh lên khung chat.
* AI thực hiện phân tích đa chiều:
  - **Bố cục (Composition):** Tranh có bị lệch không? Trọng tâm bức tranh nằm ở đâu? Áp dụng quy tắc 1/3 ra sao?
  - **Đường nét & Hình khối (Lines & Shapes):** Nét vẽ liền mạch hay đứt đoạn? Hình khối chính đã rõ ràng chưa?
  - **Màu sắc & Ánh sáng (Colors & Value):** Gam màu nóng hay lạnh? Có độ tương phản sáng - tối (chiều sâu) không?
  - **Cảm xúc & Thông điệp:** Bức tranh truyền tải câu chuyện gì?

### 2. "Cầm tay chỉ việc" (Step-by-Step Drawing Guide)
* Khi học sinh muốn vẽ bất kỳ chủ đề nào (Ví dụ: "Em muốn vẽ con mèo", "Em muốn vẽ bức tranh phong cảnh hoàng hôn"):
* AI chia nhỏ thành 4 giai đoạn chuẩn sư phạm:
  1. *Khung hình bao quát:* Dựng bằng các khối hình học cơ bản (tròn, bầu dục, tam giác).
  2. *Định hình chi tiết:* Nối nét và vẽ các bộ phận chính.
  3. *Tỉa nét & Làm sạch:* Xóa nét thừa, hoàn thiện nét viền sắc sảo.
  4. *Lên màu & Đổ bóng:* Hướng dẫn vị trí nguồn sáng, cách pha màu/tô màu chuyển sắc (gradient).

### 3. Bảng vẽ ảo tương tác (Interactive Canvas)
* Khung vẽ trực tiếp trên trình duyệt bằng HTML5 Canvas:
  - Công cụ: Bút chì, cọ vẽ, tẩy, bảng chọn màu (Color Picker), hoàn tác (Undo/Redo).
  - Nút "Nhờ giáo viên nhận xét ngay": Bấm nút là AI tự động chụp khung vẽ và gửi vào chatbot nhận xét.

### 4. Xưởng ý tưởng sáng tạo (Prompt to Art Concept)
* Học sinh gõ ý tưởng sơ khai (ví dụ: "Thành phố dưới đáy biển có cá voi bay lượn").
* AI tạo ra tranh phác thảo minh họa qua API tạo ảnh miễn phí để học sinh lấy cảm hứng.

---

## IV. PROMPT KỸ THUẬT MẪU CHO GEMINI VISION

```text
[VAI TRÒ]: Bạn là Giáo viên Mĩ thuật đầy nhiệt huyết, ân cần và giàu kinh nghiệm sư phạm mĩ thuật cho học sinh.
[NHIỆM VỤ]: Quan sát hình ảnh bức tranh học sinh vừa gửi và đưa ra nhận xét theo cấu trúc 3 phần chuẩn sư phạm:

1. LỜI KHEN NGỢI (Ấm áp, tìm ra 2 điểm tốt nhất về nét vẽ, màu sắc hoặc ý tưởng):
- ...
2. GỢI Ý ĐỂ TRANH ĐẸP HƠN NỮA (Chỉ ra 1-2 kỹ thuật cụ thể: bố cục, phối màu, bóng đổ):
- ...
3. BÍ QUYẾT HỌA SĨ (Mẹo nhỏ đơn giản học sinh có thể làm ngay):
- ...

[GIỌNG ĐIỆU]: Thân thiện, dùng từ ngữ tượng hình, khích lệ tối đa, tuyệt đối không chê bai.
```

---

## V. LỘ TRÌNH PHÁT TRIỂN DỰ ÁN (ROADMAP)
* **Giai đoạn 1 (Thu thập tri thức & Thiết kế lõi):**
  - Đã nạp cấu hình và tạo sổ tay chuyên biệt trên NotebookLM.
  - Xây dựng bộ khung lý thuyết mĩ thuật chuẩn.
* **Giai đoạn 2 (Xây dựng Prototype Web & Chatbox):**
  - Xây dựng giao diện Web UI tinh gọn (Chatbot + Upload ảnh + Canvas vẽ).
  - Tích hợp Gemini Flash API miễn phí.
* **Giai đoạn 3 (Thử nghiệm & Đóng gói):**
  - Thử nghiệm nhận xét các mẫu tranh học sinh thực tế.
  - Triển khai bản Web demo trực tuyến (Vercel/Cloudflare).
