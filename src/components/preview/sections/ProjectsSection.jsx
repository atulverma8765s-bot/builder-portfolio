import React from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';

export function ProjectsSection({ projects = {}, design = {} }) {
  if (projects.enabled === false || !projects.items || projects.items.length === 0) return null;
  const accent = design.accentColor || '#6366f1';
  const borderRadius = design.borderRadius || 'rounded-xl';

  return (
    <section id="projects" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800/40">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {projects.title || "Featured Projects"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.items.map((project) => (
          <div
            key={project.id}
            className={`flex flex-col overflow-hidden ${borderRadius} border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm group hover:border-slate-700 transition-all shadow-md`}
          >
            {/* Project Image */}
            {project.imageUrl && (
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {project.featured && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold border border-amber-500/30">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>Featured</span>
                  </div>
                )}
              </div>
            )}

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-bold mb-1 group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>

              {project.tagline && (
                <p className="text-xs font-semibold mb-3" style={{ color: accent }}>
                  {project.tagline}
                </p>
              )}

              {project.description && (
                <p className="text-xs sm:text-sm opacity-75 mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              )}

              {project.metric && (
                <div className="mb-4 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-400">
                  {project.metric}
                </div>
              )}

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto mb-5">
                  {project.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950/70 border border-slate-800 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="flex items-center gap-4 pt-2 border-t border-slate-800/60">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold hover:underline"
                    style={{ color: accent }}
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold opacity-75 hover:opacity-100 transition-opacity"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
