import React, { useState, useEffect } from 'react';
import { Sparkles, Palette, RefreshCw, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { fetchMasterpieceArtworks } from '../services/metMuseum';

const KID_PROMPT_IDEAS = [
  { label: '🦖 Khủng Long Ăn Kem', prompt: 'cute baby dinosaur eating strawberry ice cream, colorful watercolor style for kids, simple lines' },
  { label: '🚀 Tàu Vũ Trụ & Các Vì Sao', prompt: 'cute cartoon spaceship flying through stars and rainbow galaxy, children book illustration' },
  { label: '🍄 Ngôi Nhà Nấm Thần Tiên', prompt: 'fairy mushroom house in a magical forest with cute ladybug, warm crayon art for children' },
  { label: '🐬 Cá Heo Nhảy Sóng', prompt: 'happy cute dolphin jumping over ocean waves at sunset, colorful pastel painting' },
  { label: '🐱 Mèo Con Đi Khinh Khí Cầu', prompt: 'cute kitten flying in a colorful hot air balloon in the sky, sunny day, cartoon art' }
];

export default function InspirationView() {
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(
    'https://image.pollinations.ai/prompt/cute%20cartoon%20kitten%20painting%20a%20rainbow%20with%20brush%2C%20colorful%20children%20illustration?width=512&height=512&nologo=true'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [masterpieces, setMasterpieces] = useState([]);

  useEffect(() => {
    fetchMasterpieceArtworks().then(setMasterpieces);
  }, []);

  const handleGenerate = (promptText = customPrompt) => {
    if (!promptText.trim()) return;

    setIsGenerating(true);
    const enrichedPrompt = encodeURIComponent(
      `${promptText.trim()}, simple clean children book illustration, vibrant friendly colors, watercolor crayon style, for kids`
    );
    const url = `https://image.pollinations.ai/prompt/${enrichedPrompt}?width=512&height=512&seed=${Date.now()}&nologo=true`;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setGeneratedImageUrl(url);
      setIsGenerating(false);
    };
    img.onerror = () => {
      setIsGenerating(false);
    };
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 flex flex-col gap-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 p-6 rounded-3xl text-white shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-4xl shadow-inner animate-bounce-gentle">
            ✨
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Xưởng Cảm Hứng & Khám Phá Nghệ Thuật
            </h2>
            <p className="text-sm sm:text-base font-semibold text-purple-100">
              Biến mọi ý tưởng ngộ nghĩnh của bé thành tranh mẫu tham khảo hoàn toàn miễn phí!
            </p>
          </div>
        </div>

        <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-2xl font-black text-xs uppercase tracking-wider">
          Pollinations AI + The Met Museum
        </div>
      </div>

      {/* Part 1: AI Prompt-to-Sketch Idea Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-purple-200 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 rounded-2xl text-purple-600">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-800">
              Bé Muốn Vẽ Gì Hôm Nay? (Tạo Tranh Mẫu AI)
            </h3>
            <p className="text-xs text-gray-500 font-semibold">
              Nhập ý tưởng hoặc bấm chọn các gợi ý bên dưới để AI vẽ tranh mẫu cho bé xem nhé!
            </p>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap gap-2">
          {KID_PROMPT_IDEAS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCustomPrompt(item.prompt);
                handleGenerate(item.prompt);
              }}
              className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-extrabold text-xs rounded-2xl shadow-sm transition hover:scale-105 active:scale-95"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Ví dụ: Chú gấu cưỡi xe đạp dưới trời mưa..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-200 font-bold text-sm bg-purple-50/20"
          />
          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating || !customPrompt.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{isGenerating ? 'Đang Vẽ Mẫu...' : 'Tạo Tranh Mẫu Ngay'}</span>
          </button>
        </div>

        {/* Image Preview */}
        <div className="relative rounded-3xl overflow-hidden bg-purple-50 border-4 border-dashed border-purple-200 flex items-center justify-center min-h-[360px] p-4">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-3 text-purple-600">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="font-extrabold text-sm animate-pulse">
                Họa sĩ AI đang pha màu và phác thảo tranh mẫu cho bé...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <img
                src={generatedImageUrl}
                alt="Tranh mẫu AI"
                className="max-h-[380px] w-auto rounded-2xl shadow-lg object-contain"
              />
              <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                ✨ Tranh mẫu minh họa miễn phí từ Pollinations.ai
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Part 2: Famous Masterpieces from The Met Museum */}
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
