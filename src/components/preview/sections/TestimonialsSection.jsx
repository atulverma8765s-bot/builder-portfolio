import React from 'react';
import { Quote } from 'lucide-react';

export function TestimonialsSection({ testimonials = {}, design = {} }) {
  if (testimonials.enabled === false || !testimonials.items || testimonials.items.length === 0) return null;
  const accent = design.accentColor || '#6366f1';
  const borderRadius = design.borderRadius || 'rounded-xl';

  return (
    <section id="testimonials" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800/40">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {testimonials.title || "Kind Words & Recommendations"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {testimonials.items.map((item) => (
          <div
            key={item.id}
            className={`p-6 ${borderRadius} border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm flex flex-col justify-between space-y-4`}
          >
            <div className="space-y-3">
              <Quote className="w-6 h-6 opacity-30" style={{ color: accent }} />
              <p className="text-xs sm:text-sm italic opacity-85 leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-800/60">
              {item.avatarUrl && (
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700 bg-slate-800"
                />
              )}
              <div>
                <h4 className="text-xs font-bold">{item.name}</h4>
                <p className="text-[11px] opacity-60">
                  {item.role} {item.company ? `• ${item.company}` : ''}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
