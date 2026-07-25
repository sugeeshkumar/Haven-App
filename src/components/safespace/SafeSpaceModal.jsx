import React, { useState, useEffect } from 'react';
import { useRecovery } from '../../context/RecoveryContext';
import { useVoice } from '../../context/VoiceContext';
import { useAuth } from '../../context/AuthContext';
import { NatureBackgroundSvg } from './NatureBackgroundSvg';
import { voiceEngine } from '../../services/voiceEngine';
import { generateSafeSpaceRecoveryResponse } from '../../services/gemini';
import { 
  X, Mic, ShieldAlert, PhoneCall, Sparkles, Volume2, VolumeX, ArrowRight, Play, Pause, CheckCircle2, Heart, ArrowLeft 
} from 'lucide-react';
import { PrimaryButton } from '../ui/PrimaryButton';

export function SafeSpaceModal() {
  const { isSafeSpaceOpen, closeSafeSpace, setIsSosOpen, emergencyContacts, futureMeMessage } = useRecovery();
  const { openVoiceOverlay, startVoiceInput } = useVoice();
  const { userProfile, switchRole } = useAuth();

  // Stage: 'breathing' (0-8s 4-4 breathing cycle) -> 'revealed' (Fade-in Companion & 4 options)
  const [stage, setStage] = useState('breathing');
  const [breathPhase, setBreathPhase] = useState('Inhale'); // Inhale (4s), Exhale (4s)
  const [phaseSeconds, setPhaseSeconds] = useState(4);
  const [cycleCompleted, setCycleCompleted] = useState(false);
  const [recoveryMessage, setRecoveryMessage] = useState('');
  const [loadingResponse, setLoadingResponse] = useState(true);

  // Future Self Playback State
  const [isFutureSelfOpen, setIsFutureSelfOpen] = useState(false);
  const [isPlayingFutureSelf, setIsPlayingFutureSelf] = useState(false);
  const [isPlayingCalmVoice, setIsPlayingCalmVoice] = useState(false);

  const futureSelfOneYearMessage = `Hi ${userProfile.name.split(' ')[0]}, this is your future self speaking to you from 1 year clean. I know this exact moment feels heavy, but I am living proof that you make it through safely. Every single breath you take right now is building the freedom and peace we enjoy today. Take it one minute at a time. I am so proud of you.`;

  // 4s Inhale / 4s Exhale Breathing Cycle Logic
  useEffect(() => {
    if (!isSafeSpaceOpen) {
      setStage('breathing');
      setBreathPhase('Inhale');
      setPhaseSeconds(4);
      setCycleCompleted(false);
      voiceEngine.stopSpeaking();
      setIsPlayingCalmVoice(false);
      setIsPlayingFutureSelf(false);
      return;
    }

    let secondsLeft = 4;
    let phase = 'Inhale';

    const interval = setInterval(() => {
      secondsLeft -= 1;

      if (secondsLeft <= 0) {
        if (phase === 'Inhale') {
          phase = 'Exhale';
          secondsLeft = 4;
        } else {
          // Completed 1 full cycle (4s Inhale + 4s Exhale = 8s total)
          clearInterval(interval);
          setCycleCompleted(true);
          setStage('revealed');
          return;
        }
      }

      setBreathPhase(phase);
      setPhaseSeconds(secondsLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSafeSpaceOpen]);

  // Load Gemini Coach response when Safe Space finishes breathing cycle
  useEffect(() => {
    if (stage === 'revealed' && isSafeSpaceOpen) {
      async function loadCoachResponse() {
        try {
          setLoadingResponse(true);
          const msg = await generateSafeSpaceRecoveryResponse({
            name: userProfile.name,
            streakDays: userProfile.streakDays,
            riskScore: userProfile.riskScore
          });
          setRecoveryMessage(msg);
        } catch (e) {
          console.warn(e);
        } finally {
          setLoadingResponse(false);
        }
      }
      loadCoachResponse();
    }
  }, [stage, isSafeSpaceOpen]);

  const handleTalkToHaven = () => {
    closeSafeSpace();
    openVoiceOverlay();
    startVoiceInput();
  };

  const handleOpenEmergencyPlan = () => {
    closeSafeSpace();
    setIsSosOpen(true);
  };

  const handleContactCaregiver = () => {
    closeSafeSpace();
    switchRole('caregiver');
  };

  const toggleFutureSelfAudio = () => {
    if (isPlayingFutureSelf) {
      voiceEngine.stopSpeaking();
      setIsPlayingFutureSelf(false);
    } else {
      setIsPlayingCalmVoice(false);
      setIsPlayingFutureSelf(true);
      voiceEngine.speak(
        futureSelfOneYearMessage,
        () => setIsPlayingFutureSelf(true),
        () => setIsPlayingFutureSelf(false)
      );
    }
  };

  const toggleCalmSelfAudio = () => {
    if (isPlayingCalmVoice) {
      voiceEngine.stopSpeaking();
      setIsPlayingCalmVoice(false);
    } else {
      setIsPlayingFutureSelf(false);
      setIsPlayingCalmVoice(true);
      voiceEngine.speak(
        futureMeMessage,
        () => setIsPlayingCalmVoice(true),
        () => setIsPlayingCalmVoice(false)
      );
    }
  };

  if (!isSafeSpaceOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F19] transition-all duration-[800ms] ease-in-out overflow-y-auto opacity-100 pointer-events-auto scale-100">
      
      {/* Animated Golden Grassland Sunset Scene */}
      <NatureBackgroundSvg />

      {/* Top Exit Navigation Button */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 flex items-center justify-between pointer-events-auto">
        <button
          onClick={closeSafeSpace}
          className="px-4 py-2 rounded-2xl bg-slate-950/60 hover:bg-slate-900/80 backdrop-blur-xl border border-white/20 text-slate-200 hover:text-white font-medium text-xs flex items-center gap-2 transition-all active:scale-95 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-xl border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Haven Sanctuary • Golden Hour</span>
        </div>
      </header>

      {/* Center Cinematic Container */}
      <div className="relative z-10 w-full max-w-xl mx-auto my-12 text-center text-white px-2">
        
        {/* Central 4s/4s Animated Breathing Circle */}
        <div className="relative my-8 flex flex-col items-center justify-center">
          
          {/* Ambient Warm Glow Rings */}
          <div className="absolute w-72 h-72 rounded-full bg-amber-500/20 blur-3xl animate-pulse-slow pointer-events-none" />

          {/* Large Breathing Circle Expanding for 4s & Contracting for 4s */}
          <div 
            className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-400 p-1 shadow-2xl shadow-amber-500/40 glow-amber transition-all duration-[4000ms] ease-in-out"
            style={{
              transform: breathPhase === 'Inhale' ? 'scale(1.35)' : 'scale(1.0)',
              opacity: breathPhase === 'Inhale' ? 1.0 : 0.8
            }}
          >
            <div className="w-full h-full rounded-full bg-[#0B0F19]/80 backdrop-blur-xl flex flex-col items-center justify-center border border-white/30 relative overflow-hidden">
              <span className="font-display font-bold text-xs uppercase tracking-widest text-amber-300">
                {breathPhase}...
              </span>
              <span className="font-display font-extrabold text-3xl text-white mt-1">
                {phaseSeconds}s
              </span>
            </div>
          </div>

        </div>

        {/* Essential Therapeutic Reassurance Header */}
        <div className="space-y-2 mb-8">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight drop-shadow-lg">
            You are safe, {userProfile.name}.
          </h1>
          <p className="text-base sm:text-lg text-amber-200/90 font-medium max-w-md mx-auto drop-shadow-md">
            Take one slow breath with Haven.
          </p>
        </div>

        {/* Stage 1: Breathing in progress indicator */}
        {stage === 'breathing' && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/60 backdrop-blur-md text-xs text-slate-300 border border-white/10 animate-pulse">
            <span>Harmonizing breathing cadence...</span>
            <button
              onClick={() => { setStage('revealed'); setCycleCompleted(true); }}
              className="text-amber-300 font-semibold underline hover:text-amber-200 ml-2"
            >
              Skip
            </button>
          </div>
        )}

        {/* Stage 2: Smooth Reveal of Haven AI Companion & 4 Actions */}
        {stage === 'revealed' && (
          <div className="space-y-4 transition-all duration-1000 ease-out animate-fade-in">
            
            {/* 1. Message from Calm Grounded Self (Plays Before AI Guidance) */}
            <div className="glass-card rounded-3xl p-5 border border-emerald-500/30 bg-gradient-to-br from-[#071321]/90 to-emerald-950/20 text-left shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs uppercase tracking-wider">
                  <Heart className="w-4 h-4 text-emerald-400" />
                  <span>Your Grounded Self's Guidance</span>
                </div>
                <button
                  onClick={toggleCalmSelfAudio}
                  className="px-2.5 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  {isPlayingCalmVoice ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingCalmVoice ? 'Pause Voice' : 'Listen'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium italic">
                "{futureMeMessage}"
              </p>
            </div>

            {/* 2. Haven AI Companion Card */}
            <div className="glass-card rounded-3xl p-5 border border-amber-500/30 bg-gradient-to-br from-slate-950/70 to-amber-950/30 text-left shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">Haven Recovery Coach</h3>
                  {loadingResponse ? (
                    <p className="text-xs text-slate-400">Gemini is reflecting on your safe path...</p>
                  ) : (
                    <p className="text-xs sm:text-sm text-amber-200 mt-1.5 leading-relaxed font-medium italic">
                      "{recoveryMessage}"
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 4 Primary Action Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              {/* 1. Talk to Haven */}
              <button
                onClick={handleTalkToHaven}
                className="p-4 rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base flex items-center justify-between shadow-xl shadow-emerald-500/30 transition-all active:scale-95 glow-emerald"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-950/20 flex items-center justify-center">
                    <Mic className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-extrabold">Talk to Haven</div>
                    <div className="text-xs opacity-80 font-normal">Voice companion</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* 2. Hear my Future Self */}
              <button
                onClick={() => setIsFutureSelfOpen(true)}
                className="p-4 rounded-3xl glass-card hover:bg-white/10 text-white font-bold text-base border border-amber-500/40 flex items-center justify-between shadow-xl transition-all active:scale-95 bg-amber-950/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-bold">Hear Future Self</div>
                    <div className="text-xs text-amber-300 font-normal">Message from 1 yr clean</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-amber-400" />
              </button>

              {/* 3. Emergency Recovery Plan */}
              <button
                onClick={handleOpenEmergencyPlan}
                className="p-4 rounded-3xl glass-card hover:bg-rose-500/20 text-rose-200 font-bold text-base border border-rose-500/40 flex items-center justify-between shadow-xl transition-all active:scale-95 bg-rose-950/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30">
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-bold">Emergency Plan</div>
                    <div className="text-xs text-rose-300 font-normal">911 script & lifelines</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-rose-400" />
              </button>

              {/* 4. Open Caregiver Support */}
              <button
                onClick={handleContactCaregiver}
                className="p-4 rounded-3xl glass-card hover:bg-indigo-500/20 text-indigo-200 font-bold text-base border border-indigo-500/40 flex items-center justify-between shadow-xl transition-all active:scale-95 bg-indigo-950/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
                    <Heart className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-bold">Caregiver Portal</div>
                    <div className="text-xs text-indigo-300 font-normal">AI-assisted guides for Janani</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-indigo-400" />
              </button>

            </div>

          </div>
        )}

      </div>

      {/* Future Self Audio/Text Modal */}
      {isFutureSelfOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
          <div className="relative w-full max-w-md glass-modal rounded-3xl p-6 border border-amber-500/40 shadow-2xl text-left bg-gradient-to-b from-[#0B0F19] to-amber-950/40">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Your Future Self (1 Year Clean)</h3>
                  <p className="text-xs text-amber-300">Message from the path ahead</p>
                </div>
              </div>

              <button
                onClick={() => { setIsFutureSelfOpen(false); voiceEngine.stopSpeaking(); setIsPlayingFutureSelf(false); }}
                className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-amber-500/30 bg-black/40 my-3">
              <p className="text-sm text-slate-100 font-medium italic leading-relaxed">
                "{futureSelfOneYearMessage}"
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between pt-2">
              <button
                onClick={toggleFutureSelfAudio}
                className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/30 active:scale-95"
              >
                {isPlayingFutureSelf ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlayingFutureSelf ? 'Pause Future Voice' : 'Listen to Future Voice'}</span>
              </button>

              <button
                onClick={() => { setIsFutureSelfOpen(false); voiceEngine.stopSpeaking(); }}
                className="text-xs text-slate-400 hover:text-white font-medium underline"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
