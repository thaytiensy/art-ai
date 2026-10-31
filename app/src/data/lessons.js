export const DRAWING_LESSONS = [
  {
    id: 'cat',
    title: 'Chú Mèo Con Lười',
    grade: 'Lớp 1 - 2',
    icon: '🐱',
    color: 'bg-amber-100 border-amber-300',
    description: 'Học vẽ chú mèo cuộn tròn đáng yêu từ hình tròn và tam giác cơ bản!',
    steps: [
      {
        step: 1,
        title: 'Khung đầu & Tai mèo',
        detail: 'Vẽ một hình tròn to làm đầu mèo, sau đó thêm 2 hình tam giác nhỏ nhọn xinh ở phía trên làm đôi tai.',
        svgType: 'circle-triangles',
        tip: 'Đừng lo nếu hình tròn chưa tròn xoe, mèo con có nhiều dáng rất dễ thương!',
        svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="300" height="200" rx="16" fill="#fffbeb"/>
          <circle cx="150" cy="110" r="50" fill="none" stroke="#d97706" stroke-width="4" stroke-dasharray="6,4"/>
          <polygon points="115,70 130,35 145,65" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
          <polygon points="155,65 170,35 185,70" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
          <text x="150" y="185" text-anchor="middle" font-size="12" font-weight="bold" fill="#b45309">Bước 1: Phác đầu tròn & 2 tai nhọn</text>
        </svg>`
      },
      {
        step: 2,
        title: 'Khuôn mặt ngây thơ',
        detail: 'Chấm 2 hạt đậu làm đôi mắt long lanh, 1 hình tam giác nhỏ xíu làm chiếc mũi hồng và vẽ nét móc thành miệng cười.',
        svgType: 'cat-face',
        tip: 'Vẽ thêm 3 sợi râu ở mỗi bên má để chú mèo trông tinh nghịch hơn nhé.',
        svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="300" height="200" rx="16" fill="#fffbeb"/>
          <circle cx="150" cy="110" r="50" fill="#fef3c7" stroke="#d97706" stroke-width="4"/>
          <polygon points="115,70 130,35 145,65" fill="#fde68a" stroke="#d97706" stroke-width="3"/>
          <polygon points="155,65 170,35 185,70" fill="#fde68a" stroke="#d97706" stroke-width="3"/>
          <ellipse cx="135" cy="105" rx="5" ry="7" fill="#1e293b"/>
          <ellipse cx="165" cy="105" rx="5" ry="7" fill="#1e293b"/>
          <polygon points="146,118 154,118 150,123" fill="#f43f5e"/>
          <path d="M 144 125 Q 150 130 150 123 Q 150 130 156 125" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
          <line x1="105" y1="110" x2="125" y2="112" stroke="#d97706" stroke-width="2"/>
          <line x1="105" y1="118" x2="125" y2="116" stroke="#d97706" stroke-width="2"/>
          <line x1="175" y1="112" x2="195" y2="110" stroke="#d97706" stroke-width="2"/>
          <line x1="175" y1="116" x2="195" y2="118" stroke="#d97706" stroke-width="2"/>
          <text x="150" y="185" text-anchor="middle" font-size="12" font-weight="bold" fill="#b45309">Bước 2: Vẽ mắt, mũi hồng & râu mèo</text>
        </svg>`
      },
      {
        step: 3,
        title: 'Thân hình múp míp & Đuôi cong',
        detail: 'Vẽ một hình bầu dục nối liền bên dưới đầu làm thân mèo, kèm theo chiếc đuôi cong dài mềm mại.',
        svgType: 'cat-body',
        tip: 'Đuôi mèo vểnh lên nghĩa là bạn ấy đang rất vui vẻ đấy!',
        svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="300" height="200" rx="16" fill="#fffbeb"/>
          <path d="M 140 145 C 120 180, 200 180, 195 140" fill="#fef3c7" stroke="#d97706" stroke-width="4"/>
          <path d="M 195 155 C 235 155, 230 110, 215 110" fill="none" stroke="#d97706" stroke-width="8" stroke-linecap="round"/>
          <circle cx="140" cy="95" r="42" fill="#fef3c7" stroke="#d97706" stroke-width="4"/>
          <polygon points="110,65 125,35 137,60" fill="#fde68a" stroke="#d97706" stroke-width="3"/>
          <polygon points="145,60 157,35 172,65" fill="#fde68a" stroke="#d97706" stroke-width="3"/>
          <ellipse cx="128" cy="92" rx="4" ry="6" fill="#1e293b"/>
          <ellipse cx="152" cy="92" rx="4" ry="6" fill="#1e293b"/>
          <text x="150" y="185" text-anchor="middle" font-size="12" font-weight="bold" fill="#b45309">Bước 3: Dựng thân múp míp & đuôi cong</text>
        </svg>`
      },
      {
        step: 4,
        title: 'Tô màu sặc sỡ',
        detail: 'Tô màu cam vàng ấm áp (mèo mướp) hoặc màu đen tuyền/trắng tinh, thêm sọc vằn trên lưng.',
        svgType: 'cat-colored',
        tip: 'Dùng màu sáp vàng cam tô kín mảng màu để chú mèo thật ấm áp!',
        svg: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="300" height="200" rx="16" fill="#fef3c7"/>
          <path d="M 140 145 C 120 180, 200 180, 195 140" fill="#f97316" stroke="#c2410c" stroke-width="4"/>
          <path d="M 195 155 C 235 155, 230 110, 215 110" fill="none" stroke="#ea580c" stroke-width="9" stroke-linecap="round"/>
          <circle cx="140" cy="95" r="42" fill="#fb923c" stroke="#c2410c" stroke-width="4"/>
          <polygon points="110,65 125,35 137,60" fill="#ea580c" stroke="#c2410c" stroke-width="3"/>
          <polygon points="145,60 157,35 172,65" fill="#ea580c" stroke="#c2410c" stroke-width="3"/>
          <ellipse cx="128" cy="92" rx="5" ry="7" fill="#0f172a"/>
          <ellipse cx="152" cy="92" rx="5" ry="7" fill="#0f172a"/>
          <circle cx="126" cy="90" r="2" fill="#fff"/>
          <circle cx="150" cy="90" r="2" fill="#fff"/>
          <polygon points="137,102 143,102 140,106" fill="#ffe4e6"/>
          <path d="M 136 108 Q 140 112 140 106 Q 140 112 144 108" fill="none" stroke="#7c2d12" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="102" y1="95" x2="118" y2="97" stroke="#7c2d12" stroke-width="2"/>
          <line x1="162" y1="97" x2="178" y2="95" stroke="#7c2d12" stroke-width="2"/>
          <text x="150" y="185" text-anchor="middle" font-size="12" font-weight="900" fill="#c2410c">Bước 4: Hoàn thiện màu sắc ấm áp!</text>
        </svg>`
      }
    ]
  },
  {
    id: 'house',
    title: 'Ngôi Nhà Mơ Ước & Mặt Trời',
    grade: 'Lớp 1 - 2',
    icon: '🏡',
    color: 'bg-emerald-100 border-emerald-300',
    description: 'Bài học kinh điển dựng hình từ hình vuông, tam giác và hình chữ nhật!',
    steps: [
      {
        step: 1,
        title: 'Tường nhà & Mái ngói',
        detail: 'Vẽ một hình vuông lớn làm bức tường, phía trên đội một hình tam giác cân làm mái nhà.',
        svgType: 'house-base',
        tip: 'Dùng thước kẻ nếu muốn nét thẳng, hoặc vẽ tay tự do để ngôi nhà thêm mộc mạc.'
      },
      {
        step: 2,
        title: 'Cửa ra vào & Cửa sổ',
        detail: 'Thêm cửa chính hình chữ nhật đứng và 2 ô cửa sổ vuông nhỏ xinh có rèm cửa.',
        svgType: 'house-doors',
        tip: 'Vẽ dấu cộng bên trong cửa sổ để chia thành 4 ô kính lấp lánh.'
      },
      {
        step: 3,
        title: 'Cây xanh & Bầu trời',
        detail: 'Bên cạnh nhà vẽ một thân cây to và tán lá tròn bồng bềnh như cây nấm.',
        svgType: 'house-landscape',
        tip: 'Ở góc trên tờ giấy, vẽ ông mặt trời tròn xoe tỏa các tia nắng ấm áp.'
      },
      {
        step: 4,
        title: 'Tô màu khu vườn',
        detail: 'Mái nhà màu đỏ cam, tường nhà màu vàng tươi, cây cối xanh mướt và thảm cỏ non.',
        svgType: 'house-colored',
        tip: 'Phối màu đối lập đỏ của mái nhà và xanh của cây sẽ làm bức tranh vô cùng nổi bật!'
      }
    ]
  },
  {
    id: 'panda',
    title: 'Chú Gấu Trúc Nhai Trúc',
    grade: 'Lớp 2 - 3',
    icon: '🐼',
    color: 'bg-blue-100 border-blue-300',
    description: 'Bé học cách phối sắc độ tương phản Trắng - Đen cực vui mắt!',
    steps: [
      {
        step: 1,
        title: 'Đầu tròn & Tai tròn',
        detail: 'Vẽ một hình tròn lớn hơi dẹt làm đầu gấu trúc, thêm 2 nửa hình tròn đen làm tai.',
        svgType: 'panda-head',
        tip: 'Hai tai gấu trúc tròn xoe như hai chiếc bánh quy nhỏ.'
      },
      {
        step: 2,
        title: 'Đôi mắt quầng thâm đặc trưng',
        detail: 'Vẽ hai đốm hình bầu dục nghiêng đen nhánh quanh mắt, bên trong vẽ con ngươi long lanh.',
        svgType: 'panda-eyes',
        tip: 'Đặc điểm nhận dạng số 1 của bạn gấu trúc chính là đốm mắt đen này đấy!'
      },
      {
        step: 3,
        title: 'Tay chân & Cành trúc',
        detail: 'Vẽ thân tròn mập mạp, hai tay đang ôm một cành lá trúc xanh mướt giòn rụm.',
        svgType: 'panda-body',
        tip: 'Lá trúc vẽ hình thoi nhọn hai đầu rất đơn giản.'
      },
      {
        step: 4,
        title: 'Hoàn thiện bức tranh',
        detail: 'Tô đen tai, mắt, tay và chân; giữ thân và mặt màu trắng tinh khiết, nền lá trúc xanh lá.',
        svgType: 'panda-colored',
        tip: 'Tương phản đen và trắng làm bức tranh cực kỳ bắt mắt!'
      }
    ]
  },
  {
    id: 'sunflower',
    title: 'Bông Hoa Hướng Dương Rực Rỡ',
    grade: 'Lớp 2 - 4',
    icon: '🌻',
    color: 'bg-yellow-100 border-yellow-300',
    description: 'Học cách vẽ cánh hoa xếp lớp đều đặn và phối màu chuyển sắc rực rỡ.',
    steps: [
      {
        step: 1,
        title: 'Nhụy hoa to tròn',
        detail: 'Vẽ một hình tròn lớn ở giữa trang giấy làm nhụy hoa hướng dương.',
        svgType: 'flower-center',
        tip: 'Vẽ các đường đan chéo ca-rô bên trong nhụy để tạo hạt hoa nhé.'
      },
      {
        step: 2,
        title: 'Vòng cánh hoa thứ nhất',
        detail: 'Vẽ các cánh hoa hình giọt nước nhọn đầu bao quanh nhụy hoa như tia nắng.',
        svgType: 'flower-petals1',
        tip: 'Vẽ đều tay quanh vòng tròn, các cánh hoa có thể đan xen nhau.'
      },
      {
        step: 3,
        title: 'Vòng cánh thứ hai & Thân cành',
        detail: 'Chêm thêm các đầu cánh hoa ở lớp sau, vẽ thân cành thẳng đứng và 2 chiếc lá to.',
        svgType: 'flower-stem',
        tip: 'Gân lá hình xương cá sẽ làm chiếc lá trông như thật!'
      },
      {
        step: 4,
        title: 'Lên màu nắng ấm',
        detail: 'Nhụy hoa màu nâu sô-cô-la, cánh hoa màu vàng chanh kết hợp vàng cam rực rỡ.',
        svgType: 'flower-colored',
        tip: 'Tô một chút màu cam ở gốc cánh hoa để tạo cảm giác cánh hoa dày dặn.'
      }
    ]
  },
  {
    id: 'car',
    title: 'Xe Ô Tô Cứu Hỏa Tí Hon',
    grade: 'Lớp 3 - 5',
    icon: '🚒',
    color: 'bg-red-100 border-red-300',
    description: 'Dựng hình khối chữ nhật và bánh tròn, học vẽ phương tiện giao thông.',
    steps: [
      {
        step: 1,
        title: 'Khung xe chữ nhật',
        detail: 'Vẽ một hình chữ nhật dài làm thân xe cứu hỏa, khoét 2 vòm tròn bên dưới để đặt bánh xe.',
        svgType: 'car-body',
        tip: 'Phần đầu xe nhô cao hơn một chút làm buồng lái.'
      },
      {
        step: 2,
        title: 'Bánh xe & Cửa kính',
        detail: 'Lắp 2 bánh xe tròn có vành tròn nhỏ bên trong, thêm ô cửa kính vuông cho bác tài xế.',
        svgType: 'car-wheels',
        tip: 'Bánh xe phải chạm đất ngang bằng để xe không bị nghiêng ngả.'
      },
      {
        step: 3,
        title: 'Thang cứu hỏa & Còi hú',
        detail: 'Vẽ chiếc thang gấp trên nóc xe và ngọn đèn còi hụ cấp cứu nhấp nháy.',
        svgType: 'car-ladder',
        tip: 'Vẽ chiếc thang bằng 2 đường song song nối các bậc nhỏ ở giữa.'
      },
      {
        step: 4,
        title: 'Tô màu rực cháy',
        detail: 'Màu đỏ tươi đặc trưng cho xe cứu hỏa, đèn màu vàng chớp nháy và bánh xe màu đen than.',
        svgType: 'car-colored',
        tip: 'Thêm vài tia nước màu xanh dương bắn ra phía trước cho thật sống động!'
      }
    ]
  },

  // ==========================================
  // BÀI TẬP MỚI DÀNH RIÊNG CHO LỚP 4: PHONG CẢNH QUÊ HƯƠNG
  // ==========================================
  {
    id: 'landscape_countryside_g4',
    title: 'Phong Cảnh Làng Quê Việt Nam',
    grade: 'Lớp 4 (Chuẩn GDPT 2018)',
    icon: '🏞️',
    color: 'bg-emerald-100 border-emerald-400',
    description: 'Vận dụng luật xa gần (viễn cận), bố cục 3 lớp không gian (tiền cảnh, trung cảnh, hậu cảnh) và hòa sắc tươi mát.',
    steps: [
      {
        step: 1,
        title: 'Đường Chân Trời & Phân Mảng Không Gian',
        detail: 'Dùng bút chì nhẹ nhàng kẻ một đường ngang cách mép dưới khoảng một phần ba trang giấy làm đường chân trời. Phác vị trí mảng chính (ngôi nhà mái ngói và dòng sông uốn lượn).',
        svgType: 'landscape-step1',
        tip: 'Đừng kẻ đường chân trời chính giữa tờ giấy nhé! Kẻ ở vị trí 1/3 sẽ tạo cảm giác bầu trời thoáng đãng hoặc mặt đất rộng bao la.',
        svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="400" height="250" rx="16" fill="#f0fdf4"/>
          <!-- Đường chân trời -->
          <line x1="20" y1="130" x2="380" y2="130" stroke="#059669" stroke-width="3" stroke-dasharray="6,4"/>
          <text x="200" y="120" text-anchor="middle" font-size="11" font-weight="bold" fill="#047857">Đường chân trời (Tầm mắt)</text>
          <!-- Phác mảng nhà và cây -->
          <rect x="70" y="140" width="70" height="50" fill="none" stroke="#059669" stroke-width="2" stroke-dasharray="4,3"/>
          <polygon points="65,140 105,115 145,140" fill="none" stroke="#059669" stroke-width="2" stroke-dasharray="4,3"/>
          <!-- Dòng sông uốn lượn -->
          <path d="M 230 130 Q 250 170 380 230" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="4,3"/>
          <text x="200" y="235" text-anchor="middle" font-size="12" font-weight="900" fill="#065f46">Bước 1: Phác đường chân trời & Mảng chính</text>
        </svg>`
      },
      {
        step: 2,
        title: 'Dựng Hình Tiền Cảnh (Cảnh Gần Rõ Nét)',
        detail: 'Vẽ gốc cây đa hoặc hàng dừa to ở góc gần, cành lá vươn cao. Vẽ bờ cỏ xanh và chiếc thuyền nan nhỏ đậu ven sông với nét vẽ đậm, chắc khỏe.',
        svgType: 'landscape-step2',
        tip: 'Quy luật của Thầy: "Gần thì To và Rõ" - các vật ở gần phải vẽ lớn và chăm chút từng đường nét.',
        svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="400" height="250" rx="16" fill="#f0fdf4"/>
          <!-- Đường chân trời mờ -->
          <line x1="20" y1="130" x2="380" y2="130" stroke="#a7f3d0" stroke-width="2"/>
          <!-- Nhà tranh mái ngói ở trung cảnh -->
          <polygon points="70,140 115,115 160,140" fill="#fecdd3" stroke="#e11d48" stroke-width="3"/>
          <rect x="75" y="140" width="80" height="55" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
          <rect x="105" y="160" width="22" height="35" fill="#78350f"/>
          <!-- Cây to ở tiền cảnh -->
          <path d="M 330 250 Q 320 160 340 70 Q 355 160 370 250" fill="#78350f" stroke="#451a03" stroke-width="3"/>
          <ellipse cx="340" cy="65" rx="45" ry="35" fill="#bbf7d0" stroke="#16a34a" stroke-width="3"/>
          <ellipse cx="310" cy="55" rx="30" ry="25" fill="#bbf7d0" stroke="#16a34a" stroke-width="3"/>
          <!-- Thuyền nan trên sông -->
          <ellipse cx="230" cy="180" rx="30" ry="8" fill="#fed7aa" stroke="#c2410c" stroke-width="2.5"/>
          <text x="200" y="235" text-anchor="middle" font-size="12" font-weight="900" fill="#065f46">Bước 2: Dựng cây to, nhà ngói & thuyền ven sông</text>
        </svg>`
      },
      {
        step: 3,
        title: 'Dựng Hình Hậu Cảnh (Dãy Núi Xa & Đàn Chim)',
        detail: 'Phía sau đường chân trời, vẽ các đường lượn sóng nhấp nhô của dãy núi xa trập trùng. Trên bầu trời, vẽ ông mặt trời mỉm cười và đàn chim én bay chữ V.',
        svgType: 'landscape-step3',
        tip: 'Quy luật của Thầy: "Xa thì Nhỏ và Mờ" - núi ở xa vẽ nét mảnh, không cần vẽ chi tiết rườm rà.',
        svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="400" height="250" rx="16" fill="#f0fdf4"/>
          <!-- Dãy núi xa hậu cảnh -->
          <path d="M 20 130 Q 80 80 140 130 Q 200 90 260 130 Q 320 85 380 130" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/>
          <!-- Mặt trời & đàn chim -->
          <circle cx="100" cy="60" r="22" fill="#fed7aa" stroke="#f97316" stroke-width="2.5"/>
          <path d="M 180 50 Q 185 45 190 50 Q 195 45 200 50" fill="none" stroke="#0369a1" stroke-width="2"/>
          <path d="M 210 60 Q 214 56 218 60 Q 222 56 226 60" fill="none" stroke="#0369a1" stroke-width="1.8"/>
          <!-- Nhà & Cây tiền cảnh -->
          <polygon points="70,140 115,115 160,140" fill="#fecdd3" stroke="#e11d48" stroke-width="3"/>
          <rect x="75" y="140" width="80" height="55" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
          <path d="M 330 250 Q 320 160 340 70 Q 355 160 370 250" fill="#78350f" stroke="#451a03" stroke-width="3"/>
          <ellipse cx="340" cy="65" rx="45" ry="35" fill="#bbf7d0" stroke="#16a34a" stroke-width="3"/>
          <text x="200" y="235" text-anchor="middle" font-size="12" font-weight="900" fill="#065f46">Bước 3: Thêm núi xa trập trùng & đàn chim</text>
        </svg>`
      },
      {
        step: 4,
        title: 'Lên Màu Theo Luật Xa Gần (Viễn Cận)',
        detail: 'Cảnh gần tô màu sáp đậm đà (lá cây xanh lá mướt, mái ngói đỏ tươi, bờ đất nâu ấm). Cảnh xa tô màu nhạt hơn (dãy núi xanh lam nhạt pha xám mờ ảo, mây trắng bồng bềnh).',
        svgType: 'landscape-step4',
        tip: 'Màu sắc có luật: Cảnh gần màu ấm và rực, cảnh xa màu lạnh và nhạt. Sự tương phản này tạo chiều sâu không gian vô cùng chân thực!',
        svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="400" height="250" rx="16" fill="#f0f9ff"/>
          <!-- Núi xa pha lam nhạt -->
          <path d="M 20 130 Q 80 80 140 130 Q 200 90 260 130 Q 320 85 380 130" fill="#bae6fd" opacity="0.8"/>
          <!-- Dòng sông xanh biếc -->
          <path d="M 180 130 Q 220 170 350 250 L 220 250 Q 150 180 140 130 Z" fill="#38bdf8"/>
          <!-- Mặt đất vàng rơm đồng lúa -->
          <polygon points="20,130 180,130 140,250 20,250" fill="#fef08a"/>
          <!-- Ngôi nhà mái đỏ rực -->
          <polygon points="65,140 115,110 165,140" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
          <rect x="70" y="140" width="90" height="55" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
          <!-- Cây xanh thẫm tiền cảnh -->
          <path d="M 330 250 Q 320 160 340 70 Q 355 160 370 250" fill="#78350f"/>
          <ellipse cx="340" cy="65" rx="48" ry="38" fill="#15803d"/>
          <ellipse cx="310" cy="55" rx="32" ry="28" fill="#16a34a"/>
          <text x="200" y="235" text-anchor="middle" font-size="12" font-weight="900" fill="#0369a1">Bước 4: Phối màu xa gần có chiều sâu 3D</text>
        </svg>`
      },
      {
        step: 5,
        title: 'Nhấn Nhá Ánh Sáng & Hoàn Thiện Tác Phẩm',
        detail: 'Dùng màu trắng hoặc vàng tươi nhấn các vệt sáng lấp lánh trên mặt sông và mái nhà. Vẽ thêm bóng đổ của cây cối xuống thảm cỏ để bức tranh đạt chuẩn triển lãm!',
        svgType: 'landscape-step5',
        tip: 'Bí quyết của Thầy: Dùng ngón tay di nhẹ một chút viền màu giữa trời và núi để tạo làn khói mờ ảo như sương sớm quê hương.',
        svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#bae6fd"/>
              <stop offset="70%" stop-color="#fef08a"/>
              <stop offset="100%" stop-color="#fed7aa"/>
            </linearGradient>
            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0284c7"/>
              <stop offset="100%" stop-color="#38bdf8"/>
            </linearGradient>
          </defs>
          <rect width="400" height="250" rx="16" fill="url(#skyGrad)"/>
          <!-- Mặt trời bình minh -->
          <circle cx="110" cy="65" r="24" fill="#fb923c" filter="drop-shadow(0 0 10px #f97316)"/>
          <!-- Dãy núi mờ xa -->
          <path d="M 0 130 Q 70 70 150 130 Q 220 85 300 130 Q 350 95 400 130 L 400 250 L 0 250 Z" fill="#93c5fd" opacity="0.6"/>
          <!-- Cánh đồng lúa chín vàng ươm -->
          <polygon points="0,130 200,130 140,250 0,250" fill="#facc15"/>
          <!-- Dòng sông xanh ngọc -->
          <path d="M 200 130 Q 240 170 380 250 L 220 250 Q 150 180 140 130 Z" fill="url(#riverGrad)"/>
          <!-- Vệt sóng nước ánh vàng -->
          <line x1="210" y1="160" x2="240" y2="160" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="240" y1="185" x2="280" y2="185" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <!-- Ngôi nhà ngói đỏ truyền thống -->
          <polygon points="50,140 100,105 150,140" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
          <rect x="55" y="140" width="90" height="50" fill="#fde047" stroke="#b45309" stroke-width="2"/>
          <rect x="85" y="155" width="26" height="35" fill="#78350f"/>
          <!-- Thuyền nan trên bến -->
          <ellipse cx="230" cy="180" rx="26" ry="7" fill="#9a3412" stroke="#431407" stroke-width="2"/>
          <line x1="230" y1="180" x2="230" y2="155" stroke="#78350f" stroke-width="2"/>
          <polygon points="230,158 245,168 230,172" fill="#ffffff"/>
          <!-- Cây đa cổ thụ rợp bóng tiền cảnh -->
          <path d="M 330 250 Q 320 160 340 70 Q 355 160 370 250" fill="#451a03"/>
          <ellipse cx="340" cy="65" rx="52" ry="40" fill="#15803d"/>
          <ellipse cx="305" cy="55" rx="35" ry="30" fill="#16a34a"/>
          <ellipse cx="370" cy="60" rx="30" ry="25" fill="#22c55e"/>
          <text x="200" y="238" text-anchor="middle" font-size="12" font-weight="900" fill="#1e3a8a">Bước 5: Tuyệt phẩm Phong Cảnh Quê Hương Lớp 4!</text>
        </svg>`
      }
    ]
  },
  {
    id: 'landscape_seascape_g4',
    title: 'Biển Đảo Quê Hương Hoàng Hôn',
    grade: 'Lớp 4 (Chuẩn GDPT 2018)',
    icon: '🌅',
    color: 'bg-orange-100 border-orange-400',
    description: 'Học hòa sắc nóng - lạnh tương phản, vẽ ngọn hải đăng kiên cường và đoàn thuyền buồm ra khơi trong ánh hoàng hôn rực rỡ.',
    steps: [
      {
        step: 1,
        title: 'Đường Chân Trời Biển & Vầng Dương Đỏ',
        detail: 'Kẻ đường chân trời biển nằm ngang. Ở chính giữa đường chân trời, vẽ nửa vầng mặt trời to tròn đang từ từ lặn xuống mặt biển bao la.',
        svgType: 'sea-step1',
        tip: 'Mặt trời lúc hoàng hôn có màu đỏ cam rực lửa, to hơn bình thường do khúc xạ ánh sáng.',
        svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="400" height="250" rx="16" fill="#fff7ed"/>
          <line x1="20" y1="120" x2="380" y2="120" stroke="#ea580c" stroke-width="3"/>
          <path d="M 160 120 A 40 40 0 0 1 240 120 Z" fill="#ef4444" stroke="#c2410c" stroke-width="2"/>
          <text x="200" y="235" text-anchor="middle" font-size="12" font-weight="900" fill="#c2410c">Bước 1: Phác mặt trời lặn trên đường chân trời biển</text>
        </svg>`
      },
      {
        step: 2,
        title: 'Mỏm Đá & Ngọn Hải Đăng Can Trường',
        detail: 'Ở một bên mép tranh, vẽ một vách đá nhô ra biển và dựng ngọn hải đăng hình tháp cao vút với ngọn đèn chiếu sáng dẫn đường cho tàu bè.',
        svgType: 'sea-step2',
        tip: 'Tháp hải đăng vẽ bằng hình thang đứng thon dần lên đỉnh, trên đỉnh có mái vòm kính tròn.',
        svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="400" height="250" rx="16" fill="#fff7ed"/>
          <line x1="20" y1="120" x2="380" y2="120" stroke="#fdba74" stroke-width="2"/>
          <path d="M 160 120 A 40 40 0 0 1 240 120 Z" fill="#ef4444"/>
          <!-- Mỏm đá vách đứng -->
          <polygon points="300,120 400,120 400,250 260,250 270,180" fill="#78716c" stroke="#44403c" stroke-width="2"/>
          <!-- Ngọn hải đăng -->
          <polygon points="325,120 345,120 340,50 330,50" fill="#ffffff" stroke="#dc2626" stroke-width="2"/>
          <rect x="328" y="42" width="14" height="8" fill="#facc15" stroke="#b45309" stroke-width="1.5"/>
          <text x="200" y="235" text-anchor="middle" font-size="12" font-weight="900" fill="#c2410c">Bước 2: Dựng mỏm đá kiên cố & ngọn hải đăng</text>
        </svg>`
      },
      {
        step: 3,
        title: 'Đoàn Thuyền Buồm Ra Khơi & Sóng Biển',
        detail: 'Vẽ 2-3 chiếc thuyền buồm: chiếc ở gần vẽ to rõ với cánh buồm tam giác no gió; chiếc ở xa vẽ nhỏ xíu gần đường chân trời theo đúng luật xa gần.',
        svgType: 'sea-step3',
        tip: 'Những đường gợn sóng lượn vòng cung sẽ làm mặt biển nhấp nhô vô cùng sinh động.',
        svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="400" height="250" rx="16" fill="#fff7ed"/>
          <line x1="20" y1="120" x2="380" y2="120" stroke="#fdba74" stroke-width="2"/>
          <path d="M 160 120 A 40 40 0 0 1 240 120 Z" fill="#ef4444"/>
          <!-- Thuyền gần -->
          <ellipse cx="140" cy="170" rx="35" ry="10" fill="#78350f" stroke="#451a03" stroke-width="2"/>
          <line x1="140" y1="170" x2="140" y2="130" stroke="#451a03" stroke-width="2"/>
          <polygon points="140,132 165,155 140,165" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
          <!-- Thuyền xa nhỏ -->
          <ellipse cx="260" cy="130" rx="14" ry="4" fill="#78350f"/>
          <polygon points="260,118 270,126 260,128" fill="#f8fafc"/>
          <text x="200" y="235" text-anchor="middle" font-size="12" font-weight="900" fill="#c2410c">Bước 3: Vẽ thuyền buồm gần to - xa nhỏ</text>
        </svg>`
      },
      {
        step: 4,
        title: 'Hòa Sắc Hoàng Hôn Rực Rỡ & Hoàn Thiện',
        detail: 'Tô bầu trời chuyển màu từ đỏ tía, cam lửa sang vàng nghệ. Mặt biển phản chiếu ánh hoàng hôn lấp lánh như dát vàng, cánh hải âu chao liệng.',
        svgType: 'sea-step4',
        tip: 'Tương phản giữa sắc ấm của hoàng hôn và sắc trầm của vách đá làm bức tranh biển đảo có sức lay động mạnh mẽ!',
        svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="sunsetSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#7c2d12"/>
              <stop offset="40%" stop-color="#ea580c"/>
              <stop offset="80%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#fef08a"/>
            </linearGradient>
            <linearGradient id="seaWater" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#c2410c"/>
              <stop offset="30%" stop-color="#0369a1"/>
              <stop offset="100%" stop-color="#0c4a6e"/>
            </linearGradient>
          </defs>
          <rect width="400" height="120" rx="16" fill="url(#sunsetSky)"/>
          <rect y="120" width="400" height="130" fill="url(#seaWater)"/>
          <!-- Mặt trời rực rỡ -->
          <circle cx="200" cy="120" r="32" fill="#ffedd5" filter="drop-shadow(0 0 16px #f97316)"/>
          <!-- Vệt phản chiếu trên nước -->
          <polygon points="180,120 220,120 250,250 150,250" fill="#fde047" opacity="0.35"/>
          <!-- Thuyền buồm no gió -->
          <ellipse cx="120" cy="180" rx="36" ry="9" fill="#451a03"/>
          <line x1="120" y1="180" x2="120" y2="135" stroke="#451a03" stroke-width="2.5"/>
          <polygon points="120,138 150,165 120,174" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <!-- Hải đăng rọi sáng -->
          <polygon points="310,120 390,120 400,250 280,250" fill="#292524"/>
          <polygon points="340,120 360,120 355,55 345,55" fill="#f8fafc"/>
          <rect x="343" y="47" width="14" height="8" fill="#fef08a"/>
          <!-- Tia sáng hải đăng -->
          <polygon points="350,51 180,20 180,50" fill="#fef08a" opacity="0.4"/>
          <text x="200" y="235" text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff">Bước 4: Hoàn thành Biển Đảo Hoàng Hôn Lớp 4!</text>
        </svg>`
      }
    ]
  }
];
