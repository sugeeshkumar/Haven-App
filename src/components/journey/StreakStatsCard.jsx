import React from 'react';
import { useRecovery } from '../../context/RecoveryContext';
import { GlassCard } from '../ui/GlassCard';
import { Flame, Smile, Award, Calendar } from 'lucide-react';

export function StreakStatsCard() {
  const { userState } = useRecovery();
  const { streakDays, milestoneTitle, currentMoodScore } = userState;

  return (
    <div className="grid grid-cols-3 gap-3">
      
      {/* Streak Counter */}
      <GlassCard hover={false} className="p-4 text-center border-emerald-500/20 bg-emerald-950/10">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 mx-auto flex items-center justify-center mb-1">
          <Flame className="w-5 h-5 fill-emerald-400/20" />
        </div>
        <div className="font-display font-bold text-2xl text-white">{streakDays}</div>
        <div className="text-[11px] text-slate-400 font-medium">Days Strong</div>
      </GlassCard>

      {/* Current Mood */}
      <GlassCard hover={false} className="p-4 text-center border-indigo-500/20 bg-indigo-950/10">
        <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-400 mx-auto flex items-center justify-center mb-1">
          <Smile className="w-5 h-5" />
        </div>
        <div className="font-display font-bold text-2xl text-white">{currentMoodScore}/10</div>
        <div className="text-[11px] text-slate-400 font-medium">Serenity Score</div>
      </GlassCard>

      {/* Milestone Title */}
      <GlassCard hover={false} className="p-4 text-center border-amber-500/20 bg-amber-950/10">
        <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 mx-auto flex items-center justify-center mb-1">
          <Award className="w-5 h-5" />
        </div>
        <div className="font-display font-bold text-sm text-amber-300 truncate mt-1">{milestoneTitle}</div>
        <div className="text-[11px] text-slate-400 font-medium">Milestone</div>
      </GlassCard>

    </div>
  );
}
