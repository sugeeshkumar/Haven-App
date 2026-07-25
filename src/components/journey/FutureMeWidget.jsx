import React, { useState } from 'react';
import { useRecovery } from '../../context/RecoveryContext';
import { GlassCard } from '../ui/GlassCard';
import { Sparkles, MessageSquare, Play, Pause, Save } from 'lucide-react';
import { voiceEngine } from '../../services/voiceEngine';
import confetti from 'canvas-confetti';

export function FutureMeWidget() {
  const { futureMeMessage, saveFutureMeMessage } = useRecovery();
  const [messageText, setMessageText] = useState(futureMeMessage);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSave = () => {
    saveFutureMeMessage(messageText);
    setIsSaved(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } catch (e) {}
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleTogglePlayback = () => {
    if (isPlaying) {
      voiceEngine.stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      voiceEngine.speak(
        messageText,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  return (
    <GlassCard hover={false} className="border-amber-500/20 bg-gradient-to-br from-white/[0.03] to-amber-950/10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Future Me Sanctuary</span>
        </div>
        <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-semibold">
          Authentic Guidance
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed mb-3">
        Record or type a message for yourself while you feel grounded. During a future crisis, Haven will play your own words first to anchor you.
      </p>

      <div className="space-y-3">
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          rows="3"
          className="w-full bg-slate-950/40 border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-sans leading-relaxed"
        />

        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            onClick={handleTogglePlayback}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Preview' : 'Listen to Preview'}</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Message Saved!' : 'Save Future Message'}</span>
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
