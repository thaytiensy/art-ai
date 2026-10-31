// AI Context Engine for ART AI (Giáo Viên Mĩ Thuật GDPT 2018)
// Provides deep context awareness across all tabs, grades, lessons, and device environments (Smart TV, Desktop, Mobile)

export const APP_SECTIONS = [
  { id: 'thematicChat', name: 'Lớp Học Chủ Đề', icon: '💬', description: 'Học mĩ thuật theo 45 chủ đề SGK Kết nối tri thức Lớp 1 - 5, có giáo án Word CV 2345 và trình chiếu slide có giọng Thầy giảng.' },
  { id: 'canvas', name: 'Bảng Vẽ Kĩ Thuật Số', icon: '🎨', description: 'Bảng vẽ tương tác trực tuyến với bút lông, sáp màu, bảng pha màu 3 gốc, tẩy xóa và gửi trực tiếp sang cho Thầy chấm điểm.' },
  { id: 'critique', name: 'Mắt Thần Chấm Tranh', icon: '📸', description: 'Thầy Cọ Nhí (Gemini Vision Multimodal) thẩm định tranh theo Thang Rubric 4 Tiêu chí GDPT 2018 và hướng dẫn 3 bước hoàn thiện.' },
  { id: 'stepbystep', name: 'Tập Vẽ Từng Bước', icon: '🐾', description: 'Chia nhỏ mọi đối tượng hội họa thành các hình học cơ bản (tròn, vuông, tam giác) và luật viễn cận xa gần cho bé dễ vẽ.' },
  { id: 'inspiration', name: 'Xưởng Ý Tưởng', icon: '✨', description: 'Kho cảm hứng nghệ thuật kết nối API Bảo tàng Met, Art Institute of Chicago và AI tạo tranh mẫu tức thời theo mô tả.' }
];

export const SMART_TV_HOTKEYS = [
  { key: 'Mũi tên Trái / Phải (← / →)', action: 'Chuyển lùi / tiến slide bài giảng mĩ thuật' },
  { key: 'Mũi tên Lên / Xuống (↑ / ↓)', action: 'Chọn đáp án đố vui trắc nghiệm A, B, C' },
  { key: 'Phím Space (Cách) / Nút Đỏ TV', action: 'Phát / Dừng giọng Thầy Cọ Nhí giảng bài' },
  { key: 'Phím Enter / OK / Nút Vàng TV', action: 'Xác nhận chọn đáp án hoặc mở tranh phóng to' },
  { key: 'Phím F / Nút Xanh Dương TV', action: 'Bật / Tắt chế độ Toàn màn hình (Fullscreen TV)' },
  { key: 'Phím T', action: 'Bật / Tắt chế độ Màn hình lớn Smart TV' },
  { key: 'Phím Số 1 đến 5', action: 'Chuyển nhanh giữa 5 phân hệ chính của ứng dụng' },
  { key: 'Phím Esc / Back', action: 'Đóng modal hoặc thoát chế độ toàn màn hình' }
];

/**
 * Tạo câu trả lời thông minh của Thầy giáo mĩ thuật hiểu trọn vẹn ngữ cảnh hiện tại
 */
