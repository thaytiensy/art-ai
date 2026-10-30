// ART AI: 100% Vietnamese Male Art Teacher Voice Engine (Thầy Cọ Nhí)
// Uses Microsoft Edge Neural TTS (vi-VN-NamMinhNeural) with multi-host failover,
// intelligent autoplay unlocking, and resilient male-pitch synthesis fallback.

class TeacherSpeechService {
  constructor() {
    this.audioPlayer = null;
    this.isSpeaking = false;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.pendingText = null;
    this.pendingCallbacks = null;
    this.currentSessionId = 0;

    // Listen for any user interaction channel (mouse, touch, keyboard, remote) to unlock browser autoplay
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

      ['click', 'touchstart', 'keydown', 'wheel', 'pointerdown'].forEach((evt) => {
        window.addEventListener(evt, unlockAudio, { passive: true });
      });
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

  // Generate prioritized list of audio endpoints for zero-latency, highly available playback
  getTtsCandidateUrls(cleanText) {
    const encoded = encodeURIComponent(cleanText);
    const urls = [];

    const isClient = typeof window !== 'undefined';
    const isGithubPages = isClient && window.location.hostname.includes('github.io');

    // 1. Same-origin relative path (Instant on localhost and artaimithuat.vercel.app)
    if (!isGithubPages) {
      urls.push(`/api/tts?text=${encoded}`);
    }

    // 2. Global Vercel production serverless gateway (Enabled with CORS for GitHub Pages & cross-origin)
    urls.push(`https://artaimithuat.vercel.app/api/tts?text=${encoded}`);

    // Deduplicate
    return [...new Set(urls)];
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

    const urls = this.getTtsCandidateUrls(cleanText);
    if (typeof fetch !== 'undefined' && urls[0]) {
      fetch(urls[0], { mode: 'cors' }).catch(() => {});
    }
  }

  speak(text, onStart, onEnd) {
    this.stop();

    const cleanText = (text || '')
      .replace(/[#*_`~-]/g, '')
      .replace(/\n+/g, '. ')
      .replace(/https?:\/\/\S+/g, '')
      .slice(0, 600)
      .trim();

    if (!cleanText) return;

    // Capture unique session ID to prevent race conditions & double-voice
    const activeSession = this.currentSessionId;
    const candidateUrls = this.getTtsCandidateUrls(cleanText);
    let urlIndex = 0;

    const tryNextAudio = () => {
      if (this.currentSessionId !== activeSession) return;

      if (urlIndex >= candidateUrls.length) {
        // All network endpoints failed, smoothly fallback to WebSpeech
        this.audioPlayer = null;
        this.fallbackWebSpeech(cleanText, onStart, onEnd, activeSession);
        return;
      }

      const currentUrl = candidateUrls[urlIndex++];
      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      audio.src = currentUrl;
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
        console.warn(`[ART AI TTS] Cổng âm thanh [${currentUrl}] chưa sẵn sàng, tự động chuyển cổng dự phòng...`);
        tryNextAudio();
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (this.currentSessionId !== activeSession) return;

          // Browser autoplay restriction before user interaction
          if (err.name === 'NotAllowedError') {
            console.log('[ART AI TTS] Autoplay chờ tương tác của người dùng để bắt đầu giảng bài.');
            this.pendingText = cleanText;
            this.pendingCallbacks = { onStart, onEnd };
          } else if (err.name !== 'AbortError') {
            console.warn(`[ART AI TTS] Lỗi phát âm thanh từ [${currentUrl}], thử cổng tiếp theo...`, err);
            tryNextAudio();
          }
        });
      }
    };

    tryNextAudio();
  }

  fallbackWebSpeech(cleanText, onStart, onEnd, session) {
    if (session !== undefined && this.currentSessionId !== session) return;
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    const voices = this.synth.getVoices() || [];

    // Filter Vietnamese locale voices
    const viVoices = voices.filter((v) => {
      const lang = (v.lang || '').toLowerCase();
      return lang.startsWith('vi') || lang.includes('vietnam');
    });

    // Priority 1: Specifically identified Male Vietnamese voice (NamMinh / Male)
    let selectedVoice = viVoices.find((v) => {
      const name = v.name.toLowerCase();
      const isFemale = /(hoaimy|mai|linh|chi|nu|female|woman|girl|an\b)/i.test(name);
      if (isFemale) return false;
      return name.includes('namminh') || /\b(nam|male)\b/i.test(name.replace(/vietnam/gi, ''));
    });

    // Priority 2: If no explicit male voice exists in OS, adapt available Vietnamese voice
    let pitch = 0.85;
    let rate = 0.95;

    if (!selectedVoice && viVoices.length > 0) {
      selectedVoice = viVoices[0];
      // Drastically lower pitch to 0.65 to transform into a calm, warm fatherly baritone male teacher voice
      pitch = 0.65;
      rate = 0.90;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.lang = 'vi-VN';
    utterance.pitch = pitch;
    utterance.rate = rate;

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
