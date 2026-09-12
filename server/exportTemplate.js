export function generateStandaloneHtml(portfolio) {
  const {
    title,
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
  } = portfolio;

  const theme = design.theme || 'cyberpunk';
  const accent = design.accentColor || '#6366f1';
  const fontFamily = design.fontFamily || 'Inter';

  // Determine theme color variables
  let bg = '#0b0f19';
  let cardBg = '#111827';
  let cardBorder = '#1f2937';
  let text = '#f3f4f6';
  let textMuted = '#9ca3af';

  if (theme === 'minimalist' || theme === 'editorial') {
    bg = '#fafafa';
    cardBg = '#ffffff';
    cardBorder = '#e5e7eb';
    text = '#111827';
    textMuted = '#6b7280';
  } else if (theme === 'terminal') {
    bg = '#050a05';
    cardBg = '#0b140b';
    cardBorder = '#163816';
    text = '#10b981';
    textMuted = '#059669';
  } else if (theme === 'aurora') {
    bg = '#0f172a';
    cardBg = 'rgba(30, 41, 59, 0.7)';
    cardBorder = '#334155';
    text = '#f8fafc';
    textMuted = '#94a3b8';
  } else if (theme === 'executive') {
    bg = '#0a1128';
    cardBg = '#131e3d';
    cardBorder = '#1f2e59';
    text = '#f1f5f9';
    textMuted = '#94a3b8';
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title || hero.name || "Portfolio")}</title>
  <meta name="description" content="${escapeHtml(portfolio.seo?.metaDescription || hero.tagline || "")}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: ${bg};
      --card-bg: ${cardBg};
      --card-border: ${cardBorder};
      --text: ${text};
      --text-muted: ${textMuted};
      --accent: ${accent};
      --font: "${fontFamily}", sans-serif;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html {
      scroll-behavior: smooth;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 1040px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    /* Nav */
    nav {
      position: sticky;
      top: 0;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      background: ${theme === 'minimalist' ? 'rgba(250,250,250,0.85)' : 'rgba(11,15,25,0.85)'};
      border-bottom: 1px solid var(--card-border);
      z-index: 50;
      padding: 1rem 0;
    }
    .nav-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--text);
      text-decoration: none;
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
      list-style: none;
    }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a:hover {
      color: var(--accent);
    }
    /* Hero */
    .hero {
      padding: 6rem 0 4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .hero-avatar {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 1.5rem;
      border: 3px solid var(--accent);
      box-shadow: 0 0 25px rgba(99,102,241,0.25);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(99,102,241,0.1);
      border: 1px solid var(--accent);
      color: var(--text);
      font-size: 0.85rem;
      font-weight: 500;
      padding: 0.35rem 1rem;
      border-radius: 9999px;
      margin-bottom: 1.25rem;
    }
    .hero h1 {
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: -0.025em;
      margin-bottom: 0.75rem;
      line-height: 1.15;
    }
    .hero .title {
      font-size: 1.35rem;
      color: var(--accent);
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .hero .tagline {
      max-width: 650px;
      color: var(--text-muted);
      font-size: 1.15rem;
      margin-bottom: 2rem;
    }
    .btn-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.75rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.95rem;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }
    .btn-primary {
      background: var(--accent);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(99,102,241,0.3);
    }
    .btn-primary:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: var(--card-bg);
      color: var(--text);
      border: 1px solid var(--card-border);
    }
    .btn-secondary:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }
    .social-bar {
      display: flex;
      gap: 1.25rem;
    }
    .social-bar a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;
    }
    .social-bar a:hover {
      color: var(--accent);
    }

    /* Section common */
    section {
      padding: 4.5rem 0;
      border-top: 1px solid var(--card-border);
    }
    .section-header {
      margin-bottom: 2.5rem;
      text-align: center;
    }
    .section-header h2 {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .section-header p {
      color: var(--text-muted);
      margin-top: 0.5rem;
    }

    /* Grid & Cards */
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover {
      border-color: var(--accent);
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      margin-top: 2rem;
    }
    .stat-item {
      text-align: center;
      padding: 1.25rem;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 0.5rem;
    }
    .stat-val {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--accent);
    }
    .stat-lbl {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-top: 0.25rem;
    }

    /* Skills */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .skill-cat h3 {
      font-size: 1.15rem;
      margin-bottom: 1rem;
      color: var(--accent);
    }
    .skill-tag-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .skill-pill {
      background: rgba(99,102,241,0.08);
      border: 1px solid var(--card-border);
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    /* Projects */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
      gap: 2rem;
    }
    .project-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-radius: 0.75rem;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
    }
    .project-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      background: #1e293b;
    }
    .project-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .project-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .project-desc {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
      flex-grow: 1;
    }
    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.25rem;
    }
    .project-links {
      display: flex;
      gap: 1rem;
    }
    .project-links a {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--accent);
      text-decoration: none;
    }

    /* Timeline */
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }
    .timeline-item {
      border-left: 2px solid var(--accent);
      padding-left: 1.5rem;
      position: relative;
    }
    .timeline-item::before {
      content: '';
      position: absolute;
      left: -6px;
      top: 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent);
    }
    .timeline-role {
      font-size: 1.2rem;
      font-weight: 700;
    }
    .timeline-meta {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 0.75rem;
    }
    .timeline-bullets {
      list-style-type: disc;
      padding-left: 1.25rem;
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    /* Footer */
    footer {
      border-top: 1px solid var(--card-border);
      padding: 3rem 0;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .hero h1 { font-size: 2.25rem; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body data-theme="${theme}" class="theme-${theme}">

  <!-- Navigation -->
  <nav>
    <div class="container nav-inner">
      <a href="#" class="brand">${escapeHtml(hero.name || "Portfolio")}</a>
      <ul class="nav-links">
        ${about.enabled ? '<li><a href="#about">About</a></li>' : ''}
        ${skills.enabled ? '<li><a href="#skills">Skills</a></li>' : ''}
        ${experience.enabled ? '<li><a href="#experience">Experience</a></li>' : ''}
        ${projects.enabled ? '<li><a href="#projects">Projects</a></li>' : ''}
        ${contact.enabled ? '<li><a href="#contact">Contact</a></li>' : ''}
      </ul>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="hero container">
    ${hero.avatarUrl ? `<img src="${escapeHtml(hero.avatarUrl)}" alt="${escapeHtml(hero.name || 'Avatar')}" class="hero-avatar">` : ''}
    ${hero.badge ? `<div class="badge">${escapeHtml(hero.badge)}</div>` : ''}
    <h1>${escapeHtml(hero.name || 'Welcome')}</h1>
    ${hero.title ? `<div class="title">${escapeHtml(hero.title)}</div>` : ''}
    ${hero.tagline ? `<p class="tagline">${escapeHtml(hero.tagline)}</p>` : ''}
    
    <div class="btn-group">
      ${hero.primaryCta?.text ? `<a href="${escapeHtml(hero.primaryCta.link || '#projects')}" class="btn btn-primary">${escapeHtml(hero.primaryCta.text)}</a>` : ''}
      ${hero.secondaryCta?.text ? `<a href="${escapeHtml(hero.secondaryCta.link || '#contact')}" class="btn btn-secondary">${escapeHtml(hero.secondaryCta.text)}</a>` : ''}
    </div>

    <div class="social-bar">
      ${hero.socials?.github ? `<a href="${escapeHtml(hero.socials.github)}" target="_blank" rel="noopener">GitHub</a>` : ''}
      ${hero.socials?.linkedin ? `<a href="${escapeHtml(hero.socials.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ''}
      ${hero.socials?.twitter ? `<a href="${escapeHtml(hero.socials.twitter)}" target="_blank" rel="noopener">Twitter / X</a>` : ''}
      ${hero.socials?.email ? `<a href="mailto:${escapeHtml(hero.socials.email)}">Email</a>` : ''}
    </div>
  </header>

  <!-- About Section -->
  ${about.enabled ? `
  <section id="about">
    <div class="container">
      <div class="section-header">
        <h2>${escapeHtml(about.title || 'About Me')}</h2>
      </div>
      <div class="card">
        ${about.summary ? `<p style="font-size: 1.1rem; margin-bottom: 1rem;">${escapeHtml(about.summary)}</p>` : ''}
        ${about.story ? `<p style="color: var(--text-muted);">${escapeHtml(about.story)}</p>` : ''}
      </div>

      ${about.stats && about.stats.length > 0 ? `
      <div class="stats-grid">
        ${about.stats.map(s => `
          <div class="stat-item">
            <div class="stat-val">${escapeHtml(s.value)}</div>
            <div class="stat-lbl">${escapeHtml(s.label)}</div>
          </div>
        `).join('')}
      </div>` : ''}
    </div>
  </section>
  ` : ''}

  <!-- Skills Section -->
  ${skills.enabled && skills.categories && skills.categories.length > 0 ? `
  <section id="skills">
    <div class="container">
      <div class="section-header">
        <h2>${escapeHtml(skills.title || 'Skills & Technologies')}</h2>
      </div>
      <div class="skills-grid">
        ${skills.categories.map(cat => `
          <div class="card skill-cat">
            <h3>${escapeHtml(cat.name)}</h3>
            <div class="skill-tag-cloud">
              ${cat.skills.map(s => `<span class="skill-pill">${escapeHtml(s.name || s)}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Projects Section -->
  ${projects.enabled && projects.items && projects.items.length > 0 ? `
  <section id="projects">
    <div class="container">
      <div class="section-header">
        <h2>${escapeHtml(projects.title || 'Featured Projects')}</h2>
      </div>
      <div class="projects-grid">
        ${projects.items.map(p => `
          <div class="project-card">
            ${p.imageUrl ? `<img src="${escapeHtml(p.imageUrl)}" alt="${escapeHtml(p.title)}" class="project-img">` : ''}
            <div class="project-body">
              <div class="project-title">${escapeHtml(p.title)}</div>
              <div class="project-desc">${escapeHtml(p.description || p.tagline || '')}</div>
              ${p.technologies ? `
                <div class="project-tech">
                  ${p.technologies.map(t => `<span class="skill-pill" style="font-size: 0.75rem;">${escapeHtml(t)}</span>`).join('')}
                </div>
              ` : ''}
              <div class="project-links">
                ${p.liveUrl ? `<a href="${escapeHtml(p.liveUrl)}" target="_blank" rel="noopener">Live Demo &rarr;</a>` : ''}
                ${p.githubUrl ? `<a href="${escapeHtml(p.githubUrl)}" target="_blank" rel="noopener">Source Code</a>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Work Experience Section -->
  ${experience.enabled && experience.items && experience.items.length > 0 ? `
  <section id="experience">
    <div class="container">
      <div class="section-header">
        <h2>${escapeHtml(experience.title || 'Work Experience')}</h2>
      </div>
      <div class="timeline">
        ${experience.items.map(exp => `
          <div class="timeline-item">
            <div class="timeline-role">${escapeHtml(exp.role)} &bull; <span style="color: var(--accent);">${escapeHtml(exp.company)}</span></div>
            <div class="timeline-meta">${escapeHtml(exp.period || '')} ${exp.location ? `| ${escapeHtml(exp.location)}` : ''}</div>
            ${exp.description ? `<p style="margin-bottom: 0.75rem; color: var(--text-muted);">${escapeHtml(exp.description)}</p>` : ''}
            ${exp.achievements && exp.achievements.length > 0 ? `
              <ul class="timeline-bullets">
                ${exp.achievements.map(ach => `<li>${escapeHtml(ach)}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Contact Section -->
  ${contact.enabled ? `
  <section id="contact">
    <div class="container" style="max-width: 650px;">
      <div class="section-header">
        <h2>${escapeHtml(contact.title || 'Get In Touch')}</h2>
        <p>${escapeHtml(contact.subtitle || "Feel free to reach out for collaborations, roles, or inquiries.")}</p>
      </div>
      <div class="card" style="text-align: center;">
        <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
          Direct Email: <a href="mailto:${escapeHtml(contact.email || '')}" style="color: var(--accent); font-weight: 600;">${escapeHtml(contact.email || '')}</a>
        </p>
        ${contact.bookingUrl ? `
          <a href="${escapeHtml(contact.bookingUrl)}" target="_blank" class="btn btn-primary" style="margin-bottom: 1rem;">Schedule Meeting</a>
        ` : ''}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Footer -->
  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${escapeHtml(hero.name || 'Portfolio')}. ${escapeHtml(footer.customText || 'All rights reserved.')}</p>
    </div>
  </footer>

</body>
</html>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