export function getContextAwareGuidance({
  activeTab = 'thematicChat',
  currentUnit = null,
  currentSlideIndex = 0,
  isTvMode = false,
  userQuery = '',
  teacher = { name: 'Thầy Cọ Nhí', pronoun: 'Thầy' }
}) {
  const pronoun = teacher?.pronoun || 'Thầy';
  const query = (userQuery || '').toLowerCase().trim();

  // 1. Nếu hỏi về cách sử dụng ứng dụng hoặc tổng quan các tính năng
  if (/cách dùng|hướng dẫn|sử dụng|tính năng|chức năng|app hoạt động|làm gì/i.test(query)) {
    return {
      text: `${pronoun} chào con! Ứng dụng ART AI gồm 5 phân hệ mĩ thuật thông minh được thiết kế chuẩn chương trình GDPT 2018:\n` +
        `1️⃣ 💬 Lớp Học Chủ Đề: Học 45 chủ đề từ Lớp 1 đến Lớp 5, có slide giảng bài, đố vui và giáo án chuẩn Bộ GD&ĐT.\n` +
        `2️⃣ 🎨 Bảng Vẽ Tương Tác: Thỏa sức sáng tạo nét vẽ, pha màu và gửi bài cho Thầy.\n` +
        `3️⃣ 📸 Mắt Thần Chấm Tranh: Thầy thẩm định tranh theo Thang Rubric 4 tiêu chí và cho điểm 10/10.\n` +
        `4️⃣ 🐾 Vẽ Từng Bước: Hướng dẫn vẽ con vật, phong cảnh, đồ vật từ hình khối đơn giản.\n` +
        `5️⃣ ✨ Xưởng Ý Tưởng: Khám phá hàng trăm nghìn kiệt tác bảo tàng thế giới và sinh tranh mẫu AI.\n` +
        `Con muốn ${pronoun} hướng dẫn chi tiết phần nào cứ nhắn cho ${pronoun} nhé! ✨`,
      quickAction: { type: 'guide_overview', label: 'Xem Chi Tiết 5 Phân Hệ' }
    };
  }

  // 2. Nếu hỏi về cách dùng màn hình Smart TV / Máy chiếu
  if (/smart tv|tivi|máy chiếu|màn hình lớn|remote|điều khiển|toàn màn hình/i.test(query)) {
    return {
      text: `${pronoun} rất tự hào vì ART AI hỗ trợ tối ưu 100% cho Smart TV (Samsung Tizen, LG webOS, Android TV, Sony)! 📺\n` +
        `• Bấm nút "Smart TV" trên thanh tiêu đề (hoặc phím T) để bật chế độ hiển thị chữ to, hình sắc nét.\n` +
        `• Bấm phím F để phóng to Toàn màn hình TV.\n` +
        `• Dùng remote TV: Mũi tên Trái/Phải để chuyển slide, Phím cách (Space) hoặc Nút Đỏ để nghe giọng Thầy giảng, Phím Enter để chọn đáp án trắc nghiệm!`,
      quickAction: { type: 'toggle_tv', label: isTvMode ? 'Tắt Chế Độ Smart TV' : 'Bật Ngay Chế Độ Smart TV' }
    };
  }

  // 3. Nếu hỏi về Chủ đề 1 Lớp 3 ("Em Yêu Mĩ Thuật")
  if (/lớp 3|chủ đề 1 lớp 3|em yêu mĩ thuật|hội họa|đồ họa|điêu khắc|ứng dụng/i.test(query)) {
    return {
      text: `Bài học Chủ đề 1 Lớp 3 "Em Yêu Mĩ Thuật" là bài mở đầu cực kì quan trọng! 🎨\n` +
        `Trong bài này, con được làm quen với 4 phân môn mĩ thuật cơ bản:\n` +
        `• 🖌️ Hội Họa: Tranh vẽ bằng màu sáp, chì màu, màu nước thể hiện cảm xúc.\n` +
        `• 🍂 Đồ Họa (Tranh in): In nổi tranh từ gân lá cây, củ quả, con dấu xốp.\n` +
        `• 🗿 Điêu Khắc: Nặn tượng con vật 3 chiều bằng đất sét hoặc đất nặn.\n` +
        `• 🎁 Mĩ Thuật Ứng Dụng: Thiết kế bưu thiếp, khung tranh trang trí góc học tập.\n` +
        `${pronoun} đã chuẩn bị sẵn đầy đủ đố vui và tranh mẫu thị phạm cho từng phân môn trong bài học rồi đấy!`,
      quickAction: { type: 'go_g3_cd1', label: 'Mở Bài Giảng Lớp 3 Chủ Đề 1' }
    };
  }

  // 4. Nếu hỏi về Vẽ Tranh Phong Cảnh Lớp 4
  if (/phong cảnh|lớp 4|xa gần|viễn cận|vẽ cảnh|quê hương/i.test(query)) {
    return {
      text: `Tuyệt vời! Đối với học sinh Lớp 4, vẽ tranh phong cảnh quê hương cần vận dụng công thức Luật Xa - Gần của ${pronoun}:\n` +
        `📐 1. Đường chân trời: Kẻ đường chân trời ở khoảng một phần ba trang giấy để chia trời và đất.\n` +
        `🌳 2. Cảnh gần (Tiền cảnh): Vẽ cây to, ngôi nhà, con thuyền đậm nét, rõ chi tiết, màu sắc tươi đậm.\n` +
        `⛰️ 3. Cảnh xa (Hậu cảnh): Vẽ ngọn núi mờ ảo, đàn cò bay nhỏ xíu, màu sắc pha chút xanh lam mát dịu.\n` +
        `${pronoun} đã bổ sung bài thực hành vẽ phong cảnh từng bước kèm mẫu phác thảo cho con ở mục "Vẽ Từng Bước" rồi nhé! 🏞️`,
      quickAction: { type: 'go_step_landscape', label: 'Vào Thực Hành Vẽ Phong Cảnh Lớp 4' }
    };
  }

  // 5. Nếu hỏi về Mắt thần chấm tranh / Tiêu chí Rubric
  if (/chấm tranh|mắt thần|điểm|rubric|đánh giá|tiêu chí/i.test(query)) {
    return {
      text: `${pronoun} chấm tranh theo đúng Thang Rubric 4 Tiêu Chí chuẩn GDPT 2018 (Thông tư 32/2018/TT-BGDĐT):\n` +
        `⭐ 1. Ý tưởng & Tính sáng tạo (Thể hiện đề tài độc đáo, trí tưởng tượng ngây thơ)\n` +
        `⭐ 2. Bố cục & Không gian (Vị trí hình chính to rõ ở trọng tâm, mảng phụ cân đối)\n` +
        `⭐ 3. Kỹ thuật nét & Hình khối (Đường nét tự tin, phối hợp hình tròn, vuông, tam giác)\n` +
        `⭐ 4. Màu sắc & Cảm xúc (Hòa sắc tươi tắn, có đậm nhạt, mang lại cảm xúc ấm áp)\n` +
        `Con có thể vẽ trên Bảng Vẽ hoặc chụp ảnh bài vẽ trên giấy tải lên để ${pronoun} chấm ngay nhé! 📸`,
      quickAction: { type: 'go_critique', label: 'Đến Mắt Thần Chấm Tranh' }
    };
  }

  // 6. Mặc định: Phản hồi dựa trên môi trường và màn hình đang mở
  let defaultGreeting = `${pronoun} luôn đồng hành cùng con sáng tạo mĩ thuật!`;
  if (isTvMode) {
    defaultGreeting = `📺 ${pronoun} đang trình chiếu ở chế độ Smart TV cho cả lớp. Các con có thể dùng phím mũi tên trên remote để chuyển slide và phím cách để nghe ${pronoun} giảng bài nhé!`;
  } else if (activeTab === 'canvas') {
    defaultGreeting = `🎨 ${pronoun} thấy con đang ở Bảng Vẽ. Hãy tự tin đưa nét cọ, chọn bảng màu yêu thích và bấm nút "Nhờ Thầy Nhận Xét" khi vẽ xong nha!`;
  } else if (activeTab === 'critique') {
    defaultGreeting = `📸 Mắt Thần của ${pronoun} đã sẵn sàng! Con hãy tải ảnh bài vẽ lên hoặc chuyển từ bảng vẽ sang để ${pronoun} chấm theo 4 tiêu chí Rubric nhé!`;
  } else if (activeTab === 'stepbystep') {
    defaultGreeting = `🐾 Ở mục Vẽ Từng Bước, ${pronoun} đã chia nhỏ các đề tài thành từng bước hình học cực dễ hiểu. Con bấm vào hình loa để nghe ${pronoun} chỉ dẫn chi tiết nhé!`;
  } else if (activeTab === 'thematicChat' && currentUnit) {
    const slide = currentUnit.powerpointSlides?.[currentSlideIndex];
    defaultGreeting = `💬 Chúng mình đang học bài "${currentUnit.title}" (${currentUnit.unitNumber} - ${currentUnit.gradeLabel}). ${slide?.teacherLecture || currentUnit.summary}`;
  }

  return {
    text: defaultGreeting,
    quickAction: null
  };
}
