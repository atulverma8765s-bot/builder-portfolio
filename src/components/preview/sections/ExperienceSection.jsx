import React from 'react';
import { MapPin, Calendar, Building } from 'lucide-react';

export function ExperienceSection({ experience = {}, design = {} }) {
  if (experience.enabled === false || !experience.items || experience.items.length === 0) return null;
  const accent = design.accentColor || '#6366f1';
  const borderRadius = design.borderRadius || 'rounded-xl';

  return (
    <section id="experience" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800/40">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {experience.title || "Work Experience"}
        </h2>
      </div>

      <div className="relative border-l-2 ml-4 sm:ml-6 space-y-10" style={{ borderColor: `${accent}40` }}>
        {experience.items.map((item, idx) => (
          <div key={item.id || idx} className="relative pl-6 sm:pl-8 group">
            {/* Timeline Bullet Dot */}
            <div
              className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-950 transition-transform group-hover:scale-125"
              style={{ backgroundColor: accent }}
            />

            <div className={`p-6 ${borderRadius} border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm space-y-3`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    {item.role}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 mt-0.5" style={{ color: accent }}>
                    <Building className="w-3.5 h-3.5" />
                    <span>{item.company}</span>
                    {item.type && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 ml-1">
                        {item.type}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end text-xs opacity-60">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3" />
                    {item.period}
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  )}
                </div>
              </div>

              {item.description && (
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                  {item.description}
                </p>
              )}

              {item.achievements && item.achievements.length > 0 && (
                <ul className="space-y-1.5 pt-2 text-xs sm:text-sm opacity-75 list-disc list-outside pl-4 leading-relaxed">
                  {item.achievements.map((ach, aIdx) => (
                    <li key={aIdx}>{ach}</li>
                  ))}
                </ul>
              )}

              {item.technologies && item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-3">
                  {item.technologies.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
