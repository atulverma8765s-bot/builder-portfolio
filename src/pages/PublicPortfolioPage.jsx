import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { PortfolioRenderer } from '../components/preview/PortfolioRenderer';
import { Sparkles, ArrowLeft } from 'lucide-react';

export function PublicPortfolioPage({ slug }) {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getPublicPortfolio(slug)
      .then((data) => {
        setPortfolio(data);
        if (data.seo?.metaTitle) {
          document.title = data.seo.metaTitle;
        } else if (data.title) {
          document.title = data.title;
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Portfolio not found or unavailable.");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center gap-3 font-sans">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <p className="text-xs font-semibold text-slate-400">Loading Portfolio...</p>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-6 text-center font-sans space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-2xl font-bold border border-rose-500/20">
          404
        </div>
        <h1 className="text-xl font-bold">Portfolio Not Found</h1>
        <p className="text-xs text-slate-400 max-w-sm">
          The requested portfolio slug <code className="text-indigo-400 bg-slate-900 px-1.5 py-0.5 rounded">/p/{slug}</code> does not exist or has been modified.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Studio
        </a>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <PortfolioRenderer portfolio={portfolio} isLivePage={true} />

      {/* Floating Studio Shortcut */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="/"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 shadow-xl backdrop-blur-md text-xs font-semibold transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Built with FolioCraft</span>
        </a>
      </div>
    </div>
  );
}
