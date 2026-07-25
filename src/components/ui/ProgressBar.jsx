import React from 'react';

export function ProgressBar({ value = 0, max = 100, color = 'emerald', className = '' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    emerald: 'bg-emerald-500 shadow-emerald-500/50',
    coral: 'bg-rose-500 shadow-rose-500/50',
    amber: 'bg-amber-500 shadow-amber-500/50',
    indigo: 'bg-indigo-500 shadow-indigo-500/50'
  };

  return (
    <div className={`w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 backdrop-blur-sm ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out shadow-sm ${colors[color]}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
