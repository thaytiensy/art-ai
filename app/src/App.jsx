import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Camera, 
  BookOpen, 
  Sparkles, 
  Key, 
  Heart,
  MessageCircle
} from 'lucide-react';
import DrawingCanvas from './components/DrawingCanvas';
import CritiqueView from './components/CritiqueView';
import StepByStepView from './components/StepByStepView';
import InspirationView from './components/InspirationView';
import ThematicTeacherChat from './components/ThematicTeacherChat';
import ApiKeyModal from './components/ApiKeyModal';
import TeacherBubble from './components/TeacherBubble';
import { KET_NOI_TRI_THUC_DATA } from './data/ketNoiTriThucCurriculum';
import { ttsService } from './services/tts';

export default function App() {
  const [activeTab, setActiveTab] = useState('thematicChat');
  const [apiKey, setApiKey] = useState('');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [critiqueImage, setCritiqueImage] = useState(null);
  const [canvasTemplate, setCanvasTemplate] = useState(null);
  const [currentUnit, setCurrentUnit] = useState(KET_NOI_TRI_THUC_DATA[0]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // 100% Persona: Thầy Giáo Mĩ Thuật (Thầy Cọ Nhí với ảnh chân dung thực tế)
  const teacher = { 
    name: 'Thầy Cọ Nhí', 
    pronoun: 'Thầy', 
    title: 'Thầy giáo', 
    avatarUrl: './teacher.jpg',
    fallbackEmoji: '👨‍🏫',
    gender: 'male' 
  };

  // Load API Key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('ARTED_GEMINI_API_KEY');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    localStorage.setItem('ARTED_GEMINI_API_KEY', newKey);
  };

  const handleAskTeacherFromCanvas = (canvasBase64) => {
    setCritiqueImage(canvasBase64);
    setActiveTab('critique');
  };

  const handleSelectToDraw = (template = null) => {
    if (template) setCanvasTemplate(template);
    setActiveTab('canvas');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b-2 border-pink-200 shadow-sm px-3 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          {/* Logo & Teacher Portrait */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('thematicChat')}>
            <div className="relative">
              {teacher.avatarUrl ? (
                <img
                  src={teacher.avatarUrl}
                  alt={teacher.name}
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-lg ring-2 ring-pink-300"
                />
              ) : (
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-white">
                  {teacher.fallbackEmoji}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 tracking-tight">
                  ART AI
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-extrabold text-[11px] shadow-sm">
                  Tiểu Học Lớp 1 - 5 🎒
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-gray-500 flex items-center gap-1">
                <span>{teacher.name} Dạy Mĩ Thuật Trực Tuyến</span>
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5 bg-pink-50/80 p-1.5 rounded-2xl border border-pink-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('thematicChat')}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                activeTab === 'thematicChat'
                  ? 'bg-rose-500 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:text-rose-600 hover:bg-rose-100/50'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>💬 Lớp Học Chủ Đề</span>
            </button>

            <button
              onClick={() => setActiveTab('canvas')}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                activeTab === 'canvas'
                  ? 'bg-pink-500 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-100/50'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>🎨 Bảng Vẽ</span>
            </button>

            <button
              onClick={() => setActiveTab('critique')}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                activeTab === 'critique'
                  ? 'bg-amber-500 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:text-amber-600 hover:bg-amber-100/50'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>📸 Mắt Thần Chấm Tranh</span>
            </button>

            <button
              onClick={() => setActiveTab('stepbystep')}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                activeTab === 'stepbystep'
                  ? 'bg-emerald-500 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-100/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>🐾 Vẽ Từng Bước</span>
            </button>

            <button
              onClick={() => setActiveTab('inspiration')}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                activeTab === 'inspiration'
                  ? 'bg-purple-500 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-100/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>✨ Xưởng Ý Tưởng</span>
            </button>
          </nav>

          {/* Teacher Badge & API Settings */}
          <div className="flex items-center gap-2">
            {/* 100% Thầy giáo Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border border-amber-300 rounded-2xl text-xs font-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>👨‍🏫 Thầy Cọ Nhí Giảng Dạy</span>
            </div>

            {/* API Key Modal Button */}
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black shadow-sm transition border ${
                apiKey
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
              }`}
              title="Cài đặt khóa Google Gemini hoặc Hugging Face"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {apiKey ? (apiKey.startsWith('hf_') ? 'Hugging Face' : 'Gemini') : 'Cài Key'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-4 sm:py-6">
        {activeTab === 'thematicChat' && (
          <ThematicTeacherChat
            apiKey={apiKey}
            teacher={teacher}
            onStartDrawingOnCanvas={handleSelectToDraw}
            onGoToCritique={() => setActiveTab('critique')}
            onUnitChange={(u) => setCurrentUnit(u)}
            onSlideChange={(idx) => setCurrentSlideIndex(idx)}
          />
        )}

        {activeTab === 'canvas' && (
          <DrawingCanvas 
            onAskTeacher={handleAskTeacherFromCanvas} 
            teacher={teacher}
            templateImage={canvasTemplate}
            onClearTemplate={() => setCanvasTemplate(null)}
          />
        )}

        {activeTab === 'critique' && (
          <CritiqueView
            initialImage={critiqueImage}
            apiKey={apiKey}
            teacher={teacher}
            onBackToCanvas={() => setActiveTab('canvas')}
          />
        )}

        {activeTab === 'stepbystep' && (
          <StepByStepView onSelectToDraw={handleSelectToDraw} />
        )}

        {activeTab === 'inspiration' && (
          <InspirationView
            onSendToCanvas={(imgUrl) => {
              setCanvasTemplate(imgUrl);
              setActiveTab('canvas');
            }}
          />
        )}
      </main>

      {/* Floating Teacher Lecture Bubble */}
      <TeacherBubble
        activeTab={activeTab}
        currentUnit={currentUnit}
        currentSlideIndex={currentSlideIndex}
        onOpenChat={() => setActiveTab('thematicChat')}
        onGoToCritique={() => setActiveTab('critique')}
      />

      {/* Footer */}
      <footer className="mt-auto bg-white/70 backdrop-blur border-t border-pink-100 py-4 px-4 text-center text-xs font-bold text-gray-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🎨 ART AI • Thầy Giáo Mĩ Thuật Dạy Học Tiếng Việt (Giọng Nam Thầy Cọ Nhí)</span>
          <span className="text-gray-400">Chuẩn GDPT 2018 Lớp 1 - 5 • Microsoft Edge Neural TTS vi-VN-NamMinhNeural</span>
        </div>
      </footer>

      {/* Settings Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        currentKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />
    </div>
  );
}
