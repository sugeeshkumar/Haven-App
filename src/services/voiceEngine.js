/**
 * Web Speech Engine for Haven AI Voice Companion
 * Handles Speech-to-Text (STT) and Text-to-Speech (TTS)
 */

class VoiceEngine {
  constructor() {
    this.recognition = null;
    this.synthesis = typeof window !== 'undefined' ? (window.speechSynthesis || null) : null;
    this.isListening = false;
    this.isSpeaking = false;
    this.onTranscriptCallback = null;
    this.onEndCallback = null;
    this.onErrorCallback = null;

    this.initRecognition();
  }

  initRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (this.onTranscriptCallback) {
          this.onTranscriptCallback(currentTranscript, event.results[0].isFinal);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.onEndCallback) this.onEndCallback();
      };

      this.recognition.onerror = (err) => {
        this.isListening = false;
        if (this.onErrorCallback) this.onErrorCallback(err);
      };
    }
  }

  startListening(onTranscript, onEnd, onError) {
    if (!this.recognition) {
      if (onError) onError('Speech recognition is not supported in this browser. Please use text input or Chrome/Edge.');
      return false;
    }
    this.onTranscriptCallback = onTranscript;
    this.onEndCallback = onEnd;
    this.onErrorCallback = onError;

    try {
      this.stopSpeaking();
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (e) {
      console.warn('Recognition start issue:', e);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isListening = false;
    }
  }

  speak(text, onStart, onEnd) {
    if (!this.synthesis) return;
    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Slightly slower, soothing pace
    utterance.pitch = 1.0;

    // Pick soothing English voice if available
    const voices = this.synthesis.getVoices();
    const soothingVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (soothingVoice) {
      utterance.voice = soothingVoice;
    }

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

    this.synthesis.speak(utterance);
  }

  stopSpeaking() {
    if (this.synthesis && this.synthesis.speaking) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }
}

export const voiceEngine = new VoiceEngine();
