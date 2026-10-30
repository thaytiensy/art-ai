import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Palette, 
  RefreshCw, 
  Download, 
  Paintbrush, 
  CheckCircle2, 
  Lightbulb, 
  Dices,
  ExternalLink,
  Layers
} from 'lucide-react';
import { fetchMasterpieceArtworks } from '../services/metMuseum';

// 6 Phong cách Tranh Vẽ Thật (Fine Art Mediums) dành riêng cho thiếu nhi
const ART_STYLES = [
  {
    id: 'crayon',
    name: 'Sáp Màu Trẻ Em',
    icon: '🖍️',
    description: 'Nét sáp màu mộc mạc, hạt sáp sần trên giấy, ấm áp ngây thơ',
    promptSuffix: 'authentic colored crayon and oil pastel drawing for elementary school kids, textured sketchbook paper, visible wax crayon strokes, warm vibrant joyful children art, traditional art medium, no 3D CGI, no computer graphics'
  },
  {
    id: 'watercolor',
    name: 'Màu Nước Nghệ Thuật',
    icon: '🎨',
    description: 'Nước loang trong trẻo, nét cọ mềm mại, giàu chất thơ',
    promptSuffix: 'authentic fluid watercolor painting on heavy textured cotton paper, gentle water bleeding, artistic brush strokes, soft luminous colors, fine art painting, genuine watercolor medium, no 3D render'
  },
  {
    id: 'sketch',
    name: 'Phác Thảo Nét Chì',
    icon: '✏️',
    description: 'Nét chì đen trắng tinh tế, rõ khối, thích hợp để tập đồ nét',
    promptSuffix: 'authentic detailed graphite pencil sketch on white art paper, clean line art and crosshatching shading, hand-drawn study, ready for coloring, fine art sketch, no digital 3D'
  },
  {
    id: 'dongho',
    name: 'Tranh Dân Gian Đông Hồ',
    icon: '🏮',
    description: 'Nét khắc gỗ mộc mạc, giấy điệp lấp lánh, màu sắc tự nhiên',
    promptSuffix: 'authentic traditional Vietnamese Dong Ho folk woodblock print, natural pigments on sparkly scallop shell diep paper, bold black woodcut outlines, rustic Vietnamese folk art style, historic masterpiece'
  },
  {
    id: 'oil',
    name: 'Sơn Dầu Kinh Điển',
    icon: '🖌️',
    description: 'Vệt cọ sơn dầu dày dặn, hòa sắc ấn tượng của danh họa',
    promptSuffix: 'authentic fine art oil painting on linen canvas, thick visible impasto brushstrokes, rich classical harmonious palette, museum art masterpiece, fine art oil painting, no CGI render'
  },
  {
    id: 'collage',
    name: 'Xé Dán Giấy Màu',
    icon: '✂️',
    description: 'Cắt dán thủ công nhiều lớp giấy màu, đúng chất Mĩ thuật tiểu học',
    promptSuffix: 'authentic colorful handmade paper cut-out collage art, layered colored paper shapes, charming scissors cut lines, primary school art class handicraft, sweet and creative'
  }
];

// Gợi ý chủ đề vẽ tranh bằng Tiếng Việt thân thiện
const VIETNAMESE_KID_IDEAS = [
  { label: '🐱 Chú Mèo Cuộn Tròn', idea: 'chú mèo con đáng yêu đang cuộn tròn sưởi nắng bên khóm hoa' },
  { label: '🌾 Mùa Gặt Làng Quê', idea: 'cánh đồng lúa chín vàng ươm bát ngát với đàn trâu thong thả gặm cỏ' },
  { label: '⛵ Thuyền Buồm Ra Khơi', idea: 'chiếc thuyền buồm gỗ rực rỡ sắc màu lướt trên sóng biển xanh biếc' },
  { label: '🏫 Mái Trường Giờ Ra Chơi', idea: 'ngôi trường tiểu học rợp bóng cây xanh và các bạn học sinh vui đùa' },
  { label: '🦖 Khủng Long Hái Hoa', idea: 'chú khủng long con ngộ nghĩnh đang hái bông hoa hướng dương vàng tươi' },
  { label: '🌸 Đầm Sen Làng Quê', idea: 'bông hoa sen hồng nở rộ thơm ngát bên đầm nước trong lành' }
];

