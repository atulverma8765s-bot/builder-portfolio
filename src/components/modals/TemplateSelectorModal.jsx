import React, { useState } from 'react';
import {
  X,
  Layers,
  Sparkles,
  Terminal,
  Palette,
  Code2,
  Glasses,
  Crown,
  Box,
  Grid3X3
} from 'lucide-react';

import { usePortfolio } from '../../context/PortfolioContext';

const TEMPLATES = [
  {
    id: 'neon-nexus',
    name: 'Neon Nexus',
    description: 'Futuristic neon portfolio with glowing 3D elements.',
    theme: 'Cyberpunk',
    icon: Sparkles,
    accentColor: '#8b5cf6',
    secondaryColor: '#06b6d4',
    cardStyle: 'glass'
  },
  {
    id: 'glass-orbit',
    name: 'Glass Orbit',
    description: 'Premium glassmorphism layout with floating cards.',
    theme: 'Glass',
    icon: Glasses,
    accentColor: '#38bdf8',
    secondaryColor: '#a78bfa',
    cardStyle: 'glass'
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Soft aurora gradients with a modern creative layout.',
    theme: 'Aurora',
    icon: Palette,
    accentColor: '#22c55e',
    secondaryColor: '#06b6d4',
    cardStyle: 'soft'
  },
  {
    id: 'cyber-grid',
    name: 'Cyber Grid',
    description: 'Developer-style grid interface inspired by futuristic systems.',
    theme: 'Cyber',
    icon: Grid3X3,
    accentColor: '#22d3ee',
    secondaryColor: '#3b82f6',
    cardStyle: 'sharp'
  },
  {
    id: 'minimal-pro',
    name: 'Minimal Pro',
    description: 'Clean professional layout with elegant spacing.',
    theme: 'Minimal',
    icon: Code2,
    accentColor: '#6366f1',
    secondaryColor: '#64748b',
    cardStyle: 'minimal'
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    description: 'Bold asymmetric portfolio for designers and creators.',
    theme: 'Creative',
    icon: Palette,
    accentColor: '#f97316',
    secondaryColor: '#ec4899',
    cardStyle: 'bold'
  },
  {
    id: 'executive-black',
    name: 'Executive Black',
    description: 'Luxury dark portfolio with a premium professional feel.',
    theme: 'Luxury',
    icon: Crown,
    accentColor: '#f59e0b',
    secondaryColor: '#eab308',
    cardStyle: 'luxury'
  },
  {
    id: 'visionary-3d',
    name: 'Visionary 3D',
    description: 'Immersive 3D-inspired portfolio with depth and floating panels.',
    theme: '3D',
    icon: Box,
    accentColor: '#a855f7',
    secondaryColor: '#14b8a6',
    cardStyle: '3d'
  }
];

export function TemplateSelectorModal({ isOpen, onClose }) {
  const { applyTemplate } = usePortfolio();

  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  if (!isOpen) return null;

  const handleSelectTemplate = async (template) => {
    setLoading(true);
    setSelectedTemplate(template.id);

    try {
      await applyTemplate(template);
      onClose();
    } catch (err) {
      console.error('Template apply failed:', err);
    } finally {
      setLoading(false);
      setSelectedTemplate(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">

      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">

          <div className="flex items-center gap-3">

            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-400/20">
              <Layers className="w-5 h-5 text-indigo-400" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Choose Your Template
              </h3>

              <p className="text-xs text-slate-400">
                Transform your portfolio with a completely different visual style.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* Templates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-6">

          {TEMPLATES.map((template) => {

            const Icon = template.icon;

            const isLoading =
              loading && selectedTemplate === template.id;

            return (
              <div
                key={template.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-indigo-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >

                {/* Mini visual preview */}
                <div className="relative h-36 overflow-hidden bg-slate-900">

                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${template.accentColor}, transparent 45%), radial-gradient(circle at 80% 70%, ${template.secondaryColor}, transparent 45%)`
                    }}
                  />

                  <div className="absolute inset-3 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">

                    <div className="flex items-center gap-2 p-3">
                      <div
                        className="w-6 h-6 rounded-lg"
                        style={{
                          background: `${template.accentColor}33`,
                          border: `1px solid ${template.accentColor}66`
                        }}
                      />

                      <div className="space-y-1">
                        <div className="w-16 h-1.5 rounded-full bg-white/30" />
                        <div className="w-10 h-1 rounded-full bg-white/10" />
                      </div>
                    </div>

                    <div className="px-3 pt-3">

                      <div
                        className="w-24 h-3 rounded-full mb-2"
                        style={{
                          background: template.accentColor
                        }}
                      />

                      <div className="w-32 h-1.5 rounded-full bg-white/20 mb-1" />
                      <div className="w-20 h-1.5 rounded-full bg-white/10" />

                    </div>

                    <div className="absolute right-4 bottom-4 w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl" />

                  </div>

                  {/* Template icon */}
                  <div className="absolute right-4 top-4 flex items-center justify-center w-9 h-9 rounded-xl bg-black/30 border border-white/10 backdrop-blur-xl">

                    <Icon
                      className="w-4 h-4"
                      style={{
                        color: template.accentColor
                      }}
                    />

                  </div>

                </div>

                {/* Content */}
                <div className="p-4">

                  <div className="flex items-center justify-between gap-2 mb-2">

                    <h4 className="text-sm font-bold text-white">
                      {template.name}
                    </h4>

                    <span
                      className="text-[9px] uppercase tracking-wider px-2 py-1 rounded-full border"
                      style={{
                        color: template.accentColor,
                        borderColor: `${template.accentColor}55`,
                        background: `${template.accentColor}10`
                      }}
                    >
                      {template.theme}
                    </span>

                  </div>

                  <p className="min-h-[42px] text-[11px] leading-relaxed text-slate-400">
                    {template.description}
                  </p>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSelectTemplate(template)}
                    className="w-full mt-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all disabled:opacity-50"
                    style={{
                      background: isLoading
                        ? '#334155'
                        : `linear-gradient(135deg, ${template.accentColor}, ${template.secondaryColor})`
                    }}
                  >
                    {isLoading ? 'Applying...' : 'Apply Template'}
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-white/10">

          <p className="text-[11px] text-slate-500">
            Your existing portfolio content will remain unchanged.
          </p>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}