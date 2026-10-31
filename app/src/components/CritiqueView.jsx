import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Award, 
  Camera,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { analyzeKidsArtwork } from '../services/gemini';
import { ttsService } from '../services/tts';

// 4 Tranh Mẫu Học Sinh Tiêu Biểu Để Thử Ngay (Instant 1-Click Testing)
const SAMPLE_ARTWORKS = [
  {
    id: 'sample_cat',
    title: 'Chú Mèo Con Vui Đùa',
    gradeTag: 'Lớp 1 • Chấm nét sáp',
    promptContext: 'Con vẽ chú mèo con lông màu cam đang cuộn tròn chơi trong vườn hoa dưới nắng',
    dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400"><rect width="500" height="400" fill="%23fef3c7"/><circle cx="430" cy="70" r="45" fill="%23f59e0b" opacity="0.8"/><path d="M 0,330 Q 150,300 300,340 T 500,320 L 500,400 L 0,400 Z" fill="%2386efac"/><ellipse cx="250" cy="270" rx="90" ry="70" fill="%23fb923c"/><circle cx="250" cy="170" r="55" fill="%23fb923c"/><polygon points="210,135 190,80 230,120" fill="%23ea580c"/><polygon points="290,135 310,80 270,120" fill="%23ea580c"/><ellipse cx="230" cy="165" rx="8" ry="12" fill="%231e293b"/><ellipse cx="270" cy="165" rx="8" ry="12" fill="%231e293b"/><circle cx="232" cy="162" r="3" fill="%23ffffff"/><circle cx="272" cy="162" r="3" fill="%23ffffff"/><polygon points="250,180 244,188 256,188" fill="%23fda4af"/><path d="M 244,192 Q 250,198 256,192" stroke="%231e293b" stroke-width="2" fill="none"/><line x1="210" y1="180" x2="160" y2="175" stroke="%23475569" stroke-width="2"/><line x1="210" y1="188" x2="160" y2="192" stroke="%23475569" stroke-width="2"/><line x1="290" y1="180" x2="340" y2="175" stroke="%23475569" stroke-width="2"/><line x1="290" y1="188" x2="340" y2="192" stroke="%23475569" stroke-width="2"/><path d="M 330,280 Q 390,260 380,210" stroke="%23ea580c" stroke-width="18" stroke-linecap="round" fill="none"/><circle cx="80" cy="330" r="10" fill="%23f43f5e"/><circle cx="120" cy="350" r="8" fill="%23a855f7"/><circle cx="420" cy="340" r="12" fill="%233b82f6"/></svg>'
  },
  {
    id: 'sample_house',
    title: 'Ngôi Nhà Mơ Ước',
    gradeTag: 'Lớp 2 • Hình khối cơ bản',
    promptContext: 'Con vẽ ngôi nhà mái ngói đỏ bên cạnh cái cây xanh tươi và mặt trời ấm áp',
    dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400"><rect width="500" height="400" fill="%23e0f2fe"/><circle cx="80" cy="70" r="40" fill="%23facc15"/><path d="M 0,280 L 500,280 L 500,400 L 0,400 Z" fill="%234ade80"/><rect x="160" y="190" width="180" height="130" fill="%23fde047" stroke="%23ca8a04" stroke-width="4"/><polygon points="140,190 250,90 360,190" fill="%23ef4444" stroke="%23b91c1c" stroke-width="4"/><rect x="225" y="240" width="50" height="80" fill="%23b45309"/><circle cx="265" cy="280" r="4" fill="%23fef08a"/><rect x="175" y="210" width="35" height="35" fill="%2338bdf8" stroke="%230284c7" stroke-width="3"/><rect x="290" y="210" width="35" height="35" fill="%2338bdf8" stroke="%230284c7" stroke-width="3"/><rect x="390" y="220" width="25" height="90" fill="%2378350f"/><circle cx="402" cy="180" r="50" fill="%2315803d"/></svg>'
  },
  {
    id: 'sample_flowers',
    title: 'Vườn Hoa Rực Rỡ',
    gradeTag: 'Lớp 3 • Hòa sắc ấm lạnh',
    promptContext: 'Con vẽ cánh đồng hoa rực rỡ sắc màu có đàn bướm bay lượn tung tăng',
    dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400"><rect width="500" height="400" fill="%23ecfdf5"/><circle cx="400" cy="80" r="35" fill="%23f59e0b"/><path d="M 0,260 Q 250,220 500,260 L 500,400 L 0,400 Z" fill="%2322c55e"/><circle cx="100" cy="290" r="22" fill="%23ef4444"/><circle cx="100" cy="290" r="10" fill="%23fef08a"/><path d="M 100,312 L 100,370" stroke="%2315803d" stroke-width="5"/><circle cx="250" cy="280" r="28" fill="%23ec4899"/><circle cx="250" cy="280" r="12" fill="%23fef08a"/><path d="M 250,308 L 250,380" stroke="%2315803d" stroke-width="6"/><circle cx="380" cy="300" r="20" fill="%238b5cf6"/><circle cx="380" cy="300" r="9" fill="%23fef08a"/><path d="M 380,320 L 380,370" stroke="%2315803d" stroke-width="5"/><ellipse cx="180" cy="140" rx="15" ry="10" fill="%23fbbf24"/><ellipse cx="195" cy="135" rx="8" ry="12" fill="%23fb923c"/><ellipse cx="165" cy="135" rx="8" ry="12" fill="%23fb923c"/></svg>'
  },
  {
    id: 'sample_boat',
    title: 'Thuyền Buồm Ra Khơi',
    gradeTag: 'Lớp 4 • Bố cục không gian',
    promptContext: 'Con vẽ chiếc thuyền buồm đang lướt sóng ra khơi ngắm hoàng hôn đỏ thắm',
    dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400"><rect width="500" height="400" fill="%23fed7aa"/><circle cx="250" cy="220" r="70" fill="%23f97316" opacity="0.9"/><path d="M 0,250 Q 125,240 250,250 T 500,250 L 500,400 L 0,400 Z" fill="%230284c7"/><path d="M 0,290 Q 125,280 250,290 T 500,290 L 500,400 L 0,400 Z" fill="%230369a1"/><path d="M 180,240 L 320,240 L 290,280 L 210,280 Z" fill="%23b45309" stroke="%2378350f" stroke-width="3"/><line x1="250" y1="130" x2="250" y2="240" stroke="%2378350f" stroke-width="4"/><polygon points="250,140 310,210 250,210" fill="%23ffffff"/><polygon points="246,150 190,215 246,215" fill="%23f87171"/></svg>'
  }
];

