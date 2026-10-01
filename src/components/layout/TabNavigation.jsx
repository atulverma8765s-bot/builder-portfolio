import React from 'react';
import { 
  FileText, 
  Palette, 
  Layers, 
  Settings, 
  Mail 
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function TabNavigation() {
  const { activeTab, setActiveTab, unreadMessagesCount } = usePortfolio();

  const tabs = [
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'design', label: 'Design & Style', icon: Palette },
    { id: 'sections', label: 'Sections', icon: Layers },
    { id: 'settings', label: 'Settings & SEO', icon: Settings },
    { 
      id: 'messages', 
      label: 'Inquiries', 
      icon: Mail, 
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null 
    },
  ];

  return (
    <div className="flex border-b border-slate-800 bg-slate-900/60 backdrop-blur-sm px-2 overflow-x-auto no-scrollbar shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap relative ${
              isActive
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
