import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRecovery } from '../../context/RecoveryContext';
import { ShieldAlert, Heart, User, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function Header() {
  const { role, switchRole, userProfile } = useAuth();
  const { setIsSosOpen } = useRecovery();

  return (
    <header className="sticky top-0 z-30 w-full px-4 py-3 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Milestone Pill */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#0B0F19] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h1 className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-2">
              Haven
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal border border-emerald-500/30">
                v1.0 AI
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">AI-Powered Recovery Companion</p>
          </div>
        </div>

        {/* Right Actions: Persona Switcher & Emergency SOS */}
        <div className="flex items-center gap-3">
          
          {/* Persona Switcher Toggle */}
          <div className="glass-pill p-1 rounded-2xl flex items-center gap-1 border border-white/10">
            <button
              onClick={() => switchRole('patient')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                role === 'patient' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Recovery</span>
            </button>

            <button
              onClick={() => switchRole('caregiver')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                role === 'caregiver' 
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Caregiver</span>
            </button>
          </div>

          {/* High-Contrast Emergency SOS Button */}
          <button
            onClick={() => setIsSosOpen(true)}
            aria-label="Open Emergency SOS"
            className="px-3.5 py-2 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500 hover:text-white transition-all flex items-center gap-1.5 font-bold text-xs shadow-lg shadow-rose-500/20 active:scale-95"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>SOS</span>
          </button>
        </div>

      </div>
    </header>
  );
}
