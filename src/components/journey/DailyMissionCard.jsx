import React from 'react';
import { useRecovery } from '../../context/RecoveryContext';
import { GlassCard } from '../ui/GlassCard';
import { CheckCircle2, Circle, Target, Sparkles } from 'lucide-react';

export function DailyMissionCard() {
  const { userState, toggleMissionComplete } = useRecovery();
  const { dailyMission } = userState;

  return (
    <GlassCard className="border-indigo-500/20 bg-gradient-to-br from-white/[0.04] to-indigo-950/20">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>AI Daily Mission</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20">
          {dailyMission.category}
        </span>
      </div>

      <div className="mt-3 flex items-start gap-4">
        <button
          onClick={toggleMissionComplete}
          className="mt-0.5 transition-transform active:scale-90"
        >
          {dailyMission.completed ? (
            <CheckCircle2 className="w-7 h-7 text-emerald-400 fill-emerald-400/20" />
          ) : (
            <Circle className="w-7 h-7 text-slate-500 hover:text-indigo-400 transition-colors" />
          )}
        </button>

        <div className="flex-1">
          <h4 className={`font-display font-semibold text-base transition-all ${
            dailyMission.completed ? 'text-slate-400 line-through' : 'text-white'
          }`}>
            {dailyMission.title}
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {dailyMission.description}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
