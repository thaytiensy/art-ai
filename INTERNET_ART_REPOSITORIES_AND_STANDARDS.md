# KHO TƯ LIỆU INTERNET & CHUẨN SƯ PHẠM MĨ THUẬT CHO AI GIÁO VIÊN

Tài liệu này tổng hợp toàn bộ các nguồn dữ liệu mở từ Internet, khung chương trình chính thống và bộ tiêu chí đánh giá chuẩn quốc tế nhằm làm nền tảng tri thức cho hệ thống AI Giáo viên Mĩ thuật (ArtEd AI).

---

## 1. KHUNG CHƯƠNG TRÌNH MĨ THUẬT CHÍNH THỐNG (VIỆT NAM GDPT 2018)
*Căn cứ theo Thông tư số 32/2018/TT-BGDĐT của Bộ Giáo dục và Đào tạo.*

### Ba Trụ cột Năng lực Mĩ thuật cốt lõi:
1. **Quan sát và nhận thức thẩm mĩ:**
   - Nhận diện các yếu tố tạo hình (đường nét, hình khối, màu sắc, đậm nhạt, chất cảm) trong tự nhiên và tác phẩm nghệ thuật.
   - Nhận biết nguyên lý thị giác: cân bằng, tương phản, nhịp điệu, tỷ lệ, điểm nhấn.
2. **Sáng tạo và ứng dụng thẩm mĩ:**
   - Thực hành kỹ thuật vẽ tranh đề tài, tĩnh vật, phong cảnh, chân dung, đồ họa và tạo hình 3D.
   - Ứng dụng nghệ thuật vào đời sống: trang trí thiệp, bìa sách, áp phích, thiết kế thời trang, đồ dùng sinh hoạt.
3. **Phân tích và đánh giá thẩm mĩ:**
   - Cảm nhận và diễn đạt cảm xúc về sản phẩm nghệ thuật của bản thân và bạn bè.
   - Tôn trọng phong cách biểu cảm cá nhân và sự đa dạng văn hóa nghệ thuật.

---

## 2. KHO TRANH VÀ TƯ LIỆU NGHỆ THUẬT MỞ MIỄN PHÍ TOÀN CẦU (OPEN ACCESS ART APIS)
*Nguồn dữ liệu mở trực tuyến, cho phép AI truy vấn và hiển thị tác phẩm kinh điển miễn phí mà không cần API Key:*

### 1. The Metropolitan Museum of Art (The Met) Collection API
* **Quy mô:** Hơn 470.000 tác phẩm kinh điển toàn cầu.
* **Bản quyền:** CC0 (Public Domain - Tự do sử dụng hoàn toàn).
* **API Key:** **Hoàn toàn KHÔNG cần API Key** (truy vấn trực tiếp qua REST JSON).
* **Endpoint chính:**
  - Tìm kiếm tác phẩm: `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q={chủ_đề}`
  - Chi tiết & ảnh chất lượng cao: `https://collectionapi.metmuseum.org/public/collection/v1/objects/{objectID}`
* **Ứng dụng cho AI:** Lấy tranh mẫu của các bậc thầy (Van Gogh, Monet, Da Vinci...) để minh họa lý thuyết màu sắc, bố cục cho học sinh.

### 2. The Art Institute of Chicago (AIC) API
* **Quy mô:** Hơn 130.000 tác phẩm nghệ thuật cao cấp.
* **Bản quyền:** CC0 & CC BY 4.0.
* **API Key:** Miễn phí, không bắt buộc đăng ký.
* **Endpoint:** `https://api.artic.edu/api/v1/artworks` (hỗ trợ chuẩn IIIF Image phóng to chi tiết nét cọ).

### 3. Smithsonian Open Access API
* **Quy mô:** Hàng triệu hiện vật, tranh vẽ và mô hình 3D phục vụ học tập lịch sử mỹ thuật và văn hóa dân tộc.

---

## 3. TẬP DỮ LIỆU BƯỚC VẼ VECTƠ (STEP-BY-STEP DRAWING REPOSITORIES)
*Dữ liệu nguồn mở giúp AI dạy học sinh phân rã nét vẽ thành từng bước:*

* **Google Quick, Draw! Dataset (googlecreativelab/quickdraw-dataset):**
  - Hơn 50 triệu bản vẽ phác thảo tay của 345 nhóm đề tài thông dụng (động vật, phương tiện giao thông, cây cối, đồ vật).
  - Cấu trúc dữ liệu nét vẽ (Stroke Coordinates: `[x, y, timestamp]`): Cho phép AI phân tích thứ tự đặt bút, từ nét dựng hình khung cơ bản đến chi tiết hoàn thiện.
