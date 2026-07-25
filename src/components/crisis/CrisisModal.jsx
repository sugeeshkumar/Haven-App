import React, { useState, useEffect } from 'react';
import { useRecovery } from '../../context/RecoveryContext';
import { CrisisCategoryGrid } from './CrisisCategoryGrid';
import { BreathingOrb } from './BreathingOrb';
import { GroundingExercise } from './GroundingExercise';
import { EmergencyContactsList } from './EmergencyContactsList';
import { generateCrisisActionPlan } from '../../services/gemini';
import { X, Sparkles, CheckCircle2, HeartPulse, ArrowLeft } from 'lucide-react';
import { PrimaryButton } from '../ui/PrimaryButton';

export function CrisisModal() {
  const { isCrisisModalOpen, setIsCrisisModalOpen, selectedCrisisCategory, setSelectedCrisisCategory } = useRecovery();
  const [actionPlan, setActionPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCrisisCategory) {
      loadPlan(selectedCrisisCategory);
    }
  }, [selectedCrisisCategory]);

  const loadPlan = async (cat) => {
    setLoading(true);
    const plan = await generateCrisisActionPlan(cat);
    setActionPlan(plan);
    setLoading(false);
  };

  if (!isCrisisModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl overflow-y-auto">
      <div className="relative w-full max-w-xl glass-modal rounded-3xl p-6 border border-white/15 my-8 shadow-2xl animate-fade-in">
        
        {/* Header with Consistent Back button in top-left */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <button
            onClick={() => setIsCrisisModalOpen(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-semibold border border-white/10 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <HeartPulse className="w-4.5 h-4.5 text-rose-400" />
            <h2 className="font-display font-bold text-base text-white">Crisis Hub</h2>
          </div>
        </div>

        {/* 4 Large Crisis Tiles */}
        <CrisisCategoryGrid
          selectedCategory={selectedCrisisCategory}
          onSelectCategory={(cat) => setSelectedCrisisCategory(cat)}
        />

        {/* Gemini Action Plan & Reassurance */}
        {actionPlan && (
          <div className="glass-card rounded-3xl p-5 border border-indigo-500/20 my-4 bg-indigo-950/20">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>AI Personalized Action Plan</span>
            </div>

            <p className="text-sm text-slate-200 font-medium italic mb-3">
              "{actionPlan.reassurance}"
            </p>

            <ul className="space-y-2">
              {actionPlan.steps && actionPlan.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Visual Breathing Orb */}
        <BreathingOrb />

        {/* 5-4-3-2-1 Sensory Grounding Guide */}
        <GroundingExercise />

        {/* Emergency Hotline Dialers */}
        <EmergencyContactsList />

        {/* Action Button: I Feel Safer */}
        <div className="mt-6">
          <PrimaryButton
            variant="emerald"
            size="lg"
            className="w-full"
            onClick={() => setIsCrisisModalOpen(false)}
          >
            I Feel Grounded & Safe Now
          </PrimaryButton>
        </div>

      </div>
    </div>
  );
}
