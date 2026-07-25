import React from 'react';
import { useRecovery } from '../../context/RecoveryContext';
import { useVoice } from '../../context/VoiceContext';
import { ShieldAlert, Mic, Calendar, BookOpen, HeartPulse } from 'lucide-react';

export function NavigationBar() {
  const { triggerCrisis, setIsCheckInOpen, setIsEducationOpen } = useRecovery();
  const { openVoiceOverlay, startVoiceInput, isListening } = useVoice();

  const handleVoiceTap = () => {
    openVoiceOverlay();
    startVoiceInput();
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-2 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/90 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto flex items-center justify-between glass-card rounded-3xl p-2 px-4 border border-white/15 shadow-2xl shadow-black/80">
        
        {/* Crisis Action Button */}
        <button
          onClick={() => triggerCrisis('craving')}
          className="flex flex-col items-center gap-1 p-2 text-rose-400 hover:text-rose-300 transition-all active:scale-90"
        >
          <div className="w-10 h-10 rounded-2xl bg-rose-500/15 flex items-center justify-center border border-rose-500/30">
            <HeartPulse className="w-5 h-5 text-rose-400" />
          </div>
          <span className="text-[10px] font-semibold tracking-wide">Crisis</span>
        </button>

        {/* Daily Check-in */}
        <button
          onClick={() => setIsCheckInOpen(true)}
          className="flex flex-col items-center gap-1 p-2 text-slate-300 hover:text-white transition-all active:scale-90"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
            <Calendar className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[10px] font-semibold tracking-wide">Check-in</span>
        </button>

        {/* Central Floating AI Voice Pulse Mic Button */}
        <div className="-mt-8 relative">
          <button
            onClick={handleVoiceTap}
            aria-label="Tap to speak with AI Companion"
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-1 shadow-xl shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative glow-indigo group"
          >
            <span className="absolute -inset-1 rounded-full bg-indigo-500/30 animate-ping pointer-events-none" />
            <div className="w-full h-full rounded-full bg-indigo-600 flex items-center justify-center border border-white/30">
              <Mic className="w-7 h-7 text-white stroke-[2.2] group-hover:scale-110 transition-transform" />
            </div>
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-4 text-[9px] font-bold tracking-wider text-indigo-300 uppercase whitespace-nowrap">
            Voice AI
          </span>
        </div>

        {/* Education Hub */}
        <button
          onClick={() => setIsEducationOpen(true)}
          className="flex flex-col items-center gap-1 p-2 text-slate-300 hover:text-white transition-all active:scale-90"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
            <BookOpen className="w-5 h-5 text-teal-400" />
          </div>
          <span className="text-[10px] font-semibold tracking-wide">Guides</span>
        </button>

        {/* SOS Quick Button */}
        <button
          onClick={() => triggerCrisis('panic')}
          className="flex flex-col items-center gap-1 p-2 text-slate-300 hover:text-white transition-all active:scale-90"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-[10px] font-semibold tracking-wide">Panic</span>
        </button>

      </div>
    </nav>
  );
}
