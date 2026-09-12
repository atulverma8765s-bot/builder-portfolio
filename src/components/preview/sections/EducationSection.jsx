import React from 'react';
import { GraduationCap, Award } from 'lucide-react';

export function EducationSection({ education = {}, design = {} }) {
  if (education.enabled === false || !education.items || education.items.length === 0) return null;
  const accent = design.accentColor || '#6366f1';
  const borderRadius = design.borderRadius || 'rounded-xl';

  return (
    <section id="education" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800/40">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {education.title || "Education & Certifications"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {education.items.map((item) => (
          <div
            key={item.id}
            className={`p-6 ${borderRadius} border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-2`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${accent}20`, color: accent }}>
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xs opacity-60 font-mono">{item.year}</span>
            </div>

            <h3 className="text-sm font-bold pt-1">{item.degree}</h3>
            <p className="text-xs font-semibold" style={{ color: accent }}>
              {item.institution}
            </p>

            {item.details && (
              <p className="text-xs opacity-75 pt-2 leading-relaxed">
                {item.details}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
