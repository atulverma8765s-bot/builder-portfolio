import React from 'react';
import { Sparkles, Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function ServicesEditor() {
  const { currentPortfolio, updateSection } = usePortfolio();
  const servicesData = currentPortfolio?.services || { enabled: false, title: "Services & Offerings", items: [] };

  const handleChange = (field, value) => {
    updateSection('services', { [field]: value });
  };

  const addService = () => {
    const newService = {
      id: `serv-${Date.now()}`,
      title: "Full-Stack Development",
      description: "End-to-end architecture and implementation of scalable web applications.",
      price: "Starting at $3,000",
      delivery: "2-4 Weeks",
    };
    handleChange('items', [...(servicesData.items || []), newService]);
  };

  const removeService = (id) => {
    const updated = servicesData.items.filter((s) => s.id !== id);
    handleChange('items', updated);
  };

  const updateService = (index, field, value) => {
    const updated = [...servicesData.items];
    updated[index] = { ...updated[index], [field]: value };
    handleChange('items', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Services & Offerings
          </h3>
          <p className="text-xs text-slate-400">
            Freelance services, consulting packages, or client solutions you offer.
          </p>
        </div>
        <button
          type="button"
          onClick={addService}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Service
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Section Title</label>
        <input
          type="text"
          value={servicesData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. Services & Consulting Packages"
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="space-y-3">
        {servicesData.items?.map((item, idx) => (
          <div key={item.id || idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={item.title || ""}
                onChange={(e) => updateService(idx, 'title', e.target.value)}
                placeholder="Service Title"
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => removeService(item.id)}
                className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={2}
              value={item.description || ""}
              onChange={(e) => updateService(idx, 'description', e.target.value)}
              placeholder="What does this service include? Deliverables, scope..."
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-y"
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400">Pricing Estimate</label>
                <input
                  type="text"
                  value={item.price || ""}
                  onChange={(e) => updateService(idx, 'price', e.target.value)}
                  placeholder="e.g. $2,500 or Retainer"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-indigo-400 font-semibold focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400">Turnaround</label>
                <input
                  type="text"
                  value={item.delivery || ""}
                  onChange={(e) => updateService(idx, 'delivery', e.target.value)}
                  placeholder="e.g. 2-3 Weeks"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
