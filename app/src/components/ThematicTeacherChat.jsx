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
  RotateCcw,
  Maximize2,
  Minimize2,
  HelpCircle,
  Camera,
  PenTool,
  Radio,
  Eraser
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KET_NOI_TRI_THUC_DATA } from '../data/ketNoiTriThucCurriculum';
import { generateTeacherResponse } from '../services/gemini';
import { ttsService } from '../services/tts';

export default function ThematicTeacherChat({ apiKey, onStartDrawingOnCanvas, onGoToCritique, teacher }) {
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState(KET_NOI_TRI_THUC_DATA[0]);
  const [viewMode, setViewMode] = useState('powerpoint'); // 'powerpoint' | 'word' | 'chat'
  
  // PowerPoint Slide & Presentation State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLaserOn, setIsLaserOn] = useState(false);
  const [laserCoords, setLaserCoords] = useState({ x: -100, y: -100 });
  const [isPenOn, setIsPenOn] = useState(false);
  const [isDrawingOnSlide, setIsDrawingOnSlide] = useState(false);
  
  // Interactive Quiz & Activities State
  const [activeInteractiveTab, setActiveInteractiveTab] = useState(null); // 'quiz' | 'explore' | 'apply'
  const [quizAnswered, setQuizAnswered] = useState(false);

  // Chat State
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const chatBottomRef = useRef(null);
  const slideContainerRef = useRef(null);
  const penCanvasRef = useRef(null);
  const topicRibbonRef = useRef(null);

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
      setQuizAnswered(false);
      clearPenCanvas();
    }
  };

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setCurrentSlideIndex(0);
    setQuizAnswered(false);
    clearPenCanvas();
    ttsService.stop();
    setIsSpeaking(false);
  };

  // Pre-warm audio cache for all slides of this unit in the background
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
    setQuizAnswered(false);
    clearPenCanvas();

    if (viewMode === 'powerpoint' && voiceEnabled && currentSlide?.teacherLecture) {
      const timer = setTimeout(() => {
        ttsService.speak(
          currentSlide.teacherLecture,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentSlideIndex, selectedUnit, viewMode]);

  // Keyboard navigation for real PowerPoint experience
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in chat or input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key.toLowerCase() === 'f') {
        setIsFullscreen(prev => !prev);
      } else if (e.key.toLowerCase() === 'l') {
        setIsLaserOn(prev => !prev);
        setIsPenOn(false);
      } else if (e.key.toLowerCase() === 'p') {
        setIsPenOn(prev => !prev);
        setIsLaserOn(false);
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, slides.length, isFullscreen]);

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

  // Laser Pointer Mouse Tracker
  const handleSlideMouseMove = (e) => {
    if (!slideContainerRef.current) return;
    const rect = slideContainerRef.current.getBoundingClientRect();
    setLaserCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    if (isPenOn && isDrawingOnSlide && penCanvasRef.current) {
      const ctx = penCanvasRef.current.getContext('2d');
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  };

  const handlePenMouseDown = (e) => {
    if (!isPenOn || !penCanvasRef.current) return;
    setIsDrawingOnSlide(true);
    const rect = slideContainerRef.current.getBoundingClientRect();
    const ctx = penCanvasRef.current.getContext('2d');
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handlePenMouseUp = () => {
    if (isDrawingOnSlide) {
      setIsDrawingOnSlide(false);
    }
  };

  const clearPenCanvas = () => {
    if (penCanvasRef.current) {
      const ctx = penCanvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, penCanvasRef.current.width, penCanvasRef.current.height);
    }
  };

  // Handle Interactive Quiz
  const handleQuizAnswer = (isCorrect) => {
    setQuizAnswered(true);
    if (isCorrect) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
      ttsService.speak(
        'Hoan hô con! Con trả lời hoàn toàn chính xác rồi đấy! Thầy khen ngợi con!',
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    } else {
      ttsService.speak(
        'Không sao đâu con yêu! Thầy trò mình cùng ngắm lại hình mẫu để khám phá bí quyết nhé!',
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  // Download Word Lesson Plan
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
                {teacherName} Giảng Bài Tương Tác
              </h2>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-xs shadow">
                📚 SGK Kết Nối Tri Thức Với Cuộc Sống
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-blue-100 mt-1">
              Tiến trình 5 Hoạt động chuẩn Công văn 2345/BGDĐT-GDTH • Trình chiếu PowerPoint tương tác 2 chiều với Thầy!
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
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
      </div>

      {/* 1. TOP CONTROL BAR: Grade Selector + Teaching Mode Switcher */}
      <div className="bg-white p-3 rounded-3xl shadow-md border-2 border-blue-100 flex items-center justify-between flex-wrap gap-3">
        {/* Grade Tabs (Lớp 1 -> Lớp 5) */}
        <div className="flex items-center gap-1.5 bg-blue-50/80 p-1.5 rounded-2xl border border-blue-200">
          <span className="text-xs font-black text-blue-900 px-2 hidden sm:inline">Khối Lớp:</span>
          {[1, 2, 3, 4, 5].map((g) => (
            <button
              key={g}
              onClick={() => handleSelectGrade(g)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-black text-xs sm:text-sm transition-all ${
                selectedGrade === g
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:bg-white hover:text-blue-600'
              }`}
            >
              Lớp {g}
            </button>
          ))}
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200 flex-wrap">
          <button
            onClick={() => setViewMode('powerpoint')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
              viewMode === 'powerpoint'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-white hover:text-orange-600'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>📽️ Trình Chiếu PowerPoint</span>
          </button>

          <button
            onClick={() => setViewMode('word')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
              viewMode === 'word'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-white hover:text-blue-600'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>📄 Giáo Án Word (CV 2345)</span>
          </button>

          <button
            onClick={() => setViewMode('chat')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
              viewMode === 'chat'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-white hover:text-rose-600'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>💬 Hỏi Thầy Bài Này</span>
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={onStartDrawingOnCanvas}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-500 to-amber-500 text-white text-xs font-black rounded-xl shadow hover:scale-105 active:scale-95 transition"
        >
          <Palette className="w-4 h-4" />
          <span>Vào Bảng Vẽ Thực Hành</span>
        </button>
      </div>

      {/* 2. HORIZONTAL TOPIC CAROUSEL RIBBON: All units for current grade */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-blue-50 p-3 rounded-3xl border-2 border-amber-200 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-amber-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Chủ Đề Kết Nối Tri Thức Lớp {selectedGrade}:</span>
            </span>
            <span className="text-xs font-bold text-gray-500">
              ({gradeUnits.length} bài học chuẩn GDPT 2018)
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                if (topicRibbonRef.current) {
                  topicRibbonRef.current.scrollBy({ left: -220, behavior: 'smooth' });
                }
              }}
              className="p-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-800 border border-amber-200 shadow-sm transition"
              title="Cuộn sang trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (topicRibbonRef.current) {
                  topicRibbonRef.current.scrollBy({ left: 220, behavior: 'smooth' });
                }
              }}
              className="p-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-800 border border-amber-200 shadow-sm transition"
              title="Cuộn sang phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable unit chips */}
        <div
          ref={topicRibbonRef}
          className="flex items-center gap-2.5 overflow-x-auto py-1 px-0.5 scrollbar-thin scrollbar-thumb-amber-300"
        >
          {gradeUnits.map((unit) => {
            const isSelected = selectedUnit.id === unit.id;
            return (
              <button
                key={unit.id}
                onClick={() => handleSelectUnit(unit)}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-102 ring-2 ring-blue-300'
                    : 'bg-white text-gray-800 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <span className="text-2xl p-1 bg-white/20 rounded-xl shrink-0">
                  {unit.icon}
                </span>
                <div className="min-w-0 max-w-[200px]">
                  <span className={`text-[10px] font-black uppercase block truncate ${isSelected ? 'text-amber-200' : 'text-amber-600'}`}>
                    {unit.unitNumber} • {unit.duration}
                  </span>
                  <p className="text-xs font-black truncate leading-tight">
                    {unit.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MAIN TEACHING AREA: Full-Width PowerPoint / Word / Chat */}
      <div className="w-full flex flex-col gap-4">

          {/* VIEW 1: POWERPOINT SLIDE DECK (INTERACTIVE PRESENTATION) */}
          {viewMode === 'powerpoint' && currentSlide && (
            <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4 sm:p-8 flex items-center justify-center' : ''}`}>
              <div 
                className={`bg-white rounded-3xl shadow-2xl border-4 border-orange-300 overflow-hidden flex flex-col transition-all duration-300 ${
                  isFullscreen ? 'w-full max-w-6xl max-h-[92vh] h-full ring-8 ring-orange-500/30' : 'min-h-[640px]'
                }`}
              >
                {/* 1. Pedagogical Stepper Bar: 5 Hoạt Động Giáo Án Chuẩn Công Văn 2345 */}
                <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-2 sm:p-3 text-white flex items-center justify-between gap-1 overflow-x-auto shadow-inner">
                  {slides.map((s, idx) => {
                    const isActive = currentSlideIndex === idx;
                    const isPast = currentSlideIndex > idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-white text-orange-900 shadow-md scale-105 ring-2 ring-white/60'
                            : isPast
                            ? 'bg-orange-600/60 text-white hover:bg-orange-600'
                            : 'bg-orange-600/30 text-orange-100 hover:bg-orange-600/50'
                        }`}
                      >
                        <span>{s.phaseIcon || '📌'}</span>
                        <span>{s.phase || `Hoạt động ${idx + 1}`}</span>
                      </button>
                    );
                  })}

                  {/* Fullscreen F5 Toggle */}
                  <button
                    onClick={() => setIsFullscreen(prev => !prev)}
                    className="p-1.5 rounded-xl bg-black/20 hover:bg-black/30 text-white transition ml-auto"
                    title={isFullscreen ? 'Thu nhỏ (Esc)' : 'Toàn màn hình trình chiếu (F5)'}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* 2. Slide Screen Canvas Area */}
                <div 
                  ref={slideContainerRef}
                  onMouseMove={handleSlideMouseMove}
                  onMouseDown={handlePenMouseDown}
                  onMouseUp={handlePenMouseUp}
                  className="relative p-6 sm:p-10 flex-1 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/70 flex flex-col justify-between select-none overflow-hidden"
                >
                  {/* Virtual Pen Canvas Layer */}
                  <canvas
                    ref={penCanvasRef}
                    width={1000}
                    height={600}
                    className={`absolute inset-0 w-full h-full pointer-events-none z-20 ${isPenOn ? 'cursor-crosshair' : ''}`}
                  />

                  {/* Virtual Laser Pointer Dot */}
                  {isLaserOn && (
                    <div 
                      className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
                      style={{ left: `${laserCoords.x}px`, top: `${laserCoords.y}px` }}
                    >
                      <div className="w-5 h-5 rounded-full bg-red-500 animate-ping opacity-75" />
                      <div className="absolute inset-0 w-3 h-3 m-auto rounded-full bg-red-600 shadow-lg ring-4 ring-red-400" />
                    </div>
                  )}

                  {/* Slide Header Info */}
                  <div className="flex items-center justify-between border-b-2 border-orange-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-orange-600 text-white text-xs font-black shadow-sm">
                        Slide {currentSlide.slideNumber} / {slides.length}
                      </span>
                      <span className="text-xs font-extrabold text-orange-900 bg-orange-100/80 px-2.5 py-1 rounded-lg">
                        {currentSlide.phase || 'Tiến trình bài giảng'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Laser & Pen Toolbar */}
                      <button
                        onClick={() => {
                          setIsLaserOn(prev => !prev);
                          setIsPenOn(false);
                        }}
                        className={`p-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition ${
                          isLaserOn ? 'bg-red-500 text-white border-red-600 shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                        title="Bật con trỏ Laser chỉ bảng (Phím L)"
                      >
                        <Radio className="w-3.5 h-3.5 text-red-500" />
                        <span className="hidden sm:inline">Laser</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsPenOn(prev => !prev);
                          setIsLaserOn(false);
                        }}
                        className={`p-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition ${
                          isPenOn ? 'bg-blue-600 text-white border-blue-700 shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                        title="Bật bút vẽ ghi chú lên slide (Phím P)"
                      >
                        <PenTool className="w-3.5 h-3.5 text-blue-500" />
                        <span className="hidden sm:inline">Bút Slide</span>
                      </button>

                      {isPenOn && (
                        <button
                          onClick={clearPenCanvas}
                          className="p-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold"
                          title="Xóa nét vẽ trên slide"
                        >
                          <Eraser className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <span className="px-3 py-1 bg-white border-2 border-orange-300 rounded-full text-xs font-black text-orange-900 shadow-sm">
                        {currentSlide.badge}
                      </span>
                    </div>
                  </div>

                  {/* Slide Content Body */}
                  <div className="my-6">
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                      {currentSlide.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-extrabold text-orange-600 mt-1">
                      {currentSlide.subtitle}
                    </p>

                    {/* Bullet Points with Animation */}
                    <div className="mt-6 flex flex-col gap-3">
                      {currentSlide.bullets.map((bullet, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-3 bg-white/95 p-3.5 sm:p-4 rounded-2xl border-2 border-orange-100 shadow-sm hover:border-orange-300 transition"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base font-bold text-gray-800 leading-snug">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* 3. Interactive Action Box per Slide Type */}
                    {currentSlide.interactiveAction && (
                      <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-orange-100 to-pink-100 border-2 border-amber-300 shadow-sm">
                        {currentSlide.interactiveAction.type === 'quiz' && (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                                <HelpCircle className="w-4 h-4 text-amber-700" />
                                <span>{currentSlide.interactiveAction.label}</span>
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm font-extrabold text-gray-800">
                              "{currentSlide.interactiveAction.question}"
                            </p>
                            
                            {!quizAnswered ? (
                              <div className="flex gap-2 flex-wrap mt-1">
                                <button
                                  onClick={() => handleQuizAnswer(true)}
                                  className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow transition"
                                >
                                  ✓ Con trả lời được rồi Thầy ơi!
                                </button>
                                <button
                                  onClick={() => handleQuizAnswer(false)}
                                  className="px-3.5 py-1.5 bg-white hover:bg-amber-50 text-amber-800 font-extrabold text-xs rounded-xl border border-amber-300 shadow-sm transition"
                                >
                                  💡 Thầy cho con gợi ý với ạ!
                                </button>
                              </div>
                            ) : (
                              <div className="p-2.5 bg-white/80 rounded-xl text-xs font-bold text-amber-950 border border-amber-300">
                                👏 {currentSlide.interactiveAction.hint}
                              </div>
                            )}
                          </div>
                        )}

                        {currentSlide.interactiveAction.type === 'draw' && (
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div>
                              <span className="text-xs font-black text-pink-900 block">
                                🎨 Hoạt Động Thực Hành:
                              </span>
                              <p className="text-xs font-bold text-gray-700">
                                Sẵn sàng đưa ý tưởng vào bài vẽ cùng Thầy!
                              </p>
                            </div>
                            <button
                              onClick={onStartDrawingOnCanvas}
                              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg hover:scale-105 active:scale-95 transition flex items-center gap-1.5 animate-pulse"
                            >
                              <Palette className="w-4 h-4" />
                              <span>Mở Bảng Vẽ Ngay</span>
                            </button>
                          </div>
                        )}

                        {currentSlide.interactiveAction.type === 'critique' && (
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div>
                              <span className="text-xs font-black text-amber-900 block">
                                🏅 Góc Triển Lãm & Đánh Giá:
                              </span>
                              <p className="text-xs font-bold text-gray-700">
                                Đánh giá theo Thang Rubric 4 Tiêu chí GDPT 2018!
                              </p>
                            </div>
                            {onGoToCritique && (
                              <button
                                onClick={onGoToCritique}
                                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg hover:scale-105 active:scale-95 transition flex items-center gap-1.5"
                              >
                                <Camera className="w-4 h-4" />
                                <span>Mắt Thần Chấm Tranh</span>
                              </button>
                            )}
                          </div>
                        )}

                        {currentSlide.interactiveAction.type === 'apply' && (
                          <div>
                            <span className="text-xs font-black text-indigo-900 block">
                              🚀 Thử Thách Vận Dụng Đời Sống:
                            </span>
                            <p className="text-xs font-bold text-gray-700 mt-0.5">
                              Mang bức tranh của con về trang trí góc học tập hoặc làm món quà tặng người thân thân yêu nhé!
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 4. Teacher Lecture Speech Bar with Audio Waves */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-3 sm:p-4 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={avatarUrl}
                          alt={teacherName}
                          className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-300 shadow"
                        />
                        {isSpeaking && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-blue-900">
                            {teacherName} Thuyết Minh:
                          </span>
                          {isSpeaking && (
                            <span className="text-[10px] font-black px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full animate-pulse">
                              🔊 Đang giảng...
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-700 italic line-clamp-2 mt-0.5">
                          "{currentSlide.teacherLecture}"
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={toggleCurrentSlideSpeech}
                      className={`shrink-0 px-4 py-2 rounded-xl font-black text-xs transition flex items-center gap-1.5 shadow ${
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

                {/* 5. Slide Control Footer */}
                <div className="bg-gray-100 p-3 sm:p-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-2">
                  <button
                    onClick={goToPrevSlide}
                    disabled={currentSlideIndex === 0}
                    className="flex items-center gap-1 px-4 py-2 bg-white text-gray-700 disabled:opacity-40 font-black rounded-xl text-xs sm:text-sm shadow-sm hover:bg-gray-50 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Hoạt Động Trước</span>
                  </button>

                  {/* Slide Step Indicator Dots */}
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
                        title={`Đến Hoạt Động ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={goToNextSlide}
                    disabled={currentSlideIndex === slides.length - 1}
                    className="flex items-center gap-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-40 font-black rounded-xl text-xs sm:text-sm shadow transition"
                  >
                    <span>Hoạt Động Tiếp</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
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
                  title="Tải giáo án Word (.doc) về máy tính"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Giáo Án (.doc)</span>
                </button>
              </div>

              {/* Word Document Preview */}
              <div className="p-6 sm:p-8 space-y-6 text-gray-800 bg-white font-sans text-xs sm:text-sm leading-relaxed max-h-[620px] overflow-y-auto">
                <div className="text-center border-b pb-4">
                  <p className="font-bold text-gray-500 uppercase text-xs">
                    Bộ Giáo Dục Và Đào Tạo • Trường Tiểu Học
                  </p>
                  <h3 className="text-lg sm:text-xl font-black text-rose-700 mt-1">
                    {selectedUnit.wordLessonPlan.title}
                  </h3>
                  <h4 className="font-extrabold text-blue-900 mt-0.5">
                    {selectedUnit.wordLessonPlan.unit}
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-1">
                    {selectedUnit.wordLessonPlan.book} • Thời lượng: {selectedUnit.duration}
                  </p>
                </div>

                {/* Section I */}
                <div>
                  <h5 className="font-black text-blue-900 text-sm mb-2 uppercase flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>I. Yêu Cầu Cần Đạt (Mục tiêu bài học):</span>
                  </h5>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-700 pl-2">
                    {selectedUnit.wordLessonPlan.objectives.map((obj, i) => (
                      <li key={i} className="font-medium">{obj}</li>
                    ))}
                  </ul>
                </div>

                {/* Section II */}
                <div>
                  <h5 className="font-black text-blue-900 text-sm mb-2 uppercase flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>II. Đồ Dùng Dạy Học:</span>
                  </h5>
                  <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-2">
                    <p><b>1. Giáo viên:</b> {selectedUnit.wordLessonPlan.preparations.teacher}</p>
                    <p><b>2. Học sinh:</b> {selectedUnit.wordLessonPlan.preparations.students}</p>
                  </div>
                </div>

                {/* Section III */}
                <div>
                  <h5 className="font-black text-blue-900 text-sm mb-2 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>III. Các Hoạt Động Dạy Học Chủ Yếu (5 Bước CV 2345):</span>
                  </h5>
                  <div className="space-y-3">
                    {selectedUnit.wordLessonPlan.activities.map((act, i) => (
                      <div key={i} className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                        <span className="font-black text-blue-800 text-xs sm:text-sm block mb-1">
                          {act.phase}
                        </span>
                        <p className="text-xs sm:text-sm text-gray-700 mt-1">
                          <b>- Giáo viên:</b> {act.teacherAct}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          <b>- Học sinh:</b> {act.studentAct || 'Tích cực tham gia và thực hành sáng tạo.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: 2-WAY TEACHER CHAT */}
          {viewMode === 'chat' && (
            <div className="bg-white rounded-3xl shadow-xl border-4 border-rose-200 overflow-hidden flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="p-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={avatarUrl}
                    alt={teacherName}
                    className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow"
                  />
                  <div>
                    <h4 className="font-black text-sm">Hỏi Thầy Về Bài: {selectedUnit.title}</h4>
                    <span className="text-[10px] text-rose-100 font-semibold">
                      {teacherName} đang online giải đáp cho con
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-rose-50/20">
                <div className="flex items-start gap-2.5">
                  <img
                    src={avatarUrl}
                    alt={teacherName}
                    className="w-8 h-8 rounded-xl object-cover border border-amber-300 shadow-sm shrink-0 mt-1"
                  />
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-rose-100 max-w-[85%]">
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">
                      Thầy chào con! Về bài học <b>"{selectedUnit.title}"</b>, con có thắc mắc gì về cách phác nét, phối màu hay cần Thầy vẽ mẫu tham khảo không?
                    </p>
                  </div>
                </div>

                {messages.map((m) => {
                  const isTeacher = m.sender === 'teacher';
                  return (
                    <div
                      key={m.id}
                      className={`flex items-start gap-2.5 ${isTeacher ? '' : 'flex-row-reverse'}`}
                    >
                      {isTeacher ? (
                        <img
                          src={avatarUrl}
                          alt={teacherName}
                          className="w-8 h-8 rounded-xl object-cover border border-amber-300 shadow-sm shrink-0 mt-1"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center font-black text-xs shrink-0 mt-1 shadow-sm">
                          Bé
                        </div>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl shadow-sm max-w-[85%] ${
                          isTeacher
                            ? 'bg-white rounded-tl-none border border-rose-100 text-gray-800'
                            : 'bg-rose-500 rounded-tr-none text-white'
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-semibold whitespace-pre-line leading-relaxed">
                          {m.text}
                        </p>

                        {m.imageUrl && (
                          <div className="mt-3 rounded-xl overflow-hidden border-2 border-white shadow">
                            <img
                              src={m.imageUrl}
                              alt="Tranh mẫu của Thầy"
                              className="w-full h-auto max-h-48 object-cover"
                            />
                            <span className="block text-[10px] p-1 bg-black/60 text-white text-center font-bold">
                              🎨 Tranh mẫu tham khảo Thầy vẽ cho con
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-2 text-rose-500 font-bold text-xs p-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-bounce [animation-delay:0.4s]" />
                    <span>{teacherName} đang suy nghĩ lời khuyên...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-white border-t border-rose-100 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Hỏi Thầy: 'Cách vẽ con mèo?', 'Vẽ giúp con bức tranh mẫu'..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2.5 rounded-2xl border border-rose-200 focus:outline-none focus:ring-4 focus:ring-rose-200 text-xs sm:text-sm font-semibold bg-rose-50/20"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isTyping}
                  className="p-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white shadow transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4. BOTTOM OVERVIEW SECTION: Grid of all units of current grade */}
        <div className="bg-white p-5 rounded-3xl border-2 border-gray-100 shadow-sm mt-2">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h4 className="font-black text-gray-800 text-sm sm:text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Chương Trình Mĩ Thuật Lớp {selectedGrade} ({gradeUnits.length} Bài Học - SGK Kết Nối Tri Thức)</span>
            </h4>
            <span className="text-xs font-bold text-gray-500">Bấm bài bất kỳ để trình chiếu ngay</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {gradeUnits.map((unit) => {
              const isSelected = selectedUnit.id === unit.id;
              return (
                <button
                  key={unit.id}
                  onClick={() => handleSelectUnit(unit)}
                  className={`p-3 rounded-2xl border-2 text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-300'
                      : 'bg-gray-50/70 border-gray-100 hover:bg-white hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 w-full">
                    <span className="text-2xl p-1.5 bg-white rounded-xl shadow-xs">
                      {unit.icon}
                    </span>
                    <span className="text-[10px] font-black text-amber-600 uppercase">
                      {unit.unitNumber}
                    </span>
                  </div>
                  <div className="mt-2">
                    <h5 className="font-extrabold text-gray-800 text-xs line-clamp-2">
                      {unit.title}
                    </h5>
                    <span className="inline-block mt-1 text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                      {unit.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
