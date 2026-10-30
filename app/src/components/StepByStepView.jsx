import React, { useState } from 'react';
import { DRAWING_LESSONS } from '../data/lessons';
import { ChevronRight, ChevronLeft, Sparkles, BookOpen, Volume2, VolumeX } from 'lucide-react';
import { ttsService } from '../services/tts';

export default function StepByStepView({ onSelectToDraw }) {
  const [selectedLesson, setSelectedLesson] = useState(DRAWING_LESSONS[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentStepIndex(0);
    ttsService.stop();
    setIsSpeaking(false);
  };

  const nextStep = () => {
    ttsService.stop();
    setIsSpeaking(false);
    if (currentStepIndex < selectedLesson.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    ttsService.stop();
    setIsSpeaking(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const activeStep = selectedLesson.steps[currentStepIndex];

  const toggleSpeakStep = () => {
    if (isSpeaking) {
      ttsService.stop();
      setIsSpeaking(false);
    } else {
      const textToSpeak = `Bước ${activeStep.step}: ${activeStep.title}. ${activeStep.detail}. Bí quyết của Thầy: ${activeStep.tip}`;
      ttsService.speak(
        textToSpeak,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 p-6 rounded-3xl text-white shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-inner shrink-0">
            <img
              src="./teacher.jpg"
              alt="Thầy Cọ Nhí"
              className="w-full h-full object-cover animate-bounce-gentle"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Tập Vẽ Từng Bước Cùng Thầy
            </h2>
            <p className="text-sm sm:text-base font-semibold text-blue-100">
              Thầy chia nhỏ mọi hình vẽ thành các khối hình học siêu đơn giản cho con dễ vẽ!
            </p>
          </div>
        </div>

        <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-2xl font-black text-xs uppercase tracking-wider">
          Chuẩn Mĩ Thuật GDPT 2018
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Lesson Selector */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <h3 className="font-black text-gray-700 text-base px-1 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Chọn Đề Tài Bé Thích:</span>
          </h3>

          <div className="space-y-2.5">
            {DRAWING_LESSONS.map((lesson) => {
              const isSelected = selectedLesson.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson)}
                  className={`w-full p-4 rounded-3xl border-2 text-left flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-white border-blue-500 shadow-lg scale-102 ring-2 ring-blue-300'
                      : 'bg-white/80 border-gray-100 hover:bg-white hover:border-blue-200'
                  }`}
                >
                  <span className="text-3xl p-2 bg-blue-50 rounded-2xl">
                    {lesson.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-gray-800 text-sm sm:text-base">
                        {lesson.title}
                      </h4>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {lesson.grade}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 font-medium">
                      {lesson.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Step-by-Step Interactive Guide */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-blue-200 flex flex-col gap-6">
          {/* Active Lesson Header & Progress */}
          <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-blue-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedLesson.icon}</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-800">
                  {selectedLesson.title}
                </h3>
                <span className="text-xs font-bold text-blue-600">
                  {selectedLesson.grade} • {selectedLesson.steps.length} Bước Đơn Giản
                </span>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center gap-1.5">
              {selectedLesson.steps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`w-8 h-8 rounded-full font-black text-xs transition-all ${
                    currentStepIndex === idx
                      ? 'bg-blue-600 text-white shadow-md scale-110'
                      : idx < currentStepIndex
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content Card */}
          <div className="bg-blue-50/60 border-2 border-blue-200 p-6 rounded-3xl flex flex-col sm:flex-row gap-6 items-center">
            {/* Visual Step Illustration */}
            <div className="w-full sm:w-56 h-56 bg-white rounded-2xl shadow-inner border-2 border-dashed border-blue-300 flex flex-col items-center justify-center p-4 text-center shrink-0">
              <span className="text-6xl animate-bounce-gentle mb-2">
                {selectedLesson.icon}
              </span>
              <span className="text-xs font-extrabold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                Bước {activeStep.step}: {activeStep.title}
              </span>
            </div>

            {/* Step Instructions */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="inline-block px-3 py-1 bg-amber-400 text-amber-950 font-black text-xs rounded-full shadow-sm">
                  BƯỚC {activeStep.step} / {selectedLesson.steps.length}
                </div>

                <button
                  onClick={toggleSpeakStep}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-sm ${
                    isSpeaking
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? 'Dừng' : 'Nghe Thầy'}</span>
                </button>
              </div>

              <h4 className="text-xl font-black text-gray-800">
                {activeStep.title}
              </h4>

              <p className="text-base font-bold text-gray-700 leading-relaxed">
                {activeStep.detail}
              </p>

              {/* Teacher Tip Box */}
              <div className="bg-white p-3.5 rounded-2xl border border-blue-200 shadow-sm flex items-start gap-2.5 mt-2">
                <span className="text-xl">💡</span>
                <p className="text-xs font-bold text-blue-900 leading-normal">
                  <span className="font-extrabold">Bí quyết của Thầy:</span> {activeStep.tip}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 text-gray-700 font-extrabold rounded-2xl transition text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Bước Trước</span>
            </button>

            {onSelectToDraw && (
              <button
                onClick={onSelectToDraw}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold rounded-2xl shadow hover:scale-105 active:scale-95 transition text-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Mở Bảng Vẽ & Thực Hành Ngay</span>
              </button>
            )}

            <button
              onClick={nextStep}
              disabled={currentStepIndex === selectedLesson.steps.length - 1}
              className="flex items-center gap-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 text-white font-extrabold rounded-2xl shadow transition text-sm"
            >
              <span>Bước Tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
