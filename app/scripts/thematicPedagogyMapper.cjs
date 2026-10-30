// Thematic Pedagogy Mapper for SGK Kết Nối Tri Thức (45 Units, Grades 1-5)
// Tailors VISUAL ARTWORK and INTERDISCIPLINARY INTEGRATIONS to the exact theme of each lesson.

function getUnitThemeKey(u) {
  const t = (u.title || '').toLowerCase();
  const grade = u.grade || 1;
  const num = u.unitNum || 1;

  if (t.includes('giao thông')) return 'traffic_safety';
  if (t.includes('đình làng')) return 'communal_house';
  if (t.includes('anh hùng dân tộc')) return 'national_hero';
  if (t.includes('dân gian') || t.includes('đông hồ')) return 'folk_art';
  if (t.includes('thổ cẩm') || t.includes('trang phục') || t.includes('dân tộc')) return 'ethnic_patterns';
  if (t.includes('hoa quả') || t.includes('hoa, quả') || t.includes('quả')) return 'fruits';
  if (t.includes('bữa cơm') || t.includes('sinh hoạt trong gia đình') || (t === 'gia đình' && grade === 5)) return 'family_meal';
  if (t.includes('người thân') || t.includes('chân dung')) return 'family_portrait';
  if (t.includes('gương mặt')) return 'portrait_face';
  if (t.includes('thầy cô') || t.includes('biết ơn thầy cô')) return 'teachers_day';
  if (t.includes('mái trường') || t.includes('trường em') || t.includes('học sinh lớp 1')) return 'school_life';
  if (t.includes('đồ chơi') || t.includes('con vật')) return 'recycled_toy_animals';
  if (t.includes('môi trường') || t.includes('xanh')) return 'environment_green';
  if (t.includes('hoà bình') || t.includes('hòa bình')) return 'peace_world';
  if (t.includes('bình dị mà cao quý') || t.includes('việc làm')) return 'noble_deeds';
  if (t.includes('việt nam đất nước') || t.includes('quê hương') || t.includes('cảnh đẹp') || t.includes('cảnh sắc') || t.includes('cảnh vật')) return 'landscape_homeland';
  if (t.includes('chấm màu') || t.includes('chấm')) return 'dots_ladybug';
  if (t.includes('nét')) return 'lines_rhythm';
  if (t.includes('hình cơ bản') || t.includes('kết hợp của các hình')) return 'geometric_house';
  if (t.includes('màu cơ bản') || t.includes('mảng màu') || t.includes('sắc màu') || t.includes('màu sắc')) return 'color_wheel';
  if (t.includes('khối')) return 'geometric_3d_forms';
  if (t.includes('vật liệu')) return 'art_materials';
  
  return 'art_supplies';
}

