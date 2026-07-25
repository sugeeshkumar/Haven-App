import React from 'react';

export function AudioWaveform({ isListening, isSpeaking }) {
  return (
    <div className="flex items-center justify-center gap-1.5 h-16 my-4">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className={`w-1.5 rounded-full transition-all duration-300 ${
            isSpeaking 
              ? 'bg-indigo-400 animate-pulse' 
              : isListening 
              ? 'bg-emerald-400 animate-bounce' 
              : 'bg-white/20 h-3'
          }`}
          style={{
            height: isSpeaking ? `${Math.sin(i + 1) * 24 + 32}px` : isListening ? `${(i % 3 + 1) * 16}px` : '12px',
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}
