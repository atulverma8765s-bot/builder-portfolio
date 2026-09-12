import React from 'react';
import { Sparkles, Clock, CheckCircle } from 'lucide-react';

export function ServicesSection({ services = {}, design = {} }) {
  if (services.enabled === false || !services.items || services.items.length === 0) return null;
  const accent = design.accentColor || '#6366f1';
  const borderRadius = design.borderRadius || 'rounded-xl';

  return (
    <section id="services" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800/40">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {services.title || "Services & Offerings"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.items.map((serv) => (
          <div
            key={serv.id}
            className={`p-6 ${borderRadius} border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all`}
          >
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}20`, color: accent }}>
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold">{serv.title}</h3>
              <p className="text-xs sm:text-sm opacity-75 leading-relaxed">
                {serv.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
              {serv.price && (
                <span className="font-extrabold" style={{ color: accent }}>
                  {serv.price}
                </span>
              )}
              {serv.delivery && (
                <span className="opacity-60 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {serv.delivery}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
