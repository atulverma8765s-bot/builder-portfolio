import React from 'react';
import { Maximize2, RotateCcw, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PortfolioRenderer } from './PortfolioRenderer';

export function LivePreviewFrame() {
  const { currentPortfolio, previewDevice } = usePortfolio();

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 overflow-hidden relative">
      {/* Top status bar simulating browser address bar */}
      <div className="h-10 bg-slate-900/90 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 select-none z-10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="bg-slate-950 px-3 py-1 rounded-md text-[11px] font-mono text-slate-400 border border-slate-800/80 flex items-center justify-between truncate">
            <span className="truncate">
              https://foliocraft.app/p/{currentPortfolio?.slug || 'preview'}
            </span>
            <span className="text-[10px] text-emerald-400 font-bold ml-2 shrink-0">
              ● LIVE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentPortfolio?.slug && (
            <a
              href={`/p/${currentPortfolio.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Open full page in new tab"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-2 sm:p-6 bg-slate-950/60">
        {previewDevice === 'desktop' && (
          <div className="w-full h-full rounded-lg overflow-y-auto bg-slate-900 border border-slate-800 shadow-2xl">
            <PortfolioRenderer portfolio={currentPortfolio} />
          </div>
        )}

        {previewDevice === 'tablet' && (
          <div className="device-frame-tablet border-slate-800 bg-slate-900 shadow-2xl relative">
            {/* Tablet Camera notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-800 z-50 pointer-events-none" />
            <PortfolioRenderer portfolio={currentPortfolio} />
          </div>
        )}

        {previewDevice === 'mobile' && (
          <div className="device-frame-mobile border-slate-800 bg-slate-900 shadow-2xl relative">
            {/* Mobile Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-full z-50 pointer-events-none flex items-center justify-center">
              <span className="w-6 h-1 bg-slate-700 rounded-full" />
            </div>
            <PortfolioRenderer portfolio={currentPortfolio} />
          </div>
        )}
      </div>
    </div>
  );
}
