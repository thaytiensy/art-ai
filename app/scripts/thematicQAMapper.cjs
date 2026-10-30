// Module providing unit-specific pedagogical Q&A and high-res Pollinations Flux AI Image prompts
// Compliant with GDPT 2018 (Thong tu 32/2018/TT-BGDDT) & Cong van 2345/BGDDT-GDTH

function getThematicImagePrompts(u, theme) {
  const title = u.title;
  let basePrompt = '';
  let keyword = '';

  switch (theme) {
    case 'traffic_safety':
      basePrompt = 'an authentic hand-drawn watercolor and colored pencil illustration of Vietnamese elementary school students wearing safety helmets crossing street at zebra pedestrian crossing, traffic light shining green, smiling traffic police officer directing cars, sunny day in Hanoi, children textbook art style, warm vibrant colors, high detail';
      keyword = 'An Toàn Giao Thông';
      break;
    case 'communal_house':
      basePrompt = 'traditional ancient Vietnamese communal house Dinh Lang fine art watercolor, curved tile roof with soaring roof corners, intricate wooden dragon carving relief, ancient banyan tree by village lotus pond, authentic Vietnamese cultural heritage, warm wood and terracotta tones, textbook illustration';
      keyword = 'Điêu Khắc Đình Làng';
      break;
    case 'folk_art':
      basePrompt = 'authentic traditional Vietnamese Dong Ho folk art woodblock print, depicting joyful children and auspicious animals, vibrant natural colors on textured handmade Do paper, crisp black carved lines, Vietnamese folklore aesthetic';
      keyword = 'Tranh Dân Gian Việt Nam';
      break;
    case 'ethnic_patterns':
      basePrompt = 'traditional Vietnamese ethnic minority brocade textile art Tho Cam, vibrant indigo, ruby red and gold symmetrical geometric diamond patterns and zigzag embroidery, authentic cultural heritage, beautiful textile details';
      keyword = 'Hoa Văn Dân Tộc';
      break;
    case 'fruits':
      basePrompt = 'a delicious vibrant still life painting of tropical Vietnamese fruits, ripe yellow mango, green striped watermelon slice, sweet bananas, dragonfruit, wax crayon and gouache illustration for elementary school art class, colorful textured';
      keyword = 'Hoa Quả Tươi Ngon';
      break;
    case 'family_meal':
      basePrompt = 'heartwarming watercolor painting of a loving three-generation Vietnamese family gathered around a cozy dinner table, warm smiles, bowls of steaming rice and soup, cozy home atmosphere, gentle lighting, children book illustration';
      keyword = 'Bữa Cơm Gia Đình';
      break;
    case 'family_portrait':
    case 'portrait_face':
      basePrompt = 'expressive and charming watercolor portrait of a happy Vietnamese elementary school student with sparkling bright eyes and warm friendly smile, colorful school uniform, soft pastel artistic background, gentle fine art';
      keyword = 'Chân Dung Biểu Cảm';
      break;
    case 'teachers_day':
      basePrompt = 'touching watercolor painting of Vietnamese elementary students joyfully presenting fresh flower bouquets and handmade cards to their beloved teacher on Teachers Day, sunny bright classroom, heartfelt gratitude';
      keyword = 'Biết Ơn Thầy Cô';
      break;
    case 'school_life':
      basePrompt = 'cheerful hand-drawn watercolor illustration of a sunny Vietnamese elementary school yard, students in uniforms playing games under red blooming flamboyant phoenix trees, yellow school building, joyful school day';
      keyword = 'Mái Trường Em Yêu';
      break;
    case 'recycled_toy_animals':
      basePrompt = 'delightful craft art of cute animal toys made from recycled materials, cardboard tube penguin, plastic bottle piglet, egg carton turtle, placed on a colorful school desk, vibrant creative primary school craft';
      keyword = 'Đồ Chơi Sáng Tạo Tái Chế';
      break;
    case 'environment_green':
      basePrompt = 'inspiring watercolor poster of Vietnamese children planting young green trees in a school garden, blue watering can, fluttering butterflies, clean blue sky with bright sun, environmental protection art for kids';
      keyword = 'Môi Trường Xanh Sạch Đẹp';
      break;
    case 'national_hero':
      basePrompt = 'inspirational monumental painting of Vietnamese national hero on horseback in ancient armor with flowing red cape, historical stone fortress under golden dawn sky, heroic monumental fine art for students';
      keyword = 'Hình Tượng Anh Hùng Dân Tộc';
      break;
    case 'peace_world':
      basePrompt = 'beautiful fine art painting of joyful children of diverse cultures holding hands around a glowing planet Earth, a pure white peace dove soaring across a vibrant rainbow sky, message of global peace and friendship';
      keyword = 'Vì Một Thế Giới Hòa Bình';
      break;
    case 'noble_deeds':
      basePrompt = 'heartwarming illustration of good everyday deeds: a smiling Vietnamese elementary student gently holding the hand of an elderly woman helping her cross the street, warm golden sunlight, inspiring moral education art';
      keyword = 'Việc Làm Bình Dị Cao Quý';
      break;
    case 'landscape_homeland':
      basePrompt = 'breathtaking watercolor landscape of peaceful Vietnamese countryside, golden ripe terraced rice fields in Northwest mountains, tranquil river with small wooden boat, bamboo grove, lush nature, peaceful rural beauty';
      keyword = 'Cảnh Sắc Quê Hương';
      break;
    case 'dots_ladybug':
      basePrompt = 'delightful pointillism artwork for children, a bright red ladybug beetle with distinct glossy black round dots resting on a fresh green dewdrop leaf, colorful tiny dot patterns in background, cute gouache art';
      keyword = 'Sáng Tạo Từ Chấm Màu';
      break;
    case 'lines_rhythm':
      basePrompt = 'creative rhythmic children art composition with expressive wavy lines, spiral coils and straight patterns forming rolling ocean waves and a playful paper boat, bright harmonious pastel colors, expressive line art';
      keyword = 'Sự Thú Vị Của Nét';
      break;
    case 'geometric_house':
      basePrompt = 'charming children book watercolor illustration of a dreamy colorful house built from basic geometric shapes: triangle roof, rectangle walls, square windows, smiling yellow circle sun, lush green garden';
      keyword = 'Hình Cơ Bản Tạo Hình';
      break;
    case 'color_wheel':
      basePrompt = 'an artistic watercolor painting showing the magic of primary colors blending into secondary colors, wooden art palette with bright red, yellow, and blue swirling into orange, green, purple, soft magical rainbow glow';
      keyword = 'Sắc Màu Kì Diệu';
      break;
    case 'geometric_3d_forms':
      basePrompt = 'educational artistic illustration of 3D geometric forms: colorful wooden cube, sphere, cylinder, and cone arranged on an artist table with soft shadows, pastel lighting, creative art lesson for kids';
      keyword = 'Vẻ Đẹp Của Khối';
      break;
    case 'art_materials':
      basePrompt = 'creative art supplies on a wooden desk: vibrant multicolored modeling clay, dry autumn leaves, colored EVA foam sheets, safety craft scissors and sketchbook, inspiring art workshop for children';
      keyword = 'Vật Liệu Thực Hành Sáng Tạo';
      break;
    case 'art_supplies':
    default:
      basePrompt = `beautiful hand-drawn artistic children textbook illustration about ${title}, watercolor and colored pencil style on textured paper, harmonious vibrant colors, inspiring and high quality educational art`;
      keyword = title;
      break;
  }

  const encoded = encodeURIComponent(basePrompt);
  const mainImageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=700&height=500&model=flux&nologo=true`;

  const slidePrompts = [
    {
      title: `Khởi động: Cảm hứng về ${keyword}`,
      prompt: basePrompt + ', wide view, warm inviting atmosphere',
      url: `https://image.pollinations.ai/prompt/${encodeURIComponent(basePrompt + ', inspiring opener')}` + '?width=700&height=500&model=flux&nologo=true&seed=11'
    },
    {
      title: `Khám phá chi tiết: Nét đẹp của ${keyword}`,
      prompt: basePrompt + ', close-up macro details, fine art textures',
      url: `https://image.pollinations.ai/prompt/${encodeURIComponent(basePrompt + ', detailed fine art close-up')}` + '?width=700&height=500&model=flux&nologo=true&seed=22'
    },
    {
      title: `Thực hành: Các bước sáng tạo ${keyword}`,
      prompt: basePrompt + ', drawing demonstration step by step, student workspace',
      url: `https://image.pollinations.ai/prompt/${encodeURIComponent(basePrompt + ', student in progress artwork demonstration')}` + '?width=700&height=500&model=flux&nologo=true&seed=33'
    },
    {
      title: `Triển lãm: Góc trưng bày tác phẩm ${keyword}`,
      prompt: basePrompt + ', gallery exhibition display of finished colorful paintings',
      url: `https://image.pollinations.ai/prompt/${encodeURIComponent(basePrompt + ', school art exhibition wall showcase')}` + '?width=700&height=500&model=flux&nologo=true&seed=44'
    },
    {
      title: `Vận dụng: Lan tỏa vẻ đẹp ${keyword} vào đời sống`,
      prompt: basePrompt + ', framed artwork decorating student study desk, beautiful gift',
      url: `https://image.pollinations.ai/prompt/${encodeURIComponent(basePrompt + ', framed artwork placed in cozy modern room')}` + '?width=700&height=500&model=flux&nologo=true&seed=55'
    }
  ];

  return {
    mainPrompt: basePrompt,
    mainImageUrl: mainImageUrl,
    slideImages: slidePrompts
  };
}

