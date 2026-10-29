import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Award, 
  Camera
} from 'lucide-react';
import { analyzeKidsArtwork } from '../services/gemini';
import { ttsService } from '../services/tts';

export default function CritiqueView({ initialImage, apiKey, onBackToCanvas, teacher }) {
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

  const handleAnalyze = async (imgToAnalyze = image) => {
    if (!imgToAnalyze) return;

    setAnalyzing(true);
    setFeedback(null);
    ttsService.stop();
    setIsSpeaking(false);

    try {
      const result = await analyzeKidsArtwork(imgToAnalyze, apiKey, promptContext, teacher);
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
    <div className="max-w-5xl mx-auto p-3 sm:p-6 flex flex-col gap-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 p-6 rounded-3xl text-white shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            {teacher?.avatarUrl ? (
              <img
                src={teacher.avatarUrl}
                alt={teacherName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-300 shadow-xl ring-2 ring-white/50 animate-bounce-gentle"
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
