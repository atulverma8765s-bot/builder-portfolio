import React from 'react';
import { Settings, Globe, Share2, Search, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function SettingsEditor() {
  const { currentPortfolio, updateCurrentPortfolio } = usePortfolio();
  const seo = currentPortfolio?.seo || {};
  const footer = currentPortfolio?.footer || {};

  const handleSeoChange = (field, value) => {
    updateCurrentPortfolio((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value,
      },
    }));
  };

  const handleFooterChange = (field, value) => {
    updateCurrentPortfolio((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
          <Settings className="w-4 h-4 text-indigo-400" />
          Settings & SEO
        </h3>
        <p className="text-xs text-slate-400">
          Configure page titles, custom URLs, search rankings, and social previews.
        </p>
      </div>

      {/* Basic Settings */}
      <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Portfolio Display Title</label>
          <input
            type="text"
            value={currentPortfolio?.title || ""}
            onChange={(e) => updateCurrentPortfolio({ title: e.target.value })}
            placeholder="e.g. Alex Rivera | Senior Full-Stack Engineer"
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Custom URL Slug</span>
            {currentPortfolio?.slug && (
              <a
                href={`/p/${currentPortfolio.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1"
              >
                /p/{currentPortfolio.slug}
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </label>
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500 font-mono">/p/</span>
            <input
              type="text"
              value={currentPortfolio?.slug || ""}
              onChange={(e) =>
                updateCurrentPortfolio({
                  slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''),
                })
              }
              placeholder="my-portfolio"
              className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* SEO & Meta Tags */}
      <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          Search Engine Optimization (SEO)
        </h4>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-400">Meta Title (Browser Tab)</label>
          <input
            type="text"
            value={seo.metaTitle || ""}
            onChange={(e) => handleSeoChange("metaTitle", e.target.value)}
            placeholder="Full Stack Developer Portfolio"
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-400">Meta Description</label>
          <textarea
            rows={2}
            value={seo.metaDescription || ""}
            onChange={(e) => handleSeoChange("metaDescription", e.target.value)}
            placeholder="Brief summary displayed on Google search results..."
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-y"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-400">Keywords (Comma separated)</label>
          <input
            type="text"
            value={seo.keywords || ""}
            onChange={(e) => handleSeoChange("keywords", e.target.value)}
            placeholder="Full Stack, React, Node.js, Cloud, TypeScript"
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Social Preview Simulation */}
      <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5 text-indigo-400" />
          Social Share Card Preview
        </h4>
        <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-950">
          <div className="h-28 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-4 flex flex-col justify-end">
            <span className="text-[11px] text-indigo-400 font-bold uppercase tracking-wider">
              {currentPortfolio?.hero?.name || "Portfolio"}
            </span>
            <h5 className="text-xs font-bold text-white line-clamp-1">
              {seo.metaTitle || currentPortfolio?.title}
            </h5>
          </div>
          <div className="p-3 bg-slate-900/80 border-t border-slate-800">
            <p className="text-[11px] text-slate-400 line-clamp-2">
              {seo.metaDescription || currentPortfolio?.hero?.tagline || "View my work, technical projects, and experience."}
            </p>
            <span className="text-[10px] text-indigo-400 font-mono mt-1 block">
              foliocraft.app/p/{currentPortfolio?.slug}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Settings */}
      <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Footer Customization</h4>
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-400">Custom Footer Note</label>
          <input
            type="text"
            value={footer.customText || ""}
            onChange={(e) => handleFooterChange("customText", e.target.value)}
            placeholder="All rights reserved. Built with pride."
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
          />
        </div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={footer.showBadge !== false}
            onChange={(e) => handleFooterChange("showBadge", e.target.checked)}
            className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
          />
          Show "Built with FolioCraft" badge in footer
        </label>
      </div>
    </div>
  );
}
