// Hệ thống Chủ đề Bài học Mĩ thuật Tiểu học (GDPT 2018)
// Giảng dạy bởi: Thầy Giáo Mĩ Thuật (Thầy Cọ Nhí)

export const THEMATIC_CURRICULUM = [
  // --- LỚP 1 ---
  {
    id: 'g1_color_line',
    grade: 1,
    gradeLabel: 'Lớp 1',
    title: 'Thế Giới Màu Sắc & Nét Vẽ Kì Diệu',
    icon: '🌈',
    tag: 'Nét & Màu Cơ Bản',
    color: 'from-pink-400 to-rose-500',
    description: 'Làm quen với 3 màu gốc (Đỏ, Vàng, Lam) và các nét vẽ thẳng, cong, gấp khúc, lượn sóng.',
    theory: 'Ba màu gốc (Đỏ, Vàng, Lam) là các bạn màu "ông bà" có thể sinh ra vô số màu sắc mới! Ví dụ: Đỏ + Vàng = Cam; Vàng + Lam = Xanh Lá; Đỏ + Lam = Tím.',
    mission: 'Bé hãy vẽ một chiếc Cầu Vồng 7 sắc rực rỡ vắt ngang bầu trời mây trắng nhé!',
    initialMessage: 'Thầy chào họa sĩ nhí lớp 1! Hôm nay Thầy sẽ đưa con vào Xứ sở Sắc màu kì diệu. Con có biết tại sao từ 3 màu Đỏ, Vàng, Lam mà chúng mình lại pha được cả cầu vồng không? Hãy hỏi Thầy bất cứ điều gì con tò mò nha!',
    suggestions: [
      'Thầy ơi làm sao pha được màu cam ạ?',
      'Nét gấp khúc vẽ thế nào hả Thầy?',
      'Thầy cho con xem tranh mẫu cầu vồng được không?'
    ],
    samplePrompt: 'cute colorful rainbow with smiling fluffy clouds in sunny blue sky, simple crayon drawing for grade 1'
  },
  {
    id: 'g1_shapes',
    grade: 1,
    gradeLabel: 'Lớp 1',
    title: 'Sáng Tạo Từ Những Hình Khối Cơ Bản',
    icon: '🔺',
    tag: 'Hình Học Cơ Bản',
    color: 'from-amber-400 to-orange-500',
    description: 'Quy mọi vật thể phức tạp quanh em về hình tròn, hình vuông, tam giác và hình chữ nhật.',
    theory: 'Mọi thứ quanh ta đều bắt nguồn từ hình cơ bản: Mặt trời là hình tròn, nóc nhà là tam giác, thân xe là hình chữ nhật!',
    mission: 'Hãy ghép các hình tròn, tam giác, vuông để vẽ nên một chú Rô-bốt tí hon hoặc một ngôi nhà ngộ nghĩnh.',
    initialMessage: 'Thầy đố con: Bạn Mặt Trời mang hình gì? Đúng rồi, hình tròn xoe! Hôm nay chúng mình cùng làm phép biến hình với các khối hình vuông, tròn, tam giác nhé!',
    suggestions: [
      'Làm sao vẽ rô-bốt từ hình vuông hả Thầy?',
      'Con có thể vẽ con cá từ hình tam giác không?',
      'Cho con xem tranh mẫu rô-bốt hình học ạ!'
    ],
    samplePrompt: 'cute cartoon robot made of squares and circles, playful colorful vector art for kids'
  },
  {
    id: 'g1_animals',
    grade: 1,
    gradeLabel: 'Lớp 1',
    title: 'Những Chú Thú Cưng Đáng Yêu',
    icon: '🐱',
    tag: 'Động Vật Nuôi',
    color: 'from-emerald-400 to-teal-500',
    description: 'Quan sát và thể hiện đặc điểm các con vật nuôi quen thuộc: chó con, mèo con, chú gà con.',
    theory: 'Để vẽ con vật sinh động, con hãy chú ý đến đặc điểm riêng: Tai mèo nhọn hình tam giác, tai thỏ dài ngoẵng, đuôi cún ngoe nguẩy.',
    mission: 'Vẽ một chú thú cưng mà em yêu quý nhất đang nằm sưởi nắng hoặc chơi đùa trong sân.',
    initialMessage: 'Nhà con có nuôi bạn cún, bạn mèo hay chú chim nhỏ nào không? Tiết học này Thầy sẽ hướng dẫn con vẽ những người bạn bốn chân đáng yêu nhất!',
    suggestions: [
      'Làm sao vẽ đôi mắt mèo long lanh hả Thầy?',
      'Cách vẽ bộ lông xù của chú cún con?',
      'Thầy cho con xem hình chú mèo sưởi nắng!'
    ],
    samplePrompt: 'cute little puppy playing with a ball in sunny grass yard, sweet children book illustration'
  },

  // --- LỚP 2 ---
  {
    id: 'g2_color_harmonies',
    grade: 2,
    gradeLabel: 'Lớp 2',
    title: 'Giai Điệu Màu Sắc: Nóng & Lạnh',
    icon: '🔥',
    tag: 'Gam Màu Cảm Xúc',
    color: 'from-orange-400 to-red-500',
    description: 'Phân biệt gam màu nóng (tạo cảm giác ấm áp, rực rỡ) và gam màu lạnh (tạo cảm giác mát mẻ, yên bình).',
    theory: 'Gam màu Nóng (Đỏ, Cam, Vàng) như ánh lửa mùa đông. Gam màu Lạnh (Xanh lam, Xanh lục, Tím) như dòng suối mát lành.',
    mission: 'Vẽ bức tranh Mặt Trời (gam màu nóng) hoặc Đêm Trăng đại dương (gam màu lạnh).',
    initialMessage: 'Chào các bạn lớp 2! Hôm nay Thầy sẽ dạy các con cách dùng màu sắc để kể chuyện: Khi nào tranh mang cảm giác ấm áp, khi nào mang cảm giác mát lạnh trong veo nhé!',
    suggestions: [
      'Gam màu nóng gồm những màu nào hả Thầy?',
      'Con vẽ biển đêm thì nên dùng màu gì?',
      'Cho con xem tranh tương phản nóng lạnh ạ!'
    ],
    samplePrompt: 'contrast split painting of warm sunny day on left and cool starry night on right, children art'
  },
  {
    id: 'g2_family_school',
    grade: 2,
    gradeLabel: 'Lớp 2',
    title: 'Mái Trường Mến Yêu & Thầy Cô',
    icon: '🏫',
    tag: 'Đề Tài Sinh Hoạt',
    color: 'from-sky-400 to-blue-500',
    description: 'Vẽ tranh phong cảnh trường học, sân trường giờ ra chơi, hoặc chân dung thầy cô giáo.',
    theory: 'Bố cục 1/3: Hãy đặt ngôi trường hoặc hàng cây hơi lệch tâm một chút, để lại khoảng trống cho các bạn học sinh nô đùa.',
    mission: 'Vẽ một góc sân trường rực rỡ cờ hoa hoặc khoảnh khắc con cùng các bạn đang vui chơi.',
    initialMessage: 'Mỗi ngày đến trường là một ngày vui! Hôm nay chúng mình cùng vẽ lại ngôi trường thân yêu và ghi lại nụ cười rạng rỡ của bạn bè và thầy cô nhé!',
    suggestions: [
      'Cách vẽ các bạn đang nhảy dây, đá bóng?',
      'Làm sao vẽ cổng trường nổi bật?',
      'Cho con xem tranh giờ ra chơi sân trường!'
    ],
    samplePrompt: 'cheerful primary school playground with children playing during recess, colorful watercolor for grade 2'
  },

  // --- LỚP 3 ---
  {
    id: 'g3_ocean',
    grade: 3,
    gradeLabel: 'Lớp 3',
    title: 'Bầu Trời Bao La & Đại Dương Xanh',
    icon: '🌊',
    tag: 'Không Gian & Sinh Vật',
    color: 'from-blue-500 to-cyan-500',
    description: 'Khám phá thế giới dưới đáy biển sâu với đàn cá tung tăng bơi lội, rạn san hô và rong biển.',
    theory: 'Để tạo độ sâu của nước biển: Phía trên mặt nước dùng màu xanh lam nhạt, càng xuống đáy biển càng chuyển sang xanh đậm và tím thẫm.',
    mission: 'Vẽ một bức tranh thế giới thần tiên dưới đáy biển sâu với cá hề, rùa biển và những rạn san hô lộng lẫy.',
    initialMessage: 'Chào các họa sĩ lớp 3! Con có muốn cùng Thầy lặn xuống đáy đại dương xanh biếc để gặp gỡ các bạn cá heo, rùa biển và san hô bảy màu không nào?',
    suggestions: [
      'Làm sao vẽ nước biển có độ sâu từ sáng đến tối?',
      'Cách vẽ chú rùa biển đang bơi lượn?',
      'Cho con xem mẫu rạn san hô dưới biển ạ!'
    ],
    samplePrompt: 'vibrant underwater ocean scene with colorful coral reef, sea turtles and tropical clownfish, soft lighting, children art'
  },
  {
    id: 'g3_folk_patterns',
    grade: 3,
    gradeLabel: 'Lớp 3',
    title: 'Họa Tiết & Hoa Văn Dân Tộc',
    icon: '🪡',
    tag: 'Nghệ Thuật Truyền Thống',
    color: 'from-purple-500 to-indigo-500',
    description: 'Làm quen với các họa tiết đối xứng, hoa văn thổ cẩm và trang phục truyền thống các dân tộc Việt Nam.',
    theory: 'Quy tắc lặp lại và đối xứng: Vẽ các hình thoi, đường zíc-zắc đan xen nhau đều đặn để tạo thành dải hoa văn trang trí tinh tế.',
    mission: 'Thiết kế một tấm thiệp hoặc một dải băng cài tóc mang họa tiết thổ cẩm Việt Nam.',
    initialMessage: 'Đất nước Việt Nam chúng mình có 54 dân tộc anh em với những bộ trang phục thổ cẩm rực rỡ tuyệt đẹp. Tiết này Thầy sẽ hướng dẫn con vẽ những hoa văn truyền thống nhé!',
    suggestions: [
      'Họa tiết thổ cẩm thường có những hình gì?',
      'Cách vẽ đường zíc-zắc đối xứng đều nhau?',
      'Cho con xem tranh mẫu hoa văn thổ cẩm!'
    ],
    samplePrompt: 'traditional Vietnamese ethnic textile pattern with colorful geometric diamond shapes and flowers, clean folk art'
  },

  // --- LỚP 4 ---
  {
    id: 'g4_landscape_depth',
    grade: 4,
    gradeLabel: 'Lớp 4',
    title: 'Phong Cảnh Quê Hương: Luật Xa Gần',
    icon: '🌾',
    tag: 'Phối Cảnh & Không Gian',
    color: 'from-emerald-500 to-green-600',
    description: 'Khám phá luật xa gần: Vật ở gần thì to, rõ, đậm nét; vật ở xa thì nhỏ, mờ, nhạt màu.',
    theory: 'Đường chân trời (Eye Level): Phân chia ranh giới giữa bầu trời và mặt đất/mặt biển. Càng về gần đường chân trời, mọi vật càng thu nhỏ lại.',
    mission: 'Vẽ bức tranh phong cảnh đồng quê với con đường làng uốn lượn, cánh đồng lúa vàng và rặng núi mờ xa.',
    initialMessage: 'Chào các bạn lớp 4! Đây là giai đoạn các con học kỹ thuật mĩ thuật cao hơn: Luật Xa Gần giúp bức tranh trên mặt phẳng biến thành không gian 3 chiều sống động!',
    suggestions: [
      'Luật xa gần áp dụng thế nào khi vẽ con đường làng hả Thầy?',
      'Làm sao vẽ ngọn núi ở xa trông mờ mờ ảo ảo?',
      'Thầy cho con xem tranh phong cảnh đồng quê có chiều sâu!'
    ],
    samplePrompt: 'peaceful Vietnamese countryside village with winding dirt path, golden rice fields and hazy blue mountains in distance, watercolor'
  },
  {
    id: 'g4_festivals',
    grade: 4,
    gradeLabel: 'Lớp 4',
    title: 'Lễ Hội Truyền Thống Quê Em',
    icon: '🏮',
    tag: 'Văn Hóa Dân Gian',
    color: 'from-red-500 to-rose-600',
    description: 'Vẽ không khí rộn ràng của Lễ hội Trung Thu (rước đèn ông sao, múa lân) hoặc Chợ hoa ngày Tết.',
    theory: 'Nhịp điệu và chuyển động: Thể hiện dáng người đang chạy, nhảy, múa thông qua đường trục cơ thể nghiêng và tay chân vung theo nhịp.',
    mission: 'Vẽ một đêm hội rước đèn Trung Thu với ánh trăng rằm, đầu lân rực rỡ và những chiếc lồng đèn ông sao lấp lánh.',
    initialMessage: 'Tùng rinh rinh, tùng tùng rinh rinh! Không khí lễ hội luôn tràn ngập tiếng cười và sắc màu rực rỡ. Hôm nay chúng mình cùng Thầy vẽ tranh Đề tài Lễ hội nhé!',
    suggestions: [
      'Cách vẽ chú Lân đang nhảy múa thật oai vệ hả Thầy?',
      'Làm sao vẽ ánh sáng lồng đèn tỏa sáng lung linh?',
      'Cho con xem tranh mẫu rước đèn Trung Thu ạ!'
    ],
    samplePrompt: 'joyful Mid-Autumn festival night in Vietnam, children holding star lanterns with colorful lion dance under full moon, vibrant art'
  },

  // --- LỚP 5 ---
  {
    id: 'g5_environment',
    grade: 5,
    gradeLabel: 'Lớp 5',
    title: 'Đại Dương Xanh & Hành Tinh Của Chúng Ta',
    icon: '🌍',
    tag: 'Tranh Cổ Động Môi Trường',
    color: 'from-teal-500 to-emerald-600',
    description: 'Học cách vẽ tranh mang thông điệp tuyên truyền: Bảo vệ biển xanh, trồng cây gây rừng, giảm rác thải nhựa.',
    theory: 'Tranh cổ động cần hình ảnh cô đọng, tương phản mạnh và điểm nhấn trực diện để người xem lập tức hiểu được thông điệp bảo vệ thiên nhiên.',
    mission: 'Vẽ tranh cổ động với thông điệp: "Hãy chung tay bảo vệ ngôi nhà Trái Đất xanh tươi".',
    initialMessage: 'Chào các anh chị lớn lớp 5! Ở cấp học này, mĩ thuật không chỉ để làm đẹp mà còn có sức mạnh truyền tải thông điệp nhân văn đến toàn xã hội. Hãy cùng Thầy vẽ tranh bảo vệ hành tinh xanh!',
    suggestions: [
      'Làm sao vẽ bàn tay nâng niu Trái Đất hả Thầy?',
      'Cách phối màu tạo cảm giác thiên nhiên đang kêu cứu?',
      'Cho em xem tranh mẫu cổ động môi trường!'
    ],
    samplePrompt: 'meaningful poster art of loving hands holding a green blooming Earth, clean ocean and flying birds, vibrant inspiring art for students'
  },
  {
    id: 'g5_masterpiece',
    grade: 5,
    gradeLabel: 'Lớp 5',
    title: 'Khám Phá Cùng Các Danh Họa Thế Giới',
    icon: '🎨',
    tag: 'Trường Phái Hội Họa',
    color: 'from-violet-500 to-purple-600',
    description: 'Làm quen với trường phái Ấn tượng (Impressionism) của Van Gogh và Claude Monet, học kỹ thuật chấm nét cọ tạo chất cảm.',
    theory: 'Trường phái Ấn tượng không vẽ tỉ mỉ từng chi tiết mà dùng các vệt cọ màu nguyên chất đặt cạnh nhau để thể hiện ánh sáng lấp lánh tức thời.',
    mission: 'Lấy cảm hứng từ bức tranh "Đêm Đầy Sao" (Starry Night), vẽ lại bầu trời đêm nơi em sống với các xoáy sao rực rỡ.',
    initialMessage: 'Tiết học hôm nay là chuyến du hành vào thế giới của các Đại danh họa! Thầy sẽ chỉ cho các con bí quyết vẽ những vệt cọ xoáy ma thuật như danh họa Van Gốc nhé!',
    suggestions: [
      'Bác Van Gogh đã dùng kỹ thuật gì để vẽ bầu trời đêm xoáy ốc hả Thầy?',
      'Làm sao để các vệt màu đặt cạnh nhau mà không bị đục?',
      'Cho con xem bức tranh Đêm Đầy Sao và tranh mẫu học sinh!'
    ],
    samplePrompt: 'whimsical starry night sky with swirling glowing golden stars and crescent moon, Van Gogh impressionist style, painted for kids'
  }
];
