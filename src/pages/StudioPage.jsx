import React, { useState } from 'react';
import { 
  User, 
  UserCheck, 
  Cpu, 
  FolderGit2, 
  Briefcase, 
  Sparkles, 
  Quote, 
  GraduationCap, 
  Mail, 
  Layers 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Navbar } from '../components/layout/Navbar';
import { TabNavigation } from '../components/layout/TabNavigation';
import { HeroEditor } from '../components/editor/HeroEditor';
import { AboutEditor } from '../components/editor/AboutEditor';
import { SkillsEditor } from '../components/editor/SkillsEditor';
import { ExperienceEditor } from '../components/editor/ExperienceEditor';
import { ProjectsEditor } from '../components/editor/ProjectsEditor';
import { ServicesEditor } from '../components/editor/ServicesEditor';
import { TestimonialsEditor } from '../components/editor/TestimonialsEditor';
import { EducationEditor } from '../components/editor/EducationEditor';
import { ContactEditor } from '../components/editor/ContactEditor';
import { DesignEditor } from '../components/editor/DesignEditor';
import { SectionManager } from '../components/editor/SectionManager';
import { SettingsEditor } from '../components/editor/SettingsEditor';
import { MessagesInbox } from '../components/editor/MessagesInbox';
import { LivePreviewFrame } from '../components/preview/LivePreviewFrame';
import { TemplateSelectorModal } from '../components/modals/TemplateSelectorModal';
import { ExportModal } from '../components/modals/ExportModal';
import { AIHelperModal } from '../components/modals/AIHelperModal';

export function StudioPage() {
  const { 
    activeTab, 
    setActiveTab, 
    activeSectionSubTab, 
    setActiveSectionSubTab,
    isLoading 
  } = usePortfolio();

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const contentSubtabs = [
    { id: 'hero', label: 'Hero', icon: User },
    { id: 'about', label: 'About', icon: UserCheck },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'services', label: 'Services', icon: Sparkles },
    { id: 'testimonials', label: 'Reviews', icon: Quote },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center animate-spin text-white">
          <Sparkles className="w-5 h-5" />
        </div>
        <p className="text-sm font-medium">Loading FolioCraft Studio...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Studio Navbar */}
      <Navbar
        onOpenExport={() => setIsExportOpen(true)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Drawer / Editor Sidebar */}
        <aside className="w-full md:w-[460px] lg:w-[500px] border-r border-slate-800 bg-slate-950/95 flex flex-col shrink-0 overflow-hidden z-20 shadow-xl">
          {/* Top Tabs */}
          <TabNavigation />

          {/* Content Sub-Navigation (visible when activeTab === 'content') */}
          {activeTab === 'content' && (
            <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-800/80 bg-slate-900/40 overflow-x-auto no-scrollbar shrink-0">
              {contentSubtabs.map((sub) => {
                const Icon = sub.icon;
                const isSelected = activeSectionSubTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSectionSubTab(sub.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Editor Body Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {activeTab === 'content' && (
              <>
                {activeSectionSubTab === 'hero' && <HeroEditor />}
                {activeSectionSubTab === 'about' && <AboutEditor />}
                {activeSectionSubTab === 'skills' && <SkillsEditor />}
                {activeSectionSubTab === 'projects' && <ProjectsEditor />}
                {activeSectionSubTab === 'experience' && <ExperienceEditor />}
                {activeSectionSubTab === 'services' && <ServicesEditor />}
                {activeSectionSubTab === 'testimonials' && <TestimonialsEditor />}
                {activeSectionSubTab === 'education' && <EducationEditor />}
                {activeSectionSubTab === 'contact' && <ContactEditor />}
              </>
            )}

            {activeTab === 'design' && <DesignEditor />}

            {activeTab === 'sections' && (
              <SectionManager
                onSelectSection={(key) => {
                  setActiveTab('content');
                  setActiveSectionSubTab(key);
                }}
              />
            )}

            {activeTab === 'settings' && <SettingsEditor />}

            {activeTab === 'messages' && <MessagesInbox />}
          </div>
        </aside>

        {/* Right Live Reactive Preview Area */}
        <main className="hidden md:flex flex-1 overflow-hidden">
          <LivePreviewFrame />
        </main>
      </div>

      {/* Modals */}
      <TemplateSelectorModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
      />
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
      <AIHelperModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />
    </div>
  );
}
