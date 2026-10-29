// ART AI: 100% Vietnamese Male Art Teacher Voice Engine (Thầy Cọ Nhí)
// Uses Microsoft Edge Neural TTS (vi-VN-NamMinhNeural) with server-side Google TTS fallback

class TeacherSpeechService {
  constructor() {
    this.audioPlayer = null;
    this.isSpeaking = false;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.pendingText = null;
    this.pendingCallbacks = null;

    // Listen for user interaction to unlock autoplay in browser
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        if (this.pendingText) {
          const text = this.pendingText;
          const { onStart, onEnd } = this.pendingCallbacks || {};
          this.pendingText = null;
          this.pendingCallbacks = null;
          this.speak(text, onStart, onEnd);
        }
      };
      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });
    }
  }

  stop() {
    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
      } catch (e) {}
      this.audioPlayer = null;
    }
    if (this.synth && this.synth.speaking) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    this.isSpeaking = false;
  }

  speak(text, onStart, onEnd) {
    this.stop();

    const cleanText = (text || '')
      .replace(/[#*_`~-]/g, '')
      .replace(/\n+/g, '. ')
      .replace(/https?:\/\/\S+/g, '')
      .trim();

    if (!cleanText) return;

    const encoded = encodeURIComponent(cleanText.slice(0, 600));
    // Ưu tiên số 1: Backend TTS stream chuẩn vi-VN-NamMinhNeural (đã đệm file UTF-8)
    const ttsUrl = `/api/tts?text=${encoded}&t=${Date.now()}`;

    const audio = new Audio(ttsUrl);
    audio.src = ttsUrl;
    this.audioPlayer = audio;

    audio.onplay = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    audio.onended = () => {
      this.isSpeaking = false;
      this.audioPlayer = null;
      if (onEnd) onEnd();
    };

    audio.onerror = (e) => {
      console.warn('Backend TTS error, retrying male teacher voice...', e);
      this.audioPlayer = null;
      // Do NOT fallback to female Google TTS to guarantee 100% male teacher voice
      setTimeout(() => {
        const retryAudio = new Audio(ttsUrl);
        this.audioPlayer = retryAudio;
        retryAudio.onplay = () => {
          this.isSpeaking = true;
          if (onStart) onStart();
        };
        retryAudio.onended = () => {
          this.isSpeaking = false;
          this.audioPlayer = null;
          if (onEnd) onEnd();
        };
        retryAudio.onerror = () => {
          this.isSpeaking = false;
          this.audioPlayer = null;
          if (onEnd) onEnd();
        };
        retryAudio.play().catch(() => {
          this.isSpeaking = false;
          this.audioPlayer = null;
          if (onEnd) onEnd();
        });
      }, 500);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Nếu trình duyệt chặn Autoplay do bé chưa bấm chuột lên trang
        if (err.name === 'NotAllowedError') {
          console.log('Autoplay chờ bé bấm chuột vào trang để Thầy bắt đầu nói.');
          this.pendingText = cleanText;
          this.pendingCallbacks = { onStart, onEnd };
        } else {
          console.warn('Audio play error:', err);
          this.fallbackWebSpeech(cleanText, onStart, onEnd);
        }
      });
    }
  }

  fallbackWebSpeech(cleanText, onStart, onEnd) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    const voices = this.synth.getVoices();
    // BẮT BUỘC: CHỈ chọn giọng NAM tiếng Việt (NamMinh / Male). TUYỆT ĐỐI KHÔNG chọn HoaiMy (Nữ), Mai, Linh, Chi hay tiếng Anh!
    const maleViVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      const lang = (v.lang || '').toLowerCase();
      const isVietnamese = lang.startsWith('vi') || lang.includes('vietnam');
      if (!isVietnamese) return false;

      // Danh sách đen: Tuyệt đối không chọn bất kỳ giọng nữ nào
      const isFemale = /(hoaimy|mai|linh|chi|nu|female|woman|girl|an\b)/i.test(name);
      if (isFemale) return false;

      // Phải có định danh giọng Nam chuẩn (NamMinh hoặc Nam / Male rõ ràng, không tính từ 'vietnam')
      const isNamMinh = name.includes('namminh');
      const isExplicitMale = /\b(nam|male)\b/i.test(name.replace(/vietnam/gi, ''));
      return isNamMinh || isExplicitMale;
    });

    if (!maleViVoice) {
      console.warn('WebSpeech không có giọng Nam tiếng Việt xác thực (NamMinh). Ưu tiên phát từ backend của Thầy.');
      this.isSpeaking = false;
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.voice = maleViVoice;
    utterance.lang = 'vi-VN';
    utterance.pitch = 0.85;
    utterance.rate = 0.95;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };
    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }
}

export const ttsService = new TeacherSpeechService();