* **Open Library of Drawing Primitives:**
  - Quy tắc phân rã hình thể: Khối cầu, khối trụ, khối hộp, khối nón.

---

## 4. BỘ TIÊU CHÍ ĐÁNH GIÁ TRANH VẼ CHUẨN QUỐC TẾ (VISUAL ART RUBRIC)
*Khung đánh giá 4 cấp độ (Xuất sắc - Đạt chuẩn - Đang phát triển - Cần cố gắng) được chuẩn hóa để AI dùng làm Prompt thẩm định:*

| Tiêu chí | Cấp 4: Xuất sắc (Exemplary) | Cấp 3: Đạt chuẩn (Proficient) | Cấp 2: Đang phát triển (Developing) | Cấp 1: Cần cố gắng (Beginning) |
| :--- | :--- | :--- | :--- | :--- |
| **Sáng tạo & Độc đáo (Creativity)** | Ý tưởng độc đáo, mang đậm dấu ấn cá nhân; phối hợp chi tiết bất ngờ và sinh động. | Ý tưởng rõ ràng, có sáng tạo dựa trên đề tài quen thuộc. | Dựa nhiều vào mẫu có sẵn, ít biến tấu hay chi tiết độc đáo. | Sao chép nguyên mẫu, chưa thể hiện được ý tưởng riêng. |
| **Bố cục & Không gian (Composition)** | Trọng tâm nổi bật; áp dụng xuất sắc quy tắc 1/3, cân bằng thị giác, tạo chiều sâu xa gần rõ rệt. | Bố cục gọn gàng, hài hòa, trọng tâm rõ ràng, tỷ lệ các mảng hình hợp lý. | Hình vẽ hơi lệch hoặc quá nhỏ/quá to so với khổ giấy; chiều sâu chưa rõ. | Các chi tiết rời rạc, chưa có điểm nhấn hoặc bố cục mất cân đối. |
| **Kỹ thuật & Nét vẽ (Craftsmanship)** | Nét vẽ tự tin, dứt khoát; kiểm soát chất liệu màu/chì xuất sắc; phân mảng sáng tối sắc sảo. | Nét vẽ đều, cẩn thận; tô màu kín mảng, ít bị lem, có thể hiện đậm nhạt. | Nét vẽ còn run, ngập ngừng; màu tô chưa đều, còn loang lổ nhiều chỗ. | Nét vẽ chưa hoàn thiện, màu tô vội vàng hoặc bức tranh chưa xong. |
| **Cảm xúc & Hoàn thiện (Completion)** | Bức tranh truyền tải cảm xúc mạnh mẽ, thể hiện sự kiên trì và chăm chút từng góc tranh. | Tác phẩm hoàn chỉnh, đầy đủ chi tiết theo yêu cầu đề tài. | Tác phẩm cơ bản xong nhưng thiếu các chi tiết phụ trợ giúp tranh sinh động. | Bỏ dở giữa chừng, thiếu nhiều phần quan trọng. |

---

## 5. BỘ LÝ THUYẾT MĨ THUẬT CỐT LÕI (CORE ART THEORY)

### 7 Yếu tố Nghệ thuật (Elements of Art):
1. **Nét (Line):** Nét thẳng, cong, gấp khúc, nét đậm/nhạt tạo nhịp điệu và hướng chuyển động.
2. **Hình (Shape):** Hình phẳng 2D (hình học chuẩn và hình tự do hữu cơ).
3. **Khối (Form):** Chiều sâu 3D (khối cầu, khối lập phương, khối trụ).
4. **Không gian (Space):** Không gian thực, luật xa gần (Perspective), khoảng trống tích cực và tiêu cực.
5. **Màu sắc (Color):** Màu cơ bản (Đỏ, Vàng, Lam), màu nhị hợp, màu bổ túc, gam màu nóng/lạnh.
6. **Sắc độ (Value):** Thang độ từ sáng nhất (trắng) đến tối nhất (đen) giúp tạo bóng đổ và ánh sáng.
7. **Chất cảm (Texture):** Bề mặt thô ráp, mịn màng, xù xì qua nét cọ và màu sắc.

### 8 Nguyên lý Thiết kế Thị giác (Principles of Design):
* **Cân bằng (Balance):** Đối xứng hoặc bất đối xứng.
* **Tương phản (Contrast):** Sáng - tối, nóng - lạnh, to - nhỏ.
* **Điểm nhấn (Emphasis):** Chi tiết hút ánh nhìn đầu tiên.
* **Nhịp điệu (Rhythm & Movement):** Sự lặp lại có chủ đích dẫn dắt mắt nhìn.
* **Hài hòa & Thống nhất (Unity):** Tất cả các thành phần hòa quyện thành một thể thống nhất.
