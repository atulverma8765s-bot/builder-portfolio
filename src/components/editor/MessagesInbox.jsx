import React from 'react';
import { Mail, Check, Trash2, Reply, Clock, Inbox, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { api } from '../../utils/api';

export function MessagesInbox() {
  const { messages, refreshMessages } = usePortfolio();

  const handleMarkRead = async (id) => {
    try {
      await api.markMessageRead(id);
      refreshMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await api.deleteMessage(id);
      refreshMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
            <Inbox className="w-4 h-4 text-cyan-400" />
            Visitor Inquiries & Messages
          </h3>
          <p className="text-xs text-slate-400">
            Messages sent through your portfolio's contact form appear here.
          </p>
        </div>
        <button
          type="button"
          onClick={refreshMessages}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
        >
          Refresh
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-dashed border-slate-800 p-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto text-slate-400">
            <Mail className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-300">No messages yet</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            When recruiters, clients, or visitors submit your contact form, you'll see their inquiries right here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-xl border transition-all ${
                msg.read
                  ? 'bg-slate-900/40 border-slate-800/80 text-slate-300'
                  : 'bg-slate-900 border-indigo-500/40 shadow-lg shadow-indigo-500/5'
              }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-100">{msg.senderName}</h4>
                    {!msg.read && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-indigo-500 text-white">
                        NEW
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-indigo-400 font-mono">{msg.senderEmail}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(msg.createdAt)}</span>
                </div>
              </div>

              {/* Subject */}
              <div className="text-xs font-semibold text-slate-200 mb-1.5">{msg.subject}</div>

              {/* Message body */}
              <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/60 mb-3 whitespace-pre-wrap">
                {msg.message}
              </p>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                <a
                  href={`mailto:${msg.senderEmail}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-colors"
                >
                  <Reply className="w-3 h-3" />
                  Reply via Email
                </a>

                <div className="flex items-center gap-2">
                  {!msg.read && (
                    <button
                      type="button"
                      onClick={() => handleMarkRead(msg.id)}
                      className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Mark read
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(msg.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
