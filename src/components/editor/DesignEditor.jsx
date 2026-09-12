import React from 'react';
import { Palette, Type, Check, Paintbrush, Sliders, Layers } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { THEMES, FONT_OPTIONS, ACCENT_COLORS, BORDER_RADIUS_OPTIONS } from '../../utils/themeUtils';

export function DesignEditor() {
  const { currentPortfolio, updateDesign } = usePortfolio();
  const design = currentPortfolio?.design || {
    theme: "cyberpunk",
    fontFamily: "Inter",
    accentColor: "#6366f1",
    secondaryColor: "#06b6d4",
    borderRadius: "rounded-xl",
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
          <Palette className="w-4 h-4 text-indigo-400" />
          Theme & Design System
        </h3>
        <p className="text-xs text-slate-400">
          Transform your portfolio aesthetic with instant curated themes and custom typography.
        </p>
      </div>

      {/* Theme Cards Grid */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Choose Aesthetic Theme</label>
        <div className="grid grid-cols-1 gap-2.5">
          {THEMES.map((theme) => {
            const isSelected = design.theme === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => updateDesign({ theme: theme.id })}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/20 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg shadow-inner flex items-center justify-center shrink-0"
                    style={{ backgroundColor: theme.previewColor }}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{theme.name}</h4>
                    <p className="text-[11px] text-slate-400">{theme.description}</p>
                  </div>
                </div>
                {isSelected && (
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30">
                    Active
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Font Family Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-indigo-400" />
          Typography Font Pairing
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {FONT_OPTIONS.map((font) => {
            const isSelected = design.fontFamily === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => updateDesign({ fontFamily: font.id })}
                className={`px-3 py-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/30 text-indigo-300 font-semibold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className={font.class}>{font.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color Palette */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Paintbrush className="w-3.5 h-3.5 text-indigo-400" />
          Primary Accent Color
        </label>
        <div className="flex flex-wrap gap-2.5 items-center">
          {ACCENT_COLORS.map((color) => {
            const isSelected = design.accentColor?.toLowerCase() === color.value.toLowerCase();
            return (
              <button
                key={color.value}
                type="button"
                title={color.name}
                onClick={() => updateDesign({ accentColor: color.value })}
                className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center relative shadow-md ${
                  isSelected ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-slate-950' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color.value }}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />}
              </button>
            );
          })}
          {/* Custom Hex input */}
          <div className="flex items-center gap-1 ml-2">
            <span className="text-xs text-slate-400 font-mono">#</span>
            <input
              type="text"
              value={(design.accentColor || '').replace('#', '')}
              onChange={(e) => updateDesign({ accentColor: `#${e.target.value}` })}
              placeholder="6366f1"
              maxLength={6}
              className="w-16 px-1.5 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Border Radius Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          Border Radius & Card Curvature
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BORDER_RADIUS_OPTIONS.map((radius) => {
            const isSelected = design.borderRadius === radius.id;
            return (
              <button
                key={radius.id}
                type="button"
                onClick={() => updateDesign({ borderRadius: radius.id })}
                className={`px-3 py-2 rounded-lg border text-xs text-center transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/30 text-indigo-300 font-semibold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                {radius.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
