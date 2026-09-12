export const THEMES = [
  {
    id: "cyberpunk",
    name: "Midnight Cyber",
    description: "Dark glass aesthetic with glowing neon accents & gradients",
    previewColor: "#6366f1",
    bgClass: "bg-[#090d16]",
    cardClass: "bg-[#101726]/80 backdrop-blur-md border border-slate-800 shadow-xl",
    textClass: "text-slate-100",
    textMutedClass: "text-slate-400",
    navClass: "bg-[#090d16]/80 backdrop-blur-md border-b border-slate-800/80",
    pillClass: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  },
  {
    id: "editorial",
    name: "Clean Minimalist",
    description: "High-contrast editorial typography with sleek clean borders",
    previewColor: "#18181b",
    bgClass: "bg-slate-50",
    cardClass: "bg-white border border-slate-200 shadow-sm",
    textClass: "text-slate-900",
    textMutedClass: "text-slate-600",
    navClass: "bg-slate-50/90 backdrop-blur-md border-b border-slate-200",
    pillClass: "bg-slate-100 text-slate-800 border border-slate-200",
  },
  {
    id: "aurora",
    name: "Aurora Gradient",
    description: "Modern vibrant SaaS atmosphere with deep violet & cyan hues",
    previewColor: "#8b5cf6",
    bgClass: "bg-slate-950",
    cardClass: "bg-slate-900/60 backdrop-blur-md border border-violet-900/30 shadow-lg",
    textClass: "text-slate-50",
    textMutedClass: "text-slate-300",
    navClass: "bg-slate-950/80 backdrop-blur-md border-b border-slate-800",
    pillClass: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
  },
  {
    id: "terminal",
    name: "Hacker Terminal",
    description: "Monospace phosphor CRT vibe with command prompt styling",
    previewColor: "#10b981",
    bgClass: "bg-[#050c07]",
    cardClass: "bg-[#0b180f] border border-emerald-900/60 shadow-none font-mono",
    textClass: "text-emerald-400 font-mono",
    textMutedClass: "text-emerald-600 font-mono",
    navClass: "bg-[#050c07]/95 border-b border-emerald-900/50 font-mono",
    pillClass: "bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 font-mono",
  },
  {
    id: "executive",
    name: "Executive Navy",
    description: "Refined deep navy & slate polish for corporate & tech leadership",
    previewColor: "#2563eb",
    bgClass: "bg-[#0b132b]",
    cardClass: "bg-[#1c2541]/90 border border-slate-700 shadow-md",
    textClass: "text-slate-100",
    textMutedClass: "text-slate-300",
    navClass: "bg-[#0b132b]/85 backdrop-blur-md border-b border-slate-700/60",
    pillClass: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
  },
];

export const FONT_OPTIONS = [
  { id: "Inter", name: "Inter (Modern Clean)", class: "font-sans" },
  { id: "Plus Jakarta Sans", name: "Plus Jakarta Sans (Crisp Tech)", class: "font-jakarta" },
  { id: "Outfit", name: "Outfit (Geometric & Friendly)", class: "font-outfit" },
  { id: "Fira Code", name: "Fira Code (Developer Monospace)", class: "font-mono" },
  { id: "Playfair Display", name: "Playfair Display (Editorial Serif)", class: "font-serif" },
];

export const ACCENT_COLORS = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Emerald", value: "#10b981" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Rose", value: "#ec4899" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Blue", value: "#2563eb" },
  { name: "Monochrome", value: "#27272a" },
];

export const BORDER_RADIUS_OPTIONS = [
  { id: "rounded-none", name: "Sharp (0px)" },
  { id: "rounded-lg", name: "Modern (8px)" },
  { id: "rounded-xl", name: "Smooth (12px)" },
  { id: "rounded-2xl", name: "Curved (16px)" },
  { id: "rounded-3xl", name: "Pill (24px)" },
];

export function getThemeConfig(themeId) {
  return THEMES.find((t) => t.id === themeId) || THEMES[0];
}

export function getFontClass(fontId) {
  const font = FONT_OPTIONS.find((f) => f.id === fontId);
  return font ? font.class : "font-sans";
}
