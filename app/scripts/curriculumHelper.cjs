// Helper module for generating complete curriculum dataset
// Compliant with GDPT 2018 (Thông tư 32/2018/TT-BGDĐT) & Công văn 2345/BGDĐT-GDTH
const { getUnitThemeKey, getUnitSpecificIntegrations } = require('./thematicPedagogyMapper.cjs');

function generateUnitSvgByTheme(theme, u) {
  const title = u.title;

  switch (theme) {
    case 'traffic_safety':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <linearGradient id="tfSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#bae6fd"/>
              <stop offset="100%" stop-color="#e2e8f0"/>
            </linearGradient>
            <filter id="tfShadow"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.2"/></filter>
          </defs>
          <rect width="600" height="420" rx="24" fill="url(#tfSky)"/>
          <!-- Road and Crosswalk (Vạch kẻ ngựa vằn) -->
          <rect x="0" y="270" width="600" height="150" fill="#334155"/>
          <line x1="0" y1="345" x2="600" y2="345" stroke="#facc15" stroke-width="4" stroke-dasharray="25 15"/>
          <!-- Zebra crossing -->
          <rect x="180" y="280" width="25" height="130" fill="#ffffff" rx="2"/>
          <rect x="225" y="280" width="25" height="130" fill="#ffffff" rx="2"/>
          <rect x="270" y="280" width="25" height="130" fill="#ffffff" rx="2"/>
          <rect x="315" y="280" width="25" height="130" fill="#ffffff" rx="2"/>
          <rect x="360" y="280" width="25" height="130" fill="#ffffff" rx="2"/>
          <rect x="405" y="280" width="25" height="130" fill="#ffffff" rx="2"/>
          <!-- Traffic Light Pole -->
          <rect x="90" y="60" width="16" height="230" fill="#64748b"/>
          <rect x="68" y="50" width="60" height="145" rx="14" fill="#0f172a" stroke="#334155" stroke-width="3" filter="url(#tfShadow)"/>
          <!-- Red Light (Dừng lại) -->
          <circle cx="98" cy="75" r="16" fill="#ef4444" filter="url(#tfShadow)"/>
          <circle cx="95" cy="71" r="5" fill="#fca5a5" opacity="0.8"/>
          <!-- Yellow Light (Đi chậm) -->
          <circle cx="98" cy="115" r="16" fill="#eab308" filter="url(#tfShadow)"/>
          <circle cx="95" cy="111" r="5" fill="#fef08a" opacity="0.8"/>
          <!-- Green Light (Được đi) -->
          <circle cx="98" cy="155" r="16" fill="#22c55e" filter="url(#tfShadow)"/>
          <circle cx="95" cy="151" r="5" fill="#bbf7d0" opacity="0.8"/>
          <!-- Triangle Warning Sign -->
          <g transform="translate(450, 90)">
            <rect x="40" y="75" width="10" height="190" fill="#64748b"/>
            <polygon points="45,10 5,85 85,85" fill="#facc15" stroke="#dc2626" stroke-width="6"/>
            <!-- Person walking inside sign -->
            <circle cx="45" cy="38" r="5" fill="#0f172a"/>
            <line x1="45" y1="45" x2="45" y2="65" stroke="#0f172a" stroke-width="3.5"/>
            <line x1="45" y1="65" x2="35" y2="80" stroke="#0f172a" stroke-width="3.5"/>
            <line x1="45" y1="65" x2="55" y2="80" stroke="#0f172a" stroke-width="3.5"/>
          </g>
          <!-- Cute School Children with Helmets -->
          <g transform="translate(260, 240)">
            <!-- Boy with blue helmet -->
            <ellipse cx="30" cy="15" rx="16" ry="14" fill="#2563eb"/>
            <circle cx="30" cy="20" r="11" fill="#fed7aa"/>
            <circle cx="26" cy="20" r="1.5" fill="#000000"/>
            <circle cx="34" cy="20" r="1.5" fill="#000000"/>
            <path d="M 27,25 Q 30,28 33,25" stroke="#dc2626" stroke-width="1.5" fill="none"/>
            <rect x="18" y="32" width="24" height="30" rx="6" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
            <polygon points="26,32 30,42 34,32" fill="#ef4444"/> <!-- Red Scarf -->
            <rect x="20" y="62" width="8" height="25" fill="#1e293b"/>
            <rect x="32" y="62" width="8" height="25" fill="#1e293b"/>
          </g>
          <!-- Caption badge -->
          <rect x="130" y="370" width="340" height="34" rx="17" fill="#ffffff" opacity="0.95" filter="url(#tfShadow)"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#dc2626">
            🚦 Tranh Mẫu: An Toàn Giao Thông Là Hạnh Phúc
          </text>
        </svg>
      `;

    case 'communal_house':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <linearGradient id="dhSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fef3c7"/>
              <stop offset="100%" stop-color="#fed7aa"/>
            </linearGradient>
            <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#92400e"/>
              <stop offset="50%" stop-color="#b45309"/>
              <stop offset="100%" stop-color="#78350f"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="url(#dhSky)"/>
          <!-- Ancient Banyan Tree silhouette -->
          <path d="M 20,380 Q 50,220 10,130" stroke="#78350f" stroke-width="18" fill="none"/>
          <circle cx="30" cy="110" r="50" fill="#15803d" opacity="0.7"/>
          <!-- Communal House Platform -->
          <rect x="80" y="310" width="460" height="60" fill="#cbd5e1" stroke="#64748b" stroke-width="3"/>
          <line x1="80" y1="335" x2="540" y2="335" stroke="#94a3b8" stroke-width="2"/>
          <!-- Wooden Lim Pillars (Cột gỗ lim đình làng) -->
          <rect x="130" y="190" width="22" height="120" rx="4" fill="url(#woodGrad)"/>
          <rect x="230" y="190" width="22" height="120" rx="4" fill="url(#woodGrad)"/>
          <rect x="370" y="190" width="22" height="120" rx="4" fill="url(#woodGrad)"/>
          <rect x="470" y="190" width="22" height="120" rx="4" fill="url(#woodGrad)"/>
          <!-- Carved Dragon Relief Plaque (Bức chạm khắc rồng gỗ) -->
          <rect x="265" y="210" width="90" height="75" rx="6" fill="#fde68a" stroke="#b45309" stroke-width="3"/>
          <path d="M 275,260 Q 295,220 315,250 T 345,230" stroke="#b45309" stroke-width="4" fill="none"/>
          <circle cx="342" cy="228" r="4" fill="#991b1b"/>
          <!-- Ancient Curved Roof (Mái đình cong vút ngói vảy rồng) -->
          <path d="M 60,200 Q 310,130 560,200 L 520,150 Q 310,90 100,150 Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="4"/>
          <!-- Curved Eaves (Đầu đao mái đình cong vút) -->
          <path d="M 60,200 Q 40,165 75,150" stroke="#b91c1c" stroke-width="8" stroke-linecap="round" fill="none"/>
          <path d="M 560,200 Q 580,165 545,150" stroke="#b91c1c" stroke-width="8" stroke-linecap="round" fill="none"/>
          <!-- Dragon carving on ridge -->
          <circle cx="310" cy="98" r="9" fill="#f59e0b"/>
          <path d="M 280,110 Q 310,95 340,110" stroke="#f59e0b" stroke-width="4" fill="none"/>
          <!-- Caption badge -->
          <rect x="120" y="370" width="360" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#92400e">
            🏛️ Điêu Khắc Đình Làng: Chạm Khắc Gỗ Dân Gian
          </text>
        </svg>
      `;

    case 'folk_art':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <radialGradient id="diepPaper" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stop-color="#fffbeb"/>
              <stop offset="60%" stop-color="#fef3c7"/>
              <stop offset="100%" stop-color="#fde68a"/>
            </radialGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="#7f1d1d"/>
          <!-- Điệp paper inside frame -->
          <rect x="35" y="25" width="530" height="370" rx="16" fill="url(#diepPaper)" stroke="#f59e0b" stroke-width="5"/>
          <!-- Traditional Folk Rooster (Gà trống Đại Cát Đông Hồ) -->
          <g transform="translate(190, 80)">
            <!-- Tail feathers (5 folk colors: Red, Green, Yellow, Indigo, Charcoal) -->
            <path d="M 60,140 Q -40,100 10,20 Q 30,90 70,120 Z" fill="#15803d"/>
            <path d="M 70,135 Q 0,70 60,0 Q 60,70 85,120 Z" fill="#2563eb"/>
            <path d="M 80,130 Q 30,50 110,-10 Q 90,60 95,120 Z" fill="#eab308"/>
            <path d="M 90,130 Q 80,40 160,10 Q 120,70 105,125 Z" fill="#dc2626"/>
            <!-- Body -->
            <ellipse cx="120" cy="155" rx="50" ry="40" fill="#eab308" stroke="#1e293b" stroke-width="3"/>
            <ellipse cx="125" cy="155" rx="35" ry="25" fill="#dc2626"/>
            <!-- Neck & Head -->
            <path d="M 140,140 Q 170,100 160,70 Q 140,75 125,125 Z" fill="#eab308" stroke="#1e293b" stroke-width="2"/>
            <circle cx="160" cy="65" r="14" fill="#dc2626"/>
            <!-- Eye -->
            <circle cx="163" cy="62" r="4" fill="#ffffff"/>
            <circle cx="163" cy="62" r="2" fill="#000000"/>
            <!-- Golden Beak -->
            <polygon points="172,60 188,65 172,70" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
            <!-- Comb (Mào gà đỏ rực) -->
            <path d="M 155,52 C 150,35 162,35 165,45 C 168,32 180,35 175,52 Z" fill="#b91c1c"/>
            <!-- Strong Legs & Claws -->
            <line x1="110" y1="195" x2="105" y2="240" stroke="#f59e0b" stroke-width="5"/>
            <line x1="135" y1="195" x2="140" y2="240" stroke="#f59e0b" stroke-width="5"/>
            <path d="M 105,240 L 85,250 M 105,240 L 105,255 M 105,240 L 120,250" stroke="#f59e0b" stroke-width="4"/>
            <path d="M 140,240 L 125,250 M 140,240 L 145,255 M 140,240 L 155,248" stroke="#f59e0b" stroke-width="4"/>
          </g>
          <!-- Han-Nom seal stamp (Dấu mộc Đại Cát) -->
          <rect x="70" y="60" width="55" height="55" fill="#dc2626" rx="6"/>
          <text x="97" y="85" font-family="serif" font-size="16" font-weight="900" text-anchor="middle" fill="#ffffff">ĐẠI</text>
          <text x="97" y="105" font-family="serif" font-size="16" font-weight="900" text-anchor="middle" fill="#ffffff">CÁT</text>
          <!-- Caption badge -->
          <rect x="130" y="355" width="340" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="377" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#7f1d1d">
            🏮 Tranh Dân Gian Đông Hồ: Chú Gà Trống Đại Cát
          </text>
        </svg>
      `;

    case 'ethnic_patterns':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <linearGradient id="brocadeBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0f172a"/>
              <stop offset="100%" stop-color="#1e1b4b"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="url(#brocadeBg)"/>
          <!-- Ethnic Brocade Belt Pattern (Dải hoa văn dệt thổ cẩm) -->
          <!-- Top Row Zic-zac -->
          <path d="M 0,60 L 30,90 L 60,60 L 90,90 L 120,60 L 150,90 L 180,60 L 210,90 L 240,60 L 270,90 L 300,60 L 330,90 L 360,60 L 390,90 L 420,60 L 450,90 L 480,60 L 510,90 L 540,60 L 570,90 L 600,60" stroke="#f43f5e" stroke-width="6" fill="none"/>
          <!-- Center Diamond Matrix (Hàng hoa văn quả trám đối xứng) -->
          ${[50, 150, 250, 350, 450, 550].map(x => `
            <polygon points="${x},190 ${x + 40},150 ${x + 80},190 ${x + 40},230" fill="#facc15" stroke="#ef4444" stroke-width="4"/>
            <polygon points="${x + 15},190 ${x + 40},165 ${x + 65},190 ${x + 40},215" fill="#38bdf8"/>
            <circle cx="${x + 40}" cy="190" r="8" fill="#ffffff"/>
          `).join('')}
          <!-- 8-pointed star in ethnic motif -->
          <g transform="translate(300, 290)">
            <polygon points="0,-35 8,-12 35,0 8,12 0,35 -8,12 -35,0 -8,-12" fill="#ec4899"/>
            <circle cx="0" cy="0" r="6" fill="#fde047"/>
          </g>
          <!-- Bottom Row Zic-zac -->
          <path d="M 0,320 L 30,350 L 60,320 L 90,350 L 120,320 L 150,350 L 180,320 L 210,350 L 240,320 L 270,350 L 300,320 L 330,350 L 360,320 L 390,350 L 420,320 L 450,350 L 480,320 L 510,350 L 540,320 L 570,350 L 600,320" stroke="#10b981" stroke-width="6" fill="none"/>
          <!-- Caption badge -->
          <rect x="110" y="370" width="380" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#0f172a">
            🧵 Hoa Văn Thổ Cẩm: Bản Sắc Trang Phục Dân Tộc
          </text>
        </svg>
      `;

    case 'fruits':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <linearGradient id="fruitBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fef9c3"/>
              <stop offset="100%" stop-color="#fee2e2"/>
            </linearGradient>
            <radialGradient id="appleGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#f87171"/>
              <stop offset="70%" stop-color="#dc2626"/>
              <stop offset="100%" stop-color="#991b1b"/>
            </radialGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="url(#fruitBg)"/>
          <!-- Wooden Table -->
          <rect x="0" y="290" width="600" height="130" fill="#b45309"/>
          <!-- Big Ceramic Fruit Bowl (Đĩa hoa quả) -->
          <ellipse cx="300" cy="290" rx="210" ry="45" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
          <!-- Watermelon Slice (Miếng dưa hấu đỏ tươi) -->
          <g transform="translate(180, 160)">
            <path d="M 0,80 A 100,100 0 0,0 200,80 Z" fill="#15803d" stroke="#14532d" stroke-width="3"/>
            <path d="M 8,76 A 92,92 0 0,0 192,76 Z" fill="#ffffff"/>
            <path d="M 16,72 A 84,84 0 0,0 184,72 Z" fill="#ef4444"/>
            <!-- Black seeds -->
            <ellipse cx="60" cy="45" rx="3" ry="5" fill="#0f172a"/>
            <ellipse cx="100" cy="55" rx="3" ry="5" fill="#0f172a"/>
            <ellipse cx="140" cy="45" rx="3" ry="5" fill="#0f172a"/>
          </g>
          <!-- Red Apple (Quả táo đỏ) -->
          <g transform="translate(130, 200)">
            <circle cx="45" cy="45" r="42" fill="url(#appleGrad)"/>
            <path d="M 45,5 Q 50,-15 65,-10" stroke="#78350f" stroke-width="4" stroke-linecap="round" fill="none"/>
            <ellipse cx="58" cy="-5" rx="8" ry="4" transform="rotate(-30 58 -5)" fill="#22c55e"/>
          </g>
          <!-- Yellow Bananas (Nải chuối vàng cong) -->
          <g transform="translate(330, 180)">
            <path d="M 10,70 Q 70,30 140,80 Q 70,50 10,70 Z" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
            <path d="M 0,85 Q 70,40 145,95 Q 70,65 0,85 Z" fill="#eab308" stroke="#a16207" stroke-width="2"/>
            <circle cx="10" cy="70" r="4" fill="#713f12"/>
          </g>
          <!-- Purple Grape Cluster (Chùm nho tím) -->
          <g transform="translate(260, 220)">
            <circle cx="15" cy="15" r="13" fill="#8b5cf6"/>
            <circle cx="35" cy="15" r="13" fill="#7c3aed"/>
            <circle cx="55" cy="15" r="13" fill="#6d28d9"/>
            <circle cx="25" cy="35" r="13" fill="#7c3aed"/>
            <circle cx="45" cy="35" r="13" fill="#6d28d9"/>
            <circle cx="35" cy="55" r="13" fill="#5b21b6"/>
          </g>
          <!-- Caption badge -->
          <rect x="130" y="370" width="340" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#991b1b">
            🍎 Tranh Tĩnh Vật: Hương Sắc Hoa Quả Nhiệt Đới
          </text>
        </svg>
      `;

    case 'family_meal':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <linearGradient id="mealBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fff7ed"/>
              <stop offset="100%" stop-color="#ffedd5"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="url(#mealBg)"/>
          <!-- Window with peaceful landscape outside -->
          <rect x="180" y="30" width="240" height="110" rx="10" fill="#bae6fd" stroke="#94a3b8" stroke-width="4"/>
          <circle cx="240" cy="70" r="22" fill="#facc15"/>
          <polygon points="180,120 280,90 380,120" fill="#86efac"/>
          <!-- Cozy Family Dining Table -->
          <ellipse cx="300" cy="270" rx="210" ry="75" fill="#f97316" stroke="#c2410c" stroke-width="6"/>
          <!-- Dishes of food (Mâm cơm ấm cúng) -->
          <!-- Soup bowl in center -->
          <circle cx="300" cy="265" r="38" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
          <circle cx="300" cy="265" r="32" fill="#fef08a"/>
          <circle cx="295" cy="260" r="5" fill="#ef4444"/>
          <circle cx="308" cy="270" r="6" fill="#22c55e"/>
          <!-- Steamed rice bowls around -->
          <circle cx="210" cy="245" r="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <ellipse cx="210" cy="242" rx="16" ry="10" fill="#f8fafc"/>
          <circle cx="390" cy="245" r="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <circle cx="250" cy="295" r="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <circle cx="350" cy="295" r="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <!-- Family silhouettes holding chopsticks happily -->
          <g transform="translate(100, 140)">
            <!-- Mother -->
            <circle cx="30" cy="30" r="20" fill="#f472b6"/>
            <path d="M 10,75 C 10,50 50,50 50,75 Z" fill="#db2777"/>
          </g>
          <g transform="translate(430, 140)">
            <!-- Father -->
            <circle cx="30" cy="30" r="20" fill="#60a5fa"/>
            <path d="M 10,75 C 10,50 50,50 50,75 Z" fill="#2563eb"/>
          </g>
          <!-- Children in front -->
          <g transform="translate(270, 310)">
            <circle cx="30" cy="20" r="16" fill="#facc15"/>
            <path d="M 15,55 C 15,35 45,35 45,55 Z" fill="#ea580c"/>
          </g>
          <!-- Caption badge -->
          <rect x="130" y="370" width="340" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#c2410c">
            🍲 Bức Họa: Bữa Cơm Gia Đình Đầm Ấm Yêu Thương
          </text>
        </svg>
      `;

    case 'teachers_day':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <linearGradient id="tcBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#eff6ff"/>
              <stop offset="100%" stop-color="#fdf4ff"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="url(#tcBg)"/>
          <!-- Blackboard with chalk text -->
          <rect x="80" y="40" width="440" height="150" rx="10" fill="#1e3a5f" stroke="#78350f" stroke-width="10"/>
          <text x="300" y="85" font-family="Nunito, sans-serif" font-size="20" font-weight="900" text-anchor="middle" fill="#fde047">
            TRI ÂN THẦY CÔ GIÁO 20/11
          </text>
          <text x="300" y="125" font-family="Nunito, sans-serif" font-size="14" font-weight="700" text-anchor="middle" fill="#ffffff">
            "Nét chữ nết người - Công ơn dạy dỗ biển trời"
          </text>
          <!-- Teacher smiling at lectern -->
          <g transform="translate(140, 160)">
            <circle cx="45" cy="40" r="30" fill="#fed7aa"/>
            <!-- Hair -->
            <path d="M 15,35 C 15,0 75,0 75,35 C 75,15 15,15 15,35 Z" fill="#1e293b"/>
            <!-- Smile & Eyes -->
            <circle cx="36" cy="40" r="3" fill="#000000"/>
            <circle cx="54" cy="40" r="3" fill="#000000"/>
            <path d="M 38,52 Q 45,60 52,52" stroke="#dc2626" stroke-width="2.5" fill="none"/>
            <!-- Ao dai / Suit -->
            <path d="M 15,100 C 15,70 75,70 75,100 L 75,160 L 15,160 Z" fill="#ec4899"/>
          </g>
          <!-- Student giving huge bouquet of roses and score 10 -->
          <g transform="translate(360, 190)">
            <circle cx="40" cy="35" r="24" fill="#fed7aa"/>
            <circle cx="33" cy="35" r="2.5" fill="#000000"/>
            <circle cx="47" cy="35" r="2.5" fill="#000000"/>
            <path d="M 35,46 Q 40,51 45,46" stroke="#dc2626" stroke-width="2" fill="none"/>
            <rect x="25" y="60" width="30" height="40" rx="6" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
            <polygon points="36,60 40,70 44,60" fill="#ef4444"/>
            <!-- Flower bouquet -->
            <ellipse cx="0" cy="65" rx="35" ry="25" fill="#f43f5e"/>
            <circle cx="-10" cy="55" r="12" fill="#ef4444"/>
            <circle cx="10" cy="55" r="12" fill="#f43f5e"/>
            <circle cx="0" cy="72" r="12" fill="#e11d48"/>
            <circle cx="-20" cy="68" r="10" fill="#fb7185"/>
            <!-- Big Golden Star 10 -->
            <circle cx="20" cy="35" r="14" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
            <text x="20" y="40" font-family="Nunito, sans-serif" font-size="12" font-weight="900" text-anchor="middle" fill="#b91c1c">10</text>
          </g>
          <!-- Caption badge -->
          <rect x="130" y="370" width="340" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#be185d">
            🌺 Tranh Chủ Đề: Bông Hoa Điểm 10 Dâng Tặng Thầy Cô
          </text>
        </svg>
      `;

    case 'school_life':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <linearGradient id="scSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#60a5fa"/>
              <stop offset="60%" stop-color="#bae6fd"/>
              <stop offset="100%" stop-color="#bbf7d0"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="url(#scSky)"/>
          <!-- School Yard -->
          <rect x="0" y="280" width="600" height="140" fill="#86efac"/>
          <!-- School Building (Mái trường ngói đỏ thân yêu) -->
          <rect x="120" y="140" width="360" height="150" fill="#fef08a" stroke="#ca8a04" stroke-width="4"/>
          <polygon points="90,140 300,50 510,140" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
          <!-- School Door & Windows -->
          <rect x="260" y="210" width="80" height="80" fill="#78350f"/>
          <rect x="150" y="170" width="50" height="45" fill="#67e8f9" stroke="#0284c7" stroke-width="2"/>
          <rect x="400" y="170" width="50" height="45" fill="#67e8f9" stroke="#0284c7" stroke-width="2"/>
          <!-- Big Clock on school gable -->
          <circle cx="300" cy="115" r="22" fill="#ffffff" stroke="#991b1b" stroke-width="3"/>
          <line x1="300" y1="115" x2="300" y2="102" stroke="#000000" stroke-width="2"/>
          <line x1="300" y1="115" x2="310" y2="115" stroke="#000000" stroke-width="2"/>
          <!-- Flagpole (Cột cờ Tổ quốc bay phấp phới) -->
          <line x1="60" y1="90" x2="60" y2="300" stroke="#64748b" stroke-width="4"/>
          <rect x="62" y="90" width="45" height="30" fill="#dc2626"/>
          <polygon points="84,100 87,108 96,108 89,113 91,121 84,116 77,121 79,113 72,108 81,108" fill="#fde047"/>
          <!-- Shady Bàng Tree -->
          <rect x="520" y="210" width="20" height="90" fill="#78350f"/>
          <circle cx="530" cy="180" r="45" fill="#15803d"/>
          <!-- Caption badge -->
          <rect x="130" y="370" width="340" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#1e3a8a">
            🏫 Tranh Chủ Đề: Mái Trường Tiểu Học Mến Yêu
          </text>
        </svg>
      `;

    case 'national_hero':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <radialGradient id="heroSun" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="50%" stop-color="#f97316"/>
              <stop offset="100%" stop-color="#b91c1c"/>
            </radialGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="url(#heroSun)"/>
          <!-- Bronze Drum Sacred Motif (Vòng tròn Trống Đồng Đông Sơn hào hùng) -->
          <circle cx="300" cy="200" r="170" fill="none" stroke="#facc15" stroke-width="3" opacity="0.5"/>
          <circle cx="300" cy="200" r="140" fill="none" stroke="#facc15" stroke-width="2" stroke-dasharray="10 6" opacity="0.6"/>
          <circle cx="300" cy="200" r="100" fill="none" stroke="#facc15" stroke-width="2" opacity="0.5"/>
          <!-- Sun star in center of bronze drum -->
          <polygon points="300,165 308,192 335,200 308,208 300,235 292,208 265,200 292,192" fill="#facc15" opacity="0.6"/>
          <!-- Hero on rearing iron horse (Hình tượng Thánh Gióng cưỡi ngựa sắt xông trận) -->
          <g transform="translate(180, 100)">
            <!-- Iron Horse rearing -->
            <path d="M 120,180 L 140,240 M 150,180 L 175,240" stroke="#0f172a" stroke-width="12" stroke-linecap="round"/>
            <path d="M 60,170 C 50,110 130,90 170,120 C 190,140 180,180 120,180 Z" fill="#0f172a"/>
            <!-- Horse head and neck high -->
            <path d="M 150,120 L 210,60 L 230,85 L 180,140 Z" fill="#0f172a"/>
            <!-- Horse mane fiery -->
            <path d="M 170,75 L 185,50 M 185,90 L 205,65" stroke="#ef4444" stroke-width="4"/>
            <!-- Hero wielding bamboo trunk -->
            <path d="M 120,70 L 140,130" stroke="#0f172a" stroke-width="14" stroke-linecap="round"/>
            <circle cx="120" cy="55" r="16" fill="#0f172a"/>
            <!-- Bamboo weapon (Bụi tre ngà) -->
            <line x1="80" y1="20" x2="210" y2="150" stroke="#84cc16" stroke-width="7" stroke-linecap="round"/>
            <!-- Red cape fluttering -->
            <path d="M 110,65 Q 40,80 10,40 Q 60,100 115,80 Z" fill="#dc2626"/>
          </g>
          <!-- Caption badge -->
          <rect x="100" y="370" width="400" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#b91c1c">
            ⚔️ Tượng Đài: Hình Tượng Anh Hùng Dân Tộc Hào Hùng
          </text>
        </svg>
      `;

    case 'recycled_toy_animals':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <linearGradient id="toyBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ccfbf1"/>
              <stop offset="100%" stop-color="#fef08a"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="url(#toyBg)"/>
          <!-- Craft Studio Table -->
          <rect x="0" y="270" width="600" height="150" fill="#f59e0b"/>
          <!-- Recycled Turtle (Chú rùa từ đĩa giấy và nắp chai) -->
          <g transform="translate(100, 180)">
            <!-- Paper plate shell with colored clay dots -->
            <ellipse cx="90" cy="70" rx="65" ry="45" fill="#22c55e" stroke="#15803d" stroke-width="4"/>
            <!-- Hexagonal patterns on shell -->
            <circle cx="90" cy="70" r="14" fill="#facc15"/>
            <circle cx="60" cy="60" r="10" fill="#38bdf8"/>
            <circle cx="120" cy="60" r="10" fill="#ec4899"/>
            <circle cx="70" cy="85" r="10" fill="#fb923c"/>
            <circle cx="110" cy="85" r="10" fill="#a855f7"/>
            <!-- Bottle cap head -->
            <circle cx="165" cy="70" r="18" fill="#15803d"/>
            <circle cx="168" cy="65" r="4" fill="#ffffff"/>
            <circle cx="169" cy="65" r="2" fill="#000000"/>
            <!-- 4 flippers (Chân chèo) -->
            <ellipse cx="40" cy="45" rx="18" ry="10" fill="#16a34a"/>
            <ellipse cx="140" cy="45" rx="18" ry="10" fill="#16a34a"/>
            <ellipse cx="40" cy="95" rx="18" ry="10" fill="#16a34a"/>
            <ellipse cx="140" cy="95" rx="18" ry="10" fill="#16a34a"/>
          </g>
          <!-- Recycled Elephant from paper cup & milk box -->
          <g transform="translate(340, 150)">
            <!-- Milk box body -->
            <rect x="50" y="40" width="90" height="85" rx="12" fill="#38bdf8" stroke="#0284c7" stroke-width="4"/>
            <!-- Legs (Bottle caps) -->
            <rect x="55" y="125" width="22" height="30" rx="6" fill="#f43f5e"/>
            <rect x="110" y="125" width="22" height="30" rx="6" fill="#f43f5e"/>
            <!-- Head & Trunk (Cốc giấy làm đầu & vòi voi) -->
            <circle cx="40" cy="65" r="28" fill="#67e8f9" stroke="#0284c7" stroke-width="3"/>
            <!-- Curved trunk (Vòi voi) -->
            <path d="M 25,75 Q -5,110 15,120 Q 30,120 20,95" fill="#38bdf8"/>
            <!-- Big Ear -->
            <ellipse cx="60" cy="55" rx="20" ry="26" fill="#f472b6"/>
            <!-- Eye -->
            <circle cx="32" cy="58" r="4" fill="#ffffff"/>
            <circle cx="32" cy="58" r="2" fill="#000000"/>
          </g>
          <!-- Caption badge -->
          <rect x="120" y="370" width="360" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#0f766e">
            🐘 Sáng Tạo: Đồ Chơi Con Vật Từ Vật Liệu Tái Chế
          </text>
        </svg>
      `;

    case 'noble_deeds':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <linearGradient id="nbBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#1e1b4b"/>
              <stop offset="60%" stop-color="#312e81"/>
              <stop offset="100%" stop-color="#ca8a04"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="url(#nbBg)"/>
          <!-- Street light casting warm glow -->
          <line x1="120" y1="50" x2="120" y2="330" stroke="#94a3b8" stroke-width="6"/>
          <circle cx="120" cy="50" r="16" fill="#fde047"/>
          <polygon points="60,330 180,330 120,50" fill="#fef08a" opacity="0.25"/>
          <!-- Street pavement -->
          <rect x="0" y="300" width="600" height="120" fill="#334155"/>
          <!-- Dedicated sanitation worker cleaning street (Bác lao công quét rác) -->
          <g transform="translate(180, 180)">
            <!-- Head & Conical hat (Nón lá) -->
            <polygon points="50,15 10,40 90,40" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
            <circle cx="50" cy="45" r="12" fill="#fed7aa"/>
            <!-- Protective vest with reflective stripes -->
            <path d="M 30,60 L 70,60 L 75,120 L 25,120 Z" fill="#15803d"/>
            <line x1="26" y1="85" x2="74" y2="85" stroke="#facc15" stroke-width="4"/>
            <!-- Broom sweeping fallen leaves (Chổi tre) -->
            <line x1="60" y1="80" x2="110" y2="140" stroke="#78350f" stroke-width="5"/>
            <polygon points="110,140 135,160 95,160" fill="#ca8a04"/>
            <!-- Garbage cart -->
            <rect x="135" y="105" width="70" height="50" rx="6" fill="#64748b"/>
            <circle cx="150" cy="155" r="12" fill="#0f172a"/>
            <circle cx="190" cy="155" r="12" fill="#0f172a"/>
          </g>
          <!-- Golden Stars showing kindness & noble duty -->
          <polygon points="420,100 425,115 440,115 428,124 432,138 420,128 408,138 412,124 400,115 415,115" fill="#facc15"/>
          <polygon points="480,140 484,152 496,152 486,160 490,172 480,164 470,172 474,160 464,152 476,152" fill="#fde047"/>
          <!-- Caption badge -->
          <rect x="110" y="370" width="380" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#1e1b4b">
            🌟 Tranh Chủ Đề: Việc Làm Bình Dị Mà Cao Quý
          </text>
        </svg>
      `;

    case 'dots_ladybug':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <radialGradient id="leafGrad2" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#4ade80"/>
              <stop offset="100%" stop-color="#15803d"/>
            </radialGradient>
            <radialGradient id="shellGrad2" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#f87171"/>
              <stop offset="70%" stop-color="#ef4444"/>
              <stop offset="100%" stop-color="#991b1b"/>
            </radialGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="#fef9c3"/>
          <path d="M 60,380 C 120,200 280,120 540,160 C 500,320 320,400 60,380 Z" fill="url(#leafGrad2)"/>
          <path d="M 80,360 Q 300,260 520,180" stroke="#86efac" stroke-width="5" stroke-linecap="round" fill="none"/>
          <!-- Ladybug -->
          <ellipse cx="300" cy="240" rx="95" ry="90" fill="url(#shellGrad2)"/>
          <circle cx="300" cy="155" r="42" fill="#1e293b"/>
          <circle cx="285" cy="145" r="7" fill="#ffffff"/>
          <circle cx="286" cy="145" r="4" fill="#000000"/>
          <circle cx="315" cy="145" r="7" fill="#ffffff"/>
          <circle cx="314" cy="145" r="4" fill="#000000"/>
          <line x1="300" y1="155" x2="300" y2="330" stroke="#0f172a" stroke-width="5"/>
          <circle cx="250" cy="210" r="16" fill="#0f172a"/>
          <circle cx="350" cy="210" r="16" fill="#0f172a"/>
          <circle cx="230" cy="270" r="18" fill="#0f172a"/>
          <circle cx="370" cy="270" r="18" fill="#0f172a"/>
          <circle cx="275" cy="305" r="13" fill="#0f172a"/>
          <circle cx="325" cy="305" r="13" fill="#0f172a"/>
          <rect x="150" y="370" width="300" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#991b1b">
            🔴 Tranh Chấm Màu: Chú Bọ Rùa Chấm Đen
          </text>
        </svg>
      `;

    case 'portrait_face':
    case 'family_portrait':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <linearGradient id="ptBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fdf4ff"/>
              <stop offset="100%" stop-color="#fae8ff"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="url(#ptBg)"/>
          <!-- Family portrait frame -->
          <g transform="translate(140, 90)">
            <!-- Mother -->
            <circle cx="90" cy="100" r="45" fill="#fed7aa"/>
            <path d="M 45,95 C 45,45 135,45 135,95 C 135,70 45,70 45,95 Z" fill="#78350f"/>
            <circle cx="75" cy="100" r="4.5" fill="#0f172a"/>
            <circle cx="105" cy="100" r="4.5" fill="#0f172a"/>
            <path d="M 80,120 Q 90,130 100,120" stroke="#e11d48" stroke-width="3" fill="none"/>
            <path d="M 40,195 C 40,140 140,140 140,195 Z" fill="#ec4899"/>
            <!-- Father -->
            <circle cx="230" cy="90" r="48" fill="#fed7aa"/>
            <path d="M 182,75 C 182,30 278,30 278,75 Z" fill="#1e293b"/>
            <circle cx="215" cy="90" r="4.5" fill="#0f172a"/>
            <circle cx="245" cy="90" r="4.5" fill="#0f172a"/>
            <path d="M 220,110 Q 230,120 240,110" stroke="#dc2626" stroke-width="3" fill="none"/>
            <path d="M 175,195 C 175,130 285,130 285,195 Z" fill="#2563eb"/>
            <!-- Little child in center front -->
            <circle cx="160" cy="160" r="32" fill="#fed7aa"/>
            <circle cx="150" cy="160" r="3.5" fill="#0f172a"/>
            <circle cx="170" cy="160" r="3.5" fill="#0f172a"/>
            <path d="M 153,173 Q 160,180 167,173" stroke="#e11d48" stroke-width="2.5" fill="none"/>
            <path d="M 125,230 C 125,185 195,185 195,230 Z" fill="#facc15"/>
          </g>
          <rect x="130" y="370" width="340" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#831843">
            👨‍👩‍👧 Tranh Chân Dung: Người Thân Yêu Trong Gia Đình
          </text>
        </svg>
      `;

    case 'lines_rhythm':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <defs>
            <linearGradient id="netBg2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#e0e7ff"/>
              <stop offset="100%" stop-color="#fef3c7"/>
            </linearGradient>
          </defs>
          <rect width="600" height="420" rx="24" fill="url(#netBg2)"/>
          <circle cx="120" cy="110" r="48" fill="#facc15"/>
          <path d="M 0,260 C 100,220 200,300 300,260 C 400,220 500,300 600,260 L 600,420 L 0,420 Z" fill="#38bdf8" opacity="0.6"/>
          <path d="M 0,290 C 80,330 180,260 280,300 C 380,340 480,270 600,300 L 600,420 L 0,420 Z" fill="#0284c7" opacity="0.8"/>
          <path d="M 330,240 L 330,150 L 410,240 Z" fill="#ef4444"/>
          <path d="M 320,240 L 320,170 L 260,240 Z" fill="#f59e0b"/>
          <path d="M 240,245 L 430,245 L 390,275 L 280,275 Z" fill="#1e293b"/>
          <rect x="150" y="370" width="300" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#1e3a8a">
            🌊 Vũ Điệu Của Các Đường Nét Thần Kì
          </text>
        </svg>
      `;

    case 'geometric_house':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <rect width="600" height="420" rx="24" fill="#bae6fd"/>
          <rect x="0" y="300" width="600" height="120" fill="#4ade80"/>
          <rect x="180" y="190" width="160" height="120" rx="6" fill="#fb923c" stroke="#c2410c" stroke-width="4"/>
          <polygon points="160,195 260,95 360,195" fill="#ef4444" stroke="#991b1b" stroke-width="4"/>
          <rect x="235" y="240" width="50" height="70" rx="4" fill="#78350f"/>
          <circle cx="480" cy="95" r="45" fill="#facc15" stroke="#eab308" stroke-width="4"/>
          <rect x="420" y="240" width="24" height="70" fill="#92400e"/>
          <polygon points="380,245 432,150 484,245" fill="#15803d"/>
          <rect x="140" y="370" width="320" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#c2410c">
            🏡 Ngôi Nhà Từ Các Hình Học Cơ Bản
          </text>
        </svg>
      `;

    case 'color_wheel':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <rect width="600" height="420" rx="24" fill="#1e1b4b"/>
          <circle cx="240" cy="180" r="95" fill="#ef4444" opacity="0.85"/>
          <circle cx="360" cy="180" r="95" fill="#eab308" opacity="0.85"/>
          <circle cx="300" cy="275" r="95" fill="#3b82f6" opacity="0.85"/>
          <text x="190" y="150" font-family="Nunito, sans-serif" font-size="18" font-weight="900" fill="#ffffff">ĐỎ</text>
          <text x="390" y="150" font-family="Nunito, sans-serif" font-size="18" font-weight="900" fill="#ffffff">VÀNG</text>
          <text x="300" y="345" font-family="Nunito, sans-serif" font-size="18" font-weight="900" fill="#ffffff">LAM</text>
          <rect x="140" y="370" width="320" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#312e81">
            🎨 3 Màu Gốc & Phép Màu Hòa Sắc
          </text>
        </svg>
      `;

    case 'geometric_3d_forms':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <rect width="600" height="420" rx="24" fill="#f1f5f9"/>
          <g transform="translate(70, 150)">
            <polygon points="90,10 150,40 90,70 30,40" fill="#60a5fa"/>
            <polygon points="30,40 90,70 90,130 30,100" fill="#2563eb"/>
            <polygon points="90,70 150,40 150,100 90,130" fill="#1d4ed8"/>
          </g>
          <g transform="translate(260, 120)">
            <circle cx="65" cy="95" r="65" fill="#db2777"/>
          </g>
          <g transform="translate(420, 140)">
            <path d="M 5,40 L 5,120 A 45,18 0 0,0 95,120 L 95,40 Z" fill="#059669"/>
            <ellipse cx="50" cy="40" rx="45" ry="18" fill="#34d399"/>
          </g>
          <rect x="140" y="370" width="320" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#0f172a">
            📦 Thế Giới Khối Hình Học 3D Không Gian
          </text>
        </svg>
      `;

    case 'landscape_homeland':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <rect width="600" height="420" rx="24" fill="#fdba74"/>
          <polygon points="0,210 120,130 250,210" fill="#93c5fd" opacity="0.7"/>
          <polygon points="180,210 320,110 460,210" fill="#60a5fa" opacity="0.6"/>
          <polygon points="0,210 600,210 600,340 0,340" fill="#facc15"/>
          <path d="M 330,210 Q 280,260 360,300 T 260,420 L 400,420 Q 480,310 410,260 T 350,210 Z" fill="#38bdf8"/>
          <rect x="140" y="370" width="320" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#1e3a8a">
            🌾 Cảnh Sắc Quê Hương Thanh Bình Tươi Đẹp
          </text>
        </svg>
      `;

    case 'environment_green':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <rect width="600" height="420" rx="24" fill="#bae6fd"/>
          <circle cx="300" cy="190" r="95" fill="#38bdf8" stroke="#0284c7" stroke-width="5"/>
          <path d="M 250,140 Q 290,130 310,160 Q 320,190 280,200 Q 240,180 250,140 Z" fill="#22c55e"/>
          <path d="M 170,300 C 190,230 250,270 290,290 C 260,340 190,340 170,300 Z" fill="#fed7aa"/>
          <path d="M 430,300 C 410,230 350,270 310,290 C 340,340 410,340 430,300 Z" fill="#fed7aa"/>
          <rect x="140" y="370" width="320" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#15803d">
            🌱 Chung Tay Bảo Vệ Môi Trường Xanh
          </text>
        </svg>
      `;

    case 'peace_world':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <rect width="600" height="420" rx="24" fill="#38bdf8"/>
          <ellipse cx="300" cy="200" rx="35" ry="50" fill="#ffffff"/>
          <path d="M 300,190 C 230,110 150,140 180,210 C 210,230 260,210 300,190 Z" fill="#ffffff"/>
          <path d="M 300,190 C 370,110 450,140 420,210 C 390,230 340,210 300,190 Z" fill="#f8fafc"/>
          <rect x="140" y="370" width="320" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#0284c7">
            🕊️ Cánh Chim Bồ Câu Hòa Bình & Tự Do
          </text>
        </svg>
      `;

    case 'art_supplies':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <rect width="600" height="420" rx="24" fill="#eff6ff"/>
          <!-- Palette gỗ nghệ thuật -->
          <ellipse cx="300" cy="210" rx="210" ry="140" fill="#fde68a" stroke="#d97706" stroke-width="6"/>
          <!-- Lỗ xỏ ngón tay -->
          <ellipse cx="430" cy="220" rx="26" ry="36" fill="#eff6ff" stroke="#d97706" stroke-width="4"/>
          <!-- Các vệt màu trên Palette -->
          <circle cx="170" cy="180" r="26" fill="#ef4444"/>
          <circle cx="210" cy="130" r="26" fill="#f97316"/>
          <circle cx="280" cy="115" r="26" fill="#facc15"/>
          <circle cx="350" cy="125" r="26" fill="#22c55e"/>
          <circle cx="405" cy="165" r="24" fill="#3b82f6"/>
          <circle cx="200" cy="250" r="24" fill="#a855f7"/>
          <circle cx="270" cy="280" r="25" fill="#ec4899"/>
          <!-- Cọ vẽ mĩ thuật bắt chéo -->
          <line x1="120" y1="360" x2="480" y2="70" stroke="#78350f" stroke-width="12" stroke-linecap="round"/>
          <polygon points="460,85 500,55 490,95" fill="#f59e0b"/>
          <rect x="140" y="370" width="320" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#1e3a8a">
            🎨 Đồ Dùng Mĩ Thuật: Bảng Màu & Cọ Vẽ Tươi Sáng
          </text>
        </svg>
      `;

    case 'art_materials':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <rect width="600" height="420" rx="24" fill="#ecfdf5"/>
          <!-- Hộp đất nặn & vật liệu đa dạng -->
          <rect x="80" y="100" width="440" height="230" rx="20" fill="#ffffff" stroke="#10b981" stroke-width="6"/>
          <!-- Thỏi đất nặn 3D rực rỡ -->
          <rect x="110" y="140" width="60" height="150" rx="12" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
          <rect x="185" y="140" width="60" height="150" rx="12" fill="#f59e0b" stroke="#d97706" stroke-width="3"/>
          <rect x="260" y="140" width="60" height="150" rx="12" fill="#22c55e" stroke="#15803d" stroke-width="3"/>
          <rect x="335" y="140" width="60" height="150" rx="12" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3"/>
          <rect x="410" y="140" width="60" height="150" rx="12" fill="#a855f7" stroke="#7e22ce" stroke-width="3"/>
          <!-- Kéo thủ công an toàn cho bé -->
          <ellipse cx="140" cy="315" rx="16" ry="12" fill="none" stroke="#6b7280" stroke-width="4"/>
          <ellipse cx="170" cy="315" rx="16" ry="12" fill="none" stroke="#6b7280" stroke-width="4"/>
          <!-- Lá cây tự nhiên tạo hình -->
          <path d="M 450,80 Q 490,60 510,100 Q 480,120 450,80 Z" fill="#16a34a"/>
          <line x1="450" y1="80" x2="495" y2="95" stroke="#14532d" stroke-width="2"/>
          <rect x="140" y="370" width="320" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#065f46">
            🌿 Vật Liệu Tạo Hình: Đất Nặn, Lá Cây & Bìa Tái Chế
          </text>
        </svg>
      `;

    default:
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
          <rect width="600" height="420" rx="24" fill="#fefce8"/>
          <rect x="80" y="50" width="440" height="290" rx="16" fill="#ffffff" stroke="#f59e0b" stroke-width="8"/>
          <circle cx="160" cy="130" r="38" fill="#fbbf24" opacity="0.9"/>
          <path d="M 95,250 Q 200,180 300,240 T 505,210 L 505,325 L 95,325 Z" fill="#86efac" opacity="0.7"/>
          <rect x="140" y="370" width="320" height="34" rx="17" fill="#ffffff" opacity="0.95"/>
          <text x="300" y="392" font-family="Nunito, sans-serif" font-size="13" font-weight="900" text-anchor="middle" fill="#92400e">
            🎨 Tác phẩm mẫu: ${u.title}
          </text>
        </svg>
      `;
  }
}

function buildUnit(u) {
  const theme = getUnitThemeKey(u);
  const visualSvg = generateUnitSvgByTheme(theme, u);
  const integrations = getUnitSpecificIntegrations(u);

  const visualArt = {
    title: `Tranh mẫu SGK: ${u.title}`,
    themeKey: theme,
    caption: `Tác phẩm thị phạm chuẩn SGK Kết nối tri thức - Khám phá các yếu tố tạo hình và hòa sắc độc đáo của chủ đề ${u.title}.`,
    svg: visualSvg,
    elements: {
      line: 'Nét vẽ tự tin, đường nét mềm mại kết hợp hình khối hài hòa.',
      color: 'Hòa sắc tươi sáng, tương phản ấn tượng giữa chủ thể chính và nền tranh.',
      composition: 'Bố cục cân đối, trọng tâm nổi bật đúng nguyên lí thị giác mĩ thuật.'
    }
  };

  const activities = [
    {
      phase: '1. HOẠT ĐỘNG KHỞI ĐỘNG',
      duration: '5 phút',
      method: 'Đố vui tương tác • Khơi nguồn cảm xúc',
      objective: `Kích thích trí tò mò, tạo không khí học tập vui tươi về bài học ${u.title}.`,
      teacherAct: `Giáo viên trình chiếu tranh mẫu trực quan sinh động, đặt câu hỏi gợi mở và dẫn dắt học sinh vào chủ đề ${u.title}.`,
      teacherQuestions: [
        `Các con hãy quan sát tranh mẫu và cho Thầy biết: Bức tranh mang lại cho con cảm xúc gì?`,
        `Đố các con phát hiện ra những hình ảnh, màu sắc quen thuộc nào được thể hiện trong tranh?`
      ],
      studentAct: `Học sinh quan sát tranh mẫu trên màn hình, hào hứng xung phong trả lời câu hỏi và chia sẻ cảm xúc.`,
      studentAnswers: [
        `Dạ thưa Thầy, con thấy bức tranh rất đẹp, màu sắc tươi vui và sinh động ạ!`,
        `Dạ con nhìn thấy các hình ảnh rất gần gũi với bài học ${u.title} mà Thầy vừa giới thiệu ạ!`
      ],
      expectedProduct: `Tâm thế hào hứng, câu trả lời nhận thức ban đầu của học sinh về chủ đề bài học.`
    },
    {
      phase: '2. QUAN SÁT & KHÁM PHÁ',
      duration: '10 phút',
      method: 'Quan sát trực quan • Thảo luận nhóm đôi',
      objective: `Phân tích chi tiết đường nét, màu sắc, hình khối và bố cục đặc trưng của ${u.title}.`,
      teacherAct: `Giáo viên hướng dẫn học sinh quan sát tác phẩm mẫu phóng to, đặt hệ thống câu hỏi phân tích từ tổng thể đến chi tiết.`,
      teacherQuestions: [
        `Trong tác phẩm mẫu, hình ảnh chính được vẽ ở vị trí nào và có kích thước ra sao?`,
        `Con thấy tác giả đã sử dụng những gam màu nào để làm nổi bật chủ đề của bài học?`,
        `Nét vẽ trong tranh là nét thẳng khỏe khoắn hay nét cong mềm mại uyển chuyển?`
      ],
      studentAct: `Học sinh thảo luận cặp đôi, chỉ ra các chi tiết mảng chính, mảng phụ và phát biểu nhận xét.`,
      studentAnswers: [
        `Dạ thưa Thầy, hình ảnh chính được vẽ to, rõ ràng ở ngay chính giữa trang giấy ạ!`,
        `Dạ con thấy có các mảng màu tươi sáng nổi bật trên nền tranh hài hòa ạ!`,
        `Dạ có sự kết hợp nhịp nhàng giữa nét thẳng và các nét cong rất sinh động ạ!`
      ],
      expectedProduct: `Học sinh nhận biết và phân tích được các yếu tố tạo hình (nét, hình, màu, khối) của bài học.`
    },
    {
      phase: '3. LUYỆN TẬP & SÁNG TẠO',
      duration: '15 phút',
      method: 'Thị phạm của Thầy • Thực hành sáng tạo',
      objective: `Học sinh nắm chắc 3 bước thực hành và tự tin vẽ bức tranh sáng tạo của riêng mình.`,
      teacherAct: `Giáo viên thị phạm các bước vẽ trên bảng; nhắc nhở tư thế ngồi vẽ; đi đến từng bàn hướng dẫn và khích lệ các em.`,
      teacherQuestions: [
        `Bước đầu tiên khi vẽ, chúng mình cần làm gì để bài vẽ nằm cân đối giữa trang giấy?`,
        `Con dự định sẽ phối màu gì cho hình ảnh chính để bức tranh của con thật độc đáo?`
      ],
      studentAct: `Học sinh chú ý theo dõi thao tác thị phạm của Thầy; sau đó mở vở vẽ / bảng vẽ và tự tin thực hành sáng tạo.`,
      studentAnswers: [
        `Dạ con nhớ lời Thầy dặn: Bước 1 phải phác hình to ở giữa trang giấy trước ạ!`,
        `Dạ con sẽ chọn những màu sắc con yêu thích nhất cho hình chính, sau đó tô màu nền nhẹ nhàng ạ!`
      ],
      expectedProduct: `Bản phác thảo hoặc bức tranh vẽ hoàn chỉnh về chủ đề ${u.title} thể hiện cá tính riêng của học sinh.`
    },
    {
      phase: '4. TRƯNG BÀY & ĐÁNH GIÁ',
      duration: '5 phút',
      method: 'Góc triển lãm • Đánh giá theo Rubric',
      objective: `Phát triển năng lực cảm thụ thẩm mĩ, tự đánh giá và nhận xét bài của bạn theo 4 tiêu chí GDPT 2018.`,
      teacherAct: `Giáo viên hướng dẫn đính bài lên góc triển lãm lớp; tổ chức bình chọn bài vẽ ấn tượng; nhận xét khích lệ theo Rubric.`,
      teacherQuestions: [
        `Con thích nhất bài vẽ nào của bạn trong lớp hôm nay? Vì sao con ấn tượng với bài vẽ đó?`,
        `Nếu được bổ sung thêm một chi tiết nhỏ để bức tranh của con hoàn hảo hơn, con sẽ làm gì?`
      ],
      studentAct: `Học sinh mang bài lên triển lãm; tự tin giới thiệu tranh của mình; chia sẻ lời khen ngợi bạn chân thành.`,
      studentAnswers: [
        `Dạ con thích bài của bạn vì bạn tô màu rất đều, nét vẽ tự tin và màu sắc tươi sáng ạ!`,
        `Dạ con sẽ nhấn đậm thêm một chút ở phần bóng đổ để bức tranh có chiều sâu hơn ạ!`
      ],
      expectedProduct: `Phiếu đánh giá nhận xét theo Rubric 4 tiêu chí; lời chia sẻ tự tin và sự tiến bộ về cảm thụ mĩ thuật.`
    },
    {
      phase: '5. VẬN DỤNG & PHÁT TRIỂN',
      duration: '5 phút',
      method: 'Liên hệ thực tế • Sáng tạo đời sống',
      objective: `Đưa cái đẹp mĩ thuật vào trang trí góc học tập và ứng dụng thực tiễn trong cuộc sống.`,
      teacherAct: `Giáo viên gợi mở các ý tưởng vận dụng sản phẩm vào đời sống; nhắc nhở vệ sinh đồ dùng gọn gàng sạch sẽ.`,
      teacherQuestions: [
        `Con có thể dùng bức tranh tuyệt đẹp hôm nay để làm món quà ý nghĩa gửi tặng ai?`,
        `Sau giờ học vẽ, một bạn nhỏ ngăn nắp sẽ làm gì với đồ dùng học tập của mình?`
      ],
      studentAct: `Học sinh chia sẻ dự định mang bài về khoe với bố mẹ; chủ động cất nắp bút sáp, dọn bàn học và rửa tay sạch sẽ.`,
      studentAnswers: [
        `Dạ con sẽ mang bức tranh này về treo ở góc học tập và tặng người thân ạ!`,
        `Dạ con sẽ cất sáp màu cẩn thận vào khay hộp để không bị gãy và lau sạch bàn học ạ!`
      ],
      expectedProduct: `Ý thức thẩm mĩ gắn liền với đời sống, thái độ trân trọng sản phẩm và nếp sống ngăn nắp, sạch đẹp.`
    }
  ];

  return {
    id: `kntt_g${u.grade}_cd${u.unitNum}`,
    grade: u.grade,
    gradeLabel: `Lớp ${u.grade}`,
    bookSeries: 'Kết nối tri thức với cuộc sống',
    unitNumber: `Chủ đề ${u.unitNum}`,
    title: u.title,
    duration: u.duration || '2 tiết',
    icon: u.icon,
    tag: u.tag,
    summary: u.summary,
    visualArt: visualArt,
    integrations: integrations,
    wordLessonPlan: {
      title: `KẾ HOẠCH BÀI DẠY MĨ THUẬT LỚP ${u.grade}`,
      unit: `Chủ đề ${u.unitNum}: ${u.title.toUpperCase()}`,
      book: 'Bộ sách: Kết nối tri thức với cuộc sống - NXB Giáo dục Việt Nam',
      objectives: u.objectives,
      preparations: u.preparations,
      activities: activities,
      integrations: integrations,
      visualArt: visualArt
    },
    powerpointSlides: [
      {
        slideNumber: 1,
        phase: '1. Khởi động',
        phaseIcon: '🎯',
        title: `1. KHỞI ĐỘNG: ${u.title.toUpperCase()}`,
        subtitle: 'Tiến trình 1: Khởi động (5 phút) • Khơi nguồn cảm hứng & Đố vui mĩ thuật',
        teacherLecture: u.s1Lecture,
        bullets: [
          `Khám phá vẻ đẹp độc đáo của chủ đề ${u.title}`,
          `Quan sát hình ảnh thực tế và khơi nguồn cảm xúc nghệ thuật`,
          'Sẵn sàng đồ dùng học vẽ để cùng Thầy bước vào thế giới sáng tạo'
        ],
        teacherQuestions: activities[0].teacherQuestions,
        studentAnswers: activities[0].studentAnswers,
        expectedProduct: activities[0].expectedProduct,
        visualArt: visualArt,
        badge: `${u.icon} 1. Khởi động`,
        interactiveAction: {
          type: 'quiz',
          label: '❓ Đố Vui Khởi Động Cùng Thầy',
          question: u.quizQ,
          options: u.quizOpts,
          correctIndex: u.quizCorr,
          explanation: u.quizExp
        }
      },
      {
        slideNumber: 2,
        phase: '2. Khám phá',
        phaseIcon: '🔍',
        title: `2. QUAN SÁT & KHÁM PHÁ: ${u.title.toUpperCase()}`,
        subtitle: 'Tiến trình 2: Quan sát nhận biết (10 phút) • Phân tích đường nét, màu sắc và hình khối',
        teacherLecture: u.s2Lecture,
        bullets: u.s2Bullets,
        teacherQuestions: activities[1].teacherQuestions,
        studentAnswers: activities[1].studentAnswers,
        expectedProduct: activities[1].expectedProduct,
        visualArt: visualArt,
        badge: '🔍 2. Khám phá tri thức',
        interactiveAction: {
          type: 'explore',
          label: '🔎 Khám Phá Nét Đẹp Tác Phẩm',
          detail: `Tập trung phân tích kỹ thuật tạo hình và hòa sắc độc đáo của chủ đề ${u.title}.`
        }
      },
      {
        slideNumber: 3,
        phase: '3. Thực hành',
        phaseIcon: '💡',
        title: `3. BÍ QUYẾT TẠO HÌNH & THỊ PHẠM CỦA THẦY`,
        subtitle: 'Tiến trình 3: Luyện tập sáng tạo (15 phút) • Hướng dẫn các bước thực hành từng bước',
        teacherLecture: u.s3Lecture,
        bullets: u.s3Bullets,
        teacherQuestions: activities[2].teacherQuestions,
        studentAnswers: activities[2].studentAnswers,
        expectedProduct: activities[2].expectedProduct,
        visualArt: visualArt,
        badge: '💡 3. Thực hành sáng tạo',
        interactiveAction: {
          type: 'draw',
          label: '🎨 Mở Bảng Vẽ Làm Theo Lời Thầy'
        }
      },
      {
        slideNumber: 4,
        phase: '4. Trưng bày',
        phaseIcon: '🏅',
        title: `4. GÓC TRIỂN LÃM & ĐÁNH GIÁ THEO RUBRIC`,
        subtitle: 'Tiến trình 4: Trưng bày chia sẻ (5 phút) • Đánh giá theo 4 Tiêu chí Rubric GDPT 2018',
        teacherLecture: u.s4Lecture,
        bullets: u.s4Bullets,
        teacherQuestions: activities[3].teacherQuestions,
        studentAnswers: activities[3].studentAnswers,
        expectedProduct: activities[3].expectedProduct,
        visualArt: visualArt,
        badge: '🏅 4. Trưng bày & Đánh giá',
        interactiveAction: {
          type: 'critique',
          label: '📸 Nhờ Mắt Thần Chấm Tranh Của Con'
        }
      },
      {
        slideNumber: 5,
        phase: '5. Vận dụng',
        phaseIcon: '🚀',
        title: `5. VẬN DỤNG & SÁNG TẠO VÀO ĐỜI SỐNG`,
        subtitle: 'Tiến trình 5: Vận dụng phát triển (5 phút) • Đưa cái đẹp mĩ thuật vào cuộc sống quanh em',
        teacherLecture: u.s5Lecture,
        bullets: u.s5Bullets,
        teacherQuestions: activities[4].teacherQuestions,
        studentAnswers: activities[4].studentAnswers,
        expectedProduct: activities[4].expectedProduct,
        visualArt: visualArt,
        integrations: integrations,
        badge: '🚀 5. Vận dụng đời sống',
        interactiveAction: {
          type: 'apply',
          label: '🌟 Thử Thách Sáng Tạo Tại Nhà'
        }
      }
    ]
  };
}

module.exports = { buildUnit };