function getUnitSpecificIntegrations(u) {
  const theme = getUnitThemeKey(u);
  const title = u.title;

  switch (theme) {
    case 'traffic_safety':
      return [
        {
          id: 'law_safety',
          badge: '🚦 An Toàn Giao Thông',
          name: 'Giáo Dục Pháp Luật & Kĩ Năng Tham Gia Giao Thông',
          detail: 'Nhận biết ý nghĩa hệ thống đèn tín hiệu giao thông (Đỏ dừng lại, Vàng đi chậm, Xanh được đi); quy tắc bắt buộc đội mũ bảo hiểm khi ngồi trên xe máy; luôn đi bộ trên vỉa hè và chỉ qua đường tại vạch kẻ ngựa vằn.'
        },
        {
          id: 'math',
          badge: '📐 Toán Học Thực Tiễn',
          name: 'Tích Hợp Toán Học (Hình Học Biển Báo)',
          detail: 'Nhận diện hình dạng đặc trưng của biển báo: Hình tròn viền đỏ (Biển cấm), Hình tam giác viền vàng (Biển nguy hiểm), Hình chữ nhật màu xanh (Biển chỉ dẫn); ứng dụng các đường thẳng song song trong vạch kẻ đường.'
        },
        {
          id: 'vietnamese',
          badge: '📖 Tiếng Việt & Truyền Thông',
          name: 'Tích Hợp Tiếng Việt (Khẩu Hiệu Tuyên Truyền)',
          detail: 'Rèn luyện kĩ năng đọc hiểu các biển báo giao thông; thực hành viết và trình bày khẩu hiệu tuyên truyền ngắn gọn: "An toàn giao thông là hạnh phúc của mọi nhà", "Đội mũ bảo hiểm bảo vệ chính mình".'
        }
      ];

    case 'communal_house':
      return [
        {
          id: 'history_heritage',
          badge: '🏛️ Lịch Sử & Di Sản',
          name: 'Lịch Sử & Không Gian Văn Hóa Đình Làng Việt Nam',
          detail: 'Tìm hiểu kiến trúc đình làng truyền thống Bắc Bộ thế kỉ 16-18; khám phá nghệ thuật điêu khắc gỗ dân gian qua các mảng chạm khắc rồng, tiên cưỡi rồng, cảnh hội làng chèo thuyền múa võ đầy tự hào của cha ông.'
        },
        {
          id: 'local_preservation',
          badge: '🌍 Giáo Dục Địa Phương',
          name: 'Tự Hào & Bảo Tồn Di Tích Lịch Sử Quê Hương',
          detail: 'Nâng cao ý thức trân trọng, không viết vẽ bậy lên di tích cổ; tích cực tham gia các hoạt động quét dọn, bảo vệ cảnh quan không gian cây đa, bến nước, sân đình tại địa phương.'
        },
        {
          id: 'math_spatial',
          badge: '📐 Toán Học & Tỉ Lệ',
          name: 'Toán Học (Tỉ Lệ Điêu Khắc & Tính Đối Xứng)',
          detail: 'Quan sát tính chất đối xứng của kiến trúc mái đình cong 4 góc; phân tích tỉ lệ chạm khắc nổi - chìm và tạo khối không gian đa chiều trong nghệ thuật phù điêu cổ.'
        }
      ];

    case 'folk_art':
      return [
        {
          id: 'history_craft',
          badge: '🏮 Lịch Sử & Làng Nghề',
          name: 'Lịch Sử Làng Nghề Tranh Khắc Gỗ Dân Gian',
          detail: 'Tìm hiểu cái nôi của hai dòng tranh dân gian lớn: Tranh Đông Hồ (Bắc Ninh) và Tranh Hàng Trống (Hà Nội); cảm nhận nét văn hóa chúc tụng độc đáo trong dịp Tết cổ truyền dân tộc (Đại cát, Vinh hoa, Phú quý).'
        },
        {
          id: 'science_materials',
          badge: '🌿 Khoa Học Tự Nhiên',
          name: 'Khoa Học Về Màu Sắc Thuần Khiết Tự Nhiên',
          detail: 'Khám phá bí quyết pha chế màu vẽ thủ công từ thiên nhiên của nghệ nhân xưa: màu đen từ than lá tre, màu trắng từ vỏ điệp sò biển giã nhỏ, màu vàng từ hoa dành dành/hoa hòe, màu đỏ từ sỏi son.'
        },
        {
          id: 'vietnamese',
          badge: '📖 Tiếng Việt & Văn Học',
          name: 'Kể Chuyện Dân Gian Qua Hình Tượng Tranh',
          detail: 'Rèn luyện năng lực ngôn ngữ thông qua việc kể lại các điển tích, ngụ ngôn dân gian gửi gắm trong tranh (Đám cưới chuột, Thầy đồ cóc, Chú bé chăn trâu thả diều).'
        }
      ];

    case 'ethnic_patterns':
      return [
        {
          id: 'society_geography',
          badge: '🏔️ Địa Lí & Bản Sắc',
          name: 'Tìm Hiểu Bản Sắc Văn Hóa Các Dân Tộc Việt Nam',
          detail: 'Khám phá sắc màu trang phục độc đáo của đồng bào các dân tộc thiểu số vùng Tây Bắc (H’Mông, Dao, Thái) và Tây Nguyên (Ba Na, Ê Đê); ý thức tôn trọng sự đa dạng văn hóa của 54 dân tộc anh em.'
        },
        {
          id: 'math_symmetry',
          badge: '📐 Toán Học Hình Học',
          name: 'Toán Học (Hoa Văn Đối Xứng & Quy Luật Nhịp Điệu)',
          detail: 'Nhận diện các họa tiết hình quả trám, hình sao 8 cánh, đường dích dắc đối xứng trục và quy luật lặp lại theo nhịp điệu trên dải diềm thổ cẩm truyền thống.'
        },
        {
          id: 'craft_skills',
          badge: '🧵 Kĩ Thuật & Kéo Tay',
          name: 'Kĩ Năng Thủ Công Mỹ Nghệ Truyền Thống',
          detail: 'Trân trọng bàn tay tài hoa của các nghệ nhân dệt thổ cẩm, nhuộm chàm, thêu hoa văn thủ công tinh tế.'
        }
      ];

    case 'fruits':
      return [
        {
          id: 'health_nutrition',
          badge: '🍎 Tự Nhiên & Xã Hội',
          name: 'Sức Khỏe & Giá Trị Dinh Dưỡng Của Hoa Quả',
          detail: 'Nhận biết các loại quả nhiệt đới quen thuộc (dưa hấu, chuối, cam, táo, xoài) giàu vitamin A, C giúp tăng cường hệ miễn dịch, làm sáng mắt và giúp cơ thể khỏe mạnh mỗi ngày.'
        },
        {
          id: 'life_safety',
          badge: '🧼 Kĩ Năng Sống',
          name: 'Vệ Sinh An Toàn Thực Phẩm Khi Dùng Quả',
          detail: 'Rèn luyện thói quen rửa hoa quả sạch sẽ dưới vòi nước chảy trước khi ăn; biết nhờ người lớn gọt vỏ an toàn; bỏ hạt và vỏ quả vào đúng thùng rác bảo vệ môi trường.'
        },
        {
          id: 'math_compare',
          badge: '📐 Toán Học So Sánh',
          name: 'Toán Học (Khối Cầu & So Sánh Kích Thước)',
          detail: 'Nhận diện hình khối cầu, khối trụ cong của quả; thực hành so sánh quả to - quả nhỏ, phân loại quả theo màu sắc và đếm số lượng quả trên đĩa.'
        }
      ];

    case 'family_meal':
    case 'family_portrait':
      return [
        {
          id: 'ethics_family',
          badge: '❤️ Đạo Đức & Tình Cảm',
          name: 'Giáo Dục Tình Cảm Gia Đình & Lòng Hiếu Thảo',
          detail: 'Cảm nhận sự ấm áp, gắn kết thiêng liêng của các thành viên sum vầy bên mâm cơm gia đình; bồi dưỡng lòng biết ơn công lao sinh thành dưỡng dục của ông bà, cha mẹ.'
        },
        {
          id: 'life_manners',
          badge: '🍲 Kĩ Năng Sống',
          name: 'Văn Hóa Ứng Xử Trong Bữa Cơm Người Việt',
          detail: 'Học tập nền nếp ăn uống gia đình: biết phụ giúp bố mẹ dọn mâm bát, mời người lớn trước khi ăn, nhường nhịn thức ăn ngon cho em nhỏ, không làm vương vãi cơm.'
        },
        {
          id: 'vietnamese',
          badge: '📖 Tiếng Việt',
          name: 'Kể Chuyện Về Những Kỉ Niệm Đẹp Bên Gia Đình',
          detail: 'Rèn kĩ năng diễn đạt cảm xúc qua lời nói, tự tin chia sẻ trước lớp câu chuyện về một bữa cơm đoàn tụ hoặc một món ăn mẹ nấu mà con yêu thích nhất.'
        }
      ];

    case 'teachers_day':
    case 'school_life':
      return [
        {
          id: 'ethics_respect',
          badge: '🌺 Đạo Đức & Truyền Thống',
          name: 'Truyền Thống Tôn Sư Trọng Đạo Của Dân Tộc',
          detail: 'Giáo dục lòng kính trọng, biết ơn sâu sắc đối với thầy cô giáo nhân ngày Nhà giáo Việt Nam 20/11; rèn luyện tinh thần chăm ngoan, học giỏi để đền đáp công ơn thầy cô.'
        },
        {
          id: 'music_emotion',
          badge: '🎵 Âm Nhạc Gắn Kết',
          name: 'Hòa Cùng Giai Điệu Bài Hát Tri Ân Thầy Cô',
          detail: 'Lồng ghép cảm xúc qua các giai điệu ca khúc thiếu nhi quen thuộc: "Bụi phấn", "Khi tóc thầy bạc trắng", "Em yêu trường em" để truyền cảm hứng vẽ tranh.'
        },
        {
          id: 'vietnamese',
          badge: '✉️ Tiếng Việt Ứng Dụng',
          name: 'Tự Tay Viết Lời Tri Ân Gửi Tặng Thầy Cô',
          detail: 'Thực hành làm thiệp chúc mừng, tự tay viết những câu văn nắn nót, lễ phép và giàu tình cảm gửi tặng thầy cô thân yêu.'
        }
      ];

    case 'recycled_toy_animals':
      return [
        {
          id: 'eco_recycling',
          badge: '♻️ Bảo Vệ Môi Trường',
          name: 'Hành Động Xanh - Tái Chế Phế Liệu Làm Đồ Chơi',
          detail: 'Tận dụng các đồ dùng bỏ đi trong sinh hoạt (nắp chai nhựa, vỏ hộp sữa, cốc giấy, lõi giấy vệ sinh) để sáng tạo thành những món đồ chơi con vật ngộ nghĩnh, giảm thiểu rác thải nhựa.'
        },
        {
          id: 'animal_care',
          badge: '🐾 Tự Nhiên & Xã Hội',
          name: 'Tìm Hiểu & Bảo Vệ Động Vật Trong Tự Nhiên',
          detail: 'Khám phá đặc điểm hình thể của các loài vật (chú voi có vòi dài, chú rùa có mai cứng, chim cánh cụt); hình thành tình yêu thương và ý thức bảo vệ động vật.'
        },
        {
          id: 'stem_assembly',
          badge: '💡 STEM Tạo Hình',
          name: 'STEM (Lắp Ghép Kết Cấu Chịu Lực & Cân Bằng)',
          detail: 'Khám phá cách gắn kết các bộ phận bằng keo, băng dính hoặc khớp cài sao cho mô hình con vật có thể đứng vững trên mặt bàn phẳng.'
        }
      ];

    case 'environment_green':
      return [
        {
          id: 'earth_care',
          badge: '🌍 Giáo Dục Môi Trường',
          name: 'Hành Động Bảo Vệ Hành Tinh Xanh & Nguồn Nước',
          detail: 'Nhận thức sâu sắc về tác hại của túi nilon, rác thải nhựa và biến đổi khí hậu; hành động thiết thực ngay tại trường học: trồng và chăm sóc cây xanh, tắt điện khi ra khỏi phòng, khóa vòi nước sau khi dùng.'
        },
        {
          id: 'science_climate',
          badge: '🔬 Khoa Học Tự Nhiên',
          name: 'Vai Trò Lá Phổi Xanh Của Rừng & Cây Cối',
          detail: 'Tìm hiểu chu trình quang hợp của cây xanh hút khí CO2 độc hại và nhả khí Oxy nuôi sống sự sống trên Trái Đất; bảo vệ rừng ngập mặn và rừng đầu nguồn.'
        },
        {
          id: 'propaganda_slogan',
          badge: '📢 Tiếng Việt Cổ Động',
          name: 'Sáng Tác Khẩu Hiệu Tranh Cổ Động Môi Trường',
          detail: 'Rèn luyện kĩ năng viết khẩu hiệu cổ động ấn tượng: "Mỗi cây xanh - Một niềm hy vọng", "Nói không với rác thải nhựa dùng một lần".'
        }
      ];

    case 'national_hero':
      return [
        {
          id: 'heroic_history',
          badge: '⚔️ Lịch Sử Dựng Nước',
          name: 'Lịch Sử Chống Ngoại Xâm Hào Hùng Của Dân Tộc',
          detail: 'Ôn lại những chiến công hiển hách của các anh hùng dân tộc: Thánh Gióng dẹp giặc Ân, Hai Bà Trưng phất cờ khởi nghĩa, Ngô Quyền đại thắng Bạch Đằng Giang, Bác Hồ kính yêu tìm đường cứu nước.'
        },
        {
          id: 'patriotism',
          badge: '🇻🇳 Đạo Đức & Tình Yêu Nước',
          name: 'Bồi Dưỡng Lòng Tự Hào & Ý Thức Trách Nhiệm',
          detail: 'Khơi dậy lòng tự hào về dòng máu Lạc Hồng, lòng biết ơn vô hạn đối với các anh hùng liệt sĩ đã ngã xuống vì độc lập tự do; noi gương học tập và rèn luyện tốt.'
        },
        {
          id: 'monumental_art',
          badge: '🗿 Điêu Khắc Tượng Đài',
          name: 'Khám Phá Nghệ Thuật Tượng Đài & Điêu Khắc Lịch Sử',
          detail: 'Phân tích cách tạo dáng dũng mãnh, khí phách oai phong của tượng đài anh hùng dân tộc trong không gian quảng trường và các di tích lịch sử.'
        }
      ];

    case 'peace_world':
      return [
        {
          id: 'human_rights',
          badge: '🕊️ Quyền Con Người & Trẻ Em',
          name: 'Quyền Được Sống Trong Hòa Bình Của Trẻ Em',
          detail: 'Khẳng định giá trị thiêng liêng của Hòa bình, Hữu nghị và Hợp tác quốc tế; mọi trẻ em trên Trái Đất đều có quyền được bảo vệ an toàn, không bị chiến tranh đe dọa.'
        },
        {
          id: 'global_music',
          badge: '🎵 Âm Nhạc Hòa Bình',
          name: 'Hòa Vang Tiếng Hát Đoàn Kết Năm Châu',
          detail: 'Giai điệu các ca khúc hòa bình: "Trái đất này là của chúng mình", "Tiếng chuông và ngọn cờ", "Heal the World" tiếp thêm niềm tin về một thế giới không có xung đột.'
        },
        {
          id: 'geography_world',
          badge: '🌐 Địa Lí & Tình Hữu Nghị',
          name: 'Đoàn Kết Trẻ Em Năm Châu Các Màu Da',
          detail: 'Hình ảnh thiếu nhi các châu lục (châu Á, Âu, Phi, Mỹ, Đại Dương) nắm chặt tay nhau vòng quanh Trái Đất cùng chung ước mơ tươi sáng.'
        }
      ];

    case 'dots_ladybug':
      return [
        {
          id: 'nature_insects',
          badge: '🐞 Tự Nhiên & Xã Hội',
          name: 'Khám Phá Tập Tính Loài Bọ Rùa Trong Thiên Nhiên',
          detail: 'Quan sát cấu tạo cơ thể chú bọ cánh cam với đôi cánh đỏ chấm tròn đen nhánh; ích lợi của bọ rùa trong việc bắt sâu bọ có hại bảo vệ hoa màu tươi tốt.'
        },
        {
          id: 'math_counting',
          badge: '📐 Toán Học Đếm & Kích Thước',
          name: 'Toán Học (Đếm Số Chấm & So Sánh To Nhỏ)',
          detail: 'Thực hành đếm số lượng chấm tròn trên mỗi cánh; nhận biết và phân biệt chấm tròn to, chấm tròn nhỏ, chấm mau (dày) và chấm thưa để tạo hiệu ứng đậm nhạt.'
        }
      ];

    case 'lines_rhythm':
      return [
        {
          id: 'math_lines',
          badge: '📐 Toán Học (Các Dạng Đường Nét)',
          name: 'Nhận Diện Nét Thẳng, Nét Cong, Nét Gấp Khúc',
          detail: 'Tích hợp nhận biết các dạng hình học cơ bản trong môn Toán lớp 1-2: Đường thẳng đứng, đường nằm ngang, đường xiên, đường cong lượn sóng và đường gấp khúc zíc zắc.'
        },
        {
          id: 'music_rhythm',
          badge: '🎵 Âm Nhạc & Tiết Tấu',
          name: 'Cảm Nhận Nhịp Điệu Của Đường Nét',
          detail: 'Nghe giai điệu bài hát "Con thuyền giấy", hòa mình theo nhịp sóng biển nhấp nhô để đưa nét bút vẽ lượn sóng mềm mại, uyển chuyển.'
        }
      ];

    case 'geometric_house':
      return [
        {
          id: 'math_shapes',
          badge: '📐 Toán Học Hình Học',
          name: 'Nhận Biết Hình Vuông, Tròn, Tam Giác, Chữ Nhật',
          detail: 'Phân tích các đồ vật xung quanh thành các hình học cơ bản: Mái nhà là hình tam giác, thân nhà hình chữ nhật, cửa sổ hình vuông, ông mặt trời hình tròn; rèn kĩ năng đếm cạnh và góc.'
        },
        {
          id: 'vietnamese_story',
          badge: '📖 Tiếng Việt Kể Chuyện',
          name: 'Kể Câu Chuyện "Ngôi Nhà Mơ Ước Của Em"',
          detail: 'Giới thiệu về ngôi nhà mơ ước, rèn luyện cách sử dụng từ ngữ miêu tả màu sắc tươi vui và không gian xanh xung quanh nhà.'
        }
      ];

    case 'color_wheel':
      return [
        {
          id: 'stem_color_mixing',
          badge: '💡 STEM / Khoa Học Quang Học',
          name: 'Thí Nghiệm Pha Trộn Màu Sắc (Khoa Học Tự Nhiên)',
          detail: 'Khám phá bí mật quang học diệu kì từ 3 màu gốc: Đỏ pha Vàng ra màu Cam ấm áp; Vàng pha Lam ra Xanh lục tươi mát; Lam pha Đỏ ra Tím mộng mơ.'
        },
        {
          id: 'nature_rainbow',
          badge: '🌈 Tự Nhiên & Xã Hội',
          name: 'Hiện Tượng Cầu Vồng 7 Sắc Sau Mưa',
          detail: 'Tìm hiểu nguyên nhân xuất hiện cầu vồng khi ánh nắng mặt trời chiếu qua những hạt nước li ti trong không khí sau cơn mưa rào.'
        }
      ];

    case 'geometric_3d_forms':
      return [
        {
          id: 'math_solid_geometry',
          badge: '📦 Toán Học Hình Học Không Gian',
          name: 'Nhận Biết Khối Lập Phương, Khối Hộp, Khối Cầu, Khối Trụ',
          detail: 'Tích hợp nhận diện các khối hình học không gian trong chương trình Toán tiểu học; phân biệt mặt phẳng 2D và vật thể 3D có chiều cao, chiều rộng và chiều sâu.'
        },
        {
          id: 'heritage_cakes',
          badge: '🌾 Lịch Sử & Sự Tích',
          name: 'Sự Tích Bánh Chưng Khối Vuông - Bánh Giầy Khối Cầu',
          detail: 'Nhắc lại sự tích chàng Lang Liêu hiếu thảo làm bánh chưng tượng trưng cho Đất vuông và bánh giầy tượng trưng cho Trời tròn dâng vua Hùng.'
        }
      ];

    case 'portrait_face':
      return [
        {
          id: 'sel_self_awareness',
          badge: '🪞 Tự Nhận Thức Bản Thân (SEL)',
          name: 'Tôn Trọng Sự Khác Biệt & Cảm Xúc Bản Thân',
          detail: 'Học sinh nhận thức nét đặc trưng trên gương mặt mình và các bạn (mắt tròn, mũi cao, má lúm đồng tiền); học cách biểu đạt và chia sẻ cảm xúc vui, buồn, ngạc nhiên, tự tin.'
        },
        {
          id: 'science_senses',
          badge: '🔬 Khoa Học & Giác Quan',
          name: 'Cấu Tạo & Chức Năng Các Giác Quan Trên Khuôn Mặt',
          detail: 'Khám phá các giác quan quan trọng: Đôi mắt tinh anh để ngắm nhìn thế giới, đôi tai lắng nghe âm thanh, chiếc mũi ngửi mùi hương và nụ cười rạng rỡ chào đón mọi người.'
        },
        {
          id: 'vietnamese_portrait',
          badge: '📖 Tiếng Việt & Ngôn Ngữ',
          name: 'Rèn Kĩ Năng Miêu Tả Ngoại Hình Con Người',
          detail: 'Mở rộng vốn từ vựng miêu tả khuôn mặt: "mắt sáng long lanh", "nụ cười tươi như hoa", "mái tóc đen nhánh" để giới thiệu tự họa chân dung trước lớp.'
        }
      ];

    case 'art_materials':
      return [
        {
          id: 'science_materials',
          badge: '🔬 Khoa Học Vật Liệu',
          name: 'Khám Phá Đặc Tính Vật Liệu Tạo Hình',
          detail: 'Khám phá tính chất vật lí: độ dẻo đàn hồi của đất nặn, tính xốp của xốp màu EVA, độ cứng của bìa carton và tính thấm hút của giấy vẽ mĩ thuật.'
        },
        {
          id: 'eco_upcycling',
          badge: '♻️ Tái Chế & Môi Trường',
          name: 'Sáng Tạo Từ Vật Liệu Đã Qua Sử Dụng (Upcycling)',
          detail: 'Tận dụng lá cây khô rụng trong sân trường, nắp chai nhựa, vỏ hộp sữa giấy để sáng tạo tranh ghép nổi 3D, góp phần giảm thiểu rác thải sinh hoạt.'
        },
        {
          id: 'stem_engineering',
          badge: '💡 STEM / Kĩ Thuật Tạo Khối',
          name: 'Kĩ Năng Cắt, Dán, Gấp & Lắp Ghép Chịu Lực',
          detail: 'Thực hành các kĩ thuật thủ công: dùng hồ dán, băng dính xốp, ghép mộng que kem để tạo nên những mô hình khối đứng vững chãi.'
        }
      ];

    case 'noble_deeds':
      return [
        {
          id: 'ethics_compassion',
          badge: '🤝 Đạo Đức & Lòng Nhân Ái',
          name: 'Giáo Dục Lòng Biết Ơn & Tình Yêu Thương Con Người',
          detail: 'Tôn vinh những hành động bình dị: bác bảo vệ dắt tay bé qua đường, cô lao công quét lá sớm mai, chú bộ đội canh giữ biên cương; nuôi dưỡng lối sống vị tha và tinh thần tương thân tương ái.'
        },
        {
          id: 'life_skills',
          badge: '🌱 Kĩ Năng Sống Tích Cực',
          name: 'Hành Động Nhỏ - Ý Nghĩa Lớn (Việc Tốt Mỗi Ngày)',
          detail: 'Khuyến khích học sinh biết nói lời cảm ơn, xin lỗi, nhường ghế xe buýt cho người già, nhặt rác bỏ vào thùng và giúp đỡ bạn bè cùng tiến bộ.'
        },
        {
          id: 'vietnamese_good_deeds',
          badge: '📖 Tiếng Việt & Văn Học',
          name: 'Kể Chuyện Gương Người Tốt Việc Tốt Quanh Em',
          detail: 'Thực hành thuyết trình câu chuyện tranh về một tấm gương người tốt việc tốt mà con đã trực tiếp chứng kiến hoặc tham gia.'
        }
      ];

    case 'landscape_homeland':
      return [
        {
          id: 'geography_vietnam',
          badge: '🌾 Địa Lí Việt Nam',
          name: 'Khám Phá Cảnh Quan Đất Nước Ba Miền',
          detail: 'Tìm hiểu danh lam thắng cảnh tiêu biểu: Ruộng bậc thang Tây Bắc kì vĩ, Cầu Rồng Đà Nẵng lung linh, Chợ nổi miền Tây sông nước; cảm nhận nét đẹp trù phú của thiên nhiên nước ta.'
        },
        {
          id: 'patriotism_heritage',
          badge: '🇻🇳 Tình Yêu Quê Hương',
          name: 'Bồi Đắp Lòng Tự Hào Non Sông Gấm Vóc',
          detail: 'Gắn kết tình yêu gia đình, quê hương xóm làng với lòng tự hào về chủ quyền biển đảo thiêng liêng (Hoàng Sa, Trường Sa) và vẻ đẹp con người Việt Nam hiền hòa mến khách.'
        },
        {
          id: 'eco_landscape',
          badge: '🌲 Môi Trường Sinh Thái',
          name: 'Bảo Vệ Cảnh Quan & Môi Trường Sinh Thái Quê Em',
          detail: 'Tuyên truyền giữ gìn nguồn nước các con sông quê sạch trong, không vứt rác tại các khu di tích lịch sử và danh lam thắng cảnh quê hương.'
        }
      ];

    case 'art_supplies':
    default:
      return [
        {
          id: 'technology_tools',
          badge: '🛠️ Công Nghệ & Thủ Công',
          name: 'Quy Tắc Sử Dụng & Bảo Quản Đồ Dùng Học Vẽ An Toàn',
          detail: `Hướng dẫn sử dụng đồ dùng mĩ thuật đúng cách trong bài "${title}": cầm bút sáp vừa tay, gọt bút chì an toàn, lau cọ sạch sẽ sau khi vẽ, đậy chặt nắp bút màu để tránh bị khô.`
        },
        {
          id: 'hygiene_organization',
          badge: '✨ Vệ Sinh & Tự Phục Vụ',
          name: 'Rèn Luyện Ý Thức Giữ Gìn Bàn Học & Lớp Học Ngăn Nắp',
          detail: 'Tập thói quen trải giấy lót khi vẽ màu nước/đất nặn, gom gọt chì vào thùng rác, thu dọn bàn học sạch sẽ ngay sau khi hoàn thành sản phẩm mĩ thuật.'
        },
        {
          id: 'vietnamese_sharing',
          badge: '📖 Tiếng Việt & Giao Tiếp',
          name: 'Rèn Kĩ Năng Tự Tin Thuyết Trình & Nhận Xét Thẩm Mĩ',
          detail: 'Khuyến khích học sinh tự tin đứng trước lớp giới thiệu ý tưởng bức tranh, dùng lời hay ý đẹp để chúc mừng và động viên bài vẽ của các bạn xung quanh.'
        }
      ];
  }
}

const { getThematicImagePrompts, getThematicActivitiesQA } = require('./thematicQAMapper.cjs');

module.exports = { 
  getUnitThemeKey, 
  getUnitSpecificIntegrations,
  getThematicImagePrompts,
  getThematicActivitiesQA
};
