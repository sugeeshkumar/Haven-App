import React, { useState, useEffect } from 'react';
import { useRecovery } from '../../context/RecoveryContext';
import { generateEmergencySosScript } from '../../services/gemini';
import { X, ShieldAlert, PhoneCall, MapPin, CheckSquare, Square, Copy, Check, ArrowLeft } from 'lucide-react';
import { PrimaryButton } from '../ui/PrimaryButton';

export function EmergencySosModal() {
  const { isSosOpen, setIsSosOpen, emergencyContacts } = useRecovery();
  const [script, setScript] = useState('');
  const [copied, setCopied] = useState(false);
  const [checklist, setChecklist] = useState([
    { id: '1', text: 'Government ID & Health Insurance Card', checked: true },
    { id: '2', text: 'List of Current Medications & Allergies', checked: true },
    { id: '3', text: 'Designated Support Person (Janani)', checked: false },
    { id: '4', text: 'Phone Charger & Comfort Item', checked: false }
  ]);

  useEffect(() => {
    if (isSosOpen) {
      loadScript();
    }
  }, [isSosOpen]);

  const loadScript = async () => {
    const s = await generateEmergencySosScript('124 Recovery Way, Suite 400');
    setScript(s);
  };

  if (!isSosOpen) return null;

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const copyScript = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/90 backdrop-blur-2xl overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl glass-modal rounded-3xl p-6 border border-rose-500/40 shadow-2xl my-8">
        
        {/* Header with Consistent Back button in top-left */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-500/30">
          <button
            onClick={() => setIsSosOpen(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-rose-200 hover:text-white transition-all text-xs font-semibold border border-rose-500/40 active:scale-95 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-rose-300" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4.5 h-4.5 text-rose-400" />
            <h2 className="font-display font-bold text-base text-white">EMERGENCY SOS</h2>
          </div>
        </div>

        {/* AI-Generated Emergency 911 Script */}
        <div className="glass-card rounded-2xl p-4 border border-rose-500/30 my-4 bg-black/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
              AI Dispatcher Emergency Script
            </span>
            <button
              onClick={copyScript}
              className="text-xs text-rose-200 hover:text-white flex items-center gap-1 bg-rose-500/20 px-2.5 py-1 rounded-xl border border-rose-500/40"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Script'}</span>
            </button>
          </div>
          <p className="text-xs text-rose-100 font-mono leading-relaxed select-all">
            {script}
          </p>
        </div>

        {/* Location Broadcast Card */}
        <div className="glass-card rounded-2xl p-4 border border-rose-500/30 my-3 flex items-center justify-between bg-rose-950/20">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-rose-400" />
            <div>
              <div className="font-semibold text-xs text-white">Mock Live GPS Broadcast</div>
              <div className="text-[11px] text-slate-300">124 Recovery Way • Janani has been notified and is ready to support you.</div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
            Active
          </span>
        </div>

        {/* Hospital Preparation Checklist */}
        <div className="glass-card rounded-2xl p-4 border border-rose-500/30 my-3">
          <h4 className="font-display font-semibold text-xs text-rose-200 mb-2 uppercase tracking-wider">
            Hospital & Transport Preparation Checklist
          </h4>
          <div className="space-y-2">
            {checklist.map(item => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer p-1.5 rounded-xl hover:bg-white/5"
              >
                {item.checked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className={item.checked ? 'line-through text-slate-400' : ''}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Call Buttons */}
        <div className="mt-5 space-y-2">
          <a
            href="tel:988"
            className="w-full py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-rose-500/50 glow-coral active:scale-95"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Call 988 Crisis Lifeline Immediately</span>
          </a>
        </div>

      </div>
    </div>
  );
}
