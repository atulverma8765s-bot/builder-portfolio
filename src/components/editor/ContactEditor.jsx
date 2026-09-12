import React from 'react';
import { Mail, Phone, MapPin, Calendar, Info } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function ContactEditor() {
  const { currentPortfolio, updateSection } = usePortfolio();
  const contactData = currentPortfolio?.contact || { enabled: true, title: "Let's Connect" };

  const handleChange = (field, value) => {
    updateSection('contact', { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
          <Mail className="w-4 h-4 text-emerald-400" />
          Contact & Inquiries Section
        </h3>
        <p className="text-xs text-slate-400">
          How visitors, recruiters, and clients can get in touch with you.
        </p>
      </div>

      <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl flex items-start gap-2.5">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-200">
          The interactive contact form automatically routes submitted visitor messages to your <strong>Inquiries</strong> tab in real-time!
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Section Title</label>
        <input
          type="text"
          value={contactData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. Let's Build Something Together"
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Subheading / Message Prompt</label>
        <textarea
          rows={2}
          value={contactData.subtitle || ""}
          onChange={(e) => handleChange("subtitle", e.target.value)}
          placeholder="e.g. Have a question, project proposal, or job opportunity? Send a message or schedule a call!"
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-y"
        />
      </div>

      <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            Direct Email Address
          </label>
          <input
            type="email"
            value={contactData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="you@domain.com"
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            Phone Number (Optional)
          </label>
          <input
            type="text"
            value={contactData.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            Location
          </label>
          <input
            type="text"
            value={contactData.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            Booking / Calendly / Cal.com Link
          </label>
          <input
            type="text"
            value={contactData.bookingUrl || ""}
            onChange={(e) => handleChange("bookingUrl", e.target.value)}
            placeholder="https://calendly.com/your-name/30min"
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
