import React, { useState } from 'react';
import { useVoice } from '../../context/VoiceContext';
import { AudioWaveform } from './AudioWaveform';
import { X, Mic, MicOff, Volume2, Sparkles, Send, ArrowLeft } from 'lucide-react';
import { PrimaryButton } from '../ui/PrimaryButton';

export function VoiceOverlay() {
  const {
    isVoiceOpen,
    closeVoiceOverlay,
    isListening,
    isSpeaking,
    isProcessing,
    transcript,
    messages,
    startVoiceInput,
    stopVoiceInput,
    handleUserTranscript
  } = useVoice();

  const [textInput, setTextInput] = useState('');

  if (!isVoiceOpen) return null;

  const handleSendText = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      handleUserTranscript(textInput);
      setTextInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto transition-all duration-300">
      <div className="relative w-full max-w-lg glass-modal rounded-3xl p-6 border border-white/15 shadow-2xl flex flex-col min-h-[520px] animate-fade-in">
        
        {/* Header with Consistent Back Button in top-left */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <button
            onClick={closeVoiceOverlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-semibold border border-white/10 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h2 className="font-display font-bold text-base text-white">AI Voice Companion</h2>
          </div>
        </div>

        {/* Audio Waveform Canvas */}
        <AudioWaveform isListening={isListening} isSpeaking={isSpeaking} />

        {/* Status Indicator Pill */}
        <div className="text-center mb-4">
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md ${
            isListening ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse' :
            isSpeaking ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' :
            isProcessing ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
            'bg-white/5 text-slate-300 border-white/10'
          }`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            <span>
              {isListening ? 'Listening to your voice...' :
               isSpeaking ? 'Haven is speaking...' :
               isProcessing ? 'Gemini is reflecting...' :
               'Tap Mic or type to speak'}
            </span>
          </span>
        </div>

        {/* Chat History & Transcript */}
        <div className="flex-1 overflow-y-auto space-y-3 p-2 max-h-60 mb-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600/40 text-white rounded-br-none border border-indigo-400/30'
                  : 'glass-card text-slate-100 rounded-bl-none border-white/10'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {transcript && (
            <div className="flex justify-end">
              <div className="max-w-[85%] p-3 rounded-2xl bg-emerald-600/30 text-emerald-200 text-xs italic border border-emerald-500/30">
                "{transcript}..."
              </div>
            </div>
          )}
        </div>

        {/* Mic Control & Text Fallback Bar */}
        <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
          
          {/* Main 1-Tap Mic Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={isListening ? stopVoiceInput : startVoiceInput}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 ${
                isListening 
                  ? 'bg-rose-500 text-white shadow-rose-500/50 glow-coral animate-pulse' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/40 glow-indigo'
              }`}
            >
              {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7 stroke-[2.2]" />}
            </button>
          </div>

          {/* Text Input Fallback (Typing Optional) */}
          <form onSubmit={handleSendText} className="flex items-center gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Or type your thoughts here (optional)..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!textInput.trim()}
              className="p-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
