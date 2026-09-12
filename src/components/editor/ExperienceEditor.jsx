import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Wand2, ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { api } from '../../utils/api';

export function ExperienceEditor() {
  const { currentPortfolio, updateSection } = usePortfolio();
  const experienceData = currentPortfolio?.experience || { enabled: true, title: "Work Experience", items: [] };
  const [expandedId, setExpandedId] = useState(experienceData.items?.[0]?.id || null);
  const [aiLoadingIdx, setAiLoadingIdx] = useState(null);

  const handleChange = (field, value) => {
    updateSection('experience', { [field]: value });
  };

  const addExperience = () => {
    const newId = `exp-${Date.now()}`;
    const updated = [
      {
        id: newId,
        company: "Company Name",
        role: "Software Engineer",
        period: "2023 - Present",
        location: "Remote",
        type: "Full-Time",
        description: "Key responsibilities and domain focus.",
        achievements: ["Engineered core features resulting in 30% performance improvement."],
        technologies: ["React", "TypeScript", "Node.js"],
      },
      ...(experienceData.items || []),
    ];
    handleChange('items', updated);
    setExpandedId(newId);
  };

  const removeExperience = (id) => {
    const updated = experienceData.items.filter((item) => item.id !== id);
    handleChange('items', updated);
  };

  const updateItem = (index, field, value) => {
    const updated = [...experienceData.items];
    updated[index] = { ...updated[index], [field]: value };
    handleChange('items', updated);
  };

  // Bullets
  const addAchievement = (expIdx) => {
    const updated = [...experienceData.items];
    const exp = updated[expIdx];
    exp.achievements = [...(exp.achievements || []), "Spearheaded technical initiative that delivered key business impact."];
    handleChange('items', updated);
  };

  const updateAchievement = (expIdx, bulletIdx, value) => {
    const updated = [...experienceData.items];
    const exp = updated[expIdx];
    const bullets = [...exp.achievements];
    bullets[bulletIdx] = value;
    exp.achievements = bullets;
    handleChange('items', updated);
  };

  const removeAchievement = (expIdx, bulletIdx) => {
    const updated = [...experienceData.items];
    const exp = updated[expIdx];
    exp.achievements = exp.achievements.filter((_, i) => i !== bulletIdx);
    handleChange('items', updated);
  };

  // AI Polish Bullet
  const polishBulletWithAi = async (expIdx, bulletIdx) => {
    const currentBullet = experienceData.items[expIdx]?.achievements?.[bulletIdx] || '';
    setAiLoadingIdx(`${expIdx}-${bulletIdx}`);
    try {
      const res = await api.enhanceWithAi('bullet', currentBullet, {
        role: experienceData.items[expIdx]?.role,
      });
      if (res.enhancedText) {
        updateAchievement(expIdx, bulletIdx, res.enhancedText);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoadingIdx(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            Work Experience
          </h3>
          <p className="text-xs text-slate-400">
            Showcase your career progression, leadership roles, and measurable contributions.
          </p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Role
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Section Title</label>
        <input
          type="text"
          value={experienceData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. Professional Experience"
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="space-y-3">
        {experienceData.items?.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id || idx} className="bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden">
              {/* Header bar */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-200">
                    {item.role || "Role"} &bull; <span className="text-indigo-400">{item.company || "Company"}</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {item.period || "Dates"} {item.location ? `| ${item.location}` : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExperience(item.id);
                    }}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Body */}
              {isExpanded && (
                <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-400">Job Title / Role</label>
                      <input
                        type="text"
                        value={item.role || ""}
                        onChange={(e) => updateItem(idx, 'role', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-400">Company Name</label>
                      <input
                        type="text"
                        value={item.company || ""}
                        onChange={(e) => updateItem(idx, 'company', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-400">Period / Dates</label>
                      <input
                        type="text"
                        value={item.period || ""}
                        onChange={(e) => updateItem(idx, 'period', e.target.value)}
                        placeholder="e.g. 2021 - Present"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-400">Location</label>
                      <input
                        type="text"
                        value={item.location || ""}
                        onChange={(e) => updateItem(idx, 'location', e.target.value)}
                        placeholder="e.g. San Francisco, CA"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-400">Type</label>
                      <select
                        value={item.type || "Full-Time"}
                        onChange={(e) => updateItem(idx, 'type', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">Role Summary</label>
                    <textarea
                      rows={2}
                      value={item.description || ""}
                      onChange={(e) => updateItem(idx, 'description', e.target.value)}
                      placeholder="Brief overview of your team and overarching responsibilities..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-y"
                    />
                  </div>

                  {/* Achievements Bullets */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        Key Accomplishments & Metrics
                      </label>
                      <button
                        type="button"
                        onClick={() => addAchievement(idx)}
                        className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold"
                      >
                        <Plus className="w-3 h-3" />
                        Add Bullet
                      </button>
                    </div>

                    <div className="space-y-2">
                      {item.achievements?.map((bullet, bulletIdx) => (
                        <div key={bulletIdx} className="flex items-start gap-2">
                          <span className="text-indigo-400 mt-2 text-xs">&bull;</span>
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => updateAchievement(idx, bulletIdx, e.target.value)}
                            className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-y"
                          />
                          <div className="flex flex-col gap-1 shrink-0">
                            <button
                              type="button"
                              title="Polish bullet with AI"
                              disabled={aiLoadingIdx === `${idx}-${bulletIdx}`}
                              onClick={() => polishBulletWithAi(idx, bulletIdx)}
                              className="p-1.5 rounded bg-violet-600/20 hover:bg-violet-600/40 text-violet-300 border border-violet-500/30 transition-colors"
                            >
                              <Wand2 className={`w-3.5 h-3.5 ${aiLoadingIdx === `${idx}-${bulletIdx}` ? 'animate-spin' : ''}`} />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeAchievement(idx, bulletIdx)}
                              className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack tags */}
                  <div className="space-y-1 pt-1">
                    <label className="text-[11px] font-semibold text-slate-400">
                      Technologies Used (comma separated)
                    </label>
                    <input
                      type="text"
                      value={(item.technologies || []).join(', ')}
                      onChange={(e) =>
                        updateItem(
                          idx,
                          'technologies',
                          e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                        )
                      }
                      placeholder="React, TypeScript, AWS, PostgreSQL"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
