import React from 'react';
import { Flame, RefreshCw, AlertCircle, Heart } from 'lucide-react';

export function CrisisCategoryGrid({ onSelectCategory, selectedCategory }) {
  const categories = [
    {
      id: 'craving',
      title: "I'm Craving",
      subtitle: "Ride out intense urges safely",
      icon: Flame,
      color: 'bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25'
    },
    {
      id: 'relapsed',
      title: "I Relapsed",
      subtitle: "Zero judgment de-escalation",
      icon: RefreshCw,
      color: 'bg-rose-500/15 border-rose-500/30 text-rose-300 hover:bg-rose-500/25'
    },
    {
      id: 'panic',
      title: "I'm Panicking",
      subtitle: "Instant anxiety grounding",
      icon: AlertCircle,
      color: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25'
    },
    {
      id: 'family_help',
      title: "Help My Family",
      subtitle: "Caregiver & loved one guide",
      icon: Heart,
      color: 'bg-teal-500/15 border-teal-500/30 text-teal-300 hover:bg-teal-500/25'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 my-4">
      {categories.map(c => {
        const Icon = c.icon;
        const isSelected = selectedCategory === c.id;

        return (
          <button
            key={c.id}
            onClick={() => onSelectCategory(c.id)}
            className={`p-4 rounded-3xl border transition-all text-left flex flex-col justify-between min-h-[110px] active:scale-95 ${c.color} ${
              isSelected ? 'ring-2 ring-white shadow-xl scale-[1.02]' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-2">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-base text-white">{c.title}</div>
              <div className="text-[11px] opacity-80 mt-0.5">{c.subtitle}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
