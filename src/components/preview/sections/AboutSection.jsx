import React from 'react';

export function AboutSection({ about = {}, design = {} }) {
  if (about.enabled === false) return null;
  const accent = design.accentColor || '#6366f1';
  const borderRadius = design.borderRadius || 'rounded-xl';

  return (
    <section id="about" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800/40">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {about.title || "About Me"}
        </h2>
      </div>

      {/* Main Story Card */}
      <div className={`p-6 sm:p-8 ${borderRadius} border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm space-y-4 shadow-sm`}>
        {about.summary && (
          <p className="text-base sm:text-lg font-medium leading-relaxed">
            {about.summary}
          </p>
        )}
        {about.story && (
          <p className="text-sm sm:text-base opacity-75 leading-relaxed">
            {about.story}
          </p>
        )}
      </div>

      {/* Stats Counter Grid */}
      {about.stats && about.stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {about.stats.map((stat, i) => (
            <div
              key={i}
              className={`p-4 text-center ${borderRadius} border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm`}
            >
              <div className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: accent }}>
                {stat.value}
              </div>
              <div className="text-xs opacity-70 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick facts bullet list */}
      {about.quickFacts && about.quickFacts.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {about.quickFacts.map((fact, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm opacity-80">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
              <span>{fact}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
