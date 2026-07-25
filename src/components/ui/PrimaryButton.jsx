import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function PrimaryButton({
  children,
  className,
  variant = 'emerald',
  size = 'lg',
  icon: Icon,
  disabled,
  onClick,
  ...props
}) {
  const variants = {
    emerald: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-lg shadow-emerald-500/25',
    coral: 'bg-rose-500 hover:bg-rose-400 text-white font-semibold shadow-lg shadow-rose-500/30 glow-coral',
    indigo: 'bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 glow-indigo',
    glass: 'glass-pill hover:bg-white/10 text-slate-100 font-medium border border-white/15',
    amber: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-500/25'
  };

  const sizes = {
    md: 'min-h-[48px] px-5 text-base rounded-2xl',
    lg: 'min-h-[56px] px-6 text-lg rounded-2xl',
    xl: 'min-h-[64px] px-8 text-xl rounded-3xl'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center gap-3 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none',
          variants[variant],
          sizes[size],
          className
        )
      )}
      {...props}
    >
      {Icon && <Icon className="w-6 h-6 stroke-[2.2]" />}
      <span>{children}</span>
    </button>
  );
}
