import React, { useState } from 'react';
import { Key, ExternalLink, X, Check, ShieldCheck, Sparkles } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, currentKey, onSaveKey }) {
  const [selectedProvider, setSelectedProvider] = useState(
    currentKey?.startsWith('hf_') ? 'hf' : 'gemini'
  );
  const [keyInput, setKeyInput] = useState(currentKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(keyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border-4 border-pink-200 relative flex flex-col gap-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl text-2xl">
            🔑
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-800">
              Cài Đặt Khóa AI Miễn Phí
            </h3>
            <p className="text-xs text-gray-500 font-semibold">
              Hỗ trợ cả Google Gemini lẫn Hugging Face (100% Free)
            </p>
          </div>
        </div>

        {/* Provider Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-100 rounded-2xl">
          <button
            onClick={() => setSelectedProvider('gemini')}
            className={`py-2 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 ${
              selectedProvider === 'gemini'
                ? 'bg-white text-pink-600 shadow-sm scale-102 font-black'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>✨ Google Gemini (Khuyên dùng)</span>
          </button>

          <button
            onClick={() => setSelectedProvider('hf')}
            className={`py-2 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 ${
              selectedProvider === 'hf'
                ? 'bg-white text-purple-600 shadow-sm scale-102 font-black'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>🤗 Hugging Face (Free)</span>
          </button>
        </div>

        {/* Instructions according to selected provider */}
        {selectedProvider === 'gemini' ? (
          <div className="bg-pink-50/70 border border-pink-200 p-4 rounded-2xl space-y-2 text-xs text-pink-950 font-medium">
            <div className="flex items-center gap-2 font-black text-pink-700 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Tại sao nên dùng Google Gemini Flash?</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>Hoàn toàn Miễn Phí (1.500 lượt/ngày):</strong> Không cần thẻ Visa/Mastercard.</li>
              <li><strong>Phân tích tranh vẽ siêu chuẩn:</strong> Nhận diện màu sắc, đường nét tiếng Việt cực tốt.</li>
              <li><strong>Tốc độ tức thì (1-2s):</strong> Bé không phải đợi lâu.</li>
            </ul>
            <div className="pt-1">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-pink-600 hover:underline bg-white px-3 py-1.5 rounded-xl border border-pink-200 shadow-sm"
              >
                <span>👉 Bấm vào đây để lấy Key Gemini (1 phút)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-purple-50/70 border border-purple-200 p-4 rounded-2xl space-y-2 text-xs text-purple-950 font-medium">
            <div className="flex items-center gap-2 font-black text-purple-700 text-sm">
              <span>🤗 Sử dụng Hugging Face Access Token</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Bạn có thể dùng token miễn phí của Hugging Face (loại <strong>Read</strong>). Hệ thống sẽ gọi mô hình thị giác mã nguồn mở (Qwen-VL / Llama-Vision).
            </p>
            <div className="pt-1">
              <a
                href="https://huggingface.co/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-purple-600 hover:underline bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-sm"
              >
                <span>👉 Bấm vào đây để tạo Token Hugging Face</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Input Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-gray-700">
            {selectedProvider === 'gemini' ? 'Dán Gemini API Key (bắt đầu bằng AIza...):' : 'Dán Hugging Face Token (bắt đầu bằng hf_...):'}
          </label>
          <input
            type="password"
            placeholder={selectedProvider === 'gemini' ? 'AIzaSy...' : 'hf_...'}
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="w-full px-4 py-2.5 text-sm font-mono rounded-xl border-2 border-pink-200 focus:outline-none focus:ring-4 focus:ring-pink-200 bg-pink-50/20"
          />
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-2 text-[11px] text-gray-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>Khóa được lưu cục bộ trong LocalStorage trình duyệt của bạn, hoàn toàn an toàn và riêng tư.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-extrabold rounded-xl text-xs transition"
          >
            Đóng
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-extrabold rounded-xl text-xs shadow-md hover:scale-105 active:scale-95 transition"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : null}
            <span>{savedSuccess ? 'Đã Lưu!' : 'Lưu Cài Đặt'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
