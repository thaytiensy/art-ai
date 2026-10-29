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
    // CHỈ đọc nếu tìm thấy giọng tiếng Việt chuẩn, TUYỆT ĐỐI KHÔNG để giọng tiếng Anh đọc nhái tiếng Việt!
    const viVoice = voices.find(v => 
      v.lang.startsWith('vi') || 
      v.lang.toLowerCase().includes('vietnam') ||
      v.name.toLowerCase().includes('vietnam') ||
      v.name.toLowerCase().includes('an') ||
      v.name.toLowerCase().includes('nam')
    );

    if (!viVoice) {
      console.warn('Windows không cài sẵn giọng tiếng Việt WebSpeech, giữ im lặng thay vì đọc giọng ngoại quốc.');
      this.isSpeaking = false;
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.voice = viVoice;
    utterance.lang = 'vi-VN';
    utterance.pitch = 0.9;
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
