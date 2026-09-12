# FolioCraft — Full-Stack Portfolio Builder Web Application

A full-stack, developer-first web application for building, customizing, previewing, and exporting modern portfolio websites.

![FolioCraft Studio](https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80)

---

## Key Features

### 1. Studio Live Split-Screen Editor
- **Real-Time Reactive Preview**: Updates the canvas instantly as you edit.
- **Multi-Device Emulation**: Switch between **Desktop (100%)**, **Tablet (768px)**, and **Mobile (375px)** device frames with realistic chassis bezels.
- **Fast Tab Navigation**: Smooth sub-tabs for Content, Design System, Section Visibility, Settings & SEO, and Visitor Inquiries.

### 2. Comprehensive Sections Included ("All Options")
- **Hero & Intro**: Name, pronouns, professional title, elevator pitch, status badge, location/timezone, primary & secondary CTAs, and social hub (GitHub, LinkedIn, Twitter/X, Email, Calendly, etc.).
- **About Me**: Bio summary, in-depth philosophy/story, key impact metrics counter (e.g. `7+ Years`, `1.5M+ Users`), and quick highlights bullet list.
- **Skills & Tech Stack**: Categorized competencies (Frontend, Backend, DevOps/Cloud, Security, Tools) with proficiency ratings (`Expert`, `Advanced`, `Intermediate`).
- **Projects Showcase**: Featured badges, live demo URL, GitHub repository URL, impact metrics, tech tags, and thumbnail presets.
- **Work Experience**: Interactive timeline with role, company, dates, employment type (Full-time, Contract, Remote), responsibilities, and **AI Action-Verb / Impact Optimizer**.
- **Services & Offerings**: Packages with pricing estimates and delivery turnarounds.
- **Testimonials**: Peer and client quotes, author name, role, company, and avatar.
- **Education & Certifications**: Degrees, university, dates, and credential details.
- **Interactive Contact Form**: Working visitor inquiry form that delivers messages directly to your dashboard inbox!
- **Footer**: Custom copyright note and optional badge toggle.

### 3. Curated Aesthetic Themes & Typography
- **5 Built-in Themes**:
  1. `Midnight Cyber` — Dark glassmorphism, glowing neon accents, and futuristic gradients.
  2. `Clean Minimalist` — High-contrast monochrome editorial typography.
  3. `Aurora Gradient` — Vibrant modern SaaS aesthetic with deep indigo & violet hues.
  4. `Hacker Terminal` — Monospace phosphor CRT vibe with command prompt styling.
  5. `Executive Navy` — Refined corporate navy & slate finish.
- **Typography Engine**: Inter, Plus Jakarta Sans, Outfit, Fira Code, Playfair Display.
- **Color Palettes**: Indigo, Cyan, Emerald, Violet, Rose, Amber, Blue, and Custom Hex codes.
- **Border Curvatures**: Sharp (0px), Modern (8px), Smooth (12px), Curved (16px), Pill (24px).

### 4. Export & Sharing Engines
- **Download Standalone HTML**: Generates a self-contained single-file `.html` document with inlined CSS, fonts, and responsiveness. Can be double-clicked locally or uploaded to GitHub Pages, Netlify, or Vercel.
- **Export & Import JSON**: Full backup, transfer, and restore of your portfolio configurations.
- **Print / PDF Resume View**: Formatted print stylesheet that transforms your portfolio into an elegant CV.
- **Live Public URL**: Shareable link `/p/:slug` with functional contact form.
- **Visitor Inquiries Inbox**: Read, mark as read, delete, and reply to client inquiries directly via pre-filled email mailto.

---

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, clsx, tailwind-merge.
- **Backend**: Node.js, Express.js, CORS.
- **Storage**: Persistent JSON database (`data/portfolios.json` and `data/messages.json`).
- **AI Assistant**: Built-in copywriting polisher for bios, bullet points, and project taglines.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Running the Application

#### Option A: Development Mode (with Vite HMR)
```bash
npm run dev
```
- Frontend runs at: `http://localhost:3000`
- Express API runs at: `http://localhost:5000`

#### Option B: Production Full-Stack Server
```bash
npm run build
npm run start
```
- Access the entire application at: `http://localhost:5000`
- Public portfolio example: `http://localhost:5000/p/alex-rivera`
