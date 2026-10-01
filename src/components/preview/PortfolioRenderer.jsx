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

export function PortfolioRenderer({ portfolio, isLivePage = false }) {
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
    slug = '',
  } = portfolio;

  const theme = getThemeConfig(design.theme);
  const fontClass = getFontClass(design.fontFamily);
  const accent = design.accentColor || '#6366f1';

  return (
    <div className={`w-full min-h-full ${theme.bgClass} ${theme.textClass} ${fontClass} transition-colors selection:bg-indigo-500 selection:text-white`}>
      {/* Top Navbar */}
      <nav className={`sticky top-0 z-40 px-6 py-4 flex items-center justify-between ${theme.navClass}`}>
        <a href="#" className="font-extrabold text-base tracking-tight hover:opacity-80 transition-opacity">
          {hero.name || "Portfolio"}
        </a>

        <div className="hidden sm:flex items-center gap-6 text-xs font-semibold opacity-75">
          {about.enabled !== false && <a href="#about" className="hover:opacity-100 transition-opacity">About</a>}
          {skills.enabled !== false && <a href="#skills" className="hover:opacity-100 transition-opacity">Skills</a>}
          {projects.enabled !== false && <a href="#projects" className="hover:opacity-100 transition-opacity">Projects</a>}
          {experience.enabled !== false && <a href="#experience" className="hover:opacity-100 transition-opacity">Experience</a>}
          {services.enabled && <a href="#services" className="hover:opacity-100 transition-opacity">Services</a>}
          {testimonials.enabled && <a href="#testimonials" className="hover:opacity-100 transition-opacity">Reviews</a>}
          {education.enabled !== false && <a href="#education" className="hover:opacity-100 transition-opacity">Education</a>}
          {contact.enabled !== false && (
            <a
              href="#contact"
              className="px-3 py-1 rounded-full text-white font-bold transition-transform hover:scale-105"
              style={{ backgroundColor: accent }}
            >
              Contact
            </a>
          )}
        </div>
      </nav>

      {/* Sections Container */}
      <main className="space-y-4">
        <HeroSection hero={hero} design={design} />
        <AboutSection about={about} design={design} />
        <SkillsSection skills={skills} design={design} />
        <ProjectsSection projects={projects} design={design} />
        <ExperienceSection experience={experience} design={design} />
        <ServicesSection services={services} design={design} />
        <TestimonialsSection testimonials={testimonials} design={design} />
        <EducationSection education={education} design={design} />
        <ContactSection contact={contact} slug={slug} design={design} />
      </main>

      <FooterSection footer={footer} hero={hero} design={design} />
    </div>
  );
}
