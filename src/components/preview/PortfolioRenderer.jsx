import React from 'react';
import { getThemeConfig, getFontClass } from '../../utils/themeUtils';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ServicesSection } from './sections/ServicesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { EducationSection } from './sections/EducationSection';
import { ContactSection } from './sections/ContactSection';
import { FooterSection } from './sections/FooterSection';

function TemplateBackground({ template, accent, secondary }) {
  if (template === 'neon-nexus') {
    return (
      <>
        <div
          className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: accent }}
        />
        <div
          className="pointer-events-none absolute -right-32 top-[45%] h-80 w-80 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: secondary }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </>
    );
  }

  if (template === 'glass-orbit') {
    return (
      <>
        <div
          className="pointer-events-none absolute left-[10%] top-20 h-72 w-72 rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: accent }}
        />
        <div
          className="pointer-events-none absolute right-[5%] top-[35%] h-96 w-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: secondary }}
        />
        <div className="pointer-events-none absolute left-1/2 top-[28%] h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10 opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-[28%] h-[680px] w-[680px] -translate-x-1/2 rounded-full border border-white/5 opacity-30" />
      </>
    );
  }

  if (template === 'aurora') {
    return (
      <>
        <div
          className="pointer-events-none absolute -top-40 left-[15%] h-96 w-96 rounded-full blur-[100px] opacity-25 animate-pulse"
          style={{ backgroundColor: accent }}
        />
        <div
          className="pointer-events-none absolute top-[25%] right-[10%] h-[420px] w-[420px] rounded-full blur-[110px] opacity-20 animate-pulse"
          style={{ backgroundColor: secondary }}
        />
        <div
          className="pointer-events-none absolute top-[65%] left-[25%] h-80 w-80 rounded-full blur-[100px] opacity-15"
          style={{ backgroundColor: '#ec4899' }}
        />
      </>
    );
  }

  if (template === 'cyber-grid') {
    return (
      <>
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(34,211,238,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.7)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cyan-400/40 shadow-[0_0_25px_#22d3ee]" />
      </>
    );
  }

  if (template === 'creative-studio') {
    return (
      <>
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: accent }}
        />
        <div
          className="pointer-events-none absolute -left-40 top-[45%] h-[420px] w-[420px] rounded-full blur-[120px] opacity-15"
          style={{ backgroundColor: secondary }}
        />
      </>
    );
  }

  if (template === 'executive-black') {
    return (
      <>
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-[140px] opacity-10"
          style={{ backgroundColor: accent }}
        />
        <div className="pointer-events-none absolute inset-6 rounded-3xl border border-amber-400/10" />
      </>
    );
  }

  if (template === 'visionary-3d') {
    return (
      <>
        <div
          className="pointer-events-none absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: accent }}
        />
        <div
          className="pointer-events-none absolute right-[5%] top-[40%] h-80 w-80 rounded-full blur-[100px] opacity-15"
          style={{ backgroundColor: secondary }}
        />
      </>
    );
  }

  return null;
}

