import React from 'react';
import { UserCheck, Plus, Trash2, BarChart2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function AboutEditor() {
  const { currentPortfolio, updateSection } = usePortfolio();
  const about = currentPortfolio?.about || { enabled: true, stats: [], quickFacts: [] };

  const handleChange = (field, value) => {
    updateSection('about', { [field]: value });
  };

  // Stats operations
  const handleStatChange = (index, field, value) => {
    const updatedStats = [...(about.stats || [])];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    handleChange('stats', updatedStats);
  };

  const addStat = () => {
    const updatedStats = [...(about.stats || []), { label: "New Metric", value: "100+" }];
    handleChange('stats', updatedStats);
  };

  const removeStat = (index) => {
    const updatedStats = about.stats.filter((_, i) => i !== index);
    handleChange('stats', updatedStats);
  };

  // Quick facts operations
  const handleFactChange = (index, value) => {
    const updatedFacts = [...(about.quickFacts || [])];
    updatedFacts[index] = value;
    handleChange('quickFacts', updatedFacts);
  };

  const addFact = () => {
    const updatedFacts = [...(about.quickFacts || []), "New interesting fact or highlight"];
    handleChange('quickFacts', updatedFacts);
  };

  const removeFact = (index) => {
    const updatedFacts = about.quickFacts.filter((_, i) => i !== index);
    handleChange('quickFacts', updatedFacts);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-indigo-400" />
          About Me Section
        </h3>
        <p className="text-xs text-slate-400">
          Share your professional journey, core philosophy, and key impact statistics.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Section Title</label>
        <input
          type="text"
          value={about.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. About Me / Background"
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Executive Summary (Lead paragraph)</label>
        <textarea
          rows={3}
          value={about.summary || ""}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Brief intro highlighting your expertise and primary focus..."
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-y"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">In-Depth Story & Philosophy</label>
        <textarea
          rows={4}
          value={about.story || ""}
          onChange={(e) => handleChange("story", e.target.value)}
          placeholder="Deeper dive into what makes your approach unique, your passions, achievements..."
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-y"
        />
      </div>

      {/* Key Numbers / Stats Counter */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
            Key Impact Statistics
          </label>
          <button
            type="button"
            onClick={addStat}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-medium border border-indigo-500/30 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Stat
          </button>
        </div>

        <div className="space-y-2">
          {about.stats?.map((stat, i) => (
            <div key={i} className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
              <input
                type="text"
                value={stat.value}
                onChange={(e) => handleStatChange(i, 'value', e.target.value)}
                placeholder="Value (e.g. 7+ or $2M)"
                className="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-indigo-400 font-bold focus:outline-none"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                placeholder="Label (e.g. Years Experience)"
                className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeStat(i)}
                className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Facts / Bullets */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Quick Highlights & Focus Areas
          </label>
          <button
            type="button"
            onClick={addFact}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-medium border border-indigo-500/30 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Point
          </button>
        </div>

        <div className="space-y-2">
          {about.quickFacts?.map((fact, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
              <input
                type="text"
                value={fact}
                onChange={(e) => handleFactChange(i, e.target.value)}
                placeholder="e.g. Specialized in Distributed Systems"
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => removeFact(i)}
                className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