export default function InspirationView({ onSendToCanvas }) {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(ART_STYLES[0]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(
    'https://image.pollinations.ai/prompt/an%20authentic%20hand-drawn%20colored%20crayon%20painting%20of%20a%20cute%20little%20kitten%20painting%20a%20rainbow%20on%20paper%2C%20visible%20crayon%20wax%20strokes%2C%20traditional%20art%20for%20kids?width=600&height=450&model=flux&nologo=true'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [masterpieces, setMasterpieces] = useState([]);
  const [seed, setSeed] = useState(Date.now());
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    fetchMasterpieceArtworks().then(setMasterpieces);
  }, []);

  // Bộ mở rộng ý tưởng thông minh (Smart AI Prompt Expander)
  const buildRealArtPrompt = (rawText, style) => {
    let text = rawText.trim().toLowerCase();

    // Từ điển mở rộng ý tưởng sư phạm mĩ thuật
    let englishConcept = rawText.trim();
    if (/mèo|cún|chó/i.test(text)) {
      englishConcept = 'cute lovely kitten and puppy playing in a sunlit garden with flowers';
    } else if (/đồng|lúa|quê|gặt/i.test(text)) {
      englishConcept = 'peaceful Vietnamese countryside, golden ripe rice fields under morning sunshine with buffalo and farmer';
    } else if (/thuyền|biển|sóng/i.test(text)) {
      englishConcept = 'charming wooden sailboat sailing over blue ocean waves, flying seagulls, sunny coastal sky';
    } else if (/trường|học/i.test(text)) {
      englishConcept = 'friendly primary school building with shady green trees, colorful balloons and happy children';
    } else if (/khủng long/i.test(text)) {
      englishConcept = 'gentle adorable baby dinosaur exploring green meadow with giant sunflowers and butterflies';
    } else if (/sen|hoa/i.test(text)) {
      englishConcept = 'beautiful pink lotus blossoms blooming on calm pond with big green leaves and dragonfly';
    } else if (/nhà/i.test(text)) {
      englishConcept = 'cozy dream house with red roof, smoke chimney, garden of sunflowers and bright smiling sun';
    } else if (/xe|tàu/i.test(text)) {
      englishConcept = 'cute colorful cartoon locomotive train traveling through lush green hills and rainbows';
    } else {
      englishConcept = `${rawText.trim()}, charming fine art subject for children, rich details`;
    }

    return `${style.promptSuffix}, depicting ${englishConcept}, genuine fine-art painting, hand-painted on authentic paper, masterfully crafted, no digital render, no 3D`;
  };

  const handleGenerate = (textToUse = customPrompt, newSeed = false) => {
    const text = (textToUse || customPrompt).trim();
    if (!text) return;

    setIsGenerating(true);
    const nextSeed = newSeed ? Math.floor(Math.random() * 999999) : seed;
    setSeed(nextSeed);

    const fullPrompt = buildRealArtPrompt(text, selectedStyle);
    const encodedPrompt = encodeURIComponent(fullPrompt);

    // Dùng model flux của Pollinations để sinh tranh vẽ tay thực tế, không sinh dạng 3D render
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=640&height=480&model=flux&seed=${nextSeed}&nologo=true`;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setGeneratedImageUrl(url);
      setIsGenerating(false);
    };
    img.onerror = () => {
      // Fallback không dùng model param nếu model flux bận
      const fallbackUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=640&height=480&seed=${nextSeed}&nologo=true`;
      setGeneratedImageUrl(fallbackUrl);
      setIsGenerating(false);
    };
  };

  // Tải tranh về máy tính
  const downloadImage = async () => {
    try {
      const response = await fetch(generatedImageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `Tranh_Mau_${selectedStyle.id}_${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      window.open(generatedImageUrl, '_blank');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 flex flex-col gap-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 p-6 rounded-3xl text-white shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl shrink-0">
            <img
              src="./teacher.jpg"
              alt="Thầy Cọ Nhí"
              className="w-full h-full object-cover animate-bounce-gentle"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Xưởng Ý Tưởng & Sinh Tranh Vẽ Thật
            </h2>
            <p className="text-sm sm:text-base font-semibold text-purple-100">
              Biến mọi ý tưởng của bé thành tác phẩm tranh vẽ tay thực thụ (Sáp màu, Màu nước, Sơn dầu, Tranh Đông Hồ)!
            </p>
          </div>
        </div>

        <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-2xl font-black text-xs uppercase tracking-wider">
          🎨 AI Fine-Art Generator 100% Miễn Phí
        </div>
      </div>

      {/* Main Studio Container */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-purple-200 flex flex-col gap-6">
        {/* Style Selector */}
        <div>
          <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-600" />
            <span>1. Chọn Chất Liệu & Phong Cách Tranh Vẽ Thật:</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {ART_STYLES.map((st) => {
              const isSelected = selectedStyle.id === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStyle(st)}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-purple-500 text-white border-purple-600 shadow-lg scale-105 ring-2 ring-purple-300'
                      : 'bg-purple-50/50 hover:bg-purple-50 border-purple-100 text-gray-700'
                  }`}
                >
                  <span className="text-2xl">{st.icon}</span>
                  <span className="font-extrabold text-xs">{st.name}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] font-semibold text-purple-700 mt-2 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
            ✨ <b>Đặc trưng phong cách {selectedStyle.name}:</b> {selectedStyle.description}
          </p>
        </div>

        {/* Suggestion Chips */}
        <div>
          <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>2. Gợi Ý Đề Tài Sáng Tạo Của Thầy:</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {VIETNAMESE_KID_IDEAS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCustomPrompt(item.idea);
                  handleGenerate(item.idea, true);
                }}
                className="px-3.5 py-2 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 font-extrabold text-xs rounded-2xl shadow-sm transition hover:scale-105 active:scale-95"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div>
          <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
            3. Bé Muốn Thầy Vẽ Tranh Gì? (Nhập Tiếng Việt Thoải Mái):
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Ví dụ: Chú bộ đội canh gác trên đảo Trường Sa, Con mèo bắt chuột, Ngôi nhà có giàn hoa..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleGenerate();
              }}
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-200 font-bold text-sm bg-purple-50/20"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !customPrompt.trim()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition shrink-0"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isGenerating ? 'Đang Vẽ Tranh Thật...' : 'Vẽ Tranh Mẫu Ngay'}</span>
            </button>
          </div>
        </div>

        {/* Artwork Display Board */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-purple-50 to-pink-50 border-4 border-dashed border-purple-300 flex flex-col items-center justify-center min-h-[420px] p-4 sm:p-6 shadow-inner">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-4 text-purple-700 py-12">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center text-xl">🎨</span>
              </div>
              <div className="text-center">
                <p className="font-black text-base animate-pulse">
                  Thầy và AI đang hòa màu, tạo chất liệu {selectedStyle.name}...
                </p>
                <p className="text-xs text-purple-500 font-semibold mt-1">
                  Đang vẽ từng vệt cọ nghệ thuật thực tế cho bé ngắm!
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group max-w-2xl bg-white">
                <img
                  src={generatedImageUrl}
                  alt="Tranh mẫu nghệ thuật thực tế"
                  className="w-full h-auto max-h-[480px] object-contain"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur rounded-xl text-white font-extrabold text-xs shadow flex items-center gap-1.5">
                  <span>{selectedStyle.icon}</span>
                  <span>{selectedStyle.name}</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-center flex-wrap gap-2.5 mt-2">
                {/* Send to Canvas Button */}
                {onSendToCanvas && (
                  <button
                    onClick={() => onSendToCanvas(generatedImageUrl)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition"
                    title="Đưa tranh này sang Bảng Vẽ để tập đồ nét và tô màu"
                  >
                    <Paintbrush className="w-4 h-4" />
                    <span>🎨 Đưa Sang Bảng Vẽ Tập Tô</span>
                  </button>
                )}

                {/* Regenerate Seed */}
                <button
                  onClick={() => handleGenerate(customPrompt, true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white text-purple-700 border-2 border-purple-200 hover:bg-purple-50 font-black text-xs sm:text-sm rounded-2xl shadow transition active:scale-95"
                  title="Vẽ một bức tranh khác cùng chủ đề"
                >
                  <Dices className="w-4 h-4 text-purple-600" />
                  <span>🎲 Đổi Nét Vẽ Khác</span>
                </button>

                {/* Download Button */}
                <button
                  onClick={downloadImage}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 font-black text-xs sm:text-sm rounded-2xl shadow transition active:scale-95"
                  title="Tải tranh mẫu về máy tính"
                >
                  <Download className="w-4 h-4 text-gray-600" />
                  <span>📥 Tải Về Máy</span>
                </button>
              </div>

              <span className="text-[11px] font-bold text-gray-500 mt-1">
                💡 Bé có thể bấm <b>"Đưa Sang Bảng Vẽ Tập Tô"</b> để tập đồ lại nét vẽ và tự do sáng tạo màu sắc của riêng mình!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Famous Masterpieces from The Met Museum */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 rounded-2xl text-amber-600 text-xl">
            🏛️
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-800">
              Bảo Tàng Danh Tác Thu Nhỏ (The Met Collection)
            </h3>
            <p className="text-xs text-gray-500 font-semibold">
              Chiêm ngưỡng các bức tranh nổi tiếng thế giới với lời kể chuyện vui nhộn dành riêng cho bé!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {masterpieces.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-amber-200 flex flex-col hover:shadow-xl transition-all duration-200 group"
            >
              <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center relative">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur text-white text-[10px] font-bold rounded-lg">
                  CC0 Public Domain
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <h4 className="font-black text-gray-800 text-sm">
                    {art.title}
                  </h4>
                  <p className="text-xs font-bold text-amber-600">
                    {art.artist} ({art.year})
                  </p>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-4 leading-relaxed font-medium">
                    {art.story}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
