import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function GlassCard({ children, className, hover = true, onClick, ...props }) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          'glass-card rounded-3xl p-6 transition-all duration-300 relative overflow-hidden',
          hover && 'glass-card-hover cursor-pointer',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
