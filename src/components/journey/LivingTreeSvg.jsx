import React from 'react';
import { useRecovery } from '../../context/RecoveryContext';

export function LivingTreeSvg({ streakDays = 42, compact = true }) {
  const { riskAssessment } = useRecovery();
  const scale = Math.min(1.1, 0.65 + (streakDays / 100) * 0.45);
  
  const isHighRisk = riskAssessment?.level === 'High Risk';
  const isModerateRisk = riskAssessment?.level === 'Moderate';
  const showFallingLeaves = isHighRisk || isModerateRisk;

  return (
    <div className={`relative w-full ${compact ? 'h-48' : 'h-64'} flex items-center justify-center overflow-hidden rounded-3xl glass-card border border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 via-slate-900/40 to-[#0B0F19]`}>
      
      {/* Background Soft Glow */}
      <div className="absolute w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Falling Leaves (rendered if high/moderate risk) */}
      {showFallingLeaves && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className="absolute w-3.5 h-3.5 text-amber-500 fill-current opacity-65"
              style={{
                top: '-10%',
                left: `${25 + i * 20}%`,
                animation: `rise-particles 6s linear infinite`,
                animationDelay: `${i * 1.5}s`,
                transform: 'rotate(180deg)' // Falling down
              }}
            >
              <path d="M12 2C12 2 6 8 6 12C6 16 9 19 12 19C15 19 18 16 18 12C18 8 12 2 12 2Z" />
            </svg>
          ))}
        </div>
      )}

      {/* Interactive Butterfly / Bird flying near canopy */}
      {riskAssessment?.level === 'Low' && (
        <div className="absolute top-1/4 left-1/4 pointer-events-none animate-firefly">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 fill-current animate-flutter">
            <path d="M12 10C10.5 7.5 7 8 7 11C7 13.5 10 15 12 17C14 15 17 13.5 17 11C17 8 13.5 7.5 12 10Z" />
          </svg>
        </div>
      )}

      {/* Main Swaying Tree SVG */}
      <svg
        viewBox="0 0 200 200"
        className={`${compact ? 'w-40 h-40' : 'w-56 h-56'} transition-all duration-1000 ease-out animate-sway`}
        style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}
      >
        <defs>
          <linearGradient id="trunkGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="flowerGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
        </defs>

        {/* Tree Trunk & Branches */}
        <path
          d="M100 180 C100 150, 95 130, 85 110 C75 90, 60 80, 50 70 M85 110 C95 95, 110 85, 125 75 M100 150 C105 130, 120 115, 140 100"
          fill="none"
          stroke="url(#trunkGrad)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Swaying Canopy Leaf Circles */}
        <g className="animate-sway-leaves" style={{ transformOrigin: '100px 100px' }}>
          <circle cx="50" cy="65" r="22" fill="url(#leafGrad)" opacity="0.85" />
          <circle cx="125" cy="70" r="26" fill="url(#leafGrad)" opacity="0.9" />
          <circle cx="140" cy="95" r="18" fill="url(#leafGrad)" opacity="0.8" />
          <circle cx="95" cy="55" r="30" fill="url(#leafGrad)" opacity="0.95" />

          {/* Milestone Flowers (blooming based on streak milestones) */}
          {streakDays >= 7 && <circle cx="45" cy="60" r="4.5" fill="url(#flowerGrad)" className="animate-pulse" />}
          {streakDays >= 14 && <circle cx="120" cy="65" r="5" fill="url(#flowerGrad)" className="animate-pulse" />}
          {streakDays >= 30 && <circle cx="95" cy="45" r="6" fill="url(#flowerGrad)" className="animate-pulse" />}
          {streakDays >= 40 && <circle cx="145" cy="90" r="5" fill="url(#flowerGrad)" className="animate-pulse" />}
        </g>

        {/* Ground Line */}
        <path d="M40 180 Q100 175 160 180" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      </svg>

      {/* Floating Badge */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 glass-pill px-3.5 py-1 rounded-full flex items-center gap-2 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Living Recovery Tree • Day {streakDays}</span>
      </div>
    </div>
  );
}
