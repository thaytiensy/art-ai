// Helper module for generating complete curriculum dataset
// Compliant with GDPT 2018 (Thong tu 32/2018/TT-BGDDT) & Cong van 2345/BGDDT-GDTH

function generateUnitSvg(u) {
  const title = (u.title || '').toLowerCase();
  const grade = u.grade || 1;
  const unitNum = u.unitNum || 1;

  // 1. Chấm màu / Bọ rùa
  if (title.includes('chấm') || title.includes('bọ rùa')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
        <defs>
          <radialGradient id="skyGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#fef9c3"/>
            <stop offset="100%" stop-color="#bbf7d0"/>
          </radialGradient>
          <radialGradient id="leafGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#4ade80"/>
            <stop offset="100%" stop-color="#15803d"/>
          </radialGradient>
          <radialGradient id="shellGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#f87171"/>
            <stop offset="70%" stop-color="#ef4444"/>
            <stop offset="100%" stop-color="#991b1b"/>
          </radialGradient>
          <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" flood-opacity="0.25"/>
          </filter>
        </defs>
        <rect width="600" height="420" rx="24" fill="url(#skyGrad)"/>
        <!-- Background decorative colored dots -->
        <circle cx="80" cy="70" r="14" fill="#f43f5e" opacity="0.4"/>
        <circle cx="130" cy="110" r="8" fill="#eab308" opacity="0.5"/>
        <circle cx="520" cy="80" r="18" fill="#3b82f6" opacity="0.4"/>
        <circle cx="480" cy="130" r="10" fill="#a855f7" opacity="0.5"/>
        <circle cx="70" cy="340" r="16" fill="#10b981" opacity="0.4"/>
        <circle cx="530" cy="320" r="14" fill="#f97316" opacity="0.4"/>
        <!-- Big green leaf -->
        <path d="M 60,380 C 120,200 280,120 540,160 C 500,320 320,400 60,380 Z" fill="url(#leafGrad)" filter="url(#shadow)"/>
        <path d="M 80,360 Q 300,260 520,180" stroke="#86efac" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M 220,305 Q 260,230 330,215" stroke="#86efac" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M 330,270 Q 370,220 440,200" stroke="#86efac" stroke-width="3" stroke-linecap="round" fill="none"/>
        <!-- Cute Ladybug -->
        <ellipse cx="300" cy="240" rx="95" ry="90" fill="url(#shellGrad)" filter="url(#shadow)"/>
        <!-- Head -->
        <circle cx="300" cy="155" r="42" fill="#1e293b"/>
        <!-- Eyes -->
        <circle cx="285" cy="145" r="7" fill="#ffffff"/>
        <circle cx="286" cy="145" r="4" fill="#000000"/>
        <circle cx="315" cy="145" r="7" fill="#ffffff"/>
        <circle cx="314" cy="145" r="4" fill="#000000"/>
        <!-- Antennae -->
        <path d="M 285,125 Q 265,95 245,100" stroke="#1e293b" stroke-width="4" stroke-linecap="round" fill="none"/>
        <circle cx="245" cy="100" r="6" fill="#e11d48"/>
        <path d="M 315,125 Q 335,95 355,100" stroke="#1e293b" stroke-width="4" stroke-linecap="round" fill="none"/>
        <circle cx="355" cy="100" r="6" fill="#e11d48"/>
        <!-- Center line on shell -->
        <line x1="300" y1="155" x2="300" y2="330" stroke="#0f172a" stroke-width="5"/>
        <!-- Black polka dots on wings -->
        <circle cx="250" cy="210" r="16" fill="#0f172a"/>
        <circle cx="350" cy="210" r="16" fill="#0f172a"/>
        <circle cx="230" cy="270" r="18" fill="#0f172a"/>
        <circle cx="370" cy="270" r="18" fill="#0f172a"/>
        <circle cx="275" cy="305" r="13" fill="#0f172a"/>
        <circle cx="325" cy="305" r="13" fill="#0f172a"/>
        <!-- Dew drops with highlights -->
        <circle cx="160" cy="270" r="9" fill="#ffffff" opacity="0.7"/>
        <circle cx="460" cy="240" r="11" fill="#ffffff" opacity="0.6"/>
        <!-- Caption badge in SVG -->
        <rect x="160" y="365" width="280" height="36" rx="18" fill="#ffffff" opacity="0.95" filter="url(#shadow)"/>
        <text x="300" y="388" font-family="Nunito, sans-serif" font-size="14" font-weight="800" text-anchor="middle" fill="#991b1b">
          🔴 Bức họa: Chú Bọ Rùa Chấm Tròn Xinh
        </text>
      </svg>
    `;
  }

  // 2. Nét vẽ / Đường nét
  if (title.includes('nét')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
        <defs>
          <linearGradient id="netBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e0e7ff"/>
            <stop offset="50%" stop-color="#fae8ff"/>
            <stop offset="100%" stop-color="#fef3c7"/>
          </linearGradient>
          <linearGradient id="sunNet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fde047"/>
            <stop offset="100%" stop-color="#f97316"/>
          </linearGradient>
        </defs>
        <rect width="600" height="420" rx="24" fill="url(#netBg)"/>
        <!-- Sun with artistic spiral rays -->
        <circle cx="120" cy="110" r="48" fill="url(#sunNet)"/>
        <path d="M 120,45 L 120,25 M 120,175 L 120,195 M 55,110 L 35,110 M 185,110 L 205,110" stroke="#f97316" stroke-width="4" stroke-linecap="round"/>
        <path d="M 75,65 Q 60,50 45,60 M 165,65 Q 180,50 195,60" stroke="#f97316" stroke-width="4" stroke-linecap="round" fill="none"/>
        <!-- Wavy ocean lines -->
        <path d="M 0,260 C 100,220 200,300 300,260 C 400,220 500,300 600,260 L 600,420 L 0,420 Z" fill="#38bdf8" opacity="0.6"/>
        <path d="M 0,290 C 80,330 180,260 280,300 C 380,340 480,270 600,300 L 600,420 L 0,420 Z" fill="#0284c7" opacity="0.8"/>
        <!-- Various decorative art lines: Straight, Zigzag, Curly, Dashed -->
        <path d="M 40,320 L 560,320" stroke="#ffffff" stroke-width="3" stroke-dasharray="10 8"/>
        <path d="M 240,80 Q 320,30 400,90 T 560,70" stroke="#ec4899" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M 260,130 L 290,105 L 320,130 L 350,105 L 380,130 L 410,105 L 440,130 L 470,105 L 500,130" stroke="#8b5cf6" stroke-width="4" stroke-linejoin="round" fill="none"/>
        <!-- Sailboat made of basic lines -->
        <path d="M 330,240 L 330,150 L 410,240 Z" fill="#ef4444"/>
        <path d="M 320,240 L 320,170 L 260,240 Z" fill="#f59e0b"/>
        <path d="M 240,245 L 430,245 L 390,275 L 280,275 Z" fill="#1e293b"/>
        <!-- Caption badge -->
        <rect x="150" y="365" width="300" height="36" rx="18" fill="#ffffff" opacity="0.95"/>
        <text x="300" y="388" font-family="Nunito, sans-serif" font-size="14" font-weight="800" text-anchor="middle" fill="#1e3a8a">
          🌊 Bức họa: Vũ Điệu Các Đường Nét Thần Kì
        </text>
      </svg>
    `;
  }

  // 3. Hình cơ bản (Tam giác, Tròn, Vuông, Chữ nhật)
  if (title.includes('hình cơ bản') || title.includes('kết hợp của các hình')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
        <defs>
          <linearGradient id="skyShapes" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#bae6fd"/>
            <stop offset="100%" stop-color="#fef08a"/>
          </linearGradient>
        </defs>
        <rect width="600" height="420" rx="24" fill="url(#skyShapes)"/>
        <!-- Ground -->
        <rect x="0" y="300" width="600" height="120" fill="#4ade80"/>
        <!-- Geometric House -->
        <!-- Square wall -->
        <rect x="180" y="190" width="160" height="120" rx="6" fill="#fb923c" stroke="#c2410c" stroke-width="4"/>
        <!-- Triangle Roof -->
        <polygon points="160,195 260,95 360,195" fill="#ef4444" stroke="#991b1b" stroke-width="4"/>
        <!-- Rectangle Door -->
        <rect x="235" y="240" width="50" height="70" rx="4" fill="#78350f"/>
        <circle cx="245" cy="275" r="4" fill="#fbbf24"/>
        <!-- Square Window -->
        <rect x="200" y="215" width="35" height="35" rx="3" fill="#67e8f9" stroke="#0284c7" stroke-width="2"/>
        <line x1="217" y1="215" x2="217" y2="250" stroke="#0284c7" stroke-width="2"/>
        <line x1="200" y1="232" x2="235" y2="232" stroke="#0284c7" stroke-width="2"/>
        <!-- Circle Sun -->
        <circle cx="480" cy="95" r="45" fill="#facc15" stroke="#eab308" stroke-width="4"/>
        <!-- Trees made of geometric shapes -->
        <!-- Tree 1: Cylinder trunk + Triangle foliage -->
        <rect x="420" y="240" width="24" height="70" fill="#92400e"/>
        <polygon points="380,245 432,150 484,245" fill="#15803d"/>
        <polygon points="390,190 432,120 474,190" fill="#16a34a"/>
        <!-- Tree 2: Cylinder trunk + Circle foliage -->
        <rect x="90" y="250" width="20" height="60" fill="#92400e"/>
        <circle cx="100" cy="220" r="40" fill="#22c55e"/>
        <!-- Cute clouds (Circles combined) -->
        <circle cx="90" cy="90" r="25" fill="#ffffff" opacity="0.9"/>
        <circle cx="115" cy="80" r="30" fill="#ffffff" opacity="0.9"/>
        <circle cx="145" cy="90" r="22" fill="#ffffff" opacity="0.9"/>
        <!-- Caption badge -->
        <rect x="140" y="365" width="320" height="36" rx="18" fill="#ffffff" opacity="0.95"/>
        <text x="300" y="388" font-family="Nunito, sans-serif" font-size="14" font-weight="800" text-anchor="middle" fill="#c2410c">
          🏡 Bức họa: Ngôi Nhà Từ Các Hình Cơ Bản
        </text>
      </svg>
    `;
  }

  // 4. Màu sắc / Màu cơ bản
  if (title.includes('màu cơ bản') || title.includes('sắc màu') || title.includes('mảng màu')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
        <defs>
          <linearGradient id="palBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e1b4b"/>
            <stop offset="100%" stop-color="#312e81"/>
          </linearGradient>
        </defs>
        <rect width="600" height="420" rx="24" fill="url(#palBg)"/>
        <!-- 3 Primary Color Circles Overlapping -->
        <!-- Red -->
        <circle cx="240" cy="180" r="95" fill="#ef4444" opacity="0.85"/>
        <!-- Yellow -->
        <circle cx="360" cy="180" r="95" fill="#eab308" opacity="0.85"/>
        <!-- Blue -->
        <circle cx="300" cy="275" r="95" fill="#3b82f6" opacity="0.85"/>
        <!-- Mixing Intersection labels -->
        <text x="190" y="150" font-family="Nunito, sans-serif" font-size="18" font-weight="900" fill="#ffffff">ĐỎ</text>
        <text x="390" y="150" font-family="Nunito, sans-serif" font-size="18" font-weight="900" fill="#ffffff">VÀNG</text>
        <text x="300" y="345" font-family="Nunito, sans-serif" font-size="18" font-weight="900" fill="#ffffff">LAM</text>
        <!-- Center mixing sparkles -->
        <circle cx="300" cy="160" r="8" fill="#f97316"/>
        <text x="300" y="180" font-family="Nunito, sans-serif" font-size="11" font-weight="800" text-anchor="middle" fill="#ffffff">Cam</text>
        <circle cx="260" cy="240" r="8" fill="#a855f7"/>
        <text x="260" y="260" font-family="Nunito, sans-serif" font-size="11" font-weight="800" text-anchor="middle" fill="#ffffff">Tím</text>
        <circle cx="340" cy="240" r="8" fill="#22c55e"/>
        <text x="340" y="260" font-family="Nunito, sans-serif" font-size="11" font-weight="800" text-anchor="middle" fill="#ffffff">Lục</text>
        <!-- Painter Palette icon at corner -->
        <path d="M 70,300 C 60,330 90,360 130,350 C 150,345 160,325 150,305 C 140,285 110,270 80,285 Z" fill="#d97706"/>
        <!-- Caption badge -->
        <rect x="140" y="365" width="320" height="36" rx="18" fill="#ffffff" opacity="0.95"/>
        <text x="300" y="388" font-family="Nunito, sans-serif" font-size="14" font-weight="800" text-anchor="middle" fill="#312e81">
          🎨 Bức họa: 3 Sắc Màu Gốc & Phép Màu Hòa Sắc
        </text>
      </svg>
    `;
  }

  // 5. Khối cơ bản (Khối lập phương, Khối cầu, Khối trụ)
  if (title.includes('khối')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
        <defs>
          <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#cbd5e1"/>
          </linearGradient>
          <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#f472b6"/>
            <stop offset="60%" stop-color="#db2777"/>
            <stop offset="100%" stop-color="#831843"/>
          </radialGradient>
        </defs>
        <rect width="600" height="420" rx="24" fill="#f1f5f9"/>
        <!-- Studio table shadow -->
        <ellipse cx="300" cy="300" rx="250" ry="80" fill="url(#floorGrad)"/>
        <!-- Cube (Khối lập phương) -->
        <g transform="translate(70, 150)">
          <ellipse cx="90" cy="130" rx="70" ry="20" fill="#94a3b8" opacity="0.5"/>
          <!-- Top face -->
          <polygon points="90,10 150,40 90,70 30,40" fill="#60a5fa"/>
          <!-- Left face -->
          <polygon points="30,40 90,70 90,130 30,100" fill="#2563eb"/>
          <!-- Right face -->
          <polygon points="90,70 150,40 150,100 90,130" fill="#1d4ed8"/>
        </g>
        <!-- Sphere (Khối cầu) -->
        <g transform="translate(260, 120)">
          <ellipse cx="65" cy="160" rx="65" ry="22" fill="#94a3b8" opacity="0.6"/>
          <circle cx="65" cy="95" r="65" fill="url(#sphereGrad)"/>
        </g>
        <!-- Cylinder (Khối trụ) -->
        <g transform="translate(420, 140)">
          <ellipse cx="50" cy="140" rx="45" ry="18" fill="#94a3b8" opacity="0.5"/>
          <path d="M 5,40 L 5,120 A 45,18 0 0,0 95,120 L 95,40 Z" fill="#059669"/>
          <ellipse cx="50" cy="40" rx="45" ry="18" fill="#34d399"/>
        </g>
        <!-- Caption badge -->
        <rect x="140" y="365" width="320" height="36" rx="18" fill="#ffffff" opacity="0.95"/>
        <text x="300" y="388" font-family="Nunito, sans-serif" font-size="14" font-weight="800" text-anchor="middle" fill="#0f172a">
          📦 Bức họa: Thế Giới Khối Hình Học 3D Không Gian
        </text>
      </svg>
    `;
  }

  // 6. Phong cảnh quê hương / Cảnh vật quanh em
  if (title.includes('quê hương') || title.includes('cảnh đẹp') || title.includes('cảnh vật') || title.includes('cảnh sắc')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
        <defs>
          <linearGradient id="skyScenery" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fdba74"/>
            <stop offset="60%" stop-color="#fef08a"/>
            <stop offset="100%" stop-color="#bbf7d0"/>
          </linearGradient>
        </defs>
        <rect width="600" height="420" rx="24" fill="url(#skyScenery)"/>
        <!-- Distant Mountains (Luật xa gần: Xa mờ nhỏ) -->
        <polygon points="0,210 120,130 250,210" fill="#93c5fd" opacity="0.7"/>
        <polygon points="180,210 320,110 460,210" fill="#60a5fa" opacity="0.6"/>
        <polygon points="380,210 480,140 600,210" fill="#93c5fd" opacity="0.7"/>
        <!-- Rice fields -->
        <polygon points="0,210 600,210 600,340 0,340" fill="#facc15"/>
        <!-- Winding River -->
        <path d="M 330,210 Q 280,260 360,300 T 260,420 L 400,420 Q 480,310 410,260 T 350,210 Z" fill="#38bdf8"/>
        <!-- Coconut tree in foreground (Gần thì to rõ) -->
        <path d="M 80,420 Q 95,290 60,190" stroke="#78350f" stroke-width="14" stroke-linecap="round" fill="none"/>
        <g transform="translate(60, 190)">
          <path d="M 0,0 Q -60,-40 -100,-10" stroke="#15803d" stroke-width="6" fill="none"/>
          <path d="M 0,0 Q 60,-40 100,-10" stroke="#15803d" stroke-width="6" fill="none"/>
          <path d="M 0,0 Q -40,-60 -50,-100" stroke="#16a34a" stroke-width="6" fill="none"/>
          <path d="M 0,0 Q 40,-60 50,-100" stroke="#16a34a" stroke-width="6" fill="none"/>
          <circle cx="5" cy="10" r="8" fill="#ca8a04"/>
          <circle cx="-6" cy="12" r="8" fill="#ca8a04"/>
        </g>
        <!-- Storks flying in distance -->
        <path d="M 220,90 Q 230,80 240,90 Q 250,80 260,90" stroke="#ffffff" stroke-width="2.5" fill="none"/>
        <path d="M 280,105 Q 287,97 295,105 Q 302,97 310,105" stroke="#ffffff" stroke-width="2" fill="none"/>
        <!-- Caption badge -->
        <rect x="140" y="365" width="320" height="36" rx="18" fill="#ffffff" opacity="0.95"/>
        <text x="300" y="388" font-family="Nunito, sans-serif" font-size="14" font-weight="800" text-anchor="middle" fill="#1e3a8a">
          🌾 Bức họa: Vẻ Đẹp Thanh Bình Cảnh Sắc Quê Hương
        </text>
      </svg>
    `;
  }

  // 7. Môi trường xanh / Tranh cổ động
  if (title.includes('môi trường') || title.includes('xanh')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
        <defs>
          <linearGradient id="ecoBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#bae6fd"/>
            <stop offset="100%" stop-color="#dcfce7"/>
          </linearGradient>
        </defs>
        <rect width="600" height="420" rx="24" fill="url(#ecoBg)"/>
        <!-- Caring hands holding planet Earth -->
        <!-- Earth circle -->
        <circle cx="300" cy="190" r="95" fill="#38bdf8" stroke="#0284c7" stroke-width="5"/>
        <!-- Continents green -->
        <path d="M 250,140 Q 290,130 310,160 Q 320,190 280,200 Q 240,180 250,140 Z" fill="#22c55e"/>
        <path d="M 330,170 Q 370,160 380,210 Q 350,240 320,220 Z" fill="#22c55e"/>
        <path d="M 260,230 Q 300,240 290,270 Q 240,270 260,230 Z" fill="#22c55e"/>
        <!-- Sprout growing on top of Earth -->
        <path d="M 300,95 Q 300,60 300,45" stroke="#15803d" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M 300,60 Q 270,40 280,20 Q 300,40 300,60 Z" fill="#4ade80"/>
        <path d="M 300,50 Q 330,30 320,15 Q 300,30 300,50 Z" fill="#22c55e"/>
        <!-- Two hands supporting bottom -->
        <path d="M 170,300 C 190,230 250,270 290,290 C 260,340 190,340 170,300 Z" fill="#fed7aa"/>
        <path d="M 430,300 C 410,230 350,270 310,290 C 340,340 410,340 430,300 Z" fill="#fed7aa"/>
        <!-- Slogan banner -->
        <rect x="120" y="325" width="360" height="40" rx="20" fill="#15803d"/>
        <text x="300" y="350" font-family="Nunito, sans-serif" font-size="15" font-weight="900" text-anchor="middle" fill="#ffffff">
          CHUNG TAY GIỮ GÌN HÀNH TINH XANH!
        </text>
        <rect x="140" y="375" width="320" height="30" rx="15" fill="#ffffff" opacity="0.9"/>
        <text x="300" y="395" font-family="Nunito, sans-serif" font-size="12" font-weight="800" text-anchor="middle" fill="#15803d">
          🌱 Tranh Cổ Động Môi Trường Xanh - Sạch - Đẹp
        </text>
      </svg>
    `;
  }

  // 8. Hòa bình / Vì một thế giới hòa bình
  if (title.includes('hoà bình') || title.includes('hòa bình')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
        <defs>
          <linearGradient id="peaceSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#cffafe"/>
          </linearGradient>
        </defs>
        <rect width="600" height="420" rx="24" fill="url(#peaceSky)"/>
        <!-- Rainbow -->
        <path d="M 50,420 A 250,250 0 0,1 550,420" stroke="#ef4444" stroke-width="8" fill="none" opacity="0.5"/>
        <path d="M 58,420 A 242,242 0 0,1 542,420" stroke="#f59e0b" stroke-width="8" fill="none" opacity="0.5"/>
        <path d="M 66,420 A 234,234 0 0,1 534,420" stroke="#22c55e" stroke-width="8" fill="none" opacity="0.5"/>
        <path d="M 74,420 A 226,226 0 0,1 526,420" stroke="#3b82f6" stroke-width="8" fill="none" opacity="0.5"/>
        <!-- White Dove flying in center -->
        <!-- Wings -->
        <path d="M 300,190 C 230,110 150,140 180,210 C 210,230 260,210 300,190 Z" fill="#ffffff"/>
        <path d="M 300,190 C 370,110 450,140 420,210 C 390,230 340,210 300,190 Z" fill="#f8fafc"/>
        <!-- Body -->
        <ellipse cx="300" cy="200" rx="35" ry="50" fill="#ffffff"/>
        <circle cx="300" cy="150" r="20" fill="#ffffff"/>
        <!-- Eye & Beak -->
        <circle cx="295" cy="145" r="3" fill="#0f172a"/>
        <polygon points="285,150 265,153 285,157" fill="#f59e0b"/>
        <!-- Olive Branch in beak -->
        <path d="M 270,153 Q 230,140 210,165" stroke="#15803d" stroke-width="3" fill="none"/>
        <ellipse cx="235" cy="143" rx="8" ry="4" transform="rotate(-20 235 143)" fill="#4ade80"/>
        <ellipse cx="218" cy="155" rx="8" ry="4" transform="rotate(30 218 155)" fill="#4ade80"/>
        <!-- Caption badge -->
        <rect x="140" y="365" width="320" height="36" rx="18" fill="#ffffff" opacity="0.95"/>
        <text x="300" y="388" font-family="Nunito, sans-serif" font-size="14" font-weight="800" text-anchor="middle" fill="#0284c7">
          🕊️ Bức họa: Cánh Chim Bồ Câu Hòa Bình & Tự Do
        </text>
      </svg>
    `;
  }

  // 9. Default Master Art Artwork for other thematic units
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
      <defs>
        <linearGradient id="defArtBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fdf4ff"/>
          <stop offset="50%" stop-color="#eff6ff"/>
          <stop offset="100%" stop-color="#fefce8"/>
        </linearGradient>
        <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#b45309"/>
        </linearGradient>
      </defs>
      <rect width="600" height="420" rx="24" fill="url(#defArtBg)"/>
      <!-- Wooden Art Easel Frame -->
      <rect x="80" y="50" width="440" height="290" rx="16" fill="#ffffff" stroke="url(#frameGrad)" stroke-width="12"/>
      <!-- Inner Canvas Painting -->
      <rect x="95" y="65" width="410" height="260" rx="8" fill="#f8fafc"/>
      <!-- Art Composition Elements -->
      <!-- Big Golden Sun -->
      <circle cx="160" cy="130" r="38" fill="#fbbf24" opacity="0.9"/>
      <!-- Colorful rolling hills -->
      <path d="M 95,250 Q 200,180 300,240 T 505,210 L 505,325 L 95,325 Z" fill="#86efac" opacity="0.7"/>
      <path d="M 95,280 Q 220,230 350,280 T 505,260 L 505,325 L 95,325 Z" fill="#22c55e" opacity="0.85"/>
      <!-- Art supplies on front desk -->
      <!-- Color Palette -->
      <path d="M 370,170 C 340,150 340,210 370,230 C 400,250 440,230 430,190 C 420,150 390,160 370,170 Z" fill="#fed7aa" stroke="#d97706" stroke-width="3"/>
      <circle cx="375" cy="180" r="7" fill="#ef4444"/>
      <circle cx="395" cy="175" r="7" fill="#eab308"/>
      <circle cx="410" cy="195" r="7" fill="#3b82f6"/>
      <circle cx="395" cy="215" r="7" fill="#22c55e"/>
      <circle cx="370" cy="205" r="7" fill="#a855f7"/>
      <!-- Paintbrushes -->
      <line x1="330" y1="260" x2="430" y2="150" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>
      <polygon points="430,150 445,135 435,145" fill="#f43f5e"/>
      <!-- Unit Badge Label inside artwork -->
      <rect x="140" y="365" width="320" height="36" rx="18" fill="#ffffff" opacity="0.95"/>
      <text x="300" y="388" font-family="Nunito, sans-serif" font-size="14" font-weight="800" text-anchor="middle" fill="#92400e">
        🎨 Tác phẩm mẫu: ${u.title}
      </text>
    </svg>
  `;
}

function generateUnitIntegrations(u) {
  const title = u.title;
  const grade = u.grade;

  return {
    math: `Nhận diện hình khối, ước lượng tỉ lệ cân đối giữa mảng chính và mảng phụ trong bố cục trang vẽ bài "${title}".`,
    society: `Khám phá vẻ đẹp thiên nhiên, đời sống con người và các giá trị văn hóa truyền thống gắn liền với chủ đề "${title}".`,
    vietnamese: `Mở rộng vốn từ mĩ thuật, rèn luyện kĩ năng thuyết trình, giới thiệu và kể câu chuyện giàu cảm xúc về tác phẩm của mình.`,
    music: `Cảm nhận nhịp điệu, tiết tấu uyển chuyển của các nét vẽ và hòa sắc tương phản như những giai điệu vui tươi.`,
    environment: `Ý thức giữ gìn vệ sinh lớp học, thu dọn đồ dùng gọn gàng sau khi vẽ, khuyến khích tận dụng vật liệu tái chế bảo vệ môi trường.`,
    sel: `Rèn luyện tính kiên nhẫn, tự tin thể hiện cá tính sáng tạo, biết lắng nghe và tôn trọng sự khác biệt trong tranh của bạn bè.`,
    steam: `Tìm hiểu cấu trúc tạo hình, cơ chế pha trộn màu sắc và ứng dụng tác phẩm mĩ thuật vào đời sống thực tế.`
  };
}

function generateStandardActivities(u) {
  const title = u.title;
  const grade = u.grade;

  return [
    {
      phase: '1. HOẠT ĐỘNG KHỞI ĐỘNG',
      duration: '5 phút',
      method: 'Trò chơi tập thể • Khơi nguồn cảm xúc',
      objective: `Tạo tâm thế hào hứng, kích thích sự tò mò của học sinh về vẻ đẹp của chủ đề ${title}.`,
      teacherAct: `Giáo viên tổ chức đố vui mĩ thuật tương tác, trình chiếu hình ảnh trực quan sinh động về ${title} và dẫn dắt vào bài học.`,
      teacherQuestions: [
        `Các con hãy quan sát bức tranh mẫu và cho Thầy biết: Bức tranh mang lại cho con cảm xúc gì nổi bật nhất?`,
        `Đố các con phát hiện ra những hình ảnh quen thuộc nào của cuộc sống được thể hiện trong tranh?`
      ],
      studentAct: `Học sinh tích cực quan sát tranh mẫu, hào hứng xung phong trả lời câu đố và chia sẻ trải nghiệm cá nhân.`,
      studentAnswers: [
        `Dạ thưa Thầy, con thấy bức tranh rất tươi vui, nhiều màu sắc rực rỡ ạ!`,
        `Dạ con nhìn thấy các hình ảnh rất gần gũi với bài học ${title} mà Thầy vừa đố ạ!`
      ],
      expectedProduct: `Sự tập trung chú ý, tâm thế sẵn sàng và câu trả lời ban đầu đầy hào hứng của học sinh.`
    },
    {
      phase: '2. QUAN SÁT & KHÁM PHÁ',
      duration: '10 phút',
      method: 'Quan sát trực quan • Thảo luận cặp đôi',
      objective: `Giúp học sinh phân tích và nhận biết rõ các yếu tố tạo hình: đường nét, màu sắc, hình khối và bố cục đặc trưng của ${title}.`,
      teacherAct: `Giáo viên chiếu tác phẩm tranh mẫu phóng to, đặt hệ thống câu hỏi gợi mở từ tổng thể đến chi tiết, hướng dẫn học sinh so sánh và đối chiếu.`,
      teacherQuestions: [
        `Trong tác phẩm này, con thấy hình ảnh chính được đặt ở vị trí nào và có kích thước ra sao?`,
        `Thầy đố con chỉ ra những gam màu nóng, màu lạnh hoặc sự tương phản đậm nhạt mà tác giả đã sử dụng?`,
        `Đường nét trong tranh là nét thẳng mạnh mẽ hay nét cong mềm mại uyển chuyển?`
      ],
      studentAct: `Học sinh thảo luận cặp đôi, chỉ tay vào các chi tiết trên màn hình, phát biểu nhận xét về màu sắc và bố cục.`,
      studentAnswers: [
        `Dạ thưa Thầy, hình ảnh chính được vẽ to, rõ ràng ở ngay chính giữa trang giấy ạ!`,
        `Dạ con thấy có màu đỏ, vàng rất nổi bật trên nền xanh mát mắt, tạo cảm giác hài hòa ạ!`,
        `Dạ có cả nét thẳng đứng vững chãi và các nét cong rất mềm mại, sinh động ạ!`
      ],
      expectedProduct: `Học sinh gọi tên chính xác các yếu tố tạo hình (đường nét, hình mảng, màu sắc) của chủ đề ${title}.`
    },
    {
      phase: '3. LUYỆN TẬP & SÁNG TẠO',
      duration: '15 phút',
      method: 'Thị phạm của Thầy • Thực hành cá nhân',
      objective: `Học sinh nắm vững quy trình tạo hình 3 bước và tự tin thực hành sáng tạo sản phẩm của riêng mình.`,
      teacherAct: `Giáo viên thị phạm các bước vẽ mẫu trên bảng/bảng vẽ điện tử; nhắc nhở học sinh tư thế ngồi vẽ, cách cầm bút; đi đến từng bàn hướng dẫn, khích lệ từng em.`,
      teacherQuestions: [
        `Trước khi vẽ nét chi tiết, bước đầu tiên chúng mình cần làm gì để bài vẽ không bị lệch sang một bên?`,
        `Con dự định sẽ phối màu gì cho hình ảnh chính để bức tranh của con trở nên thật rực rỡ và độc đáo?`
      ],
      studentAct: `Học sinh chú ý theo dõi thao tác thị phạm của Thầy; sau đó mở vở thực hành mĩ thuật / bảng vẽ, tự tin phác nét và tô màu sáng tạo.`,
      studentAnswers: [
        `Dạ con nhớ lời Thầy dặn: Bước 1 phải phác khung hình to ở giữa trang giấy trước ạ!`,
        `Dạ con sẽ dùng màu nổi bật nhất con yêu thích cho mảng chính, sau đó tô màu nền nhẹ nhàng hơn ạ!`
      ],
      expectedProduct: `Bản phác thảo hoặc bức tranh vẽ hoàn chỉnh về chủ đề ${title} thể hiện sự tự tin và cá tính riêng của học sinh.`
    },
    {
      phase: '4. TRƯNG BÀY & ĐÁNH GIÁ',
      duration: '5 phút',
      method: 'Góc triển lãm • Đánh giá theo Rubric',
      objective: `Phát triển năng lực cảm thụ thẩm mĩ, rèn luyện kĩ năng tự đánh giá và nhận xét bài của bạn theo 4 tiêu chí chuẩn GDPT 2018.`,
      teacherAct: `Giáo viên hướng dẫn học sinh đính bài lên "Bức Tường Triển Lãm Lớp Học"; tổ chức bình chọn bài vẽ ấn tượng; hướng dẫn nhận xét tích cực theo Rubric 4 tiêu chí.`,
      teacherQuestions: [
        `Con thích nhất bài vẽ nào của bạn trong lớp hôm nay? Vì sao con lại ấn tượng với tác phẩm đó?`,
        `Nếu được bổ sung thêm một chi tiết nhỏ để bức tranh của con hoàn hảo hơn, con sẽ thêm điều gì?`
      ],
      studentAct: `Học sinh mang bài lên khu vực triển lãm; tự tin giới thiệu ý tưởng bức tranh của mình; lắng nghe lời khen ngợi và góp ý chân thành từ Thầy và các bạn.`,
      studentAnswers: [
        `Dạ con thích bài của bạn Nam vì bạn tô màu rất đều, nét vẽ ngộ nghĩnh và màu sắc tươi sáng ạ!`,
        `Dạ con sẽ nhấn đậm thêm một chút bóng đổ ở phía dưới để bức tranh có chiều sâu hơn như Thầy đã gợi ý ạ!`
      ],
      expectedProduct: `Phiếu đánh giá nhận xét theo Rubric 4 tiêu chí; lời chia sẻ tự tin và sự tiến bộ về cảm thụ mĩ thuật của học sinh.`
    },
    {
      phase: '5. VẬN DỤNG & PHÁT TRIỂN',
      duration: '5 phút',
      method: 'Liên hệ thực tế • Sáng tạo đời sống',
      objective: `Khắc sâu bài học, đưa cái đẹp mĩ thuật vào trang trí góc học tập và ứng dụng thực tiễn trong cuộc sống.`,
      teacherAct: `Giáo viên gợi mở các ý tưởng vận dụng tranh vẽ vào cuộc sống (làm thiệp tặng người thân, trang trí phòng học); nhắc nhở vệ sinh đồ dùng học tập sạch sẽ.`,
      teacherQuestions: [
        `Con có thể dùng bức tranh tuyệt đẹp hôm nay để làm món quà ý nghĩa gửi tặng ai trong gia đình mình?`,
        `Một bạn nhỏ yêu mĩ thuật sẽ làm gì với hộp màu và góc bàn học sau khi buổi học kết thúc?`
      ],
      studentAct: `Học sinh liên hệ thực tế, chia sẻ dự định mang bài về khoe với bố mẹ; chủ động cất nắp bút sáp, nhặt vụn tẩy và rửa tay sạch sẽ.`,
      studentAnswers: [
        `Dạ con sẽ mang bức tranh này về đóng khung treo ở góc học tập và tặng mẹ nhân ngày sinh nhật ạ!`,
        `Dạ con sẽ cất sáp màu cẩn thận vào khay hộp để không bị gãy và lau sạch bàn học ạ!`
      ],
      expectedProduct: `Ý thức thẩm mĩ gắn liền với đời sống, thái độ trân trọng sản phẩm và nếp sống ngăn nắp, sạch đẹp.`
    }
  ];
}

function buildUnit(u) {
  const visualArt = {
    title: `Tranh mẫu SGK: ${u.title}`,
    caption: `Tác phẩm thị phạm chuẩn SGK Kết nối tri thức với cuộc sống - Phân tích đường nét uyển chuyển, hình khối hài hòa và màu sắc tươi sáng.`,
    svg: generateUnitSvg(u),
    elements: {
      line: 'Nét phác hình học cơ bản kết hợp nét lượn chi tiết mềm mại.',
      color: 'Hòa sắc tươi sáng, tương phản hài hòa giữa gam màu chính và nền phụ.',
      composition: 'Bố cục trọng tâm cân đối, rõ mảng chính - mảng phụ theo tỉ lệ vàng.'
    }
  };

  const integrations = generateUnitIntegrations(u);
  const activities = (u.activities && u.activities[0]?.teacherQuestions) ? u.activities : generateStandardActivities(u);

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

module.exports = { buildUnit, generateUnitSvg, generateUnitIntegrations, generateStandardActivities };
