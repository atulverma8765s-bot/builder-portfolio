import React from 'react';

export function SkillsSection({ skills = {}, design = {} }) {
  if (skills.enabled === false || !skills.categories || skills.categories.length === 0) return null;
  const accent = design.accentColor || '#6366f1';
  const borderRadius = design.borderRadius || 'rounded-xl';

  return (
    <section id="skills" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800/40">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {skills.title || "Skills & Technologies"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.categories.map((category, idx) => (
          <div
            key={idx}
            className={`p-5 ${borderRadius} border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm space-y-4`}
          >
            <h3 className="text-sm font-bold tracking-tight uppercase" style={{ color: accent }}>
              {category.name}
            </h3>

            <div className="flex flex-wrap gap-2">
              {category.skills?.map((skill, sIdx) => {
                const skillName = typeof skill === 'string' ? skill : skill.name;
                const skillLevel = typeof skill === 'object' ? skill.level : null;

                return (
                  <div
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-colors"
                  >
                    <span>{skillName}</span>
                    {skillLevel && (
                      <span className="text-[10px] opacity-50">&bull; {skillLevel}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
