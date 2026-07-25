import React, { useState, useEffect } from 'react';
import { useRecovery } from '../../context/RecoveryContext';
import { useAuth } from '../../context/AuthContext';

export function LivingBackground({ children }) {
  const { riskAssessment, isCrisisModalOpen, isSafeSpaceOpen, isSosOpen, userState } = useRecovery();
  const { isPatient } = useAuth();
  
  const [timeOfDay, setTimeOfDay] = useState('afternoon'); // morning, afternoon, evening
  const [emotionTheme, setEmotionTheme] = useState('calm'); // calm, anxious, crisis, recovery

  // 1. Detect Time of Day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setTimeOfDay('morning');
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
  }, []);

  // 2. Detect Emotion Aware Theme
  useEffect(() => {
    if (isCrisisModalOpen || isSafeSpaceOpen || isSosOpen) {
      setEmotionTheme('crisis');
    } else if (riskAssessment?.level === 'High Risk' || userState?.currentMoodScore <= 5) {
      setEmotionTheme('anxious');
    } else if (userState?.streakDays >= 30) {
      setEmotionTheme('recovery');
    } else {
      setEmotionTheme('calm');
    }
  }, [riskAssessment, isCrisisModalOpen, isSafeSpaceOpen, isSosOpen, userState]);

  // 3. Time of Day Gradients
  const timeGradients = {
    morning: 'from-[#0B0F19] via-[#1a1226] to-[#0B0F19] bg-radial-gradient',
    afternoon: 'from-[#0B0F19] via-[#211510] to-[#0c0d14]',
    evening: 'from-[#091526] via-[#0B0F19] to-[#070b12]'
  };

  // 4. Emotion Aware Overlay Glow Colors
  const emotionOverlays = {
    calm: 'from-emerald-950/20 via-indigo-950/15 to-transparent',
    anxious: 'from-indigo-950/25 via-[#0d2137]/35 to-transparent',
    crisis: 'from-black/80 via-black/90 to-black',
    recovery: 'from-emerald-900/25 via-[#022c22]/20 to-transparent'
  };

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-[3000ms] bg-gradient-to-tr ${timeGradients[timeOfDay]} overflow-x-hidden`}>
      
      {/* Emotion Aware Gradient Overlay */}
      <div className={`fixed inset-0 bg-gradient-to-b ${emotionOverlays[emotionTheme]} transition-opacity duration-[2000ms] pointer-events-none z-0`} />

      {/* Living Background Assets (Only show if not in high-distraction Crisis state) */}
      {emotionTheme !== 'crisis' && (
        <>
          {/* Slow Drifting Clouds */}
          <div className="absolute top-12 left-0 w-[200%] h-24 opacity-15 pointer-events-none animate-drift-cloud z-0">
            <svg viewBox="0 0 1440 100" fill="none" className="w-full h-full">
              <path d="M100 80 Q130 50 170 60 T250 80 T320 60 T400 80 Z" fill="#F8FAFC" />
              <path d="M600 70 Q630 40 670 50 T750 70 T820 50 T900 70 Z" fill="#F8FAFC" />
            </svg>
          </div>

          {/* Gentle Floating Rising Particles */}
          <div className="absolute inset-x-0 top-1/4 bottom-12 overflow-hidden pointer-events-none z-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-emerald-300/30 blur-[1px] animate-rise-particles"
                style={{
                  left: `${15 + i * 14}%`,
                  animationDelay: `${i * 1.5}s`,
                  animationDuration: `${7 + i * 1.2}s`
                }}
              />
            ))}
          </div>

          {/* Swaying Grass Silhouettes at bottom */}
          <div className="fixed bottom-0 left-0 right-0 h-10 opacity-25 pointer-events-none z-0 flex justify-around items-end">
            {[...Array(15)].map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 20 100"
                className="w-4 h-16 text-emerald-950 fill-current animate-sway-grass"
                style={{ animationDelay: `${i * 0.25}s`, transformOrigin: 'bottom center' }}
              >
                <path d="M10 100 Q 5 50, 10 0 Q 15 50, 10 100 Z" />
              </svg>
            ))}
          </div>
        </>
      )}

      {/* 5. The Ambient Firefly Companion (Hope / Guidance) */}
      {isPatient && (
        <div
          className={`fixed w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-300 blur-[2px] shadow-[0_0_12px_rgba(245,158,11,0.8)] z-40 pointer-events-none ${
            isCrisisModalOpen || isSafeSpaceOpen 
              ? 'animate-pulse scale-125' // Glow brighter & pulsate in crisis
              : 'animate-firefly'
          }`}
          style={{
            // Position firefly near center/breath guides during Safe Space, or floating naturally
            top: isCrisisModalOpen || isSafeSpaceOpen ? '25%' : '40%',
            left: isCrisisModalOpen || isSafeSpaceOpen ? '48%' : '30%',
            transition: 'all 4s cubic-bezier(0.25, 0.8, 0.25, 1)'
          }}
        />
      )}

      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>

    </div>
  );
}
