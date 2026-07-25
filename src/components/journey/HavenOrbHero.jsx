import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useVoice } from '../../context/VoiceContext';
import { useRecovery } from '../../context/RecoveryContext';
import { generateDailyEncouragement } from '../../services/gemini';
import { Mic, HeartPulse, Smile, Wind, Sparkles } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function HavenOrbHero() {
  const { userProfile } = useAuth();
  const { openVoiceOverlay, startVoiceInput, isListening, isSpeaking, isProcessing } = useVoice();
  const { triggerCrisis, setIsCheckInOpen, openSafeSpace, checkInLogs, riskAssessment } = useRecovery();
  
  const [encouragement, setEncouragement] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEncouragement() {
      try {
        setLoading(true);
        const msg = await generateDailyEncouragement({ userProfile, checkInLogs, riskAssessment });
        setEncouragement(msg);
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    }
    loadEncouragement();
  }, [userProfile.streakDays, checkInLogs]);

  const handleTalkToHaven = () => {
    openVoiceOverlay();
    startVoiceInput();
  };

  const handleImNotOkay = () => {
    openSafeSpace();
  };

  const handleCalmMe = () => {
    triggerCrisis('panic');
  };

  // Dynamic style changes for Living AI Orb
  const getOrbStateStyles = () => {
    if (isSpeaking) {
      return {
        scale: 'scale-110 sm:scale-115',
        glow: 'glow-indigo border-indigo-400/40',
        gradient: 'from-indigo-500 via-purple-500 to-emerald-400',
        label: 'Speaking...'
      };
    }
    if (isListening) {
      return {
        scale: 'scale-95 sm:scale-90',
        glow: 'glow-emerald border-emerald-400/40',
        gradient: 'from-emerald-400 via-teal-400 to-indigo-500',
        label: 'Listening...'
      };
    }
    if (isProcessing) {
      return {
        scale: 'scale-100 animate-pulse',
        glow: 'glow-amber border-amber-400/40',
        gradient: 'from-amber-400 via-orange-400 to-indigo-500',
        label: 'Reflecting...'
      };
    }
    // Default Calm Breathing State
    return {
      scale: 'scale-100 hover:scale-105 active:scale-95',
      glow: 'glow-emerald border-white/20',
      gradient: 'from-teal-500 via-emerald-400 to-indigo-500',
      label: 'Haven AI'
    };
  };

  const orbStyle = getOrbStateStyles();

  return (
    <section className="relative flex flex-col items-center justify-center pt-2 pb-8 px-2 text-center">
      
      {/* Emotional Welcome Header */}
      <div className="space-y-1 z-10 max-w-lg mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-1 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Day {userProfile.streakDays} • Safe Space</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
          How are you feeling today, {userProfile.name}?
        </h2>
        <p className="text-sm text-slate-300 font-normal">
          Haven is here with you. Tap the orb or choose a safe step below.
        </p>
      </div>

      {/* Prominent Gemini Daily Encouragement Card */}
      <div className="w-full max-w-xl z-10 mb-2">
        <GlassCard hover={false} className="border-indigo-500/20 bg-indigo-950/10 text-left p-4.5 rounded-2xl">
          <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs mb-1.5 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>AI Daily Reflection</span>
          </div>
          {loading ? (
            <div className="h-10 flex items-center justify-center text-xs text-slate-400">
              Reflecting with Gemini...
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {encouragement}
            </p>
          )}
        </GlassCard>
      </div>

      {/* Large Glowing Circular AI Orb (Haven Companion) */}
      <div className="relative my-6 flex items-center justify-center group cursor-pointer" onClick={handleTalkToHaven}>
        
        {/* Ambient Outer Glow Rings */}
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-indigo-600/30 via-purple-600/30 to-emerald-500/30 blur-2xl animate-pulse-slow pointer-events-none" />
        <div className="absolute w-52 h-52 rounded-full bg-indigo-500/20 blur-xl animate-breath-orb pointer-events-none" />
        
        {/* Animated Orb Outer Ring */}
        <div className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr ${orbStyle.gradient} p-1 shadow-2xl transition-all duration-500 ${orbStyle.scale} ${orbStyle.glow}`}>
          <div className="w-full h-full rounded-full bg-[#0B0F19] flex flex-col items-center justify-center relative overflow-hidden border border-white/20">
            
            {/* Fluid Interior Gradient Mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-purple-600/30 to-emerald-500/30 animate-pulse-slow" />
            <div className="absolute -inset-4 bg-gradient-to-tr from-teal-500/20 to-indigo-500/40 blur-lg animate-breath-orb" />

            {/* Central Icon & Label */}
            <div className="relative z-10 flex flex-col items-center gap-2 text-white">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner group-hover:bg-white/20 transition-all">
                <Mic className="w-7 h-7 text-emerald-300 stroke-[2.2] animate-pulse" />
              </div>
              <span className="font-display font-bold text-xs uppercase tracking-widest text-indigo-200">
                {orbStyle.label}
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* 4 Floating Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl z-10">
        
        {/* 1. Talk to Haven */}
        <button
          onClick={handleTalkToHaven}
          className="glass-card glass-card-hover p-4 rounded-3xl border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 to-slate-900/40 text-left flex flex-col justify-between min-h-[110px] group active:scale-95 transition-all shadow-lg shadow-indigo-950/50"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30 group-hover:scale-110 transition-transform">
            <Mic className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-white flex items-center gap-1.5">
              <span>🎙</span> Talk to Haven
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-medium">Voice conversation</div>
          </div>
        </button>

        {/* 2. I'm Not Okay */}
        <button
          onClick={handleImNotOkay}
          className="glass-card glass-card-hover p-4 rounded-3xl border-rose-500/30 bg-gradient-to-b from-rose-950/30 to-slate-900/40 text-left flex flex-col justify-between min-h-[110px] group active:scale-95 transition-all shadow-lg shadow-rose-950/50"
        >
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30 group-hover:scale-110 transition-transform">
            <HeartPulse className="w-5 h-5 text-rose-400 animate-pulse" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-white flex items-center gap-1.5">
              <span>😟</span> I'm Not Okay
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-medium">Immersive Safe Space</div>
          </div>
        </button>

        {/* 3. Daily Check-In */}
        <button
          onClick={() => setIsCheckInOpen(true)}
          className="glass-card glass-card-hover p-4 rounded-3xl border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-slate-900/40 text-left flex flex-col justify-between min-h-[110px] group active:scale-95 transition-all shadow-lg shadow-emerald-950/50"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
            <Smile className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-white flex items-center gap-1.5">
              <span>😊</span> Daily Check-In
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-medium">Log mood & triggers</div>
          </div>
        </button>

        {/* 4. Calm Me */}
        <button
          onClick={handleCalmMe}
          className="glass-card glass-card-hover p-4 rounded-3xl border-teal-500/30 bg-gradient-to-b from-teal-950/30 to-slate-900/40 text-left flex flex-col justify-between min-h-[110px] group active:scale-95 transition-all shadow-lg shadow-teal-950/50"
        >
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30 group-hover:scale-110 transition-transform">
            <Wind className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-white flex items-center gap-1.5">
              <span>🧘</span> Calm Me
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-medium">Breathing & grounding</div>
          </div>
        </button>

      </div>

    </section>
  );
}
