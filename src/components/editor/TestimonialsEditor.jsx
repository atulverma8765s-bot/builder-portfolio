import React from 'react';
import { Quote, Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function TestimonialsEditor() {
  const { currentPortfolio, updateSection } = usePortfolio();
  const testimonialsData = currentPortfolio?.testimonials || { enabled: false, title: "Testimonials", items: [] };

  const handleChange = (field, value) => {
    updateSection('testimonials', { [field]: value });
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: `test-${Date.now()}`,
      name: "Client or Colleague Name",
      role: "VP of Product",
      company: "Innovate Corp",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      quote: "Outstanding engineer with impeccable communication skills and speed.",
    };
    handleChange('items', [...(testimonialsData.items || []), newTestimonial]);
  };

  const removeTestimonial = (id) => {
    const updated = testimonialsData.items.filter((t) => t.id !== id);
    handleChange('items', updated);
  };

  const updateTestimonial = (index, field, value) => {
    const updated = [...testimonialsData.items];
    updated[index] = { ...updated[index], [field]: value };
    handleChange('items', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
            <Quote className="w-4 h-4 text-violet-400" />
            Client & Peer Testimonials
          </h3>
          <p className="text-xs text-slate-400">
            Social proof, peer recommendations, and client feedback.
          </p>
        </div>
        <button
          type="button"
          onClick={addTestimonial}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Quote
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Section Title</label>
        <input
          type="text"
          value={testimonialsData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. Recommendations & Testimonials"
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="space-y-3">
        {testimonialsData.items?.map((item, idx) => (
          <div key={item.id || idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Testimonial #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeTestimonial(item.id)}
                className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={3}
              value={item.quote || ""}
              onChange={(e) => updateTestimonial(idx, 'quote', e.target.value)}
              placeholder="What did they say about working with you?"
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-y"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={item.name || ""}
                onChange={(e) => updateTestimonial(idx, 'name', e.target.value)}
                placeholder="Author Name"
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
              />
              <input
                type="text"
                value={item.role || ""}
                onChange={(e) => updateTestimonial(idx, 'role', e.target.value)}
                placeholder="Job Role / Title"
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
              />
              <input
                type="text"
                value={item.company || ""}
                onChange={(e) => updateTestimonial(idx, 'company', e.target.value)}
                placeholder="Company"
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <input
              type="text"
              value={item.avatarUrl || ""}
              onChange={(e) => updateTestimonial(idx, 'avatarUrl', e.target.value)}
              placeholder="Avatar image URL (optional)"
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