export default function CritiqueView({ initialImage, apiKey, onBackToCanvas, teacher, isTvMode = false }) {
  const [image, setImage] = useState(initialImage || null);
  const [analyzing, setAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [promptContext, setPromptContext] = useState('');

  const teacherName = teacher?.name || 'Thầy Cọ Nhí';
  const pronoun = teacher?.pronoun || 'Thầy';
  const avatar = teacher?.fallbackEmoji || '👨‍🏫';

  useEffect(() => {
    if (initialImage) {
      handleAnalyze(initialImage);
    }
  }, [initialImage]);

  const handleAnalyze = async (imgToAnalyze = image, contextToUse = promptContext) => {
    if (!imgToAnalyze) return;

    setAnalyzing(true);
    setFeedback(null);
    ttsService.stop();
    setIsSpeaking(false);

    try {
      const result = await analyzeKidsArtwork(imgToAnalyze, apiKey, contextToUse, teacher);
      setFeedback(result);

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Auto play teacher Vietnamese voice
      if (result?.raw) {
        ttsService.speak(
          result.raw, 
          () => setIsSpeaking(true), 
          () => setIsSpeaking(false)
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        setImage(base64);
        handleAnalyze(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleVoice = () => {
    if (isSpeaking) {
      ttsService.stop();
      setIsSpeaking(false);
    } else if (feedback?.raw) {
      ttsService.speak(
        feedback.raw, 
        () => setIsSpeaking(true), 
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <div className={`max-w-5xl mx-auto p-3 sm:p-6 flex flex-col gap-6 ${isTvMode ? 'text-lg max-w-7xl' : ''}`}>
      {/* Title Header */}
      <div className={`bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 p-6 rounded-3xl text-white shadow-xl flex items-center justify-between flex-wrap gap-4 ${isTvMode ? 'p-8 border-4 border-amber-300' : ''}`}>
        <div className="flex items-center gap-4">
          <div className="relative">
            {teacher?.avatarUrl ? (
              <img
                src={teacher.avatarUrl}
                alt={teacherName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-300 shadow-xl ring-2 ring-white/50 animate-bounce-gentle"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/teacher.jpg'; }}
              />
            ) : (
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-4xl shadow-inner animate-bounce-gentle">
                {avatar}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Mắt Thần Nhận Xét Của {teacherName}
            </h2>
            <p className="text-sm sm:text-base font-semibold text-rose-100">
              Chụp ảnh bài vẽ trên giấy hoặc gửi bài từ Bảng vẽ để {pronoun} chấm điểm nhé!
            </p>
          </div>
        </div>

        {onBackToCanvas && (
          <button
            onClick={onBackToCanvas}
            className="px-5 py-2.5 bg-white text-rose-600 font-extrabold rounded-2xl shadow hover:bg-rose-50 transition active:scale-95 text-sm"
          >
            ← Về Bảng Vẽ
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Artwork Image Upload / Preview */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-3xl shadow-lg border-2 border-pink-200">
            <h3 className="font-extrabold text-gray-700 mb-3 flex items-center gap-2">
              <Camera className="w-5 h-5 text-pink-500" />
              <span>Bức Tranh Của Bé</span>
            </h3>

            {image ? (
              <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-pink-300 group bg-gray-50 flex items-center justify-center min-h-[300px]">
                <img
                  src={image}
                  alt="Tranh của bé"
                  className="w-full max-h-[380px] object-contain rounded-xl"
                />
                <label className="absolute bottom-3 right-3 px-3 py-1.5 bg-pink-600/90 hover:bg-pink-600 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md backdrop-blur transition">
                  Đổi ảnh khác
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="border-4 border-dashed border-pink-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-3 bg-pink-50/50 hover:bg-pink-50 transition">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl">
                  📸
                </div>
                <div>
                  <p className="font-extrabold text-gray-700 text-base">
                    Tải ảnh bài vẽ lên đây
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-1">
                    Chụp ảnh tranh vẽ trên giấy của con (PNG, JPG)
                  </p>
                </div>
                <label className="mt-2 px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-sm rounded-xl cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition">
                  Chọn ảnh từ máy
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Note input from kid */}
            <div className="mt-4">
              <label className="block text-xs font-extrabold text-gray-600 mb-1">
                Bé muốn nhắn gì với {pronoun} không?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ví dụ: Con vẽ chú cún con đang chơi đùa..."
                  value={promptContext}
                  onChange={(e) => setPromptContext(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-bold rounded-xl border border-pink-200 focus:outline-none focus:ring-4 focus:ring-pink-200 bg-pink-50/30"
                />
                <button
                  onClick={() => handleAnalyze()}
                  disabled={!image || analyzing}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 disabled:opacity-50 text-white text-xs font-extrabold rounded-xl shadow hover:scale-105 active:scale-95 transition"
                >
                  {analyzing ? 'Đang ngắm...' : 'Nhận xét lại'}
                </button>
              </div>
            </div>

            {/* Quick 1-Click Sample Student Paintings to Test Immediately */}
            <div className="mt-4 pt-4 border-t border-pink-100 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-pink-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Tranh mẫu học sinh để {pronoun} chấm thử ngay:</span>
                </span>
                <span className="text-[10px] font-bold text-gray-400">1-click test</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_ARTWORKS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setImage(sample.dataUrl);
                      setPromptContext(sample.promptContext);
                      handleAnalyze(sample.dataUrl, sample.promptContext);
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-2xl border-2 border-pink-100 hover:border-pink-400 bg-pink-50/40 hover:bg-pink-100/60 transition group text-left"
                    title={`Chấm bức tranh: ${sample.title}`}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 shadow-xs border border-pink-200">
                      <img
                        src={sample.dataUrl}
                        alt={sample.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-black text-gray-800 block truncate group-hover:text-pink-600 transition">
                        {sample.title}
                      </span>
                      <span className="text-[10px] font-bold text-pink-600 block truncate">
                        {sample.gradeTag}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Teacher Feedback Card */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {analyzing ? (
            <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-amber-200 flex flex-col items-center justify-center text-center min-h-[420px] gap-4">
              {teacher?.avatarUrl ? (
                <div className="relative">
                  <img
                    src={teacher.avatarUrl}
                    alt={teacherName}
                    className="w-20 h-20 rounded-3xl object-cover border-4 border-amber-400 shadow-xl"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/teacher.jpg'; }}
                  />
                  <span className="absolute -bottom-2 -right-2 text-2xl animate-bounce">🔍</span>
                </div>
              ) : (
                <div className="text-6xl animate-bounce">
                  🔍
                </div>
              )}
              <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin my-2" />
              <h3 className="text-xl font-black text-pink-600">
                {teacherName} đang ngắm tranh của con...
              </h3>
              <p className="text-sm font-semibold text-gray-500 max-w-sm">
                Đang xem kỹ nét vẽ, cách chọn màu và chuẩn bị những lời khen tuyệt vời nhất tặng con đây!
              </p>
            </div>
          ) : feedback ? (
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-amber-300 relative overflow-hidden flex flex-col gap-5">
              {/* Badge & Score Ribbon */}
              <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-pink-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🏅</span>
                  <div>
                    <span className="text-xs font-extrabold text-pink-500 uppercase tracking-wider block">
                      Đánh Giá Chuẩn Mĩ Thuật GDPT 2018
                    </span>
                    <h4 className="text-xl font-black text-gray-800">
                      {feedback.badge}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3.5 py-1.5 bg-amber-400 text-amber-950 font-black text-lg rounded-2xl shadow-inner flex items-center gap-1">
                    <Sparkles className="w-5 h-5 text-white fill-white" />
                    <span>{feedback.score}/10 Điểm</span>
                  </div>

                  <button
                    onClick={toggleVoice}
                    title={`Nghe ${teacherName} đọc nhận xét`}
                    className={`p-2.5 rounded-2xl font-bold flex items-center gap-1.5 transition-all ${
                      isSpeaking
                        ? 'bg-rose-500 text-white animate-pulse shadow-lg'
                        : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    <span className="text-xs font-black">{isSpeaking ? 'Dừng' : `Nghe ${pronoun} Giảng`}</span>
                  </button>
                </div>
              </div>

              {/* Visual Stats Badge */}
              {feedback.visualStats && (
                <div className="flex items-center gap-2 flex-wrap text-[11px] font-extrabold text-gray-600 bg-amber-50/60 p-2.5 rounded-2xl border border-amber-200">
                  <span className="px-2 py-0.5 rounded-lg bg-white border border-amber-300 text-amber-900">
                    👁️ {feedback.visualStats.colorDescription}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-white border border-amber-300 text-amber-900">
                    📊 Độ phủ nét vẽ: {feedback.visualStats.coveragePercent}%
                  </span>
                </div>
              )}

              {/* Headline */}
              {feedback.headline && (
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-2xl">🎉</span>
                  <p className="font-black text-rose-800 text-sm leading-snug">
                    {feedback.headline}
                  </p>
                </div>
              )}

              {/* 4 Rubric Criteria Grid (Chuẩn GDPT 2018) */}
              {feedback.rubrics && feedback.rubrics.length > 0 ? (
                <div>
                  <h5 className="font-black text-gray-800 text-xs sm:text-sm uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <span>📋 Bảng Tiêu Chí Rubric Đánh Giá (Bộ GD&ĐT):</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {feedback.rubrics.map((r, i) => (
                      <div key={i} className="bg-gray-50/80 border-2 border-gray-200 p-3.5 rounded-2xl flex flex-col justify-between hover:border-pink-300 transition">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-black text-xs text-pink-700">
                              {r.criterion}
                            </span>
                            <span className="text-amber-500 text-xs">
                              {'★'.repeat(r.stars || 5)}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-gray-700 leading-relaxed">
                            {r.feedback}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-rose-50 border-2 border-rose-200 p-4 rounded-2xl flex items-start gap-3">
                    <div className="p-2 bg-rose-500 text-white rounded-xl text-lg shadow-sm">💖</div>
                    <div>
                      <h5 className="font-extrabold text-rose-700 text-sm mb-1">Lời Khen Ngọt Ngào:</h5>
                      <p className="text-sm font-bold text-gray-700 leading-relaxed">{feedback.praise}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3 Actionable Improvement Steps */}
              {feedback.improvements && feedback.improvements.length > 0 && (
                <div className="bg-amber-50/90 border-2 border-amber-300 p-4 rounded-2xl flex flex-col gap-2">
                  <h5 className="font-black text-amber-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span>💡 3 Bước Cải Thiện Trực Quan Của {pronoun}:</span>
                  </h5>
                  <div className="space-y-1.5 text-xs font-bold text-amber-950">
                    {feedback.improvements.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white/70 p-2 rounded-xl">
                        <span className="font-black text-amber-600 shrink-0">✓</span>
                        <p className="leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teacher Message */}
              <div className="bg-sky-50 border-2 border-sky-200 p-4 rounded-2xl flex items-start gap-3">
                <div className="p-2 bg-sky-500 text-white rounded-xl text-lg shadow-sm">🌸</div>
                <div>
                  <h5 className="font-extrabold text-sky-800 text-sm mb-1">
                    Lời Nhắn Nhủ Yêu Thương Của {teacherName}:
                  </h5>
                  <p className="text-xs sm:text-sm font-bold text-gray-700 leading-relaxed">
                    {feedback.teacherMessage || feedback.conclusion}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3 justify-end">
                {onBackToCanvas && (
                  <button
                    onClick={onBackToCanvas}
                    className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold rounded-2xl shadow hover:scale-105 active:scale-95 transition text-sm flex items-center gap-1.5"
                  >
                    <span>Vẽ bức tranh mới ngay</span>
                    <span>🎨</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-gray-100 flex flex-col items-center justify-center text-center min-h-[380px] gap-3 text-gray-400">
              <span className="text-5xl">🎨</span>
              <p className="font-bold text-gray-600">
                Hãy vẽ một bức tranh trên Bảng vẽ hoặc tải ảnh bài vẽ lên để nhận lời khuyên từ {teacherName} nhé!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
