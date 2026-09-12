import React from 'react';
import { Cpu, Plus, Trash2, Tag } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function SkillsEditor() {
  const { currentPortfolio, updateSection } = usePortfolio();
  const skillsData = currentPortfolio?.skills || { enabled: true, title: "Skills & Tech Stack", categories: [] };

  const handleChange = (field, value) => {
    updateSection('skills', { [field]: value });
  };

  const addCategory = () => {
    const updated = [
      ...(skillsData.categories || []),
      {
        name: "New Category",
        skills: [{ name: "Skill 1", level: "Expert" }],
      },
    ];
    handleChange('categories', updated);
  };

  const removeCategory = (catIndex) => {
    const updated = skillsData.categories.filter((_, i) => i !== catIndex);
    handleChange('categories', updated);
  };

  const handleCategoryNameChange = (catIndex, name) => {
    const updated = [...skillsData.categories];
    updated[catIndex] = { ...updated[catIndex], name };
    handleChange('categories', updated);
  };

  const addSkillToCategory = (catIndex) => {
    const updated = [...skillsData.categories];
    const cat = updated[catIndex];
    cat.skills = [...(cat.skills || []), { name: "New Skill", level: "Advanced" }];
    handleChange('categories', updated);
  };

  const removeSkillFromCategory = (catIndex, skillIndex) => {
    const updated = [...skillsData.categories];
    const cat = updated[catIndex];
    cat.skills = cat.skills.filter((_, i) => i !== skillIndex);
    handleChange('categories', updated);
  };

  const handleSkillChange = (catIndex, skillIndex, field, value) => {
    const updated = [...skillsData.categories];
    const cat = updated[catIndex];
    const skillList = [...cat.skills];
    skillList[skillIndex] = { ...skillList[skillIndex], [field]: value };
    cat.skills = skillList;
    handleChange('categories', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Skills & Tech Stack
          </h3>
          <p className="text-xs text-slate-400">
            Categorize your technical tools, frameworks, and domain competencies.
          </p>
        </div>
        <button
          type="button"
          onClick={addCategory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Category
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Section Title</label>
        <input
          type="text"
          value={skillsData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. Technical Skills & Tools"
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {skillsData.categories?.map((cat, catIdx) => (
          <div key={catIdx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={cat.name}
                onChange={(e) => handleCategoryNameChange(catIdx, e.target.value)}
                placeholder="Category Name (e.g. Frontend, Cloud, Languages)"
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-indigo-300 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => addSkillToCategory(catIdx)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              >
                <Plus className="w-3 h-3 text-cyan-400" />
                Add Skill
              </button>
              <button
                type="button"
                onClick={() => removeCategory(catIdx)}
                className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Skills inside category */}
            <div className="space-y-2">
              {cat.skills?.map((skill, skillIdx) => (
                <div key={skillIdx} className="flex items-center gap-2 bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
                  <Tag className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <input
                    type="text"
                    value={skill.name || ""}
                    onChange={(e) => handleSkillChange(catIdx, skillIdx, 'name', e.target.value)}
                    placeholder="Skill name (e.g. React, Docker, Python)"
                    className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none"
                  />
                  <select
                    value={skill.level || "Expert"}
                    onChange={(e) => handleSkillChange(catIdx, skillIdx, 'level', e.target.value)}
                    className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] text-slate-300 focus:outline-none"
                  >
                    <option value="Expert">Expert</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Familiar">Familiar</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeSkillFromCategory(catIdx, skillIdx)}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
