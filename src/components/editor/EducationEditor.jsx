import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function EducationEditor() {
  const { currentPortfolio, updateSection } = usePortfolio();
  const educationData = currentPortfolio?.education || { enabled: true, title: "Education & Credentials", items: [] };

  const handleChange = (field, value) => {
    updateSection('education', { [field]: value });
  };

  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: "B.S. in Computer Science",
      institution: "University Name",
      year: "2018 - 2022",
      details: "Major in Software Engineering, Honors Graduate.",
    };
    handleChange('items', [...(educationData.items || []), newEdu]);
  };

  const removeEducation = (id) => {
    const updated = educationData.items.filter((e) => e.id !== id);
    handleChange('items', updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...educationData.items];
    updated[index] = { ...updated[index], [field]: value };
    handleChange('items', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            Education & Certifications
          </h3>
          <p className="text-xs text-slate-400">
            Degrees, certifications (AWS, GCP, etc.), and academic achievements.
          </p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Degree / Cert
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Section Title</label>
        <input
          type="text"
          value={educationData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. Education & Certifications"
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="space-y-3">
        {educationData.items?.map((item, idx) => (
          <div key={item.id || idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={item.degree || ""}
                onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
                placeholder="Degree / Certificate Name"
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => removeEducation(item.id)}
                className="text-slate-500 hover:text-rose-400 p-1 ml-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={item.institution || ""}
                onChange={(e) => updateEducation(idx, 'institution', e.target.value)}
                placeholder="Institution / Issuing Organization"
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
              />
              <input
                type="text"
                value={item.year || ""}
                onChange={(e) => updateEducation(idx, 'year', e.target.value)}
                placeholder="Year / Dates (e.g. 2020 - 2024)"
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300 focus:outline-none"
              />
            </div>

            <textarea
              rows={2}
              value={item.details || ""}
              onChange={(e) => updateEducation(idx, 'details', e.target.value)}
              placeholder="Specialization, GPA/Honors, key coursework..."
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300 focus:outline-none resize-y"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
