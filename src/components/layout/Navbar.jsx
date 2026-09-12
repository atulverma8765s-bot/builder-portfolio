import React, { useState } from 'react';
import { 
  Sparkles, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Save, 
  Download, 
  ExternalLink, 
  Plus, 
  Copy, 
  Trash2, 
  Layers, 
  Check, 
  ChevronDown, 
  Eye, 
  Wand2 
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function Navbar({ onOpenExport, onOpenTemplates, onOpenAi }) {
  const { 
    portfolios, 
    currentPortfolio, 
    switchPortfolio, 
    createNewPortfolio, 
    duplicatePortfolio, 
    deletePortfolio, 
    isSaving, 
    saveSuccess, 
    savePortfolio, 
    previewDevice, 
    setPreviewDevice, 
    previewMode, 
    setPreviewMode 
  } = usePortfolio();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between select-none z-30 shrink-0">
      {/* Left Brand & Portfolio Switcher */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              FolioCraft
            </span>
            <span className="ml-1.5 text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Studio
            </span>
          </div>
        </div>

        {/* Portfolio Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-sm font-medium text-slate-200 transition-colors"
          >
            <span className="max-w-[140px] md:max-w-[200px] truncate">
              {currentPortfolio?.title || 'Select Portfolio'}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50">
              <div className="px-3 py-1.5 text-xs font-semibold uppercase text-slate-400 border-b border-slate-800">
                Your Portfolios
              </div>
              <div className="max-h-60 overflow-y-auto py-1">
                {portfolios.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      switchPortfolio(p.id);
                      setDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-slate-800/80 transition-colors ${
                      p.id === currentPortfolio?.id ? 'text-indigo-400 font-semibold bg-indigo-950/30' : 'text-slate-300'
                    }`}
                  >
                    <span className="truncate pr-2">{p.title}</span>
                    {p.id === currentPortfolio?.id && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-1.5 px-1 space-y-0.5">
                <button
                  onClick={() => {
                    createNewPortfolio();
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create Blank Portfolio
                </button>
                <button
                  onClick={() => {
                    onOpenTemplates();
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  Browse Templates
                </button>
                {currentPortfolio && (
                  <>
                    <button
                      onClick={() => {
                        duplicatePortfolio(currentPortfolio.id);
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Duplicate Current
                    </button>
                    {portfolios.length > 1 && (
                      <button
                        onClick={() => {
                          deletePortfolio(currentPortfolio.id);
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Portfolio
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Device Viewport Switcher */}
      <div className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => setPreviewDevice('desktop')}
          title="Desktop view"
          className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
            previewDevice === 'desktop' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span className="hidden lg:inline">Desktop</span>
        </button>
        <button
          onClick={() => setPreviewDevice('tablet')}
          title="Tablet view (768px)"
          className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
            previewDevice === 'tablet' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Tablet className="w-4 h-4" />
          <span className="hidden lg:inline">Tablet</span>
        </button>
        <button
          onClick={() => setPreviewDevice('mobile')}
          title="Mobile view (375px)"
          className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
            previewDevice === 'mobile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span className="hidden lg:inline">Mobile</span>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* AI Assistant button */}
        <button
          onClick={onOpenAi}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 hover:from-violet-600/30 hover:to-fuchsia-600/30 text-violet-300 border border-violet-500/30 text-xs font-semibold transition-all"
        >
          <Wand2 className="w-3.5 h-3.5 text-violet-400" />
          <span>AI Assist</span>
        </button>

        {/* Public Preview Link */}
        {currentPortfolio?.slug && (
          <a
            href={`/p/${currentPortfolio.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Open live public portfolio in new tab"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Live Page</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        )}

        {/* Export / Download Modal Trigger */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-indigo-400" />
          <span>Export</span>
        </button>

        {/* Save button */}
        <button
          onClick={savePortfolio}
          disabled={isSaving}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-md ${
            saveSuccess 
              ? 'bg-emerald-600 text-white' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25'
          } ${isSaving ? 'opacity-75 cursor-wait' : ''}`}
        >
          {saveSuccess ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
