import React, { useState, useEffect } from 'react';

export function BreathingOrb() {
  const [phase, setPhase] = useState('Inhale'); // Inhale, Hold, Exhale, Pause
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    const phases = [
      { name: 'Inhale', duration: 4 },
      { name: 'Hold', duration: 4 },
      { name: 'Exhale', duration: 4 },
      { name: 'Pause', duration: 4 }
    ];

    let currentIdx = 0;
    let timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          currentIdx = (currentIdx + 1) % phases.length;
          setPhase(phases[currentIdx].name);
          return phases[currentIdx].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 glass-card rounded-3xl border border-indigo-500/20 my-4 bg-indigo-950/20">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Pulsating Orb */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 blur-xl animate-breath-orb" />
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex flex-col items-center justify-center text-white shadow-2xl shadow-indigo-500/50 transition-all duration-1000 animate-breath-orb border border-white/30">
          <span className="font-display font-bold text-lg uppercase tracking-wider">{phase}</span>
          <span className="font-display font-extrabold text-2xl">{seconds}s</span>
        </div>
      </div>
      <p className="text-xs text-slate-300 mt-4 font-medium text-center">
        Box Breathing Cadence (4-4-4-4) • Slows Heart Rate & Resets Nervous System
      </p>
    </div>
  );
}
