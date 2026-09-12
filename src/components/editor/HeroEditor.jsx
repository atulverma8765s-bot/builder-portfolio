import React from 'react';
import { User, Sparkles, Link as LinkIcon, Globe, Github, Linkedin, Twitter, Mail, Calendar } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function HeroEditor() {
  const { currentPortfolio, updateCurrentPortfolio } = usePortfolio();
  const hero = currentPortfolio?.hero || {};

  const handleHeroChange = (field, value) => {
    updateCurrentPortfolio((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };

  const handleCtaChange = (ctaType, field, value) => {
    updateCurrentPortfolio((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [ctaType]: {
          ...prev.hero?.[ctaType],
          [field]: value,
        },
      },
    }));
  };

  const handleSocialChange = (platform, value) => {
    updateCurrentPortfolio((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        socials: {
          ...prev.hero?.socials,
          [platform]: value,
        },
      },
    }));
  };

  const avatarPresets = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-1 flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-400" />
          Hero & Profile Details
        </h3>
        <p className="text-xs text-slate-400">
          This is the first impression visitors get when landing on your portfolio.
        </p>
      </div>

      {/* Avatar Section */}
      <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
        <label className="block text-xs font-semibold text-slate-300">Profile Photo / Avatar</label>
        <div className="flex items-center gap-4">
          <img
            src={hero.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"}
            alt="Avatar preview"
            className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500 shadow-md shrink-0 bg-slate-800"
          />
          <div className="flex-1 space-y-1.5">
            <input
              type="text"
              value={hero.avatarUrl || ""}
              onChange={(e) => handleHeroChange("avatarUrl", e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Sample Avatars:</span>
              <div className="flex gap-1.5">
                {avatarPresets.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleHeroChange("avatarUrl", url)}
                    className="w-5 h-5 rounded-full overflow-hidden border border-slate-600 hover:scale-110 transition-transform"
                  >
                    <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Name & Pronouns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Full Name</label>
          <input
            type="text"
            value={hero.name || ""}
            onChange={(e) => handleHeroChange("name", e.target.value)}
            placeholder="e.g. Alex Rivera"
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Pronouns</label>
          <input
            type="text"
            value={hero.pronouns || ""}
            onChange={(e) => handleHeroChange("pronouns", e.target.value)}
            placeholder="he/him, she/her, they/them"
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Headline / Title */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Professional Headline / Role</label>
        <input
          type="text"
          value={hero.title || ""}
          onChange={(e) => handleHeroChange("title", e.target.value)}
          placeholder="e.g. Senior Full-Stack Engineer & Cloud Architect"
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Status Badge */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Availability / Status Pill</label>
        <input
          type="text"
          value={hero.badge || ""}
          onChange={(e) => handleHeroChange("badge", e.target.value)}
          placeholder="e.g. 🟢 Available for hire or consulting"
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Location */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Location & Timezone</label>
        <input
          type="text"
          value={hero.location || ""}
          onChange={(e) => handleHeroChange("location", e.target.value)}
          placeholder="e.g. San Francisco, CA (UTC-7)"
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Elevator Pitch / Tagline */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Elevator Pitch / Tagline</label>
        <textarea
          rows={3}
          value={hero.tagline || ""}
          onChange={(e) => handleHeroChange("tagline", e.target.value)}
          placeholder="Crafting resilient distributed systems, sub-second web experiences, and developer tools."
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-y"
        />
      </div>

      {/* Action Buttons (CTAs) */}
      <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
          Call to Action Buttons
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400">Primary Button Text</label>
            <input
              type="text"
              value={hero.primaryCta?.text || ""}
              onChange={(e) => handleCtaChange("primaryCta", "text", e.target.value)}
              placeholder="View Projects"
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400">Primary Button Link</label>
            <input
              type="text"
              value={hero.primaryCta?.link || ""}
              onChange={(e) => handleCtaChange("primaryCta", "link", e.target.value)}
              placeholder="#projects"
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400">Secondary Button Text</label>
            <input
              type="text"
              value={hero.secondaryCta?.text || ""}
              onChange={(e) => handleCtaChange("secondaryCta", "text", e.target.value)}
              placeholder="Contact Me"
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400">Secondary Button Link</label>
            <input
              type="text"
              value={hero.secondaryCta?.link || ""}
              onChange={(e) => handleCtaChange("secondaryCta", "link", e.target.value)}
              placeholder="#contact"
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Social Profiles */}
      <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          Social & Contact Links
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={hero.socials?.github || ""}
              onChange={(e) => handleSocialChange("github", e.target.value)}
              placeholder="https://github.com/username"
              className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={hero.socials?.linkedin || ""}
              onChange={(e) => handleSocialChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Twitter className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={hero.socials?.twitter || ""}
              onChange={(e) => handleSocialChange("twitter", e.target.value)}
              placeholder="https://twitter.com/username"
              className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={hero.socials?.email || ""}
              onChange={(e) => handleSocialChange("email", e.target.value)}
              placeholder="your.email@example.com"
              className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={hero.socials?.calendly || ""}
              onChange={(e) => handleSocialChange("calendly", e.target.value)}
              placeholder="https://calendly.com/your-name"
              className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