function getThematicActivitiesQA(u, theme) {
  const title = u.title;

  switch (theme) {
    case 'traffic_safety':
      return [
        {
          teacherQuestions: [
            'Hằng ngày khi đến trường, con quan sát thấy những phương tiện và tín hiệu giao thông nào trên đường phố?',
            'Khi nhìn thấy đèn tín hiệu giao thông chuyển sang màu đỏ, người tham gia giao thông phải làm gì?'
          ],
          studentAnswers: [
            'Dạ thưa Thầy, con thấy xe máy, ô tô, xe buýt và các cột đèn tín hiệu ở ngã tư đường phố ạ!',
            'Dạ khi đèn đỏ, tất cả phương tiện phải dừng lại ngay ngắn trước vạch dừng sơn trắng ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Quan sát bức tranh mẫu, con thấy biển báo cấm và biển báo nguy hiểm có hình dáng, màu sắc khác nhau như thế nào?',
            'Các bạn nhỏ trong tranh đang đi qua đường ở vị trí nào để đảm bảo an toàn?',
            'Hình ảnh nào là mảng chính tạo điểm nhấn nổi bật nhất trong bức tranh?'
          ],
          studentAnswers: [
            'Dạ thưa Thầy, biển cấm có hình tròn viền đỏ nền trắng, còn biển nguy hiểm có hình tam giác viền đỏ nền vàng ạ!',
            'Dạ các bạn đang đi trên vạch kẻ ngựa vằn màu trắng dành riêng cho người đi bộ qua đường ạ!',
            'Dạ là hình ảnh chú công an giao thông và các bạn nhỏ đội mũ bảo hiểm ở giữa bức tranh ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Để bức tranh giao thông cân đối, con sẽ phác hình ảnh nào trước và đặt ở vị trí nào trên trang giấy?',
            'Con dự định phối những gam màu nào cho xe cộ và người đi đường để bức tranh thật sinh động?'
          ],
          studentAnswers: [
            'Dạ con phác hình bạn nhỏ và phương tiện to ở chính giữa trang giấy trước, sau đó vẽ thêm cây cối, vỉa hè xung quanh ạ!',
            'Dạ con chọn màu vàng, đỏ tươi cho xe cộ, màu áo xanh nổi bật và tô màu đường phố xám nhạt để hình chính nổi bật ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Con hãy chia sẻ thông điệp an toàn giao thông mà bức tranh của con muốn gửi gắm tới mọi người?',
            'Trong các bài vẽ của bạn hôm nay, con ấn tượng nhất với cách thể hiện hoặc phối màu của bài nào?'
          ],
          studentAnswers: [
            'Dạ thông điệp của con là "Đội mũ bảo hiểm bảo vệ chính mình", con vẽ bạn nhỏ ngồi sau xe máy đội mũ ngay ngắn ạ!',
            'Dạ con thích bài của bạn Nam vì bạn vẽ vạch kẻ đường rất thẳng và màu sắc đèn tín hiệu rất tươi sáng ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Sau bài học mĩ thuật này, con sẽ thực hiện văn hóa giao thông an toàn như thế nào khi đi trên đường?',
            'Bức tranh vẽ của con hôm nay có thể dùng vào việc gì để giúp ích cho trường lớp hoặc gia đình?'
          ],
          studentAnswers: [
            'Dạ con luôn nhắc bố mẹ dừng đúng đèn đỏ, luôn đội mũ bảo hiểm và đi bộ sát lề đường bên phải ạ!',
            'Dạ con sẽ mang tranh về dán ở góc học tập và tặng một bức vẽ cho phong trào thi đua an toàn giao thông của trường ạ!'
          ]
        }
      ];

    case 'communal_house':
      return [
        {
          teacherQuestions: [
            'Các con có biết mái đình làng cổ truyền thống Việt Nam thường có hình dáng đặc trưng như thế nào không?',
            'Trên nóc đình và các vì kèo gỗ cổ xưa, ông cha ta thường trang trí chạm khắc những hình tượng gì?'
          ],
          studentAnswers: [
            'Dạ thưa Thầy, mái đình cong vút ở 4 góc như mũi thuyền rẽ sóng rất uy nghiêm và thanh thoát ạ!',
            'Dạ thường chạm khắc hình tượng rồng, phượng, hoa sen, sóng nước và cảnh người dân chèo thuyền đánh vật ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Quan sát bức phù điêu gỗ chạm khắc rồng đình làng, con thấy đường nét đục đẽo có gì đặc biệt?',
            'Hình tượng rồng thời Lê - Nguyễn trên mái đình có tư thế uốn lượn ra sao?',
            'Màu sắc tự nhiên của gỗ cổ và thời gian mang lại cảm xúc thẩm mĩ gì cho tác phẩm?'
          ],
          studentAnswers: [
            'Dạ thưa Thầy, các nghệ nhân đục chạm nét nông nét sâu tạo khối nổi chìm rất sống động như đang chuyển động ạ!',
            'Dạ đầu rồng ngẩng cao uy nghi, râu tóc bay trong gió, thân rồng uốn lượn mềm mại nhấp nhô như sóng nước ạ!',
            'Dạ màu nâu trầm ấm của gỗ cổ kính mang lại cảm giác thiêng liêng, mộc mạc và gắn bó với làng quê ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Khi tạo hình chi tiết chạm khắc đình làng, con cần làm thế nào để thể hiện được nét uyển chuyển của rồng?',
            'Con sẽ phối các tông màu gì để tạo cảm giác chất liệu gỗ cổ kính cho bài vẽ?'
          ],
          studentAnswers: [
            'Dạ con phác trục đường cong của thân rồng trước, sau đó tỉa từng vảy rồng và vòm mây bao quanh ạ!',
            'Dạ con dùng các sắc độ nâu đất, vàng thổ, nâu gụ kết hợp nhấn sáng tối để bức tranh có chiều sâu khối nổi ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Qua tác phẩm của mình và các bạn, con cảm nhận được điều gì về bàn tay tài hoa của nghệ nhân xưa?',
            'Bài vẽ hoặc mô hình nặn nào của bạn trong lớp thể hiện được không gian cổ kính nhất?'
          ],
          studentAnswers: [
            'Dạ con thấy ông cha ta vô cùng khéo léo và sáng tạo, từ khúc gỗ vô tri đã tạo nên những tác phẩm nghệ thuật để đời ạ!',
            'Dạ con thích bài của bạn Minh vì bạn tạo được mái đình cong vút và màu sắc trầm ấm rất giống đình làng quê con ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Chúng mình cần làm gì để giữ gìn và bảo vệ các ngôi đình, ngôi chùa di tích lịch sử của quê hương?',
            'Con có thể giới thiệu vẻ đẹp kiến trúc đình làng Việt Nam cho ai chiêm ngưỡng?'
          ],
          studentAnswers: [
            'Dạ khi đến tham quan con không viết vẽ bậy lên cột gỗ, luôn đi nhẹ nói khẽ và giữ gìn vệ sinh di tích ạ!',
            'Dạ con sẽ kể lại cho ông bà, bố mẹ nghe và tự hào giới thiệu nét đẹp đình làng với bạn bè ạ!'
          ]
        }
      ];

    case 'fruits':
      return [
        {
          teacherQuestions: [
            'Con hãy kể tên những loại quả thơm ngon, ngọt mát mà con yêu thích nhất trong mùa hè?',
            'Mỗi loại quả đó có hình dáng (tròn, bầu dục, cong) và màu sắc đặc trưng như thế nào?'
          ],
          studentAnswers: [
            'Dạ thưa Thầy, con thích quả cam tròn xoe, quả dưa hấu, quả chuối cong cong và quả xoài vàng óng ạ!',
            'Dạ quả cam hình cầu màu cam, quả dưa hấu vỏ xanh ruột đỏ, quả chuối dáng dài cong màu vàng tươi ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Quan sát quả cam và quả táo mẫu, con thấy ánh sáng chiếu vào quả tạo nên vùng sáng tối ra sao?',
            'Bề mặt vỏ của các loại quả trong hình mẫu nhẵn bóng hay có hạt sần sùi?',
            'Để vẽ chùm quả có quả trước quả sau, quả ở phía sau sẽ được thể hiện như thế nào?'
          ],
          studentAnswers: [
            'Dạ vùng đón ánh sáng có màu vàng sáng, vùng khuất bóng có màu cam đậm giúp quả trông căng tròn mọng nước ạ!',
            'Dạ vỏ quả táo nhẵn bóng phản chiếu vệt sáng trắng, vỏ quả cam hơi sần sùi có chấm li ti ạ!',
            'Dạ quả ở phía sau sẽ bị quả phía trước che khuất một phần, vẽ nhỏ hơn một chút để tạo chiều sâu ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Bí quyết của Thầy khi vẽ quả: Bước đầu tiên chúng mình phác khung hình gì?',
            'Con làm thế nào để màu sắc của quả trông thật mọng nước và tươi ngon?'
          ],
          studentAnswers: [
            'Dạ con phác hình tròn hoặc bầu dục nhẹ tay ở giữa trang giấy, sau đó vẽ thêm cuống và chiếc lá xanh ạ!',
            'Dạ con tô màu đậm ở phần bóng dưới đáy và chừa lại một đốm trắng nhỏ ở phần sáng để tạo độ bóng ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Con hãy tự hào giới thiệu đĩa hoa quả thơm ngon mà con vừa vẽ hoặc nặn trước lớp?',
            'Con thích chi tiết nào nhất trong bức tranh hoa quả của bạn bên cạnh?'
          ],
          studentAnswers: [
            'Dạ đĩa quả của con có dưa hấu đỏ, chuối vàng rực và táo xanh tươi mát, trông rất ngon lành ạ!',
            'Dạ con thích quả xoài của bạn vì bạn pha màu chuyển từ vàng sang cam rất mượt mà ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Ăn hoa quả tươi hằng ngày mang lại những lợi ích tuyệt vời gì cho sức khỏe của chúng mình?',
            'Trước khi ăn quả, con cần thực hiện thói quen vệ sinh gì để bảo vệ sức khỏe?'
          ],
          studentAnswers: [
            'Dạ hoa quả cung cấp vitamin C giúp tăng sức đề kháng, sáng mắt và cơ thể khỏe khoắn ạ!',
            'Dạ con luôn rửa sạch quả dưới vòi nước chảy, gọt vỏ sạch sẽ và rửa tay trước khi ăn ạ!'
          ]
        }
      ];

    case 'folk_art':
      return [
        {
          teacherQuestions: [
            'Mỗi dịp Tết đến xuân về, tranh dân gian Đông Hồ thường mang lời chúc tụng gì cho các gia đình?',
            'Đố con nhận ra những con vật quen thuộc, ngộ nghĩnh nào thường xuất hiện trong tranh dân gian?'
          ],
          studentAnswers: [
            'Dạ chúc Vinh hoa, Phú quý, Đại cát, gia đình ấm no sum vầy và con cháu hiếu thảo ạ!',
            'Dạ con gà trống oai vệ, đàn lợn âm dương ủn ỉn, đàn chuột rước đèn và chú bé ôm cá chép ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Quan sát tranh Đông Hồ mẫu, con thấy nét viền của hình vẽ có đặc điểm gì nổi bật?',
            'Màu sắc trong tranh dân gian được làm từ những nguyên liệu tự nhiên kì diệu nào?',
            'Chất giấy điệp truyền thống lấp lánh mang lại cảm giác thẩm mĩ như thế nào?'
          ],
          studentAnswers: [
            'Dạ thưa Thầy, nét viền màu đen in từ ván gỗ rất đậm, khỏe khoắn và dứt khoát ạ!',
            'Dạ màu đen từ than lá tre, màu trắng từ vỏ điệp sò biển giã nhỏ, màu vàng từ hoa dành dành ạ!',
            'Dạ giấy điệp óng ánh như xà cừ, sờ vào thấy nham nhám mộc mạc và mang đậm hồn quê Việt Nam ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Khi sáng tạo bức tranh theo phong cách dân gian, con sẽ thể hiện đường nét và màu sắc ra sao?',
            'Con sắp xếp bố cục các con vật hoặc nhân vật trong tranh như thế nào cho ấm cúng?'
          ],
          studentAnswers: [
            'Dạ con vẽ nét viền đen to rõ ràng bao quanh hình, sau đó tô các mảng màu nguyên chất tươi sáng ạ!',
            'Dạ con vẽ hình ảnh chính to ở giữa, các chi tiết phụ như hoa lá, chữ thư pháp xếp xung quanh thật hài hòa ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Bức tranh dân gian con vừa hoàn thành mang lại cho con cảm xúc gì về Tết cổ truyền?',
            'Con thấy bài vẽ của bạn nào thể hiện được chất mộc mạc, tươi vui của tranh dân gian nhất?'
          ],
          studentAnswers: [
            'Dạ con thấy không khí Tết rộn ràng, ấm áp và vui tươi như đang đi hội làng chợ xuân ạ!',
            'Dạ con thích bài Đàn lợn âm dương của bạn vì nét xoáy tròn trên lưng chú lợn rất ngộ nghĩnh ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Vì sao chúng mình cần trân trọng và bảo tồn dòng tranh dân gian Đông Hồ, Hàng Trống?',
            'Con sẽ dùng bức tranh dân gian này để làm gì trong dịp Tết sắp tới?'
          ],
          studentAnswers: [
            'Dạ vì đây là tinh hoa văn hóa di sản của dân tộc Việt Nam cần được gìn giữ cho các thế hệ mai sau ạ!',
            'Dạ con sẽ treo trong phòng khách hoặc làm thiệp Tết chúc mừng ông bà, cha mẹ ạ!'
          ]
        }
      ];

    case 'national_hero':
      return [
        {
          teacherQuestions: [
            'Kể tên những vị anh hùng dân tộc oai phong trong lịch sử Việt Nam mà con vô cùng kính phục?',
            'Khi hình dung về vị anh hùng đó, con thấy ấn tượng nhất với hành động hoặc chiến công nào?'
          ],
          studentAnswers: [
            'Dạ thưa Thầy: Thánh Gióng nhổ tre dẹp giặc, Hai Bà Trưng cưỡi voi ra trận, Bác Hồ kính yêu tìm đường cứu nước ạ!',
            'Dạ con ấn tượng hình ảnh người anh hùng vung gươm dũng mãnh bảo vệ nền độc lập tự do của Tổ quốc ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Quan sát tượng đài anh hùng dân tộc, con thấy tư thế dáng đứng thể hiện khí phách gì?',
            'Tỉ lệ cơ thể và các khối hình điêu khắc được tạo hình như thế nào để gợi sự vĩ đại?',
            'Bầu trời và không gian quảng trường xung quanh tượng đài góp phần tôn vinh điều gì?'
          ],
          studentAnswers: [
            'Dạ dáng đứng hiên ngang, mắt nhìn thẳng, tay chỉ về phía trước thể hiện ý chí quật cường bất khuất ạ!',
            'Dạ khối ngực nở, vai rộng, thế đứng vững như núi non làm nổi bật lòng quả cảm vô song ạ!',
            'Dạ bầu trời cao rộng và cờ đỏ bay phấp phới tôn vinh chiến thắng hào hùng của dân tộc ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Khi vẽ tranh nhân vật anh hùng, con tập trung đặc tả chi tiết nào để bức tranh có thần thái oai nghiêm?',
            'Con sẽ chọn tông màu gì cho trang phục và cảnh vật để làm nổi bật khí thế hào hùng?'
          ],
          studentAnswers: [
            'Dạ con chăm chút ánh mắt cương nghị, nụ cười kiên cường và chiếc áo bào bay trong gió ạ!',
            'Dạ con dùng màu đỏ của cờ Tổ quốc, màu vàng ánh kim của áo giáp và màu xanh của non sông đất nước ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Bức tranh của con gửi gắm tình cảm thiêng liêng gì đối với các thế hệ cha ông đã ngã xuống?',
            'Con học hỏi được đức tính tốt đẹp gì từ tấm gương của các vị anh hùng dân tộc?'
          ],
          studentAnswers: [
            'Dạ lòng biết ơn sâu sắc vì nhờ có các anh hùng mà chúng con hôm nay được sống trong hòa bình cắp sách tới trường ạ!',
            'Dạ con học được lòng dũng cảm, tình yêu quê hương và tinh thần không chịu lùi bước trước khó khăn ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Là học sinh hôm nay, con sẽ rèn luyện như thế nào để xứng đáng với truyền thống hào hùng của cha ông?',
            'Con sẽ mang bức tranh vẽ anh hùng dân tộc này tham gia hoạt động gì ở trường?'
          ],
          studentAnswers: [
            'Dạ con cố gắng chăm ngoan, học giỏi, rèn luyện thân thể khỏe mạnh và luôn yêu thương giúp đỡ mọi người ạ!',
            'Dạ con xin trưng bày ở phòng truyền thống hoặc góc Đội Thiếu niên Tiền phong của trường ạ!'
          ]
        }
      ];

    case 'dots_ladybug':
      return [
        {
          teacherQuestions: [
            'Trong thế giới tự nhiên, con thấy loài côn trùng tí hon nào có đôi cánh đỏ chấm tròn đen rất xinh xắn?',
            'Con đã bao giờ thử sáng tạo nên một bức tranh hoàn toàn từ những chấm màu li ti chưa?'
          ],
          studentAnswers: [
            'Dạ thưa Thầy, đó là chú bọ rùa (bọ cánh cam) bò trên cành lá xanh mướt ạ!',
            'Dạ con từng dùng đầu ngón tay hoặc tăm bông chấm màu nước tạo thành hoa lá rất vui nhộn ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Quan sát cánh chú bọ rùa mẫu, con thấy các chấm tròn màu đen được sắp xếp như thế nào?',
            'Khi các chấm màu được chấm dày đặc (mau) hoặc rải rác (thưa) sẽ tạo nên cảm giác thị giác gì?',
            'Sự kết hợp giữa chấm đen trên nền cánh đỏ tạo nên hiệu ứng màu sắc ra sao?'
          ],
          studentAnswers: [
            'Dạ thưa Thầy, các chấm tròn màu đen phân bố đều trên hai bên cánh đỏ đối xứng nhau ạ!',
            'Dạ chấm dày tạo mảng màu đậm chắc nịch, chấm thưa tạo cảm giác nhẹ nhàng thoáng đãng ạ!',
            'Dạ tạo sự tương phản rõ nét giúp chú bọ rùa nổi bật rực rỡ trên chiếc lá xanh ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Bí quyết chấm màu của Thầy: Để chấm tròn đều đặn không bị nhòe, chúng mình cần đặt bút như thế nào?',
            'Con dự định chấm thêm những chấm màu gì xung quanh chú bọ rùa để bức tranh thêm lung linh?'
          ],
          studentAnswers: [
            'Dạ cầm bút vuông góc với mặt giấy và chấm dứt khoát, không kéo rê đầu bút ạ!',
            'Dạ con chấm thêm những chấm vàng tươi và trắng li ti như những hạt sương mai long lanh ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Con thấy tác phẩm tạo hình từ những chấm màu của con trông giống bức tranh ghép hạt ngọc nào?',
            'Con khen bạn bên cạnh điều gì về sự khéo léo và kiên nhẫn trong giờ học chấm màu hôm nay?'
          ],
          studentAnswers: [
            'Dạ trông giống bức tranh khảm ngọc lấp lánh rất độc đáo và ngộ nghĩnh ạ!',
            'Dạ bạn chấm màu rất tròn, đều tay và màu sắc không bị lem ra ngoài hình phác ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Loài bọ rùa tí hon mang lại ích lợi gì cho cây cối hoa màu trong khu vườn?',
            'Con sẽ ứng dụng kĩ thuật chấm màu này để trang trí thêm đồ dùng nào ở nhà?'
          ],
          studentAnswers: [
            'Dạ bọ rùa chuyên ăn sâu rệp có hại, bảo vệ cây cối và hoa trái tươi tốt ạ!',
            'Dạ con sẽ dùng tăm bông chấm màu trang trí bìa sổ tay và tấm thiệp tặng mẹ ạ!'
          ]
        }
      ];

    case 'portrait_face':
    case 'family_portrait':
      return [
        {
          teacherQuestions: [
            'Khi ngắm nhìn người thân yêu nhất trong gia đình, điều gì trên gương mặt khiến con cảm thấy ấm áp nhất?',
            'Khi vui mừng, khi ngạc nhiên hay lúc mỉm cười, đôi mắt và khóe miệng của chúng mình thay đổi ra sao?'
          ],
          studentAnswers: [
            'Dạ nụ cười hiền hậu, ánh mắt yêu thương và giọng nói dịu dàng của mẹ ạ!',
            'Dạ khi vui mắt híp lại miệng cười tươi hở răng khểnh, khi ngạc nhiên mắt mở to tròn xoe ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Khuôn mặt người thường có hình dạng hình học cơ bản nào (tròn, trái xoan, vuông)?',
            'Đôi mắt thường nằm ở khoảng vị trí nào tính từ đỉnh đầu đến cằm?',
            'Khoảng cách giữa hai mắt được ước lượng bằng khoảng cách nào?'
          ],
          studentAnswers: [
            'Dạ khuôn mặt thường có hình bầu dục (quả trứng) hoặc hình trái xoan thon gọn ạ!',
            'Dạ đôi mắt nằm ở khoảng chính giữa chiều dài khuôn mặt ạ!',
            'Dạ khoảng cách giữa hai mắt bằng đúng chiều dài của một con mắt ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Bước đầu tiên khi vẽ chân dung, con sẽ phác hình gì để định hình tỉ lệ khuôn mặt?',
            'Con chăm chút cho chi tiết nào để gương mặt người thân trong tranh toát lên tình cảm ấm áp?'
          ],
          studentAnswers: [
            'Dạ con vẽ trục đối xứng dọc và phác hình quả trứng to ở giữa tờ giấy ạ!',
            'Dạ con chăm chút ánh mắt long lanh và khóe miệng cười tươi tắn của người thân ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Con hãy tự hào chia sẻ câu chuyện về người thân mà con đã vẽ trong bức tranh chân dung này?',
            'Con thấy bài vẽ chân dung của bạn nào thể hiện được cảm xúc chân thực và gần gũi nhất?'
          ],
          studentAnswers: [
            'Dạ con vẽ mẹ của con, người hằng ngày chăm sóc con từng bữa ăn giấc ngủ với tình yêu thương bao la ạ!',
            'Dạ con thích bức tranh bạn vẽ ông nội đeo kính đọc báo, trông ông rất hiền từ và phúc hậu ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Con dự định sẽ trao tặng bức tranh chân dung chan chứa tình cảm này cho ai và vào dịp nào?',
            'Qua bài học vẽ chân dung người thân, con cảm nhận được giá trị thiêng liêng gì của gia đình?'
          ],
          studentAnswers: [
            'Dạ con sẽ lồng khung kính và tặng mẹ nhân ngày sinh nhật mẹ ạ!',
            'Dạ con càng thêm yêu quý, kính trọng và muốn giúp đỡ người thân nhiều hơn mỗi ngày ạ!'
          ]
        }
      ];

    default:
      return [
        {
          teacherQuestions: [
            `Quan sát chủ đề "${title}", con cảm nhận được vẻ đẹp nổi bật nào của bài học hôm nay?`,
            'Đố con phát hiện những hình ảnh quen thuộc nào trong đời sống gắn liền với bài học này?'
          ],
          studentAnswers: [
            `Dạ thưa Thầy, con thấy chủ đề "${title}" mang lại cảm xúc rất tươi vui, rực rỡ và gần gũi ạ!`,
            'Dạ con nhận ra những hình ảnh rất thân thương xuất hiện quanh trường lớp và gia đình con hằng ngày ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Trong tác phẩm mẫu, các yếu tố đường nét, hình khối và màu sắc được kết hợp với nhau như thế nào?',
            'Hình ảnh chính được đặt ở vị trí nào để thu hút ánh nhìn đầu tiên của người xem?',
            'Hòa sắc của bức tranh tạo cảm giác tươi vui, ấm áp hay mát dịu?'
          ],
          studentAnswers: [
            'Dạ có sự phối hợp hài hòa giữa nét thẳng dứt khoát và nét cong mềm mại uyển chuyển ạ!',
            'Dạ hình ảnh chính được vẽ to, rõ nét ở ngay chính giữa trang giấy làm trọng tâm của bức tranh ạ!',
            'Dạ hòa sắc tươi sáng, tương phản nhịp nhàng giữa hình chính và nền tạo cảm giác vui tươi phấn khởi ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Bí quyết của Thầy: Để hoàn thành sản phẩm mĩ thuật đẹp, con thực hiện theo những bước cơ bản nào?',
            'Con dự định phối màu sắc như thế nào để thể hiện được cá tính và cảm xúc riêng của con?'
          ],
          studentAnswers: [
            'Dạ con phác hình chính trước, thêm chi tiết phụ xung quanh và tô màu hài hòa, có đậm có nhạt ạ!',
            'Dạ con sẽ chọn những gam màu con yêu thích nhất để làm nổi bật chủ đề bài học ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Con hãy tự tin giới thiệu bức tranh sáng tạo của mình trước Thầy và các bạn trong lớp?',
            'Con ấn tượng và muốn học hỏi điều gì nhất từ tác phẩm mĩ thuật của bạn bên cạnh?'
          ],
          studentAnswers: [
            `Dạ bức tranh của con thể hiện trọn vẹn chủ đề "${title}" với những đường nét tự tin và màu sắc tươi tắn ạ!`,
            'Dạ con học được cách bạn đi nét rất dứt khoát và cách bạn phối màu nền làm hình chính rất nổi ạ!'
          ]
        },
        {
          teacherQuestions: [
            'Sản phẩm mĩ thuật hôm nay có thể ứng dụng vào việc trang trí hoặc làm quà tặng như thế nào?',
            'Bài học hôm nay giúp con thêm yêu quý điều gì trong cuộc sống xung quanh mình?'
          ],
          studentAnswers: [
            'Dạ con sẽ đóng khung trang trí góc học tập hoặc làm món quà ý nghĩa tặng người thân yêu ạ!',
            'Dạ con thêm yêu nghệ thuật, biết trân trọng cái đẹp và nuôi dưỡng tâm hồn thêm phong phú ạ!'
          ]
        }
      ];
  }
}

module.exports = { getThematicImagePrompts, getThematicActivitiesQA };
