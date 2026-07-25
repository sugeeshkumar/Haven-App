import React, { useState } from 'react';
import { useRecovery } from '../../context/RecoveryContext';
import { answerEducationQuery } from '../../services/gemini';
import { X, BookOpen, Upload, Mic, Search, Sparkles, FileText, ArrowLeft } from 'lucide-react';
import { PrimaryButton } from '../ui/PrimaryButton';

export function EducationHubModal() {
  const { isEducationOpen, setIsEducationOpen, guides } = useRecovery();
  const [selectedGuide, setSelectedGuide] = useState(guides[0]);
  const [query, setQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isEducationOpen) return null;

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const ans = await answerEducationQuery(selectedGuide.content, query);
    setAiAnswer(ans);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-modal rounded-3xl p-6 border border-white/15 shadow-2xl my-8 animate-fade-in">
        
        {/* Header with Consistent Back button in top-left */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <button
            onClick={() => setIsEducationOpen(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-semibold border border-white/10 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-teal-400" />
            <h2 className="font-display font-bold text-base text-white">Education Hub</h2>
          </div>
        </div>

        {/* Guide Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto my-4 pb-1">
          {guides.map(g => (
            <button
              key={g.id}
              onClick={() => { setSelectedGuide(g); setAiAnswer(''); }}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap border transition-all ${
                selectedGuide.id === g.id 
                  ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md shadow-teal-500/20' 
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {g.title}
            </button>
          ))}
        </div>

        {/* Selected Guide Detail Card */}
        <div className="glass-card rounded-2xl p-5 border border-teal-500/20 my-3 bg-teal-950/10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-base text-white">{selectedGuide.title}</h3>
            <span className="text-[11px] text-teal-300 bg-teal-500/15 px-2.5 py-0.5 rounded-full border border-teal-500/30">
              {selectedGuide.readingTime}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
            {selectedGuide.summary}
          </p>

          <div className="p-3 rounded-xl bg-black/40 text-xs text-slate-200 leading-relaxed font-mono">
            {selectedGuide.content}
          </div>
        </div>

        {/* Voice/Text Query Form */}
        <form onSubmit={handleAskQuestion} className="my-4">
          <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Ask Gemini about this literature by voice or text:</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. What does this guide recommend when feeling sudden urge?"
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
            <PrimaryButton variant="emerald" size="md" disabled={loading}>
              {loading ? 'Asking...' : 'Ask AI'}
            </PrimaryButton>
          </div>
        </form>

        {/* AI Answer Explanation Card */}
        {aiAnswer && (
          <div className="glass-card rounded-2xl p-4 border border-emerald-500/30 bg-emerald-950/20 my-3">
            <div className="text-xs font-semibold text-emerald-300 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Gemini Plain-Language Explanation:</span>
            </div>
            <p className="text-xs text-slate-100 leading-relaxed">
              {aiAnswer}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
