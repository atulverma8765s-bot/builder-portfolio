import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Palette,
  Smartphone,
  Zap,
  Layers3,
  ShieldCheck,
  Rocket,
  MousePointer2,
  LayoutTemplate,
  WandSparkles,
} from 'lucide-react';

export function HomePage({ onBuild }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#030712] text-white selection:bg-violet-500/30">

      <style>{`
        .folio-grid {
          background-image:
            linear-gradient(rgba(99,102,241,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,.08) 1px, transparent 1px);
          background-size: 55px 55px;
        }

        .folio-orb {
          animation: folioFloat 7s ease-in-out infinite;
        }

        .folio-orb-delay {
          animation: folioFloat 9s ease-in-out infinite reverse;
        }

        .folio-card {
          animation: cardFloat 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .folio-card-delay {
          animation: cardFloat 7s ease-in-out infinite reverse;
        }

        .folio-glow {
          animation: glowPulse 4s ease-in-out infinite;
        }

        .folio-rocket {
          animation: rocketFloat 4s ease-in-out infinite;
        }

        .folio-shine {
          animation: shineMove 5s linear infinite;
        }

        @keyframes folioFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(25px, -25px, 0) scale(1.06);
          }
        }

        @keyframes cardFloat {
          0%, 100% {
            transform: translateY(0) rotateX(0deg) rotateY(0deg);
          }
          50% {
            transform: translateY(-14px) rotateX(2deg) rotateY(-2deg);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: .45;
            transform: scale(1);
          }
          50% {
            opacity: .9;
            transform: scale(1.12);
          }
        }

        @keyframes rocketFloat {
          0%, 100% {
            transform: translateY(0) rotate(8deg);
          }
          50% {
            transform: translateY(-18px) rotate(13deg);
          }
        }

        @keyframes shineMove {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        .perspective-stage {
          perspective: 1200px;
        }

        .dashboard-3d {
          transform: rotateY(-9deg) rotateX(5deg);
          transform-style: preserve-3d;
          box-shadow:
            0 40px 100px rgba(0,0,0,.55),
            0 0 80px rgba(99,102,241,.25);
        }

        .dashboard-3d:hover {
          transform: rotateY(-4deg) rotateX(2deg) translateY(-8px);
        }

        .glass-panel {
          background: rgba(15,23,42,.52);
          border: 1px solid rgba(148,163,184,.15);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        @media (prefers-reduced-motion: reduce) {
          .folio-orb,
          .folio-orb-delay,
          .folio-card,
          .folio-card-delay,
          .folio-glow,
          .folio-rocket,
          .folio-shine {
            animation: none !important;
          }

          .dashboard-3d {
            transform: none;
          }
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 folio-grid opacity-40" />

        <div className="folio-orb absolute -top-48 -left-40 w-[520px] h-[520px] rounded-full bg-indigo-600/20 blur-[130px]" />

        <div className="folio-orb-delay absolute top-[30%] -right-48 w-[580px] h-[580px] rounded-full bg-fuchsia-600/15 blur-[150px]" />

        <div className="absolute bottom-0 left-1/3 w-[500px] h-[260px] bg-cyan-500/10 blur-[130px]" />
      </div>

      {/* Navbar */}
      <header className="relative z-50 border-b border-white/5 bg-slate-950/55 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 p-[1px] shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                <Layers3 className="w-5 h-5 text-indigo-300 group-hover:rotate-12 transition-transform" />
              </div>
            </div>

            <span className="text-xl font-black tracking-tight">
              Folio<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400">Craft</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#home" className="hover:text-white transition">Home</a>
            <a href="#templates" className="hover:text-white transition">Templates</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#about" className="hover:text-white transition">About</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onBuild}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition text-sm font-semibold"
            >
              Login
            </button>

            <button
              onClick={onBuild}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 hover:scale-[1.03] transition shadow-lg shadow-indigo-500/25 text-sm font-bold"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main id="home" className="relative z-10">

        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-10">

          <div className="grid lg:grid-cols-[.88fr_1.12fr] gap-12 lg:gap-6 items-center">

            {/* Left */}
            <div className="relative z-20">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-200 text-xs sm:text-sm font-semibold mb-7">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                Create • Design • Showcase
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[76px] leading-[.94] font-black tracking-[-.045em]">
                Build Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-400 to-fuchsia-400">
                  Portfolio
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base sm:text-lg leading-8 text-slate-400">
                Turn your skills into a stunning personal portfolio in just
                one minute. No coding. No complicated setup. Just your story,
                your style and your career.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="glass-panel px-4 py-3 rounded-xl flex items-center gap-2 text-xs text-slate-300">
                  <Palette className="w-4 h-4 text-fuchsia-400" />
                  Beautiful Templates
                </div>

                <div className="glass-panel px-4 py-3 rounded-xl flex items-center gap-2 text-xs text-slate-300">
                  <WandSparkles className="w-4 h-4 text-cyan-400" />
                  Easy Customization
                </div>

                <div className="glass-panel px-4 py-3 rounded-xl flex items-center gap-2 text-xs text-slate-300">
                  <Smartphone className="w-4 h-4 text-indigo-400" />
                  Mobile Ready
                </div>
              </div>

              <button
                onClick={onBuild}
                className="group relative mt-9 overflow-hidden flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 text-white font-bold text-base shadow-2xl shadow-indigo-600/30 hover:scale-[1.03] transition-all"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full folio-shine" />
                <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:rotate-[-8deg] transition-transform" />
                Build Your Portfolio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="mt-4 text-xs text-slate-500">
                Free to start • Create in minutes • Publish instantly
              </p>
            </div>

            {/* 3D Scene */}
            <div className="relative min-h-[480px] sm:min-h-[560px] perspective-stage">

              {/* Glow */}
              <div className="folio-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[430px] h-[430px] rounded-full bg-indigo-600/20 blur-[90px]" />

              {/* Main Dashboard */}
              <div className="dashboard-3d folio-card absolute left-[7%] sm:left-[8%] top-[12%] w-[88%] sm:w-[82%] rounded-[26px] border border-white/15 bg-slate-900/80 backdrop-blur-xl overflow-hidden transition-transform duration-500">

                {/* Browser bar */}
                <div className="h-11 border-b border-white/10 flex items-center px-4 gap-2 bg-white/[0.025]">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />

                  <div className="ml-4 h-6 flex-1 rounded-lg bg-white/5 flex items-center px-3 text-[9px] text-slate-500">
                    yourname.foliocraft.app
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex items-center justify-between mb-7">
                    <div className="font-bold text-sm">Alex Carter</div>

                    <div className="flex gap-4 text-[9px] text-slate-500">
                      <span>Home</span>
                      <span>About</span>
                      <span>Projects</span>
                      <span>Contact</span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-[1fr_150px] gap-5 items-center">

                    <div>
                      <div className="inline-flex px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-[9px] text-cyan-300 mb-3">
                        Available for opportunities
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-black leading-tight">
                        Hi, I’m
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-400">
                          Alex Carter
                        </span>
                      </h3>

                      <p className="mt-2 text-[10px] sm:text-xs text-slate-400">
                        Full Stack Developer & Creative Thinker
                      </p>

                      <div className="mt-5 flex gap-2">
                        <span className="px-3 py-2 rounded-lg bg-indigo-500 text-[9px] font-bold">
                          View My Work
                        </span>
                        <span className="px-3 py-2 rounded-lg border border-white/10 text-[9px]">
                          Contact
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20 border border-white/10 flex items-center justify-center overflow-hidden">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-cyan-300 via-indigo-500 to-fuchsia-500 p-1">
                          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-4xl">
                            👨‍💻
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-7">
                    <div className="h-16 rounded-xl bg-white/[0.035] border border-white/5 p-3">
                      <div className="w-10 h-1.5 bg-indigo-400/50 rounded-full mb-2" />
                      <div className="w-16 h-1 bg-white/10 rounded-full" />
                    </div>
                    <div className="h-16 rounded-xl bg-white/[0.035] border border-white/5 p-3">
                      <div className="w-12 h-1.5 bg-fuchsia-400/50 rounded-full mb-2" />
                      <div className="w-14 h-1 bg-white/10 rounded-full" />
                    </div>
                    <div className="h-16 rounded-xl bg-white/[0.035] border border-white/5 p-3">
                      <div className="w-8 h-1.5 bg-cyan-400/50 rounded-full mb-2" />
                      <div className="w-12 h-1 bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Templates floating card */}
              <div className="folio-card-delay absolute z-30 -left-1 sm:-left-8 top-[18%] w-40 sm:w-48 glass-panel rounded-2xl p-3 shadow-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <LayoutTemplate className="w-4 h-4 text-fuchsia-400" />
                  <span className="text-[10px] font-bold">Modern Templates</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  <div className="h-10 rounded-lg bg-gradient-to-br from-cyan-400/60 to-indigo-600/60" />
                  <div className="h-10 rounded-lg bg-gradient-to-br from-fuchsia-400/60 to-purple-700/60" />
                  <div className="h-10 rounded-lg bg-gradient-to-br from-indigo-400/60 to-cyan-700/60" />
                </div>

                <div className="mt-2 text-[8px] text-slate-500">
                  Choose your style
                </div>
              </div>

              {/* Edit card */}
              <div className="folio-card absolute z-40 right-0 sm:-right-7 top-[40%] w-36 glass-panel rounded-2xl p-4 shadow-2xl">
                <div className="space-y-3">
                  {['Edit', 'Customize', 'Publish'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[10px]">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-400/20 flex items-center justify-center">
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile preview */}
              <div className="folio-card-delay absolute z-40 right-[7%] sm:right-[4%] bottom-[4%] w-24 sm:w-28 rounded-[22px] border border-white/20 bg-slate-950/90 p-2 shadow-2xl">
                <div className="rounded-[16px] overflow-hidden border border-white/10 bg-slate-900">
                  <div className="h-3 border-b border-white/10" />
                  <div className="p-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 mx-auto" />
                    <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mt-2" />
                    <div className="w-16 h-1 bg-white/10 rounded-full mx-auto mt-1" />
                    <div className="h-12 bg-indigo-500/10 rounded-lg mt-3" />
                    <div className="h-12 bg-fuchsia-500/10 rounded-lg mt-2" />
                  </div>
                </div>
              </div>

              {/* Rocket */}
              <div className="folio-rocket absolute z-50 right-[2%] sm:right-[-1%] top-[5%] text-4xl sm:text-5xl drop-shadow-[0_0_25px_rgba(129,140,248,.8)]">
                🚀
              </div>

              {/* Orbit line */}
              <div className="absolute z-10 left-[2%] top-[7%] w-[92%] h-[75%] rounded-[50%] border border-indigo-400/15 rotate-[-15deg]" />

            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">

            {[
              ['10K+', 'Happy Creators', MousePointer2],
              ['50+', 'Unique Templates', LayoutTemplate],
              ['1 Min', 'To Build Your Portfolio', Zap],
              ['100%', 'Secure & Reliable', ShieldCheck],
            ].map(([number, label, Icon]) => (
              <div
                key={label}
                className="glass-panel rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform"
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-500/10 border border-indigo-400/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-indigo-300" />
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-black">{number}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">

          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs text-indigo-300 mb-3">
              <Sparkles className="w-4 h-4" />
              Everything you need
            </div>

            <h2 className="text-3xl sm:text-5xl font-black">
              Your portfolio,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-400">
                {' '}your way.
              </span>
            </h2>

            <p className="mt-4 text-slate-500">
              Powerful tools without the complexity of building everything from scratch.
            </p>
          </div>

          <div id="templates" className="grid md:grid-cols-3 gap-5 mt-12">

            {[
              [Palette, 'Beautiful Templates', 'Start with professionally designed portfolio layouts and make them yours.'],
              [WandSparkles, 'Easy Customization', 'Change colors, sections, content and design without touching complicated code.'],
              [Zap, 'Live Preview', 'See your portfolio change instantly while you build it.'],
            ].map(([Icon, title, description]) => (
              <div
                key={title}
                className="group relative glass-panel rounded-3xl p-7 overflow-hidden hover:-translate-y-2 transition-all duration-300"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl group-hover:bg-fuchsia-500/15 transition" />

                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-indigo-300" />
                </div>

                <h3 className="relative mt-6 text-lg font-bold">{title}</h3>
                <p className="relative mt-2 text-sm leading-6 text-slate-500">
                  {description}
                </p>

                <div className="relative mt-6 flex items-center gap-1 text-xs text-indigo-300">
                  Explore
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="about" className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
          <div className="relative overflow-hidden rounded-[32px] border border-indigo-400/15 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-fuchsia-600/10 p-8 sm:p-14 text-center">

            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/20 rounded-full blur-[90px]" />

            <div className="relative">
              <ShieldCheck className="w-10 h-10 text-cyan-300 mx-auto" />

              <h2 className="mt-5 text-3xl sm:text-5xl font-black">
                Your Vision + Our Tools
              </h2>

              <p className="mt-3 text-slate-400">
                = Your Dream Portfolio
              </p>

              <button
                onClick={onBuild}
                className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white text-slate-950 font-black hover:scale-[1.03] transition"
              >
                Start Building
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm font-bold">
            Folio<span className="text-indigo-400">Craft</span>
          </div>

          <div className="text-xs text-slate-600">
            Build your story. Showcase your future.
          </div>

          <div className="text-xs text-slate-600">
            © {new Date().getFullYear()} FolioCraft
          </div>
        </div>
      </footer>
    </div>
  );
}
