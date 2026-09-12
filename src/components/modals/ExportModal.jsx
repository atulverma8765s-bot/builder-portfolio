import React, { useRef, useState } from 'react';
import { X, Download, FileCode, FileJson, Printer, Upload, Check } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { api } from '../../utils/api';

export function ExportModal({ isOpen, onClose }) {
  const { currentPortfolio, updateCurrentPortfolio } = usePortfolio();
  const fileInputRef = useRef(null);
  const [importStatus, setImportStatus] = useState('');

  if (!isOpen || !currentPortfolio) return null;

  // 1. Download Standalone HTML
  const handleDownloadHtml = () => {
    const url = api.getExportHtmlUrl(currentPortfolio.id);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${currentPortfolio.slug || 'portfolio'}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Export JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentPortfolio, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${currentPortfolio.slug || 'portfolio'}-backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // 3. Import JSON
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.hero && parsed.title) {
          updateCurrentPortfolio(parsed);
          setImportStatus('Successfully imported portfolio data!');
          setTimeout(() => setImportStatus(''), 3000);
        } else {
          setImportStatus('Error: Invalid portfolio JSON format');
        }
      } catch (err) {
        setImportStatus('Error parsing JSON file');
      }
    };
    reader.readAsText(file);
  };

  // 4. Print / PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Export & Backup Portfolio</h3>
              <p className="text-xs text-slate-400">Download single-page HTML, export JSON, or print to PDF.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {importStatus && (
          <div className={`p-3 rounded-lg text-xs font-semibold ${
            importStatus.startsWith('Error') ? 'bg-rose-950/50 text-rose-400 border border-rose-800' : 'bg-emerald-950/50 text-emerald-400 border border-emerald-800'
          }`}>
            {importStatus}
          </div>
        )}

        <div className="space-y-3">
          {/* Option 1: Standalone HTML */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Standalone HTML Bundle</h4>
                <p className="text-[11px] text-slate-400">
                  A single self-contained file with all styles and scripts. Host on GitHub Pages or Vercel.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadHtml}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 transition-colors"
            >
              Download
            </button>
          </div>

          {/* Option 2: JSON Backup */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <FileJson className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Export JSON Data</h4>
                <p className="text-[11px] text-slate-400">
                  Full backup of all sections, contents, and design parameters.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleExportJson}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold shrink-0 transition-colors"
            >
              Export JSON
            </button>
          </div>

          {/* Option 3: Import JSON */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Import Portfolio JSON</h4>
                <p className="text-[11px] text-slate-400">
                  Restore a previously backed-up JSON portfolio file.
                </p>
              </div>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold shrink-0 transition-colors"
              >
                Choose File
              </button>
            </div>
          </div>

          {/* Option 4: Print to PDF */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Print / Save as PDF</h4>
                <p className="text-[11px] text-slate-400">
                  Uses print stylesheet to create a clean PDF resume or CV document.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold shrink-0 transition-colors"
            >
              Print / PDF
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
