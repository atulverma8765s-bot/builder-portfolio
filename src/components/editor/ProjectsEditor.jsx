import React, { useState } from 'react';
import { FolderGit2, Plus, Trash2, ExternalLink, Github, Star, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function ProjectsEditor() {
  const { currentPortfolio, updateSection } = usePortfolio();
  const projectsData = currentPortfolio?.projects || { enabled: true, title: "Featured Projects", items: [] };
  const [expandedId, setExpandedId] = useState(projectsData.items?.[0]?.id || null);

  const projectImages = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80"
  ];

  const handleChange = (field, value) => {
    updateSection('projects', { [field]: value });
  };

  const addProject = () => {
    const newId = `proj-${Date.now()}`;
    const newProject = {
      id: newId,
      title: "New Project Showcase",
      tagline: "High-impact web application solving real-world challenges.",
      description: "Detailed description covering system architecture, key features, and performance accomplishments.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      imageUrl: projectImages[0],
      featured: true,
      metric: "🚀 10k+ monthly active users",
    };
    handleChange('items', [newProject, ...(projectsData.items || [])]);
    setExpandedId(newId);
  };

  const removeProject = (id) => {
    const updated = projectsData.items.filter((p) => p.id !== id);
    handleChange('items', updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...projectsData.items];
    updated[index] = { ...updated[index], [field]: value };
    handleChange('items', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-indigo-400" />
            Projects Showcase
          </h3>
          <p className="text-xs text-slate-400">
            Feature your best work, case studies, open-source repos, and live apps.
          </p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Project
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Section Title</label>
        <input
          type="text"
          value={projectsData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. Featured Projects & Case Studies"
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projectsData.items?.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id || idx} className="bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden">
              {/* Card Header */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-200">{item.title || "Untitled Project"}</h4>
                      {item.featured && (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-semibold border border-amber-500/20">
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs">{item.tagline || item.metric || "No description"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProject(item.id);
                    }}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Card Body */}
              {isExpanded && (
                <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!item.featured}
                        onChange={(e) => updateProject(idx, 'featured', e.target.checked)}
                        className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
                      />
                      Mark as Featured Project
                    </label>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">Project Title</label>
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => updateProject(idx, 'title', e.target.value)}
                      placeholder="e.g. CloudScale Observer"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">Short Tagline</label>
                    <input
                      type="text"
                      value={item.tagline || ""}
                      onChange={(e) => updateProject(idx, 'tagline', e.target.value)}
                      placeholder="One-line hook summarizing value proposition"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">Key Impact Metric Callout</label>
                    <input
                      type="text"
                      value={item.metric || ""}
                      onChange={(e) => updateProject(idx, 'metric', e.target.value)}
                      placeholder="e.g. ⚡ Reduced latency by 58% across 10k clusters"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-emerald-400 font-medium focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">Detailed Description</label>
                    <textarea
                      rows={3}
                      value={item.description || ""}
                      onChange={(e) => updateProject(idx, 'description', e.target.value)}
                      placeholder="Detailed overview of technical architecture, challenges overcome, and outcomes..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-y"
                    />
                  </div>

                  {/* Thumbnail URL & Presets */}
                  <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                      Preview Image URL
                    </label>
                    <input
                      type="text"
                      value={item.imageUrl || ""}
                      onChange={(e) => updateProject(idx, 'imageUrl', e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
                    />
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-slate-400">Preset thumbnails:</span>
                      <div className="flex gap-1">
                        {projectImages.map((img, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => updateProject(idx, 'imageUrl', img)}
                            className="w-6 h-6 rounded border border-slate-700 overflow-hidden hover:scale-105 transition-transform"
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <ExternalLink className="w-3 h-3 text-cyan-400" />
                        Live Demo URL
                      </label>
                      <input
                        type="text"
                        value={item.liveUrl || ""}
                        onChange={(e) => updateProject(idx, 'liveUrl', e.target.value)}
                        placeholder="https://myapp.com"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Github className="w-3 h-3 text-slate-400" />
                        GitHub / Source Code URL
                      </label>
                      <input
                        type="text"
                        value={item.githubUrl || ""}
                        onChange={(e) => updateProject(idx, 'githubUrl', e.target.value)}
                        placeholder="https://github.com/user/repo"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      value={(item.technologies || []).join(', ')}
                      onChange={(e) =>
                        updateProject(
                          idx,
                          'technologies',
                          e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                        )
                      }
                      placeholder="React, Go, WebSockets, Docker, TimescaleDB"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
