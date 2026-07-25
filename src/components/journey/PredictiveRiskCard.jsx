import React from 'react';
import { useRecovery } from '../../context/RecoveryContext';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { ShieldCheck, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';

export function PredictiveRiskCard() {
  const { riskAssessment, setIsCheckInOpen } = useRecovery();
  const { score, level, color, advice } = riskAssessment;

  const isLow = level === 'Low';
  const isHigh = level === 'High Risk';

  return (
    <GlassCard className="border-emerald-500/20 bg-gradient-to-br from-white/[0.05] to-emerald-950/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
            isHigh ? 'bg-rose-500/15 border-rose-500/30 text-rose-400' :
            isLow ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' :
            'bg-amber-500/15 border-amber-500/30 text-amber-400'
          }`}>
            {isHigh ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-lg text-white">Relapse Risk Index</h3>
              <Badge variant={color}>{score}% {level}</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Calculated in real-time by Gemini Risk Engine</p>
          </div>
        </div>
      </div>

      {/* Progress Arc */}
      <div className="mt-4 w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            isHigh ? 'bg-rose-500' : isLow ? 'bg-emerald-500' : 'bg-amber-500'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="text-sm text-slate-300 mt-3 leading-relaxed">
        {advice}
      </p>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-xs">
        <span className="text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Proactive AI Safeguard Active
        </span>

        <button
          onClick={() => setIsCheckInOpen(true)}
          className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
        >
          <span>Update Status</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </GlassCard>
  );
}
