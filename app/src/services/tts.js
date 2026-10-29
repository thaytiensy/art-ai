// ART AI: 100% Vietnamese Male Art Teacher Voice Engine (Thầy Cọ Nhí)
// Uses Microsoft Edge Neural TTS (vi-VN-NamMinhNeural) with instant streaming and anti-concurrency guards

class TeacherSpeechService {
  constructor() {
    this.audioPlayer = null;
    this.isSpeaking = false;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.pendingText = null;
    this.pendingCallbacks = null;
    this.currentSessionId = 0;

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
    // Increment sessionId to invalidate any in-flight async operations
    this.currentSessionId++;

    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
        this.audioPlayer.removeAttribute('src');
        this.audioPlayer.load(); // Cancels pending network download immediately
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

  // Preload audio into server RAM cache without playing
  preload(text) {
    if (!text) return;
    const cleanText = text
      .replace(/[#*_`~-]/g, '')
      .replace(/\n+/g, '. ')
      .replace(/https?:\/\/\S+/g, '')
      .slice(0, 500)
      .trim();
    if (!cleanText) return;

    const ttsUrl = `/api/tts?text=${encodeURIComponent(cleanText)}`;
    // Fire and forget fetch to warm server memory cache
    if (typeof fetch !== 'undefined') {
      fetch(ttsUrl).catch(() => {});
    }
  }

  speak(text, onStart, onEnd) {
    this.stop();

    const cleanText = (text || '')
      .replace(/[#*_`~-]/g, '')
      .replace(/\n+/g, '. ')
      .replace(/https?:\/\/\S+/g, '')
      .slice(0, 500)
      .trim();

    if (!cleanText) return;

    // Capture unique session ID to prevent race conditions & double-voice
    const activeSession = this.currentSessionId;
    const ttsUrl = `/api/tts?text=${encodeURIComponent(cleanText)}`;

    const audio = new Audio(ttsUrl);
    this.audioPlayer = audio;

    audio.onplay = () => {
      if (this.currentSessionId !== activeSession) {
        try { audio.pause(); } catch (e) {}
        return;
      }
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    audio.onended = () => {
      if (this.currentSessionId !== activeSession) return;
      this.isSpeaking = false;
      this.audioPlayer = null;
      if (onEnd) onEnd();
    };

    audio.onerror = (e) => {
      if (this.currentSessionId !== activeSession) return;
      console.warn('Backend audio stream issue for Thầy voice:', e);
      this.audioPlayer = null;
      // Do not launch rogue timeout or double voice; attempt verified WebSpeech fallback only
      this.fallbackWebSpeech(cleanText, onStart, onEnd, activeSession);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        if (this.currentSessionId !== activeSession) return;

        // Trình duyệt chặn autoplay khi người dùng chưa tương tác chuột
        if (err.name === 'NotAllowedError') {
          console.log('Autoplay chờ bé bấm chuột vào trang để Thầy bắt đầu nói.');
          this.pendingText = cleanText;
          this.pendingCallbacks = { onStart, onEnd };
        } else if (err.name !== 'AbortError') {
          console.warn('Audio play error, falling back to local male voice:', err);
          this.fallbackWebSpeech(cleanText, onStart, onEnd, activeSession);
        }
      });
    }
  }

  fallbackWebSpeech(cleanText, onStart, onEnd, session) {
    if (session !== undefined && this.currentSessionId !== session) return;
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    const voices = this.synth.getVoices();
    // BẮT BUỘC: CHỈ chọn giọng NAM tiếng Việt (NamMinh / Male). TUYỆT ĐỐI KHÔNG chọn giọng Nữ hay tiếng Anh!
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
      console.warn('WebSpeech không có giọng Nam tiếng Việt xác thực (NamMinh). Giữ yên lặng để đảm bảo chuẩn giọng Thầy.');
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
      if (session !== undefined && this.currentSessionId !== session) {
        try { this.synth.cancel(); } catch (e) {}
        return;
      }
      this.isSpeaking = true;
      if (onStart) onStart();
    };
    utterance.onend = () => {
      if (session !== undefined && this.currentSessionId !== session) return;
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (session !== undefined && this.currentSessionId !== session) return;
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }
}

export const ttsService = new TeacherSpeechService();
