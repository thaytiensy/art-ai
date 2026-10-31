import React, { useRef, useState, useEffect } from 'react';
import { 
  Palette, 
  RotateCcw, 
  RotateCw, 
  Trash2, 
  Download, 
  Sparkles, 
  Pencil, 
  Paintbrush, 
  Eraser, 
  Smile,
  CheckCircle2
} from 'lucide-react';

const KID_COLORS = [
  { name: 'Đen than', hex: '#1E293B' },
  { name: 'Đỏ dâu', hex: '#EF4444' },
  { name: 'Cam cà rốt', hex: '#F97316' },
  { name: 'Vàng nắng', hex: '#EAB308' },
  { name: 'Xanh lá chuối', hex: '#22C55E' },
  { name: 'Xanh lục đậm', hex: '#059669' },
  { name: 'Xanh da trời', hex: '#0EA5E9' },
  { name: 'Xanh dương đậm', hex: '#3B82F6' },
  { name: 'Tím nho', hex: '#8B5CF6' },
  { name: 'Hồng kẹo ngọt', hex: '#EC4899' },
  { name: 'Nâu đất', hex: '#92400E' },
  { name: 'Trắng mây', hex: '#FFFFFF' }
];

const BRUSH_SIZES = [
  { label: 'Mảnh', size: 4 },
  { label: 'Vừa', size: 10 },
  { label: 'Dày', size: 20 },
  { label: 'Siêu To', size: 36 }
];

const STICKERS = ['⭐', '❤️', '🌸', '🌈', '☀️', '🐱', '🐶', '🚀', '🍦', '🎨'];