function TemplateHero({ hero, design, template }) {
  const accent = design.accentColor || '#6366f1';
  const secondary = design.secondaryColor || '#06b6d4';

  const avatar = hero.avatarUrl || hero.avatar;

  const socials = hero.socials || {};

  const is3D =
    template === 'neon-nexus' ||
    template === 'glass-orbit' ||
    template === 'visionary-3d';

  return (
    <section
      className={`
        relative overflow-hidden
        px-6 sm:px-10 lg:px-16
        ${template === 'minimal-pro'
          ? 'py-20 lg:py-28'
          : 'py-16 lg:py-24'}
      `}
    >
      {/* NEON NEXUS */}
      {template === 'neon-nexus' && (
        <div className="mx-auto max-w-6xl grid lg:grid-cols-[1.15fr_.85fr] gap-10 items-center">
          <div className="relative z-10">
            {hero.badge && (
              <span
                className="inline-flex px-4 py-2 rounded-full text-xs font-bold border backdrop-blur-xl mb-6"
                style={{
                  color: accent,
                  borderColor: `${accent}66`,
                  backgroundColor: `${accent}12`
                }}
              >
                {hero.badge}
              </span>
            )}

            <p className="text-sm uppercase tracking-[0.35em] text-slate-500 mb-3">
              Portfolio / 01
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[.95]">
              {hero.name || 'Your Name'}
            </h1>

            <h2
              className="mt-5 text-2xl sm:text-3xl font-bold"
              style={{ color: accent }}
            >
              {hero.title || 'Your Professional Title'}
            </h2>

            <p className="mt-5 max-w-xl text-slate-300 leading-7">
              {hero.tagline}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {hero.primaryCta?.text && (
                <a
                  href={hero.primaryCta.link || '#projects'}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, ${secondary})`
                  }}
                >
                  {hero.primaryCta.text}
                </a>
              )}

              {hero.secondaryCta?.text && (
                <a
                  href={hero.secondaryCta.link || '#contact'}
                  className="px-6 py-3 rounded-xl text-sm font-bold border border-white/10 bg-white/5 hover:bg-white/10 transition"
                >
                  {hero.secondaryCta.text}
                </a>
              )}
            </div>
          </div>

          <div
            className="relative flex justify-center"
            style={{ perspective: '1200px' }}
          >
            <div
              className="relative w-64 h-80 rounded-[2rem] border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700"
              style={{
                boxShadow: `0 30px 100px ${accent}25`
              }}
            >
              <div
                className="absolute -inset-4 rounded-[2.5rem] border opacity-30 animate-pulse"
                style={{ borderColor: accent }}
              />

              {avatar ? (
                <img
                  src={avatar}
                  alt={hero.name || 'Profile'}
                  className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover rounded-[1.5rem]"
                />
              ) : (
                <div className="absolute inset-4 rounded-[1.5rem] bg-gradient-to-br from-indigo-500/30 to-cyan-400/10 flex items-center justify-center">
                  <span className="text-7xl font-black">
                    {(hero.name || 'Y').charAt(0)}
                  </span>
                </div>
              )}

              <div
                className="absolute -bottom-5 -left-8 px-4 py-3 rounded-xl border border-white/10 bg-slate-950/90 backdrop-blur-xl text-xs"
              >
                {hero.location || 'Available Worldwide'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GLASS ORBIT */}
      {template === 'glass-orbit' && (
        <div className="mx-auto max-w-5xl">
          <div className="relative rounded-[2.5rem] border border-white/15 bg-white/[0.06] backdrop-blur-2xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl">
            <div
              className="absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full blur-3xl opacity-40"
              style={{ backgroundColor: accent }}
            />

            {avatar && (
              <img
                src={avatar}
                alt={hero.name || 'Profile'}
                className="relative mx-auto mb-7 w-28 h-28 rounded-full object-cover border-4 border-white/10 shadow-2xl"
              />
            )}

            {hero.badge && (
              <span className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-slate-300">
                {hero.badge}
              </span>
            )}

            <h1 className="mt-6 text-5xl sm:text-6xl font-black tracking-tight">
              {hero.name || 'Your Name'}
            </h1>

            <h2
              className="mt-4 text-xl sm:text-2xl font-bold"
              style={{ color: accent }}
            >
              {hero.title}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-slate-300 leading-7">
              {hero.tagline}
            </p>

            <div className="flex justify-center flex-wrap gap-3 mt-8">
              {hero.primaryCta?.text && (
                <a
                  href={hero.primaryCta.link || '#projects'}
                  className="px-6 py-3 rounded-full text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, ${secondary})`
                  }}
                >
                  {hero.primaryCta.text}
                </a>
              )}

              {hero.secondaryCta?.text && (
                <a
                  href={hero.secondaryCta.link || '#contact'}
                  className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-bold"
                >
                  {hero.secondaryCta.text}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AURORA */}
      {template === 'aurora' && (
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p
                className="text-sm font-bold uppercase tracking-[.3em]"
                style={{ color: accent }}
              >
                Creative Portfolio
              </p>

              <h1 className="mt-5 text-6xl sm:text-7xl lg:text-8xl font-black tracking-[-.06em] leading-[.9]">
                {hero.name || 'Your Name'}
              </h1>

              <h2 className="mt-7 text-2xl font-semibold text-slate-300">
                {hero.title}
              </h2>

              <p className="mt-5 max-w-2xl text-slate-400 text-lg leading-8">
                {hero.tagline}
              </p>

              <div className="flex gap-3 mt-8 flex-wrap">
                {hero.primaryCta?.text && (
                  <a
                    href={hero.primaryCta.link || '#projects'}
                    className="px-7 py-3 rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {hero.primaryCta.text}
                  </a>
                )}

                {hero.secondaryCta?.text && (
                  <a
                    href={hero.secondaryCta.link || '#contact'}
                    className="px-7 py-3 rounded-full text-sm font-bold border border-white/10"
                  >
                    {hero.secondaryCta.text}
                  </a>
                )}
              </div>
            </div>

            <div className="hidden sm:flex items-center justify-center">
              <div className="relative w-64 h-64 rounded-full border border-white/10">
                <div
                  className="absolute inset-8 rounded-full blur-2xl opacity-40"
                  style={{ backgroundColor: accent }}
                />

                {avatar ? (
                  <img
                    src={avatar}
                    alt={hero.name || 'Profile'}
                    className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] rounded-full object-cover border-4 border-white/10"
                  />
                ) : (
                  <div className="absolute inset-8 rounded-full bg-white/5 flex items-center justify-center text-6xl font-black">
                    {(hero.name || 'Y').charAt(0)}
                  </div>
                )}

                <div
                  className="absolute -right-5 top-10 w-12 h-12 rounded-full border-4 border-slate-950"
                  style={{ backgroundColor: secondary }}
                />

                <div
                  className="absolute -left-3 bottom-10 w-8 h-8 rounded-full"
                  style={{ backgroundColor: accent }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CYBER GRID */}
      {template === 'cyber-grid' && (
        <div className="mx-auto max-w-6xl">
          <div className="border border-cyan-400/20 bg-black/30 p-6 sm:p-10 font-mono">
            <div className="flex items-center gap-2 mb-8 text-xs text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              SYSTEM ONLINE
            </div>

            <p className="text-cyan-400 text-sm">
              $ whoami
            </p>

            <h1 className="mt-3 text-5xl sm:text-7xl font-black">
              {hero.name || 'Your Name'}
              <span className="text-cyan-400">_</span>
            </h1>

            <p className="mt-5 text-lg text-slate-300">
              {'> '}
              {hero.title}
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
              {hero.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {hero.primaryCta?.text && (
                <a
                  href={hero.primaryCta.link || '#projects'}
                  className="px-5 py-3 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 transition"
                >
                  [{hero.primaryCta.text}]
                </a>
              )}

              {hero.secondaryCta?.text && (
                <a
                  href={hero.secondaryCta.link || '#contact'}
                  className="px-5 py-3 border border-white/10 text-slate-300"
                >
                  [{hero.secondaryCta.text}]
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MINIMAL PRO */}
      {template === 'minimal-pro' && (
        <div className="mx-auto max-w-5xl grid md:grid-cols-[1.2fr_.8fr] gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
              Portfolio
            </p>

            <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
              {hero.name || 'Your Name'}
            </h1>

            <h2 className="mt-5 text-2xl text-slate-500 font-medium">
              {hero.title}
            </h2>

            <p className="mt-6 max-w-xl text-slate-600 dark:text-slate-400 leading-8">
              {hero.tagline}
            </p>

            <div className="flex gap-3 mt-8">
              {hero.primaryCta?.text && (
                <a
                  href={hero.primaryCta.link || '#projects'}
                  className="px-6 py-3 rounded-lg text-white text-sm font-bold"
                  style={{ backgroundColor: accent }}
                >
                  {hero.primaryCta.text}
                </a>
              )}

              {hero.secondaryCta?.text && (
                <a
                  href={hero.secondaryCta.link || '#contact'}
                  className="px-6 py-3 rounded-lg border border-slate-300 dark:border-white/10 text-sm font-bold"
                >
                  {hero.secondaryCta.text}
                </a>
              )}
            </div>
          </div>

          {avatar && (
            <div className="flex justify-center md:justify-end">
              <img
                src={avatar}
                alt={hero.name || 'Profile'}
                className="w-64 h-80 object-cover rounded-2xl grayscale hover:grayscale-0 transition duration-500"
              />
            </div>
          )}
        </div>
      )}

      {/* CREATIVE STUDIO */}
      {template === 'creative-studio' && (
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[.4em] text-slate-500">
            Designer / Developer / Creator
          </p>

          <h1 className="mt-5 text-6xl sm:text-8xl lg:text-[9rem] font-black tracking-[-.08em] leading-[.78]">
            {hero.name || 'Your Name'}
          </h1>

          <div className="mt-10 grid md:grid-cols-[1fr_280px] gap-10 items-end">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-black"
                style={{ color: accent }}
              >
                {hero.title}
              </h2>

              <p className="mt-5 max-w-2xl text-slate-400 text-lg leading-8">
                {hero.tagline}
              </p>

              <div className="mt-7 flex gap-3 flex-wrap">
                {hero.primaryCta?.text && (
                  <a
                    href={hero.primaryCta.link || '#projects'}
                    className="px-6 py-3 rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {hero.primaryCta.text}
                  </a>
                )}

                {hero.secondaryCta?.text && (
                  <a
                    href={hero.secondaryCta.link || '#contact'}
                    className="px-6 py-3 rounded-full border border-white/10 text-sm font-bold"
                  >
                    {hero.secondaryCta.text}
                  </a>
                )}
              </div>
            </div>

            {avatar && (
              <img
                src={avatar}
                alt={hero.name || 'Profile'}
                className="w-56 h-64 object-cover rounded-[2rem] rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            )}
          </div>
        </div>
      )}

      {/* EXECUTIVE BLACK */}
      {template === 'executive-black' && (
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-block px-5 py-2 border border-amber-400/30 text-amber-300 text-xs uppercase tracking-[.35em]">
            Executive Portfolio
          </div>

          <h1 className="mt-8 text-5xl sm:text-7xl font-serif font-black tracking-tight">
            {hero.name || 'Your Name'}
          </h1>

          <div
            className="mx-auto mt-5 h-px w-24"
            style={{ backgroundColor: accent }}
          />

          <h2 className="mt-5 text-xl sm:text-2xl text-slate-300 font-medium">
            {hero.title}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-slate-400 leading-8">
            {hero.tagline}
          </p>

          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            {hero.primaryCta?.text && (
              <a
                href={hero.primaryCta.link || '#projects'}
                className="px-7 py-3 border border-amber-400/40 text-amber-300 text-sm font-bold hover:bg-amber-400/10 transition"
              >
                {hero.primaryCta.text}
              </a>
            )}

            {hero.secondaryCta?.text && (
              <a
                href={hero.secondaryCta.link || '#contact'}
                className="px-7 py-3 border border-white/10 text-slate-300 text-sm font-bold"
              >
                {hero.secondaryCta.text}
              </a>
            )}
          </div>
        </div>
      )}

      {/* VISIONARY 3D */}
      {template === 'visionary-3d' && (
        <div
          className="mx-auto max-w-6xl"
          style={{ perspective: '1400px' }}
        >
          <div
            className="relative rounded-[3rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 sm:p-12 lg:p-16 shadow-2xl"
            style={{
              transform: 'rotateX(2deg) rotateY(-2deg)',
              boxShadow: `0 50px 120px ${accent}18`
            }}
          >
            <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-center">
              <div>
                <p
                  className="text-sm font-bold uppercase tracking-[.35em]"
                  style={{ color: accent }}
                >
                  Visionary / 3D
                </p>

                <h1 className="mt-5 text-5xl sm:text-7xl font-black tracking-tight">
                  {hero.name || 'Your Name'}
                </h1>

                <h2
                  className="mt-5 text-2xl font-bold"
                  style={{ color: secondary }}
                >
                  {hero.title}
                </h2>

                <p className="mt-5 max-w-2xl text-slate-400 leading-8">
                  {hero.tagline}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {hero.primaryCta?.text && (
                    <a
                      href={hero.primaryCta.link || '#projects'}
                      className="px-6 py-3 rounded-xl text-white text-sm font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${accent}, ${secondary})`
                      }}
                    >
                      {hero.primaryCta.text}
                    </a>
                  )}

                  {hero.secondaryCta?.text && (
                    <a
                      href={hero.secondaryCta.link || '#contact'}
                      className="px-6 py-3 rounded-xl border border-white/10 text-sm font-bold"
                    >
                      {hero.secondaryCta.text}
                    </a>
                  )}
                </div>
              </div>

              <div className="relative">
                <div
                  className="absolute -inset-8 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: accent }}
                />

                {avatar ? (
                  <img
                    src={avatar}
                    alt={hero.name || 'Profile'}
                    className="relative w-64 h-72 object-cover rounded-[2rem] border border-white/10 shadow-2xl rotate-[-4deg]"
                  />
                ) : (
                  <div
                    className="relative w-64 h-72 rounded-[2rem] flex items-center justify-center text-8xl font-black border border-white/10"
                    style={{
                      background: `linear-gradient(145deg, ${accent}22, ${secondary}11)`
                    }}
                  >
                    {(hero.name || 'Y').charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEFAULT */}
      {![
        'neon-nexus',
        'glass-orbit',
        'aurora',
        'cyber-grid',
        'minimal-pro',
        'creative-studio',
        'executive-black',
        'visionary-3d'
      ].includes(template) && (
        <HeroSection hero={hero} design={design} />
      )}

      {/* Keep social information available for templates */}
      {is3D && (
        <div className="hidden">
          {socials.github}
          {socials.linkedin}
          {socials.email}
        </div>
      )}
    </section>
  );
}

export function PortfolioRenderer({
  portfolio,
  isLivePage = false
}) {
  if (!portfolio) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-500 text-sm">
        Loading portfolio preview...
      </div>
    );
  }

  const {
    hero = {},
    about = {},
    skills = {},
    experience = {},
    projects = {},
    services = {},
    testimonials = {},
    education = {},
    contact = {},
    footer = {},
    design = {},
    slug = ''
  } = portfolio;

  const theme = getThemeConfig(design.theme);
  const fontClass = getFontClass(design.fontFamily);

  const accent =
    design.accentColor || '#6366f1';

  const secondary =
    design.secondaryColor || '#06b6d4';

  const template =
    design.template || 'default';

  const isDarkTemplate = [
    'neon-nexus',
    'glass-orbit',
    'aurora',
    'cyber-grid',
    'creative-studio',
    'executive-black',
    'visionary-3d'
  ].includes(template);

  const sectionCardClass = {
    'neon-nexus':
      'mx-4 sm:mx-6 rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl shadow-2xl',

    'glass-orbit':
      'mx-4 sm:mx-6 rounded-[2rem] border border-white/10 bg-white/[0.045] backdrop-blur-2xl shadow-xl',

    aurora:
      'mx-4 sm:mx-6 rounded-[2rem] border border-white/10 bg-white/[0.025] backdrop-blur-xl',

    'cyber-grid':
      'mx-4 sm:mx-6 border border-cyan-400/15 bg-black/20',

    'minimal-pro':
      'mx-4 sm:mx-6 rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-white/[0.02]',

    'creative-studio':
      'mx-4 sm:mx-6 rounded-[2.5rem] border border-white/10 bg-white/[0.03]',

    'executive-black':
      'mx-6 sm:mx-10 border border-amber-400/10 bg-black/20',

    'visionary-3d':
      'mx-4 sm:mx-6 rounded-[2rem] border border-white/10 bg-white/[0.035] backdrop-blur-xl shadow-2xl'
  }[template] || '';

  return (
    <div
      className={`
        relative w-full min-h-full overflow-hidden
        ${theme.bgClass}
        ${theme.textClass}
        ${fontClass}
        transition-colors
        selection:bg-indigo-500
        selection:text-white
      `}
    >
      <TemplateBackground
        template={template}
        accent={accent}
        secondary={secondary}
      />

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav
        className={`
          sticky top-0 z-40
          px-6 py-4
          flex items-center justify-between
          ${theme.navClass}
          ${template === 'glass-orbit'
            ? 'backdrop-blur-2xl border-b border-white/10'
            : ''}
          ${template === 'cyber-grid'
            ? 'font-mono border-b border-cyan-400/10'
            : ''}
          ${template === 'executive-black'
            ? 'border-b border-amber-400/10'
            : ''}
        `}
      >
        <a
          href="#"
          className="font-extrabold text-base tracking-tight hover:opacity-80 transition-opacity"
        >
          {hero.name || 'Portfolio'}
        </a>

        <div className="hidden sm:flex items-center gap-6 text-xs font-semibold opacity-75">
          {about.enabled !== false && (
            <a
              href="#about"
              className="hover:opacity-100 transition-opacity"
            >
              About
            </a>
          )}

          {skills.enabled !== false && (
            <a
              href="#skills"
              className="hover:opacity-100 transition-opacity"
            >
              Skills
            </a>
          )}

          {projects.enabled !== false && (
            <a
              href="#projects"
              className="hover:opacity-100 transition-opacity"
            >
              Projects
            </a>
          )}

          {experience.enabled !== false && (
            <a
              href="#experience"
              className="hover:opacity-100 transition-opacity"
            >
              Experience
            </a>
          )}

          {services.enabled && (
            <a
              href="#services"
              className="hover:opacity-100 transition-opacity"
            >
              Services
            </a>
          )}

          {testimonials.enabled && (
            <a
              href="#testimonials"
              className="hover:opacity-100 transition-opacity"
            >
              Reviews
            </a>
          )}

          {education.enabled !== false && (
            <a
              href="#education"
              className="hover:opacity-100 transition-opacity"
            >
              Education
            </a>
          )}

          {contact.enabled !== false && (
            <a
              href="#contact"
              className="px-3 py-1 rounded-full text-white font-bold transition-transform hover:scale-105"
              style={{
                backgroundColor: accent
              }}
            >
              Contact
            </a>
          )}
        </div>
      </nav>

      {/* =====================================================
          HERO
      ====================================================== */}

      <main className="relative z-10 space-y-6">

        <TemplateHero
          hero={hero}
          design={design}
          template={template}
        />

        {/* ===================================================
            ABOUT
        ==================================================== */}

        <div className={sectionCardClass}>
          <AboutSection
            about={about}
            design={design}
          />
        </div>

        {/* ===================================================
            SKILLS
        ==================================================== */}

        <div className={sectionCardClass}>
          <SkillsSection
            skills={skills}
            design={design}
          />
        </div>

        {/* ===================================================
            PROJECTS
        ==================================================== */}

        <div className={sectionCardClass}>
          <ProjectsSection
            projects={projects}
            design={design}
          />
        </div>

        {/* ===================================================
            EXPERIENCE
        ==================================================== */}

        <div className={sectionCardClass}>
          <ExperienceSection
            experience={experience}
            design={design}
          />
        </div>

        {/* ===================================================
            SERVICES
        ==================================================== */}

        <div className={sectionCardClass}>
          <ServicesSection
            services={services}
            design={design}
          />
        </div>

        {/* ===================================================
            TESTIMONIALS
        ==================================================== */}

        <div className={sectionCardClass}>
          <TestimonialsSection
            testimonials={testimonials}
            design={design}
          />
        </div>

        {/* ===================================================
            EDUCATION
        ==================================================== */}

        <div className={sectionCardClass}>
          <EducationSection
            education={education}
            design={design}
          />
        </div>

        {/* ===================================================
            CONTACT
        ==================================================== */}

        <div className={sectionCardClass}>
          <ContactSection
            contact={contact}
            slug={slug}
            design={design}
          />
        </div>

      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="relative z-10 mt-6">
        <FooterSection
          footer={footer}
          hero={hero}
          design={design}
        />
      </div>

    </div>
  );
}