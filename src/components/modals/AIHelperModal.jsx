import React, { useState } from 'react';
import { X, Wand2, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { api } from '../../utils/api';

export function AIHelperModal({ isOpen, onClose }) {
  const { currentPortfolio, updateCurrentPortfolio } = usePortfolio();
  const [type, setType] = useState('bio'); // bio, bullet, project_tagline
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await api.enhanceWithAi(type, prompt, {
        role: currentPortfolio?.hero?.title,
      });
      setResult(res.enhancedText || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (!result) return;
    if (type === 'bio') {
      updateCurrentPortfolio((prev) => ({
        ...prev,
        hero: { ...prev.hero, tagline: result },
        about: { ...prev.about, summary: result },
      }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Copywriting Assistant</h3>
              <p className="text-xs text-slate-400">Generate polished bios, high-impact bullets, and elevator pitches.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type selector */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => { setType('bio'); setResult(''); }}
            className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
              type === 'bio'
                ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Elevator Bio
          </button>
          <button
            type="button"
            onClick={() => { setType('bullet'); setResult(''); }}
            className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
              type === 'bullet'
                ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Impact Bullet
          </button>
          <button
            type="button"
            onClick={() => { setType('project_tagline'); setResult(''); }}
            className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
              type === 'project_tagline'
                ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Project Tagline
          </button>
        </div>

        {/* Input prompt */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            {type === 'bio' && "Key skills or keywords to emphasize"}
            {type === 'bullet' && "Rough description of what you did"}
            {type === 'project_tagline' && "Project core technology or problem solved"}
          </label>
          <textarea
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. built a fast dashboard in React and Go with 50k users"
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-violet-500 resize-y"
          />
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleGenerate}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-violet-600/20 flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {loading ? 'Polishing...' : 'Generate with AI'}
        </button>

        {/* Output */}
        {result && (
          <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-violet-500/30">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider">
                Generated Result
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{result}</p>
            {type === 'bio' && (
              <button
                type="button"
                onClick={handleApply}
                className="w-full mt-2 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Apply Directly to Bio
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