export default function DrawingCanvas({ onAskTeacher, teacher, templateImage, onClearTemplate, isTvMode = false }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#EF4444');
  const [brushSize, setBrushSize] = useState(10);
  const [tool, setTool] = useState('brush');
  const [selectedSticker, setSelectedSticker] = useState('⭐');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const teacherName = teacher?.name || 'Thầy Cọ Nhí';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth || 800;
    canvas.height = 550;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    saveState();
  }, []);

  // Nạp tranh mẫu từ Xưởng Ý Tưởng vào bảng vẽ để bé tập tô & đồ nét
  useEffect(() => {
    if (!templateImage) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const scale = Math.min((canvas.width * 0.92) / img.width, (canvas.height * 0.92) / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      ctx.globalAlpha = 0.9;
      ctx.drawImage(img, x, y, w, h);
      ctx.globalAlpha = 1.0;
      saveState();
    };
    img.src = templateImage;
  }, [templateImage]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(dataUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      restoreState(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      restoreState(history[newIndex]);
    }
  };

  const restoreState = (dataUrl) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const clearCanvas = () => {
    if (window.confirm('Bé có chắc muốn vẽ lại từ đầu không?')) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      saveState();
    }
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches[0]) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    const { x, y } = getCoordinates(e);

    if (tool === 'sticker') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.font = `${brushSize * 3}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedSticker, x, y);
      saveState();
      return;
    }

    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(x, y);

    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'crayon') {
      ctx.shadowBlur = 2;
      ctx.shadowColor = color;
    } else {
      ctx.shadowBlur = 0;
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `tranh-hoa-si-nhi-${Date.now()}.png`;
    link.click();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const sendToTeacher = () => {
    const canvas = canvasRef.current;
    const imageBase64 = canvas.toDataURL('image/png');
    if (onAskTeacher) {
      onAskTeacher(imageBase64);
    }
  };

  return (
    <div className={`flex flex-col gap-4 max-w-6xl mx-auto p-2 sm:p-4 ${isTvMode ? 'text-lg max-w-7xl' : ''}`}>
      {/* Top Banner & Main Action */}
      <div className={`flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-lg border-2 border-pink-200 ${isTvMode ? 'p-6 border-amber-300' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner animate-bounce-gentle">
            🎨
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-pink-600">
              Bảng Vẽ Họa Sĩ Nhí
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-gray-500">
              Thỏa sức phối màu và vẽ nên những điều kỳ diệu!
            </p>
          </div>
        </div>

        {/* Nút Nhờ Giáo Viên Nhận Xét */}
        <button
          onClick={sendToTeacher}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 animate-pulse"
        >
          <Sparkles className="w-6 h-6" />
          <span>Nhờ {teacherName} Nhận Xét Tranh</span>
        </button>
      </div>

      {/* Tranh Mẫu Đang Mở Để Tập Tô */}
      {templateImage && (
        <div className="bg-purple-100 border-2 border-purple-300 px-4 py-2.5 rounded-2xl flex items-center justify-between gap-3 text-purple-900 text-xs sm:text-sm font-black shadow-sm">
          <div className="flex items-center gap-2">
            <span>✨</span>
            <span>Đang mở tranh mẫu từ Xưởng Ý Tưởng để bé tập tô & đồ nét!</span>
          </div>
          {onClearTemplate && (
            <button
              onClick={() => {
                onClearTemplate();
                clearCanvas();
              }}
              className="px-3 py-1 bg-white hover:bg-purple-50 text-purple-700 rounded-xl border border-purple-300 text-xs font-extrabold shadow-sm"
            >
              Vẽ Trang Trắng Mới ✕
            </button>
          )}
        </div>
      )}

      {/* Control Tools Bar */}
      <div className="bg-white/95 backdrop-blur p-4 rounded-3xl shadow-md border-2 border-amber-200 flex flex-wrap items-center justify-between gap-4">
        {/* Tool Selector */}
        <div className="flex items-center gap-2 bg-pink-50 p-1.5 rounded-2xl border border-pink-200">
          <button
            onClick={() => setTool('brush')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              tool === 'brush'
                ? 'bg-pink-500 text-white shadow-md scale-105'
                : 'text-gray-600 hover:bg-pink-100'
            }`}
          >
            <Paintbrush className="w-4 h-4" />
            <span>Cọ Lông</span>
          </button>

          <button
            onClick={() => setTool('crayon')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              tool === 'crayon'
                ? 'bg-amber-500 text-white shadow-md scale-105'
                : 'text-gray-600 hover:bg-amber-100'
            }`}
          >
            <Pencil className="w-4 h-4" />
            <span>Sáp Màu</span>
          </button>

          <button
            onClick={() => setTool('eraser')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              tool === 'eraser'
                ? 'bg-sky-500 text-white shadow-md scale-105'
                : 'text-gray-600 hover:bg-sky-100'
            }`}
          >
            <Eraser className="w-4 h-4" />
            <span>Cục Tẩy</span>
          </button>

          <button
            onClick={() => setTool('sticker')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              tool === 'sticker'
                ? 'bg-purple-500 text-white shadow-md scale-105'
                : 'text-gray-600 hover:bg-purple-100'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>Nhãn Dán</span>
          </button>
        </div>

        {/* Brush Sizes */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-gray-500 uppercase">Kích cỡ:</span>
          <div className="flex gap-1.5 bg-gray-100 p-1 rounded-2xl">
            {BRUSH_SIZES.map((b) => (
              <button
                key={b.size}
                onClick={() => setBrushSize(b.size)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  brushSize === b.size
                    ? 'bg-white text-gray-900 shadow-sm font-extrabold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            title="Quay lại (Undo)"
            className="p-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded-xl text-gray-700 font-bold transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            title="Làm lại (Redo)"
            className="p-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded-xl text-gray-700 font-bold transition"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={clearCanvas}
            title="Xóa trắng bảng vẽ"
            className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={downloadCanvas}
            title="Tải tranh về máy"
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold shadow transition"
          >
            {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            <span>{savedSuccess ? 'Đã Tải!' : 'Lưu Tranh'}</span>
          </button>
        </div>
      </div>

      {/* Palette / Stickers Row */}
      {tool === 'sticker' ? (
        <div className="bg-purple-50 border-2 border-purple-200 p-3 rounded-2xl flex items-center gap-3 overflow-x-auto shadow-inner">
          <span className="text-xs font-extrabold text-purple-700 shrink-0">Chọn con dấu dán vào tranh:</span>
          <div className="flex gap-2">
            {STICKERS.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedSticker(st)}
                className={`w-10 h-10 text-xl rounded-xl flex items-center justify-center transition-all ${
                  selectedSticker === st
                    ? 'bg-white shadow-md scale-125 border-2 border-purple-400'
                    : 'hover:bg-purple-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white/95 p-3 rounded-2xl shadow-sm border border-pink-100 flex items-center gap-2 sm:gap-3 overflow-x-auto">
          <Palette className="w-5 h-5 text-pink-500 shrink-0 ml-1" />
          <div className="flex items-center gap-2 sm:gap-2.5">
            {KID_COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => setColor(c.hex)}
                title={c.name}
                style={{ backgroundColor: c.hex }}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-transform duration-150 ${
                  color === c.hex ? 'scale-125 border-pink-500 shadow-md ring-2 ring-pink-300' : 'border-gray-200 hover:scale-110'
                }`}
              />
            ))}
            <div className="relative flex items-center">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 cursor-pointer opacity-80 hover:opacity-100"
                title="Chọn màu tự do"
              />
            </div>
          </div>
        </div>
      )}

      {/* Canvas Drawing Surface */}
      <div className="relative w-full bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-amber-300 touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[500px] cursor-crosshair bg-white"
        />

        <div className="absolute bottom-3 right-4 pointer-events-none text-xs font-black text-pink-300 select-none">
          ✨ ART AI KIDS • LỚP 1 - 5
        </div>
      </div>
    </div>
  );
}
