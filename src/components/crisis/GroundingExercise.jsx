import React, { useState } from 'react';
import { Eye, Ear, Hand, Wind, Utensils, CheckCircle } from 'lucide-react';

export function GroundingExercise() {
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    { id: '5', count: 5, icon: Eye, text: 'Acknowledge 5 things you can SEE around you' },
    { id: '4', count: 4, icon: Hand, text: 'Acknowledge 4 things you can physically TOUCH' },
    { id: '3', count: 3, icon: Ear, text: 'Acknowledge 3 things you can HEAR in the room' },
    { id: '2', count: 2, icon: Wind, text: 'Acknowledge 2 things you can SMELL' },
    { id: '1', count: 1, icon: Utensils, text: 'Acknowledge 1 thing you can TASTE' }
  ];

  const toggleStep = (id) => {
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="glass-card rounded-3xl p-5 border border-emerald-500/20 my-4 bg-emerald-950/10">
      <h4 className="font-display font-semibold text-sm text-emerald-300 mb-3 flex items-center gap-2">
        <span>5-4-3-2-1 Sensory Grounding Guide</span>
      </h4>

      <div className="space-y-2.5">
        {steps.map(s => {
          const Icon = s.icon;
          const isDone = completedSteps.includes(s.id);

          return (
            <div
              key={s.id}
              onClick={() => toggleStep(s.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                isDone 
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
                  : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  isDone ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-slate-300'
                }`}>
                  {s.count}
                </div>
                <Icon className="w-4 h-4 text-emerald-400" />
                <span className={`text-xs font-medium ${isDone ? 'line-through opacity-80' : ''}`}>
                  {s.text}
                </span>
              </div>

              {isDone && <CheckCircle className="w-4 h-4 text-emerald-400" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
