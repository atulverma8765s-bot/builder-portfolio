import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../../../utils/api';

export function ContactSection({ contact = {}, slug = '', design = {} }) {
  if (contact.enabled === false) return null;
  const accent = design.accentColor || '#6366f1';
  const borderRadius = design.borderRadius || 'rounded-xl';

  const [form, setForm] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.senderName || !form.senderEmail || !form.message) {
      setStatus({ state: 'error', msg: 'Please complete all required fields.' });
      return;
    }

    setStatus({ state: 'loading', msg: 'Sending message...' });
    try {
      if (slug) {
        await api.submitContact(slug, form);
      }
      setStatus({
        state: 'success',
        msg: 'Thank you! Your message was sent successfully. I will get back to you shortly.',
      });
      setForm({ senderName: '', senderEmail: '', subject: '', message: '' });
      setTimeout(() => setStatus({ state: 'idle', msg: '' }), 6000);
    } catch (err) {
      console.error(err);
      setStatus({ state: 'error', msg: err.message || 'Failed to submit message.' });
    }
  };

  return (
    <section id="contact" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800/40">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {contact.title || "Let's Connect"}
        </h2>
        {contact.subtitle && (
          <p className="text-xs sm:text-sm opacity-70 max-w-lg mx-auto mt-2 leading-relaxed">
            {contact.subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Direct Channels */}
        <div className="md:col-span-2 space-y-4">
          <div className={`p-6 ${borderRadius} border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-4`}>
            <h3 className="text-sm font-bold uppercase tracking-wider opacity-90">
              Direct Channels
            </h3>

            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-xs sm:text-sm hover:underline group"
              >
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${accent}20`, color: accent }}>
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[11px] opacity-60">Email</div>
                  <div className="font-semibold text-slate-200 group-hover:text-indigo-400 truncate">
                    {contact.email}
                  </div>
                </div>
              </a>
            )}

            {contact.phone && (
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${accent}20`, color: accent }}>
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] opacity-60">Phone</div>
                  <div className="font-semibold text-slate-200">{contact.phone}</div>
                </div>
              </div>
            )}

            {contact.location && (
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${accent}20`, color: accent }}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] opacity-60">Base Location</div>
                  <div className="font-semibold text-slate-200">{contact.location}</div>
                </div>
              </div>
            )}

            {contact.bookingUrl && (
              <div className="pt-2 border-t border-slate-800/60">
                <a
                  href={contact.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: accent }}
                >
                  <Calendar className="w-4 h-4" />
                  Schedule a Video Call
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-3">
          <form
            onSubmit={handleSubmit}
            className={`p-6 sm:p-8 ${borderRadius} border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-4`}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider opacity-90 mb-2">
              Send a Message
            </h3>

            {status.msg && (
              <div
                className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                  status.state === 'success'
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                    : status.state === 'error'
                    ? 'bg-rose-950/60 text-rose-300 border border-rose-800'
                    : 'bg-indigo-950/60 text-indigo-300 border border-indigo-800'
                }`}
              >
                {status.state === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{status.msg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold opacity-75">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.senderName}
                  onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                  placeholder="Sarah Jenkins"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold opacity-75">Your Email *</label>
                <input
                  type="email"
                  required
                  value={form.senderEmail}
                  onChange={(e) => setForm({ ...form, senderEmail: e.target.value })}
                  placeholder="sarah@company.com"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold opacity-75">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Staff Full-Stack Role / Project Inquiry"
                className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold opacity-75">Message *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Hi! I loved your portfolio and would like to discuss..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs focus:outline-none focus:border-indigo-500 resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={status.state === 'loading'}
              className="w-full py-2.5 rounded-lg text-xs font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{status.state === 'loading' ? 'Submitting...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
