import React from 'react';
import { Sparkles } from 'lucide-react';

export function FooterSection({ footer = {}, hero = {}, design = {} }) {
  const isTerminal = design.theme === 'terminal';
  const name = hero.name || 'Portfolio';

  return (
    <footer className="py-12 px-6 border-t border-slate-800/60 text-center text-xs opacity-65 space-y-2 max-w-4xl mx-auto">
      <p>
        &copy; {new Date().getFullYear()} {name}. {footer.customText || "All rights reserved."}
      </p>
      {footer.showBadge !== false && (
        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-400">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            Built with <strong>FolioCraft</strong>
          </span>
        </div>
      )}
    </footer>
  );
}
