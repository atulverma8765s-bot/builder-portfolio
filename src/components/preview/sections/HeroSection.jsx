import React from 'react';
import { Github, Linkedin, Twitter, Mail, Calendar, ArrowUpRight } from 'lucide-react';

export function HeroSection({ hero = {}, design = {} }) {
  const accent = design.accentColor || '#6366f1';
  const isTerminal = design.theme === 'terminal';
  const isEditorial = design.theme === 'editorial';

  return (
    <header className="pt-16 pb-14 px-6 max-w-4xl mx-auto flex flex-col items-center text-center">
      {/* Avatar */}
      {hero.avatarUrl && (
        <div className="relative mb-6 group">
          <div 
            className="absolute -inset-1 rounded-full blur-md opacity-40 group-hover:opacity-75 transition-opacity"
            style={{ backgroundColor: accent }}
          />
          <img
            src={hero.avatarUrl}
            alt={hero.name || "Profile"}
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 shadow-2xl"
            style={{ borderColor: accent }}
          />
        </div>
      )}

      {/* Status Badge */}
      {hero.badge && (
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 border transition-all"
          style={{ 
            borderColor: `${accent}40`,
            backgroundColor: `${accent}15`,
            color: isEditorial ? '#111827' : '#f8fafc'
          }}
        >
          {isTerminal ? <span className="text-emerald-400">&gt;</span> : null}
          <span>{hero.badge}</span>
        </div>
      )}

      {/* Name & Pronouns */}
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
        {hero.name || "Your Name"}
        {hero.pronouns && (
          <span className="text-base sm:text-lg font-normal opacity-60 ml-2">
            ({hero.pronouns})
          </span>
        )}
      </h1>

      {/* Title / Role */}
      {hero.title && (
        <p 
          className="text-lg sm:text-xl font-bold mb-4 tracking-tight"
          style={{ color: accent }}
        >
          {hero.title}
        </p>
      )}

      {/* Location */}
      {hero.location && (
        <p className="text-xs opacity-60 mb-4 flex items-center gap-1">
          📍 {hero.location}
        </p>
      )}

      {/* Elevator Pitch / Tagline */}
      {hero.tagline && (
        <p className="text-sm sm:text-base opacity-75 max-w-2xl mb-8 leading-relaxed">
          {hero.tagline}
        </p>
      )}

      {/* Call to Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {hero.primaryCta?.text && (
          <a
            href={hero.primaryCta.link || "#projects"}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all shadow-lg hover:opacity-90 hover:scale-105 active:scale-95 flex items-center gap-1.5`}
            style={{ backgroundColor: accent }}
          >
            <span>{hero.primaryCta.text}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}

        {hero.secondaryCta?.text && (
          <a
            href={hero.secondaryCta.link || "#contact"}
            className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border border-slate-700 hover:border-slate-500 transition-all hover:scale-105 active:scale-95"
          >
            {hero.secondaryCta.text}
          </a>
        )}
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-4 text-xs opacity-70">
        {hero.socials?.github && (
          <a href={hero.socials.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity p-1.5">
            <Github className="w-5 h-5" />
          </a>
        )}
        {hero.socials?.linkedin && (
          <a href={hero.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity p-1.5">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {hero.socials?.twitter && (
          <a href={hero.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity p-1.5">
            <Twitter className="w-5 h-5" />
          </a>
        )}
        {hero.socials?.email && (
          <a href={`mailto:${hero.socials.email}`} className="hover:opacity-100 transition-opacity p-1.5">
            <Mail className="w-5 h-5" />
          </a>
        )}
        {hero.socials?.calendly && (
          <a href={hero.socials.calendly} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity p-1.5">
            <Calendar className="w-5 h-5" />
          </a>
        )}
      </div>
    </header>
  );
}
