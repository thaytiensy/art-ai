// BỘ SÁCH GIÁO KHOA MĨ THUẬT: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (LỚP 1 - 5)
// Tích hợp: Kế hoạch bài dạy chuẩn Word (Công văn 2345/BGDĐT) & Bài giảng Slide PowerPoint tương tác

export const KET_NOI_TRI_THUC_DATA = [
  // ==========================================
  // LỚP 1 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
  // ==========================================
  {
    id: 'kntt_g1_c1',
    grade: 1,
    gradeLabel: 'Lớp 1',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    unitNumber: 'Chủ đề 1',
    title: 'Thế Giới Mĩ Thuật (Chấm, Nét, Sắc Màu)',
    duration: '2 tiết',
    icon: '🌈',
    tag: 'Nét & Màu Cơ Bản',
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
    summary: 'Làm quen với các yếu tố tạo hình đầu tiên trong SGK Kết nối tri thức: Chấm tròn to nhỏ, các đường nét kì diệu và 3 màu gốc cơ bản.',
    
    // --- GIÁO ÁN WORD CHUẨN CÔNG VĂN 2345 ---
    wordLessonPlan: {
      title: 'KẾ HOẠCH BÀI DẠY MĨ THUẬT LỚP 1',
      unit: 'Chủ đề 1: THẾ GIỚI MĨ THUẬT (Tiết 1 & 2)',
      book: 'Bộ sách: Kết nối tri thức với cuộc sống - NXB Giáo dục Việt Nam',
      
      objectives: [
        'Năng lực Mĩ thuật: Nhận biết được các loại chấm, nét cơ bản (thẳng, cong, lượn sóng) và 3 màu gốc (Đỏ, Vàng, Lam) trong thiên nhiên và tranh vẽ.',
        'Năng lực Sáng tạo: Biết sử dụng chấm và nét để tạo hình một bức tranh đơn giản (Cầu vồng, bông hoa, cánh bướm).',
        'Phẩm chất cốt lõi: Rèn luyện tính kiên nhẫn, yêu cái đẹp, trân trọng sản phẩm mĩ thuật của bản thân và bạn bè.'
      ],
      
      preparations: {
        teacher: 'SGK Mĩ thuật 1 Kết nối tri thức, máy chiếu/slide bài giảng, tranh mẫu phóng to, bảng màu mẫu.',
        students: 'Vở thực hành mĩ thuật 1, bút chì, sáp màu, giấy vẽ A4, hồ dán.'
      },
      
      activities: [
        {
          phase: '1. HOẠT ĐỘNG KHỞI ĐỘNG (5 phút)',
          teacherAct: 'Tổ chức trò chơi "Tìm bạn cho Màu": Thầy giơ thẻ màu Đỏ, Vàng, Lam và đố học sinh tìm đồ vật quanh lớp có màu tương ứng.',
          studentAct: 'Học sinh quan sát nhanh lớp học, hào hứng chỉ ra: Cờ đỏ, khăn quàng đỏ, áo vàng, cặp sách màu lam.',
          outcome: 'Tạo không khí lớp học vui tươi, khơi gợi trí tò mò về thế giới sắc màu.'
        },
        {
          phase: '2. HOẠT ĐỘNG KHÁM PHÁ (10 phút)',
          teacherAct: 'Cho học sinh quan sát trang 6 SGK Kết nối tri thức. Hướng dẫn các con nhận biết chấm to - chấm nhỏ, nét thẳng - nét cong - nét lượn sóng trên cánh bướm và vòm cầu vồng.',
          studentAct: 'Chỉ tay vào tranh, phát biểu: "Thưa Thầy, con thấy chấm trên cánh bướm giống hạt đậu, cầu vồng có các nét cong uốn lượn ạ!"',
          outcome: 'Nắm được khái niệm chấm và nét cơ bản trong đời sống.'
        },
        {
          phase: '3. HOẠT ĐỘNG LUYỆN TẬP - SÁNG TẠO (15 phút)',
          teacherAct: 'Giao nhiệm vụ: Bé hãy dùng sáp màu vẽ bức tranh "Cầu vồng và Bầu trời vui vẻ" bằng các đường nét uốn lượn và chấm màu sinh động.',
          studentAct: 'Tự do chọn màu sáp, vẽ nét cong cầu vồng và chấm những giọt mưa sắc màu rơi xuống cánh đồng.',
          outcome: 'Hoàn thành bức tranh thể hiện đúng chủ đề bằng nét và màu gốc.'
        },
        {
          phase: '4. HOẠT ĐỘNG PHÂN TÍCH - ĐÁNH GIÁ (5 phút)',
          teacherAct: 'Mời 3 bạn lên treo tranh. Thầy nhận xét theo phương pháp Bánh mì kẹp (Khen ngợi nét bút hồn nhiên -> Gợi ý tô kín màu -> Trao huy hiệu Bé Khéo Tay).',
          studentAct: 'Tự tin giới thiệu bức tranh của mình trước cả lớp và vỗ tay cổ vũ bạn.',
          outcome: 'Học sinh biết tự đánh giá và cảm thụ nét đẹp của bạn bè.'
        },
        {
          phase: '5. HOẠT ĐỘNG VẬN DỤNG (Dặn dò)',
          teacherAct: 'Về nhà, con hãy quan sát xem trong vườn nhà có hoa lá nào mang chấm và nét đẹp để khoe với Thầy vào tiết sau nhé!',
          studentAct: 'Ghi nhớ lời Thầy dặn dò, cất gọn gàng sáp màu vào hộp.'
        }
      ]
    },

    // --- BÀI GIẢNG SLIDE POWERPOINT TƯƠNG TÁC ---
    powerpointSlides: [
      {
        slideNumber: 1,
        title: 'BÀI 1: THẾ GIỚI MĨ THUẬT QUANH EM',
        subtitle: 'Mĩ thuật Lớp 1 • Bộ sách Kết nối tri thức với cuộc sống',
        teacherLecture: 'Thầy chào các họa sĩ nhí lớp 1! Chào mừng các con đến với thế giới Mĩ thuật diệu kỳ của bộ sách Kết nối tri thức. Hôm nay chúng mình cùng khám phá phép thuật của những Chấm tròn và Đường Nét nhé!',
        bullets: [
          'Khám phá Chấm và Nét kì diệu',
          'Làm quen với 3 bạn màu gốc: Đỏ, Vàng, Lam',
          'Sáng tạo bức tranh Cầu Vồng đầu tiên của con'
        ],
        badge: '🌟 Tiết học Mở màn'
      },
      {
        slideNumber: 2,
        title: '1. KHÁM PHÁ: BẠN CHẤM VÀ BẠN NÉT Ở ĐÂU?',
        subtitle: 'Quan sát thiên nhiên và đồ vật xung quanh',
        teacherLecture: 'Các con hãy nhìn xem: Chấm tròn có ở trên lưng chú bọ rùa, trong nhụy hoa hướng dương. Còn Nét vẽ thì uốn lượn như dòng suối, thẳng đứng như thân cây tre!',
        bullets: [
          'Chấm: To, nhỏ, tròn xoe, rải rác như những giọt mưa',
          'Nét thẳng: Khỏe khoắn, vững chãi như ngôi nhà',
          'Nét cong & lượn sóng: Mềm mại như dải mây bồng bềnh'
        ],
        badge: '🔍 Mắt thần quan sát'
      },
      {
        slideNumber: 3,
        title: '2. BÍ QUYẾT CỦA THẦY: BA MÀU GỐC THẦN KỲ',
        subtitle: 'Đỏ - Vàng - Lam: Mẹ của ngàn sắc màu',
        teacherLecture: 'Thầy chỉ cho con bí quyết này nhé: Chỉ cần 3 màu Đỏ, Vàng và Lam thôi, khi bắt tay nhau sẽ tạo ra được màu Cam ấm áp, màu Xanh lá mát rượi và màu Tím mộng mơ đấy!',
        bullets: [
          '🔴 Màu Đỏ: Nồng ấm như mặt trời rực rỡ',
          '🟡 Màu Vàng: Tươi sáng như tia nắng ban mai',
          '🔵 Màu Lam: Mênh mông như bầu trời trong xanh'
        ],
        badge: '🎨 Phù thủy pha màu'
      },
      {
        slideNumber: 4,
        title: '3. THỰC HÀNH: BƯỚC VẼ CẦU VỒNG 7 SẮC',
        subtitle: 'Quy trình sáng tạo dễ nhớ cho bé',
        teacherLecture: 'Bây giờ chúng mình cùng vẽ nhé! Bước 1: Vẽ 2 đám mây tròn xoe mỉm cười. Bước 2: Vẽ các nét cong song song vắt qua bầu trời. Bước 3: Dùng sáp màu tô thật đều tay từ Đỏ, Cam, Vàng sang Lam!',
        bullets: [
          'Bước 1: Phác nét cong vòm cầu vồng',
          'Bước 2: Vẽ mây trắng và tia nắng ấm',
          'Bước 3: Lên màu rực rỡ và chấm thêm hoa lá'
        ],
        badge: '✏️ Bắt tay vào vẽ'
      },
      {
        slideNumber: 5,
        title: '4. TRƯNG BÀY & NHẬN XÉT: CON ĐẠT ĐIỂM 10!',
        subtitle: 'Tuyên dương tinh thần sáng tạo của họa sĩ nhí',
        teacherLecture: 'Oa, Thầy nhìn thấy bức tranh nào của các con cũng tràn ngập niềm vui! Thầy khen ngợi các con đã sử dụng màu sắc rất tự tin và hoàn thành xuất sắc nhiệm vụ!',
        bullets: [
          'Ý tưởng: Hồn nhiên, sinh động (10/10)',
          'Màu sắc: Tươi sáng, ấm áp chuẩn màu gốc',
          'Huy hiệu: Cây Cọ Nhí Tài Ba 🏆'
        ],
        badge: '🏆 Bảng vàng khen thưởng'
      }
    ]
  },

  {
    id: 'kntt_g1_c2',
    grade: 1,
    gradeLabel: 'Lớp 1',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    unitNumber: 'Chủ đề 2',
    title: 'Ngôi Nhà Của Em (Hình Khối Cơ Bản)',
    duration: '2 tiết',
    icon: '🏠',
    tag: 'Hình Học & Không Gian',
    coverImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=80',
    summary: 'Ghép các hình học cơ bản (tam giác, vuông, chữ nhật) để vẽ nên ngôi nhà thân yêu của gia đình em.',
    
    wordLessonPlan: {
      title: 'KẾ HOẠCH BÀI DẠY MĨ THUẬT LỚP 1',
      unit: 'Chủ đề 2: NGÔI NHÀ CỦA EM (Tiết 1 & 2)',
      book: 'Bộ sách: Kết nối tri thức với cuộc sống - NXB Giáo dục Việt Nam',
      objectives: [
        'Biết cách kết hợp hình tam giác làm mái nhà, hình vuông hoặc chữ nhật làm thân nhà và cửa sổ.',
        'Vẽ được bức tranh ngôi nhà có cảnh vật xung quanh (cây cối, đường đi, ông mặt trời).',
        'Bồi dưỡng tình yêu thương gia đình và mái ấm thân thương của mình.'
      ],
      preparations: {
        teacher: 'Bộ hình học phẳng nam châm, tranh ảnh các kiểu nhà nông thôn, thành thị trong SGK Kết nối tri thức.',
        students: 'Bút sáp, giấy vẽ, thước kẻ nhựa.'
      },
      activities: [
        {
          phase: '1. Khởi động',
          teacherAct: 'Cho cả lớp hát bài "Nhà của tôi" và đố các bạn hình dáng mái nhà.',
          studentAct: 'Hát vang và trả lời: "Mái nhà hình tam giác ạ!"'
        },
        {
          phase: '2. Khám phá',
          teacherAct: 'Dùng các miếng ghép hình học ghép trực tiếp lên bảng để biến thành ngôi nhà 1 tầng và nhà cao tầng.',
          studentAct: 'Hào hứng lên bảng thử ghép các cánh cửa sổ hình vuông nhỏ xinh.'
        },
        {
          phase: '3. Thực hành',
          teacherAct: 'Hướng dẫn bé vẽ ngôi nhà ở chính giữa bức tranh, sau đó vẽ thêm cây xanh bên cạnh để tạo bóng mát.',
          studentAct: 'Vẽ ngôi nhà thân yêu của mình, tô mái ngói đỏ tươi và tường nhà màu vàng nắng.'
        },
        {
          phase: '4. Đánh giá',
          teacherAct: 'Nhận xét về bố cục cân đối và khen ngợi sự sáng tạo khi bé vẽ thêm đàn gà trong sân.'
        }
      ]
    },

    powerpointSlides: [
      {
        slideNumber: 1,
        title: 'BÀI 2: NGÔI NHÀ THÂN YÊU CỦA EM',
        subtitle: 'SGK Mĩ thuật 1 • Kết nối tri thức với cuộc sống',
        teacherLecture: 'Ngôi nhà là nơi chan chứa tình yêu thương của ông bà, cha mẹ và các con. Hôm nay Thầy sẽ hướng dẫn các con làm kiến trúc sư nhí vẽ nên ngôi nhà xinh đẹp nhất nhé!',
        bullets: ['Ghép hình tam giác, vuông, chữ nhật', 'Vẽ thêm cây cối, hoa lá quanh nhà', 'Tô màu mái ngói đỏ tươi rực rỡ'],
        badge: '🏡 Mái ấm gia đình'
      },
      {
        slideNumber: 2,
        title: '1. KHÁM PHÁ CÁC KHỐI HÌNH KỲ DIỆU',
        subtitle: 'Quan sát các bộ phận của ngôi nhà',
        teacherLecture: 'Con thấy không: Mái ngói nhọn hình tam giác giúp thoát nước mưa, thân nhà hình chữ nhật vững chãi, còn cửa sổ hình vuông để đón gió mát mỗi sớm mai!',
        bullets: ['Mái nhà: Hình tam giác hoặc hình thang', 'Thân nhà: Hình vuông hoặc chữ nhật to', 'Cửa đi: Hình chữ nhật đứng đón ánh nắng'],
        badge: '🔺 Hình học thông minh'
      },
      {
        slideNumber: 3,
        title: '2. BƯỚC VẼ: TỪ HÌNH ĐƠN ĐẾN BỨC TRANH HOÀN CHỈNH',
        subtitle: '3 Bước đơn giản cùng Thầy',
        teacherLecture: 'Bước 1: Vẽ thân nhà ở giữa trang giấy. Bước 2: Đặt chiếc nón tam giác lên trên làm mái. Bước 3: Vẽ ống khói, hàng rào và cây ăn quả sum suê nhé!',
        bullets: ['Bước 1: Dựng khung ngôi nhà', 'Bước 2: Thêm cửa chính và cửa sổ', 'Bước 3: Tô màu tường vàng, mái đỏ, cây xanh'],
        badge: '📐 Dựng hình chuẩn xác'
      }
    ]
  },

  // ==========================================
  // LỚP 2 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
  // ==========================================
  {
    id: 'kntt_g2_c1',
    grade: 2,
    gradeLabel: 'Lớp 2',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    unitNumber: 'Chủ đề 1',
    title: 'Đại Dương Mênh Mông (Sắc Màu Của Biển)',
    duration: '3 tiết',
    icon: '🌊',
    tag: 'Màu Sắc & Động Vật Biển',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    summary: 'Khám phá gam màu lạnh của đại dương xanh, cách pha chuyển màu nước biển từ nông đến sâu và vẽ đàn cá bơi lội.',
    
    wordLessonPlan: {
      title: 'KẾ HOẠCH BÀI DẠY MĨ THUẬT LỚP 2',
      unit: 'Chủ đề 1: ĐẠI DƯƠNG MÊNH MÔNG (Bài: Những chú cá đáng yêu)',
      book: 'Bộ sách: Kết nối tri thức với cuộc sống - NXB Giáo dục Việt Nam',
      objectives: [
        'Nhận biết vẻ đẹp phong phú của sinh vật biển và gam màu lạnh (xanh lam, xanh lục, tím than).',
        'Biết cách phối hợp các nét cong, lượn sóng để vẽ vảy cá, vây cá và rạn san hô.',
        'Hình thành ý thức bảo vệ môi trường biển, không vứt rác nhựa xuống đại dương.'
      ],
      preparations: {
        teacher: 'Video clip ngắn về sinh vật biển, tranh ảnh rạn san hô, giấy vẽ màu xanh nước biển.',
        students: 'Màu sáp dầu, màu nước, kéo thủ công, giấy màu.'
      },
      activities: [
        {
          phase: '1. Khởi động (5 phút)',
          teacherAct: 'Cho xem đoạn phim ngắn các chú cá hề bơi quanh rạn san hô phát sáng.',
          studentAct: 'Trầm trồ ngắm nhìn và reo lên: "Đẹp như phim hoạt hình Đi tìm Nemo ạ!"'
        },
        {
          phase: '2. Khám phá (10 phút)',
          teacherAct: 'Hướng dẫn học sinh phân tích đặc điểm con cá: Thân hình thoi hoặc tròn, đuôi hình tam giác vẫy nước, vảy xếp lớp như ngói lợp.',
          studentAct: 'Mô tả hình dáng bạn rùa biển, bạn sao biển 5 cánh.'
        },
        {
          phase: '3. Thực hành sáng tạo (15 phút)',
          teacherAct: 'Khuyến khích bé vẽ một đàn cá có con to, con nhỏ bơi cùng hướng hoặc quây quần bên nhau.',
          studentAct: 'Vẽ chú cá voi mẹ to lớn chở chú cá con tí hon trên lưng.'
        }
      ]
    },

    powerpointSlides: [
      {
        slideNumber: 1,
        title: 'CHỦ ĐỀ 1: ĐẠI DƯƠNG MÊNH MÔNG',
        subtitle: 'Mĩ thuật Lớp 2 • Kết nối tri thức với cuộc sống',
        teacherLecture: 'Thầy chào các họa sĩ lớp 2! Hôm nay chúng mình cùng đeo kính lặn để thám hiểm đáy biển sâu muôn màu muôn vẻ của bộ sách Kết nối tri thức nhé!',
        bullets: ['Khám phá vẻ đẹp kỳ thú của đại dương', 'Học cách vẽ đàn cá tung tăng bơi lội', 'Bảo vệ biển xanh khỏi rác thải nhựa'],
        badge: '🤿 Thám hiểm đáy biển'
      },
      {
        slideNumber: 2,
        title: '1. SẮC MÀU VÀ ĐỘ SÂU NƯỚC BIỂN',
        subtitle: 'Bí quyết dùng gam màu Lạnh',
        teacherLecture: 'Các con lưu ý nhé: Gần mặt nước có nhiều ánh nắng chiếu rọi nên nước mang màu xanh lam nhạt. Càng lặn sâu xuống đáy, màu nước sẽ chuyển dần sang xanh thẫm và tím than huyền bí!',
        bullets: ['Tầng trên: Xanh lam nhạt, lấp lánh bọt sóng', 'Tầng đáy: Xanh lục đậm, tím than tạo chiều sâu 3D', 'Điểm nhấn: San hô và cá mang màu nóng (Cam, Vàng) rực rỡ'],
        badge: '🎨 Phối màu chiều sâu'
      },
      {
        slideNumber: 3,
        title: '2. QUY TRÌNH VẼ CHÚ CÁ BIỂN ĐÁNG YÊU',
        subtitle: '4 Nét bút thần tốc',
        teacherLecture: 'Bước 1: Nét cong trên và nét cong dưới khép lại thành thân cá. Bước 2: Thêm mắt to tròn và miệng cười toe toét. Bước 3: Vẽ vây và đuôi uốn lượn. Bước 4: Trang trí sọc vằn sặc sỡ!',
        bullets: ['1. Vẽ thân hình elip hoặc hình thoi', '2. Thêm mang cá, vây lưng, vây bụng', '3. Vẽ vảy cá hình cánh hoa xinh xắn', '4. Tô màu tương phản để cá nổi bật'],
        badge: '🐠 Nét vẽ sinh động'
      }
    ]
  },

  // ==========================================
  // LỚP 3 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
  // ==========================================
  {
    id: 'kntt_g3_c1',
    grade: 3,
    gradeLabel: 'Lớp 3',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    unitNumber: 'Chủ đề 2',
    title: 'Giai Điệu Sắc Màu & Họa Tiết Trang Trí',
    duration: '3 tiết',
    icon: '✨',
    tag: 'Họa Tiết & Gam Màu Cảm Xúc',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    summary: 'Phân tích gam màu nóng - lạnh tương phản, tạo họa tiết đối xứng trang trí khăn tay, đĩa tròn chuẩn SGK Kết nối tri thức lớp 3.',
    
    wordLessonPlan: {
      title: 'KẾ HOẠCH BÀI DẠY MĨ THUẬT LỚP 3',
      unit: 'Chủ đề 2: GIAI ĐIỆU SẮC MÀU (Trang trí đồ vật)',
      book: 'Bộ sách: Kết nối tri thức với cuộc sống - NXB Giáo dục Việt Nam',
      objectives: [
        'Hiểu và vận dụng được nguyên lý lặp lại, đối xứng trong trang trí mĩ thuật.',
        'Sử dụng hài hòa cặp màu tương phản (Đỏ - Xanh lá, Vàng - Tím, Cam - Lam).',
        'Biết yêu quý các sản phẩm thủ công truyền thống của quê hương.'
      ],
      preparations: {
        teacher: 'Mẫu trang trí hình vuông, hình tròn, quạt giấy thổ cẩm.',
        students: 'Com-pa, thước kẻ, màu vẽ, kéo, keo dán.'
      },
      activities: [
        {
          phase: '1. Khám phá trục đối xứng',
          teacherAct: 'Gấp đôi tờ giấy hình vuông, cắt một nửa cánh bướm và mở ra.',
          studentAct: 'Ngạc nhiên nhận ra hai nửa hoàn toàn giống hệt nhau.'
        },
        {
          phase: '2. Luyện tập sáng tạo',
          teacherAct: 'Yêu cầu vẽ họa tiết hoa sen cách điệu vào tâm hình tròn và trang trí diềm xung quanh.',
          studentAct: 'Cẩn thận kẻ các đường trục và phối màu tương phản nóng - lạnh.'
        }
      ]
    },

    powerpointSlides: [
      {
        slideNumber: 1,
        title: 'CHỦ ĐỀ 2: GIAI ĐIỆU CỦA SẮC MÀU',
        subtitle: 'Mĩ thuật Lớp 3 • Kết nối tri thức với cuộc sống',
        teacherLecture: 'Chào các bạn lớp 3! Hôm nay Thầy sẽ cùng các con khám phá giai điệu trầm bổng của màu sắc: Khi nào màu sắc nhảy múa tưng bừng, khi nào màu sắc lại êm dịu như một khúc hát ru!',
        bullets: ['Bí quyết phối màu Nóng & Lạnh', 'Nghệ thuật đối xứng qua trục', 'Trang trí tấm thảm họa tiết dân tộc'],
        badge: '🎭 Gam màu cảm xúc'
      },
      {
        slideNumber: 2,
        title: '1. TƯƠNG PHẢN NÓNG - LẠNH ĐỘC ĐÁO',
        subtitle: 'Cặp đôi bạn thân trên bánh xe màu sắc',
        teacherLecture: 'Khi đặt màu Cam cạnh màu Xanh Lam, bức tranh sẽ bừng sáng như đốm lửa giữa trời đông! Đó chính là sức mạnh của sự tương phản mà các đại danh họa luôn sử dụng!',
        bullets: ['Đỏ đi cùng Xanh Lá: Rực rỡ như hoa nở trong vườn', 'Vàng đi cùng Tím: Sang trọng và cuốn hút', 'Cam đi cùng Lam: Tràn đầy năng lượng hiện đại'],
        badge: '⚡ Sức mạnh tương phản'
      }
    ]
  },

  // ==========================================
  // LỚP 4 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
  // ==========================================
  {
    id: 'kntt_g4_c1',
    grade: 4,
    gradeLabel: 'Lớp 4',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    unitNumber: 'Chủ đề 3',
    title: 'Phong Cảnh Quê Hương: Luật Xa Gần',
    duration: '4 tiết',
    icon: '🌾',
    tag: 'Phối Cảnh Không Gian 3D',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    summary: 'Bài học trọng tâm lớp 4 theo SGK Kết nối tri thức: Ứng dụng đường chân trời và luật xa gần để biến mặt phẳng giấy thành không gian làng quê có chiều sâu hun hút.',
    
    wordLessonPlan: {
      title: 'KẾ HOẠCH BÀI DẠY MĨ THUẬT LỚP 4',
      unit: 'Chủ đề 3: VẺ ĐẸP CUỘC SỐNG (Phong cảnh quê hương em)',
      book: 'Bộ sách: Kết nối tri thức với cuộc sống - NXB Giáo dục Việt Nam',
      objectives: [
        'Nắm vững nguyên lý Luật Xa Gần: Vật ở gần thì to, rõ, đậm nét; vật ở xa thì nhỏ, mờ, nhạt màu.',
        'Xác định được đường chân trời (tầm mắt) và điểm tụ trong tranh phong cảnh.',
        'Bồi dưỡng lòng tự hào và tình yêu quê hương đất nước Việt Nam tươi đẹp.'
      ],
      preparations: {
        teacher: 'Bộ ảnh phong cảnh ruộng bậc thang Mù Cang Chải, tranh thủy mặc phong cảnh làng quê.',
        students: 'Giấy A3, bút chì 2B-4B, màu nước hoặc sáp dầu.'
      },
      activities: [
        {
          phase: '1. Khám phá đường chân trời',
          teacherAct: 'Chiếu ảnh con đường làng chạy dài về phía rặng núi. Đố học sinh: Con đường càng đi xa thì trông rộng ra hay hẹp lại?',
          studentAct: 'Quan sát và trả lời: "Dạ thưa Thầy, con đường càng về xa càng hẹp lại thành một điểm ạ!"'
        },
        {
          phase: '2. Kiến tạo kỹ năng',
          teacherAct: 'Thầy thị phạm trên bảng: Kẻ đường chân trời ngang tầm mắt, vẽ hàng cây bên đường với cây gần to đậm, cây xa nhỏ mờ dần.',
          studentAct: 'Nắm được công thức: Gần To - Xa Nhỏ; Gần Rõ - Xa Mờ.'
        },
        {
          phase: '3. Thực hành',
          teacherAct: 'Bé vẽ bức tranh phong cảnh nơi em đang sống hoặc một miền quê em yêu thích.',
          studentAct: 'Vẽ cánh đồng lúa chín vàng với con mương uốn lượn có chiều sâu không gian.'
        }
      ]
    },

    powerpointSlides: [
      {
        slideNumber: 1,
        title: 'BÀI 3: PHONG CẢNH QUÊ HƯƠNG & LUẬT XA GẦN',
        subtitle: 'Mĩ thuật Lớp 4 • Bộ sách Kết nối tri thức với cuộc sống',
        teacherLecture: 'Chào các bạn lớp 4! Đây là bài học then chốt giúp các con bước lên một tầm cao mới trong hội họa: Bí quyết biến trang giấy 2D phẳng lì thành không gian 3D sống động như đang đứng giữa cánh đồng quê hương!',
        bullets: ['Khám phá Đường chân trời (Eye Level)', 'Quy luật Gần To - Xa Nhỏ', 'Vẽ phong cảnh làng quê Việt Nam thanh bình'],
        badge: '🌾 Bức tranh quê hương'
      },
      {
        slideNumber: 2,
        title: '1. LUẬT XA GẦN LÀ GÌ?',
        subtitle: 'Đôi mắt chúng ta nhìn thế giới như thế nào?',
        teacherLecture: 'Con hãy ghi nhớ quy tắc vàng này của Thầy: Vật ở gần mắt chúng ta thì thấy to, rõ nét từng chiếc lá. Còn vật ở xa tít tắp thì thu nhỏ lại, mờ nhạt dần và hòa vào màu sương khói của bầu trời!',
        bullets: ['Ở GẦN: Hình to, nét đậm, màu sắc tương phản rõ ràng', 'Ở XA: Hình thu nhỏ, nét thanh mờ, màu nhạt dần', 'ĐIỂM TỤ: Nơi các đường thẳng gặp nhau ở đường chân trời'],
        badge: '🔭 Quy tắc phối cảnh'
      },
      {
        slideNumber: 3,
        title: '2. CÁC BƯỚC DỰNG TRANH PHONG CẢNH',
        subtitle: 'Từ khung hình đến tác phẩm nghệ thuật',
        teacherLecture: 'Bước 1: Đặt bút kẻ nhẹ đường chân trời ngang trang giấy. Bước 2: Vẽ con đường làng hẹp dần về điểm tụ. Bước 3: Dựng ngôi nhà mái ngói và rặng núi mờ phía chân trời. Bước 4: Lên màu cánh đồng lúa vàng óng ả!',
        bullets: ['Bước 1: Xác định đường chân trời (1/3 tranh)', 'Bước 2: Phác mảng chính (con đường, cánh đồng)', 'Bước 3: Dựng mảng phụ (hàng cây, núi xa)', 'Bước 4: Đổ bóng và tạo ánh hoàng hôn'],
        badge: '🖼️ Tác phẩm hoàn hảo'
      }
    ]
  },

  // ==========================================
  // LỚP 5 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
  // ==========================================
  {
    id: 'kntt_g5_c1',
    grade: 5,
    gradeLabel: 'Lớp 5',
    bookSeries: 'Kết nối tri thức với cuộc sống',
    unitNumber: 'Chủ đề 4',
    title: 'Khám Phá Di Sản Mĩ Thuật & Đại Danh Họa',
    duration: '4 tiết',
    icon: '🏛️',
    tag: 'Di Sản Văn Hóa & Lịch Sử Nghệ Thuật',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    summary: 'Tìm hiểu tranh dân gian Đông Hồ, Hàng Trống và trường phái Ấn tượng thế giới (Vincent van Gogh) theo chương trình SGK Mĩ thuật 5 Kết nối tri thức.',
    
    wordLessonPlan: {
      title: 'KẾ HOẠCH BÀI DẠY MĨ THUẬT LỚP 5',
      unit: 'Chủ đề 4: KHÁM PHÁ DI SẢN MĨ THUẬT (Bài: Tranh dân gian và Danh họa thế giới)',
      book: 'Bộ sách: Kết nối tri thức với cuộc sống - NXB Giáo dục Việt Nam',
      objectives: [
        'Hiểu được giá trị lịch sử của tranh dân gian Việt Nam (Đông Hồ: Gà đại cát, Lợn âm dương).',
        'Làm quen với kỹ thuật chấm vệt cọ xoáy biểu cảm của danh họa Vincent van Gogh.',
        'Ý thức giữ gìn, bảo tồn bản sắc văn hóa dân tộc và hòa nhập với nghệ thuật nhân loại.'
      ],
      preparations: {
        teacher: 'Bản in tranh dân gian Đông Hồ trên giấy điệp, tranh "Đêm đầy sao" của Van Gogh, video nghệ thuật in khắc gỗ.',
        students: 'Màu nước, giấy dó hoặc giấy sần tạo chất cảm, cọ vẽ đầu dẹp.'
      },
      activities: [
        {
          phase: '1. Khởi động và thưởng thức',
          teacherAct: 'Cho học sinh sờ thử bề mặt giấy điệp óng ánh vỏ sò của tranh Đông Hồ.',
          studentAct: 'Thích thú cảm nhận chất liệu tự nhiên của cha ông truyền lại.'
        },
        {
          phase: '2. So sánh và học tập',
          teacherAct: 'So sánh nét viền đen dứt khoát của tranh Đông Hồ với vệt màu cuồn cuộn giàu năng lượng của Van Gogh.',
          studentAct: 'Nhận xét: "Tranh Đông Hồ mộc mạc gần gũi, còn tranh Van Gogh nhìn vào thấy như bầu trời đang chuyển động thần kỳ ạ!"'
        },
        {
          phase: '3. Thực hành sáng tạo',
          teacherAct: 'Thử thách: Vẽ lại bầu trời đêm quê hương em bằng kỹ thuật vệt cọ xoáy ma thuật.',
          studentAct: 'Dùng cọ quệt các vệt màu vàng, xanh đậm xoay tròn tạo ánh sáng lung linh của trăng sao.'
        }
      ]
    },

    powerpointSlides: [
      {
        slideNumber: 1,
        title: 'BÀI 4: DI SẢN MĨ THUẬT & DANH HỌA THẾ GIỚI',
        subtitle: 'Mĩ thuật Lớp 5 • Bộ sách Kết nối tri thức với cuộc sống',
        teacherLecture: 'Chào các anh chị lớn lớp 5! Ở năm học cuối cấp Tiểu học này, Thầy trò mình sẽ cùng bước vào kho tàng Di sản nghệ thuật vĩ đại: Từ nét khắc gỗ tranh dân gian Đông Hồ của cha ông đến bầu trời xoáy sao huyền thoại của danh họa Van Gốc!',
        bullets: ['Tìm hiểu tranh dân gian Đông Hồ & Hàng Trống', 'Khám phá bí mật bức tranh Đêm Đầy Sao', 'Sáng tạo tác phẩm mang dấu ấn nghệ thuật cá nhân'],
        badge: '🏛️ Kho báu di sản'
      },
      {
        slideNumber: 2,
        title: '1. TRANH DÂN GIAN ĐÔNG HỒ: HỒN DÂN TỘC VIỆT',
        subtitle: 'Màu sắc từ thiên nhiên đất mẹ',
        teacherLecture: 'Con có biết: Màu trắng của tranh Đông Hồ làm từ vỏ sò điệp nghiền mịn óng ánh, màu đen từ than lá tre, màu vàng từ hoa hòe! Nét vẽ viền đen khỏe khoắn thể hiện ước mong ấm no, hạnh phúc.',
        bullets: ['Chất liệu: Giấy điệp óng ánh vỏ sò', 'Màu sắc: 100% từ cỏ cây, khoáng vật tự nhiên', 'Tác phẩm tiêu biểu: Đám cưới chuột, Lợn âm dương, Gà đại cát'],
        badge: '🇻🇳 Bản sắc dân tộc'
      },
      {
        slideNumber: 3,
        title: '2. MA THUẬT VỆT CỌ XOÁY CỦA VAN GỐC',
        subtitle: 'Trường phái Ấn tượng & Biểu cảm',
        teacherLecture: 'Danh họa Van Gốc không pha nhuyễn màu trên bảng vẽ, mà bác ấy đặt trực tiếp từng vệt màu nguyên chất cạnh nhau trên toan. Khi con lùi xa ngắm, đôi mắt sẽ tự hòa trộn các vệt màu lại, tạo cảm giác bầu trời đêm đang cuồn cuộn chuyển động!',
        bullets: ['Vệt cọ ngắn, dứt khoát, xếp cạnh nhau nhịp nhàng', 'Vầng trăng và các ngôi sao xoay tít như lốc xoáy ánh sáng', 'Biểu đạt cảm xúc mãnh liệt và tình yêu thiên nhiên vô tận'],
        badge: '✨ Bầu trời xoáy sao'
      }
    ]
  }
];
