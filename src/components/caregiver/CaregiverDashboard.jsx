import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRecovery } from '../../context/RecoveryContext';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { PrimaryButton } from '../ui/PrimaryButton';
import { generateCaregiverGuidance } from '../../services/gemini';
import { 
  Heart, ShieldCheck, MessageSquare, AlertCircle, Copy, Check, Sparkles, Ban, 
  HelpCircle, Activity, Calendar, BookOpen, AlertTriangle, FileText, ArrowLeft 
} from 'lucide-react';

export function CaregiverDashboard() {
  const { caregiverProfile, userProfile, switchRole } = useAuth();
  const { riskAssessment, emergencyContacts, guides } = useRecovery();
  const [topic, setTopic] = useState('');
  const [aiGuidance, setAiGuidance] = useState(null);
  const [copied, setCopied] = useState(false);
  const [defaultGuidance, setDefaultGuidance] = useState(null);
  const [loadingDefault, setLoadingDefault] = useState(true);

  // Janani's Checklist state
  const [prepChecklist, setPrepChecklist] = useState([
    { id: '1', text: 'Confirm 988 emergency hotlines are saved', checked: true },
    { id: '2', text: 'Locate nearby crisis triage hospital coordinates', checked: true },
    { id: '3', text: 'Keep a copy of Velan\'s current recovery track plan', checked: false },
    { id: '4', text: 'Setup boundary support rules (Safe Presence)', checked: false }
  ]);

  useEffect(() => {
    async function loadDefaultGuide() {
      try {
        setLoadingDefault(true);
        const res = await generateCaregiverGuidance(userProfile.streakDays, 'daily maintenance');
        setDefaultGuidance(res);
      } catch (err) {
        console.warn(err);
      } finally {
        setLoadingDefault(false);
      }
    }
    loadDefaultGuide();
  }, [userProfile.streakDays]);

  const handleGenerateScript = async () => {
    if (!topic.trim()) return;
    const res = await generateCaregiverGuidance(userProfile.streakDays, topic);
    setAiGuidance(res);
  };

  const copyScript = () => {
    if (aiGuidance?.script) {
      navigator.clipboard.writeText(aiGuidance.script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleCheck = (id) => {
    setPrepChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-28">
      
      {/* Caregiver Welcome Banner */}
      <GlassCard hover={false} className="border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 to-purple-950/20 animate-fade-in">
        
        {/* Consistent top-left Back button to switch back to Patient/User mode */}
        <div className="pb-3 border-b border-white/10 mb-4 flex justify-between items-center">
          <button
            onClick={() => switchRole('patient')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-300 hover:text-white transition-all text-xs font-semibold border border-indigo-500/30 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Recovery View</span>
          </button>
          <Badge variant="indigo">Privacy Preserved Mode</Badge>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
              <Heart className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-white">Caregiver Support Portal</h2>
              <p className="text-xs text-slate-300">Supporting {userProfile.name} • {caregiverProfile.name} ({caregiverProfile.relationship})</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Loved One High-Level Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Recovery Streak Safeguard */}
        <GlassCard hover={false} className="border-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Recovery Strength</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="font-display font-extrabold text-3xl text-white">
              {userProfile.streakDays} Days Strong
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active Milestone: <span className="text-emerald-300 font-semibold">{userProfile.milestoneTitle}</span>
            </p>
          </div>
        </GlassCard>

        {/* Safety Stability Status */}
        <GlassCard hover={false} className="border-amber-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Stability Index</span>
            <Badge variant={riskAssessment.color}>{riskAssessment.level}</Badge>
          </div>
          <div className="mt-3">
            <div className="font-display font-extrabold text-3xl text-white">
              {100 - riskAssessment.score}% Stability
            </div>
            <p className="text-xs text-slate-400 mt-1">
              No active emergency triggers reported today.
            </p>
          </div>
        </GlassCard>

      </div>

      {/* Context-Aware AI-Assisted Support Message for Janani */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-white px-1">Gemini AI Caregiver Guidance</h3>
        
        {loadingDefault ? (
          <div className="h-20 flex items-center justify-center text-xs text-slate-400">
            Reflecting on caregiver advice...
          </div>
        ) : defaultGuidance && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* How to Begin */}
            <GlassCard hover={false} className="border-emerald-500/20 bg-emerald-950/5">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs mb-2 uppercase">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>How to Begin</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed italic">
                {defaultGuidance.begin}
              </p>
            </GlassCard>

            {/* What to Avoid */}
            <GlassCard hover={false} className="border-rose-500/20 bg-rose-950/5">
              <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs mb-2 uppercase">
                <Ban className="w-4 h-4 text-rose-400" />
                <span>What to Avoid Saying</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {defaultGuidance.avoid}
              </p>
            </GlassCard>

            {/* Supportive Actions */}
            <GlassCard hover={false} className="border-indigo-500/20 bg-indigo-950/5">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs mb-2 uppercase">
                <Activity className="w-4 h-4 text-indigo-400" />
                <span>Supportive Actions</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {defaultGuidance.action}
              </p>
            </GlassCard>

          </div>
        )}
      </div>

      {/* AI Suggested Conversation Generator */}
      <GlassCard hover={false} className="border-indigo-500/20">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm mb-3">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span>AI Conversation Script Generator</span>
        </div>

        <p className="text-xs text-slate-300 mb-4">
          Generate non-intrusive, supportive communication scripts tailored for Janani to support Velan.
        </p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. How to ask about their triggers without sounding intrusive..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <PrimaryButton variant="indigo" size="md" onClick={handleGenerateScript}>
            Generate Script
          </PrimaryButton>
        </div>

        {aiGuidance && (
          <div className="glass-card rounded-2xl p-4 border border-indigo-500/30 bg-indigo-950/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-300">Suggested Script:</span>
              <button
                onClick={copyScript}
                className="text-xs text-indigo-300 hover:text-white flex items-center gap-1 bg-indigo-500/20 px-2.5 py-1 rounded-xl"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-sm text-slate-100 font-medium italic mb-3">
              {typeof aiGuidance === 'object' ? aiGuidance.script : aiGuidance}
            </p>
            {aiGuidance.tip && (
              <p className="text-xs text-amber-300 font-medium border-t border-white/10 pt-2">
                💡 Tip: {aiGuidance.tip}
              </p>
            )}
          </div>
        )}
      </GlassCard>

      {/* Recovery Timeline, Milestones, and Emergency Prep Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Recovery Timeline & Milestone Status */}
        <GlassCard hover={false} className="border-emerald-500/20 bg-[#0B0F19]/40">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm mb-3">
            <Calendar className="w-4.5 h-4.5" />
            <span>Velan's Recovery Milestone Timeline</span>
          </div>

          <div className="space-y-4 text-xs font-medium pl-1">
            <div className="relative border-l-2 border-emerald-500/30 pl-4 py-1.5">
              <div className="absolute -left-1.5 top-2.5 w-3 h-3 rounded-full bg-emerald-500 border border-emerald-300 shadow-md shadow-emerald-500/50" />
              <div className="flex items-center justify-between">
                <span className="text-white">Day 42 Clean (Current Milestone Achieved)</span>
                <Badge variant="emerald">Unlocked</Badge>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Alex Mercer milestone completed cleanly.</p>
            </div>

            <div className="relative border-l-2 border-emerald-500/30 pl-4 py-1.5">
              <div className="absolute -left-1.5 top-2.5 w-3 h-3 rounded-full bg-emerald-500 border border-emerald-300 shadow-md shadow-emerald-500/50" />
              <div className="flex items-center justify-between">
                <span className="text-white">Day 30 Pioneer Milestone</span>
                <Badge variant="emerald">Unlocked</Badge>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">30 consecutive daily serenity check-ins verified.</p>
            </div>

            <div className="relative border-l-2 border-emerald-500/30 pl-4 py-1.5">
              <div className="absolute -left-1.5 top-2.5 w-3 h-3 rounded-full bg-white/20 border border-white/40" />
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Day 60 Resilient Veteran (Upcoming)</span>
                <Badge variant="slate">Locked</Badge>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">18 days remaining to unlock next structural milestone.</p>
            </div>
          </div>
        </GlassCard>

        {/* Emergency Preparation Checklist & Caregiver Guides */}
        <div className="space-y-4">
          
          {/* Janani's Checklist */}
          <GlassCard hover={false} className="border-rose-500/20 bg-[#0B0F19]/40">
            <div className="flex items-center gap-2 text-rose-300 font-semibold text-sm mb-3">
              <AlertTriangle className="w-4.5 h-4.5 text-rose-400" />
              <span>Janani's Emergency Preparation Checklist</span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-200">
              {prepChecklist.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-xl hover:bg-white/5"
                >
                  <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center ${
                    item.checked ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'border-slate-600'
                  }`}>
                    {item.checked && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span className={item.checked ? 'line-through text-slate-400' : ''}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recommended Literature */}
          <GlassCard hover={false} className="border-teal-500/20 bg-[#0B0F19]/40 p-4.5">
            <div className="flex items-center gap-2 text-teal-300 font-semibold text-xs mb-2.5 uppercase">
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>Recommended Caregiver Literature</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-slate-200 font-medium truncate">Empathetic Boundaries for Family Members</span>
                <span className="text-[10px] text-teal-400 font-semibold shrink-0">Read 5m</span>
              </div>
            </div>
          </GlassCard>

        </div>

      </div>

    </div>
  );
}
