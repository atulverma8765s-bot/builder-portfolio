import React from 'react';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  Edit3, 
  User, 
  UserCheck, 
  Cpu, 
  Briefcase, 
  FolderGit2, 
  Sparkles, 
  Quote, 
  GraduationCap, 
  Mail 
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function SectionManager({ onSelectSection }) {
  const { currentPortfolio, updateSection } = usePortfolio();

  const sections = [
    { key: 'hero', name: 'Hero / Banner', icon: User, required: true },
    { key: 'about', name: 'About Me & Story', icon: UserCheck },
    { key: 'skills', name: 'Skills & Tech Stack', icon: Cpu },
    { key: 'projects', name: 'Projects Showcase', icon: FolderGit2 },
    { key: 'experience', name: 'Work Experience', icon: Briefcase },
    { key: 'services', name: 'Services & Offerings', icon: Sparkles },
    { key: 'testimonials', name: 'Testimonials', icon: Quote },
    { key: 'education', name: 'Education & Certifications', icon: GraduationCap },
    { key: 'contact', name: 'Contact & Inquiries', icon: Mail },
  ];

  const toggleSection = (key) => {
    const isCurrentlyEnabled = currentPortfolio?.[key]?.enabled !== false;
    updateSection(key, { enabled: !isCurrentlyEnabled });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          Sections Visibility & Management
        </h3>
        <p className="text-xs text-slate-400">
          Enable or disable sections on your live portfolio.
        </p>
      </div>

      <div className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isEnabled = section.required ? true : currentPortfolio?.[section.key]?.enabled !== false;

          return (
            <div
              key={section.key}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                isEnabled
                  ? 'bg-slate-900/80 border-slate-800 text-slate-200'
                  : 'bg-slate-950/40 border-slate-800/50 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isEnabled ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-900 text-slate-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">{section.name}</h4>
                  <span className="text-[10px] text-slate-400">
                    {section.required ? 'Always active' : isEnabled ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectSection(section.key)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                  Edit
                </button>

                {!section.required && (
                  <button
                    type="button"
                    onClick={() => toggleSection(section.key)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isEnabled
                        ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50'
                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                    title={isEnabled ? 'Hide Section' : 'Show Section'}
                  >
                    {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
