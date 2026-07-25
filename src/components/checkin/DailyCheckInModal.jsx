import React, { useState } from 'react';
import { useRecovery } from '../../context/RecoveryContext';
import { X, Smile, Zap, Moon, Sparkles, Check, Heart, ShieldCheck, Activity, ArrowLeft } from 'lucide-react';
import { PrimaryButton } from '../ui/PrimaryButton';
import { generateCheckInInsights } from '../../services/gemini';
import { GlassCard } from '../ui/GlassCard';

export function DailyCheckInModal() {
  const { isCheckInOpen, setIsCheckInOpen, addCheckIn } = useRecovery();

  const [mood, setMood] = useState(8);
  const [energy, setEnergy] = useState(7);
  const [sleep, setSleep] = useState(7.5);
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [notes, setNotes] = useState('');
  const [aiInsights, setAiInsights] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckInOpen) return null;

  const triggerOptions = ['Hungry', 'Angry', 'Lonely', 'Tired', 'Stress', 'Craving', 'SocialPressure'];

  const toggleTrigger = (t) => {
    setSelectedTriggers(prev => 
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const entry = { mood, energy, sleep, triggers: selectedTriggers, notes };
    
    // Call Gemini for structured recovery insights
    const insights = await generateCheckInInsights(entry);
    setAiInsights(insights);
    
    addCheckIn(entry);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setAiInsights(null);
    setIsCheckInOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl overflow-y-auto">
      <div className="relative w-full max-w-lg glass-modal rounded-3xl p-6 border border-white/15 shadow-2xl my-8 animate-fade-in">
        
        {/* Header with Consistent Back button in top-left */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-semibold border border-white/10 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <Smile className="w-4.5 h-4.5 text-emerald-400" />
            <h2 className="font-display font-bold text-base text-white">Daily Check-in</h2>
          </div>
        </div>

        {aiInsights ? (
          /* AI Insights Cards View */
          <div className="py-4 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-1 border border-emerald-500/30">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>

            <h3 className="font-display font-bold text-lg text-white">Check-in Saved!</h3>
            <p className="text-xs text-slate-400 -mt-2">Gemini has processed your recovery data</p>

            <div className="space-y-3 text-left">
              
              {/* Card 1: Mood & Progress Analysis */}
              <GlassCard hover={false} className="p-4 border-indigo-500/20 bg-indigo-950/10">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs mb-1.5 uppercase tracking-wider">
                  <Smile className="w-4 h-4 text-indigo-400" />
                  <span>Mood & Progress Analysis</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {aiInsights.moodSummary} {aiInsights.progressAnalysis}
                </p>
              </GlassCard>

              {/* Card 2: Relapse Risk & Score Explanation */}
              <GlassCard hover={false} className="p-4 border-amber-500/20 bg-amber-950/10">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs mb-1.5 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Relapse Safeguard Explanation</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {aiInsights.relapseRiskExplanation} {aiInsights.recoveryScoreExplanation}
                </p>
              </GlassCard>

              {/* Card 3: Recommended Action */}
              <GlassCard hover={false} className="p-4 border-emerald-500/20 bg-emerald-950/10">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs mb-1.5 uppercase tracking-wider">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Recommended Recovery Action</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                  {aiInsights.recommendedAction}
                </p>
              </GlassCard>

            </div>

            <PrimaryButton variant="emerald" size="lg" className="w-full mt-2" onClick={handleClose}>
              Return to Journey
            </PrimaryButton>
          </div>
        ) : (
          /* Check-in Form View */
          <div className="mt-4 space-y-5">
            
            {/* Mood Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Smile className="w-4 h-4 text-emerald-400" />
                  Serenity / Mood Score
                </span>
                <span className="text-emerald-400 font-bold text-sm">{mood} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={mood}
                onChange={(e) => setMood(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Energy Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Physical Energy
                </span>
                <span className="text-amber-400 font-bold text-sm">{energy} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={energy}
                onChange={(e) => setEnergy(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Sleep Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-indigo-400" />
                  Sleep Duration
                </span>
                <span className="text-indigo-400 font-bold text-sm">{sleep} Hours</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={sleep}
                onChange={(e) => setSleep(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* HALT Triggers Chips */}
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-2">
                HALT & Vulnerability Triggers Today
              </div>
              <div className="flex flex-wrap gap-2">
                {triggerOptions.map(t => {
                  const isSelected = selectedTriggers.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTrigger(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                        isSelected 
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                          : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{t}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reflection Notes / Voice Note */}
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Daily Reflection (Voice or Text)</span>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share your thoughts or triggers today..."
                rows="3"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <PrimaryButton
              variant="emerald"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Reflecting with Gemini...' : 'Complete Daily Check-in'}
            </PrimaryButton>

          </div>
        )}

      </div>
    </div>
  );
}
