import React, { useEffect, useState } from 'react';
import { X, Layers, Check, Sparkles, Terminal, Palette, Code2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { api } from '../../utils/api';

export function TemplateSelectorModal({ isOpen, onClose }) {
  const { createNewPortfolio } = usePortfolio();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      api.getTemplates().then(setTemplates).catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectTemplate = async (template) => {
    setLoading(true);
    try {
      await createNewPortfolio(template);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Choose a Portfolio Template</h3>
              <p className="text-xs text-slate-400">Pick a pre-configured template to start customizing immediately.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {templates.map((tpl) => {
            let Icon = Code2;
            if (tpl.design?.theme === 'editorial') Icon = Palette;
            if (tpl.design?.theme === 'terminal') Icon = Terminal;

            return (
              <div
                key={tpl.id}
                className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500 rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all group hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-slate-900 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {tpl.design?.theme}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {tpl.hero?.title || tpl.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-3">
                    {tpl.hero?.tagline || tpl.about?.summary}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSelectTemplate(tpl)}
                  className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Apply Template
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
