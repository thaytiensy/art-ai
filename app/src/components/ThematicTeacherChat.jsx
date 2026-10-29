import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Palette, 
  FileText, 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  CheckCircle2, 
  Lightbulb, 
  Target,
  Image as ImageIcon,
  MessageCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { KET_NOI_TRI_THUC_DATA } from '../data/ketNoiTriThucCurriculum';
import { generateTeacherResponse } from '../services/gemini';
import { ttsService } from '../services/tts';

export default function ThematicTeacherChat({ apiKey, onStartDrawingOnCanvas, teacher }) {
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState(KET_NOI_TRI_THUC_DATA[0]);
  const [viewMode, setViewMode] = useState('powerpoint'); // 'powerpoint' | 'word' | 'chat'
  
  // PowerPoint Slide State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlideAutoPlaying, setIsSlideAutoPlaying] = useState(false);

  // Chat State
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const chatBottomRef = useRef(null);

  const teacherName = teacher?.name || 'Thầy Cọ Nhí';
  const pronoun = teacher?.pronoun || 'Thầy';
  const avatarUrl = teacher?.avatarUrl || '/teacher.jpg';

  // Filter lessons for selected grade
  const gradeUnits = KET_NOI_TRI_THUC_DATA.filter(u => u.grade === selectedGrade);
  const slides = selectedUnit.powerpointSlides || [];
  const currentSlide = slides[currentSlideIndex] || slides[0];

  // Update unit when grade changes
  const handleSelectGrade = (grade) => {
    setSelectedGrade(grade);
    const firstOfGrade = KET_NOI_TRI_THUC_DATA.find(u => u.grade === grade);
    if (firstOfGrade) {
      setSelectedUnit(firstOfGrade);
      setCurrentSlideIndex(0);
    }
  };

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setCurrentSlideIndex(0);
    ttsService.stop();
    setIsSpeaking(false);
  };

  // Preload/Pre-warm âm thanh bài giảng của các slide trong nền để chuyển slide nghe được ngay lập tức (0ms độ trễ)
  useEffect(() => {
    if (selectedUnit?.powerpointSlides) {
      selectedUnit.powerpointSlides.forEach((s) => {
        if (s.teacherLecture) {
          ttsService.preload(s.teacherLecture);
        }
      });
    }
  }, [selectedUnit]);

  // When switching slides, auto speak lecture if voice is enabled
  useEffect(() => {
    if (viewMode === 'powerpoint' && voiceEnabled && currentSlide?.teacherLecture) {
      const timer = setTimeout(() => {
        ttsService.speak(
          currentSlide.teacherLecture,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentSlideIndex, selectedUnit, viewMode]);

  // Next / Prev Slide
  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Toggle Slide Speech
  const toggleCurrentSlideSpeech = () => {
    if (isSpeaking) {
      ttsService.stop();
      setIsSpeaking(false);
    } else if (currentSlide?.teacherLecture) {
      ttsService.speak(
        currentSlide.teacherLecture,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  // Download Word Lesson Plan as .doc file
  const downloadWordPlan = () => {
    const plan = selectedUnit.wordLessonPlan;
    if (!plan) return;

    let content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${plan.title}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.5; margin: 30px; }
        h1 { font-size: 16pt; font-weight: bold; text-align: center; color: #b91c1c; }
        h2 { font-size: 14pt; font-weight: bold; text-align: center; margin-bottom: 20px; }
        h3 { font-size: 13pt; font-weight: bold; color: #1e3a8a; margin-top: 15px; }
        p, li { font-size: 13pt; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #333; padding: 8px; text-align: left; }
        th { background-color: #f3f4f6; }
      </style>
      </head>
      <body>
        <p style='text-align: center;'><b>BỘ GIÁO DỤC VÀ ĐÀO TẠO • TRƯỜNG TIỂU HỌC</b><br>TỔ CHUYÊN MÔN KHỐI ${selectedGrade}</p>
        <hr/>
        <h1>${plan.title}</h1>
        <h2>${plan.unit}</h2>
        <p><b>Bộ sách:</b> ${plan.book}</p>
        <p><b>Giáo viên giảng dạy:</b> ${teacherName}</p>
        <p><b>Thời lượng:</b> ${selectedUnit.duration}</p>
        
        <h3>I. YÊU CẦU CẦN ĐẠT</h3>
        <ul>
          ${plan.objectives.map(o => `<li>${o}</li>`).join('')}
        </ul>

        <h3>II. ĐỒ DÙNG DẠY HỌC</h3>
        <p><b>1. Giáo viên:</b> ${plan.preparations.teacher}</p>
        <p><b>2. Học sinh:</b> ${plan.preparations.students}</p>

        <h3>III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU (CHUẨN CÔNG VĂN 2345/BGDĐT-GDTH)</h3>
        <table>
          <tr>
            <th style='width: 30%;'>Tiến trình hoạt động</th>
            <th style='width: 70%;'>Hoạt động của Giáo viên & Học sinh</th>
          </tr>
          ${plan.activities.map(a => `
            <tr>
              <td><b>${a.phase}</b></td>
              <td>
                <p><b>- Thầy giáo:</b> ${a.teacherAct}</p>
                <p><b>- Học sinh:</b> ${a.studentAct || 'Tích cực thực hành và tương tác.'}</p>
              </td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Giao_An_Mi_Thuat_Lop_${selectedGrade}_${selectedUnit.id}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Chat message sending
  const handleSendMessage = async (textToSend = inputText) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: 'student',
      text: text,
      time: 'Vừa xong'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const teacherReply = await generateTeacherResponse(text, selectedUnit, apiKey, teacher);
      const teacherMsg = {
        id: `teacher_${Date.now()}`,
        sender: 'teacher',
        text: teacherReply.text,
        imageUrl: teacherReply.imageUrl || null,
        time: 'Vừa xong'
      };

      setMessages(prev => [...prev, teacherMsg]);

      if (voiceEnabled && teacherReply.text) {
        ttsService.speak(
          teacherReply.text,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 flex flex-col gap-6">
      {/* Top Banner: SGK Kết Nối Tri Thức */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-amber-500 p-6 rounded-3xl text-white shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={teacherName}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl object-cover border-4 border-amber-300 shadow-2xl ring-4 ring-white/30 animate-bounce-gentle"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center text-[10px]">
              ✓
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-black">
                {teacherName} Giảng Dạy
              </h2>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-xs shadow">
                📚 SGK Kết Nối Tri Thức Với Cuộc Sống
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-blue-100 mt-1">
              Phân phối chương trình GDPT 2018 Lớp 1 - 5 • Tích hợp Giáo án PowerPoint & Giáo án Word chuẩn CV 2345!
            </p>
          </div>
        </div>

        {/* Global Voice Toggle */}
        <button
          onClick={() => {
            const next = !voiceEnabled;
            setVoiceEnabled(next);
            if (!next) ttsService.stop();
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs transition shadow-md ${
            voiceEnabled
              ? 'bg-white text-blue-700 hover:bg-blue-50'
              : 'bg-white/30 text-white hover:bg-white/40'
          }`}
        >
          {voiceEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
          <span>{voiceEnabled ? 'Giọng Thầy: BẬT' : 'Giọng Thầy: TẮT'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Grade Selector & Unit List */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Grade Tabs (Lớp 1 -> Lớp 5) */}
          <div className="bg-white p-2 sm:p-3 rounded-3xl shadow-sm border-2 border-blue-100 flex items-center justify-between gap-1">
            {[1, 2, 3, 4, 5].map((g) => (
              <button
                key={g}
                onClick={() => handleSelectGrade(g)}
                className={`flex-1 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  selectedGrade === g
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                Lớp {g}
              </button>
            ))}
          </div>

          {/* Unit List */}
          <div className="flex flex-col gap-2.5 max-h-[660px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-blue-300">
            <h3 className="font-black text-gray-700 text-sm px-1 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Chủ Đề Kết Nối Tri Thức Lớp {selectedGrade}:</span>
            </h3>

            {gradeUnits.map((unit) => {
              const isSelected = selectedUnit.id === unit.id;
              return (
                <button
                  key={unit.id}
                  onClick={() => handleSelectUnit(unit)}
                  className={`w-full p-4 rounded-3xl border-2 text-left flex items-start gap-3 transition-all ${
                    isSelected
                      ? 'bg-white border-blue-500 shadow-lg scale-102 ring-2 ring-blue-300'
                      : 'bg-white/80 border-gray-100 hover:bg-white hover:border-blue-200'
                  }`}
                >
                  <span className="text-3xl p-2.5 bg-blue-50 rounded-2xl shrink-0 mt-0.5">
                    {unit.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-black text-amber-600 uppercase">
                        {unit.unitNumber} • {unit.duration}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-gray-800 text-sm mt-0.5">
                      {unit.title}
                    </h4>
                    <span className="inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {unit.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Teaching Modes (PowerPoint vs Word vs Chat) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Mode Switcher Tabs */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setViewMode('powerpoint')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
                  viewMode === 'powerpoint'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                <Presentation className="w-4 h-4" />
                <span>📽️ Giáo Án PowerPoint (Slide)</span>
              </button>

              <button
                onClick={() => setViewMode('word')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
                  viewMode === 'word'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>📄 Giáo Án Word (CV 2345)</span>
              </button>

              <button
                onClick={() => setViewMode('chat')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
                  viewMode === 'chat'
                    ? 'bg-rose-500 text-white shadow'
                    : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>💬 Hỏi Thầy Bài Này</span>
              </button>
            </div>

            {/* Quick Draw Action */}
            <button
              onClick={onStartDrawingOnCanvas}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-pink-500 to-amber-500 text-white text-xs font-black rounded-xl shadow hover:scale-105 transition"
            >
              <Palette className="w-4 h-4" />
              <span>Vào Bảng Vẽ Thực Hành</span>
            </button>
          </div>

          {/* VIEW 1: POWERPOINT SLIDE DECK */}
          {viewMode === 'powerpoint' && currentSlide && (
            <div className="bg-white rounded-3xl shadow-xl border-4 border-orange-200 overflow-hidden flex flex-col min-h-[580px]">
              {/* Slide Screen Area */}
              <div className="relative p-6 sm:p-8 flex-1 bg-gradient-to-br from-amber-50 via-white to-orange-50 flex flex-col justify-between">
                {/* Slide Header Info */}
                <div className="flex items-center justify-between border-b border-orange-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-black">
                      Slide {currentSlide.slideNumber} / {slides.length}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      SGK Mĩ thuật {selectedGrade} • {selectedUnit.unitNumber}
                    </span>
                  </div>

                  <span className="px-3 py-1 bg-white border border-orange-300 rounded-full text-xs font-black text-orange-800 shadow-sm">
                    {currentSlide.badge}
                  </span>
                </div>

                {/* Slide Body */}
                <div className="my-6">
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                    {currentSlide.title}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-orange-600 mt-1">
                    {currentSlide.subtitle}
                  </p>

                  {/* Bullet Points */}
                  <div className="mt-6 flex flex-col gap-3">
                    {currentSlide.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white/90 p-3.5 rounded-2xl border border-orange-100 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base font-bold text-gray-800">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teacher Lecture Note Callout Box */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatarUrl}
                      alt={teacherName}
                      className="w-12 h-12 rounded-xl object-cover border border-amber-300 shadow"
                    />
                    <div>
                      <span className="text-xs font-black text-blue-900 block">
                        Lời Thầy giáo thuyết trình:
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-gray-700 italic line-clamp-2">
                        "{currentSlide.teacherLecture}"
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={toggleCurrentSlideSpeech}
                    className={`shrink-0 px-3.5 py-2 rounded-xl font-black text-xs transition flex items-center gap-1.5 shadow ${
                      isSpeaking
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{isSpeaking ? 'Dừng' : 'Nghe Thầy'}</span>
                  </button>
                </div>
              </div>

              {/* Slide Control Footer */}
              <div className="bg-gray-100 p-3 sm:p-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-2">
                <button
                  onClick={goToPrevSlide}
                  disabled={currentSlideIndex === 0}
                  className="flex items-center gap-1 px-4 py-2 bg-white text-gray-700 disabled:opacity-40 font-black rounded-xl text-xs sm:text-sm shadow-sm hover:bg-gray-50 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Slide Trước</span>
                </button>

                {/* Slide Indicator Dots */}
                <div className="flex items-center gap-2">
                  {slides.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentSlideIndex === idx
                          ? 'w-8 bg-orange-500'
                          : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                      }`}
                      title={`Đến Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNextSlide}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="flex items-center gap-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-40 font-black rounded-xl text-xs sm:text-sm shadow transition"
                >
                  <span>Slide Tiếp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* VIEW 2: WORD LESSON PLAN (CHUẨN CÔNG VĂN 2345/BGDĐT) */}
          {viewMode === 'word' && selectedUnit.wordLessonPlan && (
            <div className="bg-white rounded-3xl shadow-xl border-4 border-blue-200 overflow-hidden flex flex-col">
              {/* Word Document Action Header */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-black text-sm text-blue-950">
                    Kế Hoạch Bài Dạy Mĩ Thuật Chuẩn Công Văn 2345/BGDĐT-GDTH
                  </span>
                </div>

                <button
                  onClick={downloadWordPlan}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow hover:scale-105 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Giáo Án (.doc)</span>
                </button>
              </div>

              {/* Word Page Canvas Layout */}
              <div className="p-6 sm:p-10 font-serif leading-relaxed text-gray-800 max-h-[600px] overflow-y-auto">
                {/* Official Ministry Header */}
                <div className="text-center pb-4 border-b border-gray-300 mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-600">
                    BỘ GIÁO DỤC VÀ ĐÀO TẠO • TRƯỜNG TIỂU HỌC
                  </p>
                  <p className="text-xs text-gray-500">
                    TỔ CHUYÊN MÔN MĨ THUẬT KHỐI {selectedGrade}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-blue-900 mt-3 font-sans uppercase">
                    {selectedUnit.wordLessonPlan.title}
                  </h3>
                  <h4 className="text-base font-bold text-gray-700 font-sans mt-1">
                    {selectedUnit.wordLessonPlan.unit}
                  </h4>
                  <p className="text-xs font-sans text-gray-500 mt-1 italic">
                    Bộ sách: {selectedUnit.wordLessonPlan.book} • Thời lượng: {selectedUnit.duration}
                  </p>
                </div>

                {/* Section I */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-blue-900 mb-2 font-sans flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>I. YÊU CẦU CẦN ĐẠT (YCCĐ)</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-sm">
                    {selectedUnit.wordLessonPlan.objectives.map((obj, i) => (
                      <li key={i} className="pl-1">
                        <span className="font-medium">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section II */}
                <div className="mb-6">
                  <h4 className="text-base font-bold text-blue-900 mb-2 font-sans flex items-center gap-2">
                    <Palette className="w-4 h-4 text-blue-600" />
                    <span>II. ĐỒ DÙNG DẠY HỌC</span>
                  </h4>
                  <div className="text-sm space-y-1 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                    <p><b>1. Giáo viên:</b> {selectedUnit.wordLessonPlan.preparations.teacher}</p>
                    <p><b>2. Học sinh:</b> {selectedUnit.wordLessonPlan.preparations.students}</p>
                  </div>
                </div>

                {/* Section III */}
                <div>
                  <h4 className="text-base font-bold text-blue-900 mb-3 font-sans flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU</span>
                  </h4>

                  <div className="space-y-4">
                    {selectedUnit.wordLessonPlan.activities.map((act, i) => (
                      <div key={i} className="border border-blue-100 rounded-2xl p-4 bg-blue-50/30">
                        <span className="font-sans font-black text-sm text-blue-800 block mb-2">
                          {act.phase}
                        </span>
                        <div className="text-sm space-y-1.5 pl-2 border-l-2 border-blue-400">
                          <p><b>- Hoạt động của Thầy:</b> {act.teacherAct}</p>
                          <p><b>- Hoạt động của Trò:</b> {act.studentAct || 'Lắng nghe, quan sát và thực hành tích cực.'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: CHAT DIALOGUE WITH THẦY */}
          {viewMode === 'chat' && (
            <div className="bg-white rounded-3xl shadow-xl border-4 border-rose-200 flex flex-col h-[580px] overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={avatarUrl}
                    alt={teacherName}
                    className="w-10 h-10 rounded-xl object-cover border border-amber-300"
                  />
                  <div>
                    <h4 className="font-black text-sm text-rose-900">
                      Đàm Thoại Trực Tuyến Với {teacherName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Hỏi Thầy về chủ đề: {selectedUnit.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
                <div className="flex items-start gap-2.5">
                  <img src={avatarUrl} alt={teacherName} className="w-8 h-8 rounded-lg object-cover" />
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[85%]">
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">
                      Thầy chào con! Con có câu hỏi hay thắc mắc gì về bài học <b>"{selectedUnit.title}"</b> của SGK Kết nối tri thức không? Cứ hỏi Thầy thoải mái nhé!
                    </p>
                  </div>
                </div>

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${m.sender === 'student' ? 'flex-row-reverse' : ''}`}
                  >
                    {m.sender === 'teacher' ? (
                      <img src={avatarUrl} alt={teacherName} className="w-8 h-8 rounded-lg object-cover" />
                    ) : (
                      <div className="w-8 h-8 bg-amber-400 text-amber-900 rounded-lg flex items-center justify-center font-black text-xs">
                        Bé
                      </div>
                    )}
                    <div
                      className={`p-3.5 rounded-2xl max-w-[85%] ${
                        m.sender === 'student'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-100'
                      }`}
                    >
                      <p className="text-xs sm:text-sm font-semibold">{m.text}</p>
                      {m.imageUrl && (
                        <img src={m.imageUrl} alt="Tranh mẫu" className="mt-2 rounded-xl border max-h-48 object-cover" />
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 italic">
                    <span>{teacherName} đang gõ câu trả lời...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Nhập câu hỏi để hỏi ${teacherName}...`}
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="p-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl shadow transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
