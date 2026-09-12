export const samplePortfolios = [
  {
    id: "dev-alex-rivera",
    slug: "alex-rivera",
    title: "Alex Rivera | Full-Stack Engineer & Cloud Architect",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 428,
    design: {
      theme: "cyberpunk", // cyberpunk, minimalist, aurora, terminal, executive
      fontFamily: "Inter", // Inter, Plus Jakarta Sans, Outfit, Fira Code, Playfair Display
      accentColor: "#6366f1", // Indigo
      secondaryColor: "#06b6d4", // Cyan
      cardStyle: "glass", // glass, flat, solid, subtle
      borderRadius: "rounded-xl", // rounded-none, rounded-lg, rounded-xl, rounded-3xl
      spacing: "comfortable", // compact, comfortable, spacious
    },
    seo: {
      metaTitle: "Alex Rivera - Senior Full Stack Developer & Cloud Architect",
      metaDescription: "Senior Full Stack Engineer building high-scale cloud platforms, distributed systems, and delightful web applications.",
      keywords: "Full Stack Developer, React, Node.js, Cloud, TypeScript, Portfolio",
    },
    hero: {
      name: "Alex Rivera",
      pronouns: "he/him",
      badge: "🟢 Available for Opportunities & Consulting",
      title: "Senior Full-Stack Engineer & Cloud Architect",
      tagline: "Crafting resilient distributed systems, sub-second web experiences, and developer-first developer tools.",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      location: "San Francisco, CA (UTC-7)",
      primaryCta: {
        text: "Explore Projects",
        link: "#projects",
      },
      secondaryCta: {
        text: "Get in Touch",
        link: "#contact",
      },
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "alex.rivera@example.com",
        calendly: "https://calendly.com",
      },
    },
    about: {
      enabled: true,
      title: "About Me",
      summary: "I'm a full-stack engineer with 7+ years of experience transforming complex technical problems into sleek, lightning-fast digital products. My core focus lies at the intersection of frontend elegance, distributed backend services, and cloud infrastructure.",
      story: "Over the past decade, I've architected microservices handling 25M+ monthly requests, led front-end teams in rebuilding enterprise design systems, and published open-source developer tooling with thousands of GitHub stars. When I'm not writing code, you can find me tinkering with mechanical keyboards, brewing pour-over coffee, or cycling across the Bay Area.",
      stats: [
        { label: "Years Experience", value: "7+" },
        { label: "Production Apps Shipped", value: "24+" },
        { label: "Monthly Active Users Served", value: "1.5M+" },
        { label: "GitHub Stars", value: "3.2k" },
      ],
      quickFacts: [
        "Specialized in TypeScript, Go, React, and AWS",
        "Passionate about Web Performance and Accessibility",
        "Frequent speaker at local developer meetups",
        "Open-source advocate and contributor",
      ],
    },
    skills: {
      enabled: true,
      title: "Skills & Technologies",
      categories: [
        {
          name: "Frontend & UI",
          skills: [
            { name: "React / Next.js", level: "Expert" },
            { name: "TypeScript", level: "Expert" },
            { name: "Tailwind CSS", level: "Expert" },
            { name: "State Management (Zustand/Redux)", level: "Advanced" },
            { name: "WebSockets & WebRTC", level: "Advanced" },
          ],
        },
        {
          name: "Backend & Systems",
          skills: [
            { name: "Node.js / Express / NestJS", level: "Expert" },
            { name: "Go (Golang)", level: "Advanced" },
            { name: "PostgreSQL / Redis", level: "Expert" },
            { name: "REST & GraphQL APIs", level: "Expert" },
            { name: "Apache Kafka / Event-Driven", level: "Intermediate" },
          ],
        },
        {
          name: "Cloud, DevOps & Tooling",
          skills: [
            { name: "Docker & Kubernetes", level: "Advanced" },
            { name: "AWS (Lambda, ECS, S3, CloudFront)", level: "Advanced" },
            { name: "CI/CD (GitHub Actions)", level: "Expert" },
            { name: "Terraform / IaC", level: "Intermediate" },
            { name: "Git & Linux Systems", level: "Expert" },
          ],
        },
      ],
    },
    experience: {
      enabled: true,
      title: "Work Experience",
      items: [
        {
          id: "exp-1",
          company: "Hyperion Cloud Solutions",
          role: "Lead Full-Stack Architect",
          period: "2023 - Present",
          location: "San Francisco, CA (Hybrid)",
          type: "Full-Time",
          description: "Spearheaded the technical overhaul of the core telemetry dashboard and streaming ingestion pipeline.",
          achievements: [
            "Architected a real-time analytics engine reducing query response latency by 58% across 10,000+ customer clusters.",
            "Mentored an engineering squad of 8 engineers and introduced automated end-to-end integration testing.",
            "Designed and implemented SOC2 Type II compliant role-based access control systems.",
          ],
          technologies: ["React", "TypeScript", "Node.js", "Go", "AWS", "Kafka", "PostgreSQL"],
        },
        {
          id: "exp-2",
          company: "Veloce Technologies",
          role: "Senior Software Engineer",
          period: "2020 - 2023",
          location: "Remote",
          type: "Full-Time",
          description: "Engineered scalable customer-facing SaaS applications and internal developer tooling.",
          achievements: [
            "Re-architected monolithic SPA into modular microfrontends, improving initial page load time by 2.4s.",
            "Implemented distributed caching with Redis, cutting database query spend by $18,000/year.",
            "Built automated billing and subscription pipelines integrating Stripe webhooks and tax compliance.",
          ],
          technologies: ["Next.js", "Express", "Redis", "Docker", "Stripe API", "Tailwind CSS"],
        },
        {
          id: "exp-3",
          company: "Nexus Digital Studio",
          role: "Software Developer",
          period: "2018 - 2020",
          location: "San Francisco, CA",
          type: "Full-Time",
          description: "Built custom web applications, dynamic e-commerce platforms, and interactive client prototypes.",
          achievements: [
            "Delivered 14 bespoke web projects on time and within budget with 99.9% uptime SLA.",
            "Collaborated directly with UI/UX design team to translate Figma prototypes into pixel-perfect components.",
          ],
          technologies: ["JavaScript", "React", "Node.js", "SCSS", "MongoDB"],
        },
      ],
    },
    projects: {
      enabled: true,
      title: "Featured Projects",
      items: [
        {
          id: "proj-1",
          title: "CloudScale Observer",
          tagline: "High-throughput cloud metrics visualizer with real-time anomaly detection.",
          description: "An open-source distributed metrics visualizer capable of processing millions of telemetry events per minute. Features customizable dashboards, threshold alerts, and instant WebHook integrations.",
          technologies: ["React", "TypeScript", "Go", "WebSockets", "TimescaleDB", "Docker"],
          liveUrl: "https://example.com/demo",
          githubUrl: "https://github.com/example/cloudscale",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
          featured: true,
          metric: "⚡ Processes 50k events/sec with <15ms latency",
        },
        {
          id: "proj-2",
          title: "DevPulse AI Assistant",
          tagline: "Autonomous CLI agent for automated code reviews and vulnerability detection.",
          description: "A terminal-first developer assistant that inspects pull requests, identifies memory leaks, generates unit test harnesses, and summarizes architectural diffs.",
          technologies: ["Node.js", "OpenAI API", "Commander.js", "AST Parser", "GitHub Actions"],
          liveUrl: "https://example.com/demo",
          githubUrl: "https://github.com/example/devpulse",
          imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
          featured: true,
          metric: "⭐ 2.1k GitHub stars & 45k npm downloads",
        },
        {
          id: "proj-3",
          title: "Aura Component Library",
          tagline: "Accessible, themeable, zero-runtime React component primitives.",
          description: "A comprehensive UI kit built on top of Radix primitives and Tailwind CSS. Fully keyboard navigable, WCAG AAA compliant, and battle-tested across enterprise suites.",
          technologies: ["React", "Tailwind CSS", "Storybook", "TypeScript", "Vite"],
          liveUrl: "https://example.com/demo",
          githubUrl: "https://github.com/example/aura-ui",
          imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
          featured: false,
          metric: "✨ 100% test coverage with Vitest",
        },
      ],
    },
    services: {
      enabled: true,
      title: "Services & Offerings",
      items: [
        {
          id: "serv-1",
          title: "Full-Stack Web App Development",
          description: "End-to-end architecture and implementation of scalable web applications using modern tech stacks (React, Node.js, TypeScript, PostgreSQL).",
          price: "Custom Scope",
          delivery: "2-8 Weeks",
        },
        {
          id: "serv-2",
          title: "Performance & Architecture Audits",
          description: "Comprehensive review of system bottlenecks, Core Web Vitals, database queries, and cloud cost optimization strategies.",
          price: "Starting at $2,500",
          delivery: "1-2 Weeks",
        },
        {
          id: "serv-3",
          title: "Technical Advisory & Mentorship",
          description: "Advising seed-stage startups on technical roadmaps, engineering hiring, system design, and developer culture.",
          price: "Retainer / Hourly",
          delivery: "Flexible",
        },
      ],
    },
    testimonials: {
      enabled: true,
      title: "Client & Peer Testimonials",
      items: [
        {
          id: "test-1",
          name: "Sarah Jenkins",
          role: "VP of Engineering",
          company: "Hyperion Cloud",
          avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
          quote: "Alex has a rare combination of deep architectural acumen and relentless execution speed. He completely transformed our customer observability platform under an aggressive timeline.",
        },
        {
          id: "test-2",
          name: "David Zhao",
          role: "Co-Founder & CTO",
          company: "Veloce Tech",
          avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
          quote: "Working with Alex was a game-changer for our frontend architecture. He not only wrote impeccable code but also elevated the standards of our entire engineering organization.",
        },
      ],
    },
    education: {
      enabled: true,
      title: "Education & Certifications",
      items: [
        {
          id: "edu-1",
          degree: "B.S. in Computer Science",
          institution: "University of California, Berkeley",
          year: "2014 - 2018",
          details: "Graduated with Honors. Coursework focused on Distributed Systems, Algorithms, and Human-Computer Interaction.",
        },
        {
          id: "edu-2",
          degree: "AWS Certified Solutions Architect – Professional",
          institution: "Amazon Web Services",
          year: "Issued 2022",
          details: "Validated expertise in designing distributed systems, cloud migrations, and cost-effective cloud architectures.",
        },
      ],
    },
    contact: {
      enabled: true,
      title: "Let's Connect",
      subtitle: "Have an exciting project, freelance opportunity, or just want to chat tech? Drop me a message or book a call!",
      email: "alex.rivera@example.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, California, US",
      bookingUrl: "https://calendly.com",
    },
    footer: {
      customText: "Designed & built with FolioCraft. Hosted globally on high-speed CDN.",
      showBadge: true,
    },
  },
  {
    id: "dev-sophia-chen",
    slug: "sophia-chen",
    title: "Sophia Chen | Lead Product Designer & Creative Developer",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 312,
    design: {
      theme: "editorial",
      fontFamily: "Outfit",
      accentColor: "#ec4899", // Rose/Pink
      secondaryColor: "#8b5cf6",
      cardStyle: "subtle",
      borderRadius: "rounded-2xl",
      spacing: "comfortable",
    },
    seo: {
      metaTitle: "Sophia Chen - Creative Product Designer & Frontend Dev",
      metaDescription: "Bridging the gap between human-centric design and pixel-perfect code.",
      keywords: "Product Designer, UI/UX, Creative Dev, Design Systems",
    },
    hero: {
      name: "Sophia Chen",
      pronouns: "she/her",
      badge: "✨ Crafting next-generation digital interfaces",
      title: "Lead Product Designer & Creative Developer",
      tagline: "Designing intuitive interfaces, cohesive design systems, and delightful digital journeys.",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
      location: "New York, NY",
      primaryCta: {
        text: "View Design Work",
        link: "#projects",
      },
      secondaryCta: {
        text: "Book Discovery Call",
        link: "#contact",
      },
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "sophia@example.com",
      },
    },
    about: {
      enabled: true,
      title: "Design Philosophy",
      summary: "I believe great products are born at the intersection of empathetic user research, structured design systems, and fluid micro-interactions.",
      story: "With a background in both human-computer interaction and modern frontend development, I don't just hand off Figma prototypes—I prototype in live code, validate with real users, and ensure design intent remains pure all the way to production.",
      stats: [
        { label: "Products Launched", value: "30+" },
        { label: "Design System Users", value: "120+ Devs" },
        { label: "Design Awards", value: "4" },
      ],
      quickFacts: [
        "Figma & Design Tokens wizard",
        "Micro-animations with Framer Motion & CSS",
        "Advocate for accessible, inclusive UX",
      ],
    },
    skills: {
      enabled: true,
      title: "Design & Tech Toolkit",
      categories: [
        {
          name: "Product Design & UX",
          skills: [
            { name: "Figma & FigJam", level: "Expert" },
            { name: "Design Systems & Tokens", level: "Expert" },
            { name: "User Research & Usability Testing", level: "Advanced" },
            { name: "Information Architecture", level: "Advanced" },
          ],
        },
        {
          name: "Creative Front-End",
          skills: [
            { name: "HTML5 / Modern CSS", level: "Expert" },
            { name: "React & Next.js", level: "Advanced" },
            { name: "Tailwind CSS", level: "Expert" },
            { name: "Motion & SVG Animation", level: "Advanced" },
          ],
        },
      ],
    },
    experience: {
      enabled: true,
      title: "Career Journey",
      items: [
        {
          id: "exp-sophia-1",
          company: "Loom & Canvas Design Studio",
          role: "Design Director",
          period: "2022 - Present",
          location: "New York, NY",
          type: "Full-Time",
          description: "Leading creative strategy and brand design for premier tech startups.",
          achievements: [
            "Built unified design system utilized by 4 cross-functional product squads.",
            "Increased consumer conversion rates by 34% through redesigned onboarding funnel.",
          ],
          technologies: ["Figma", "Design Systems", "React", "Prototyping"],
        },
      ],
    },
    projects: {
      enabled: true,
      title: "Selected Works",
      items: [
        {
          id: "proj-sophia-1",
          title: "FinFlow Mobile Banking",
          tagline: "Reimagined banking experience for millennial investors.",
          description: "A complete overhaul of banking UX prioritizing clarity, budget goal visualizations, and frictionless money movement.",
          technologies: ["Figma", "React Native", "Micro-Interactions"],
          liveUrl: "https://example.com",
          githubUrl: "",
          imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
          featured: true,
          metric: "🏆 Featured in Awwwards Mobile of the Day",
        },
      ],
    },
    services: {
      enabled: true,
      title: "Capabilities",
      items: [
        {
          id: "serv-sophia-1",
          title: "End-to-End Product Design",
          description: "From napkin sketches to hi-fi clickable prototypes and design token libraries.",
          price: "Project-Based",
          delivery: "3-6 Weeks",
        },
      ],
    },
    testimonials: {
      enabled: false,
      title: "Kind Words",
      items: [],
    },
    education: {
      enabled: true,
      title: "Education",
      items: [
        {
          id: "edu-sophia-1",
          degree: "B.Des in Interaction Design",
          institution: "Rhode Island School of Design (RISD)",
          year: "2015 - 2019",
          details: "Specialized in digital interfaces, typography, and experimental media.",
        },
      ],
    },
    contact: {
      enabled: true,
      title: "Start a Conversation",
      subtitle: "Got a project in mind? Let's build something beautiful together.",
      email: "sophia@example.com",
      location: "New York, NY",
    },
    footer: {
      customText: "Designed with love & precision. Crafted on FolioCraft.",
      showBadge: true,
    },
  },
  {
    id: "dev-marcus-terminal",
    slug: "marcus-vance",
    title: "Marcus Vance | Cybersec & Systems Hacker",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 189,
    design: {
      theme: "terminal",
      fontFamily: "Fira Code",
      accentColor: "#10b981", // Emerald green CRT
      secondaryColor: "#34d399",
      cardStyle: "flat",
      borderRadius: "rounded-none",
      spacing: "compact",
    },
    seo: {
      metaTitle: "Marcus Vance - Systems Engineer & Security Analyst",
      metaDescription: "Kernel exploitation, distributed systems, and low-level engineering.",
      keywords: "Systems, Security, Rust, C, Linux, DevOps",
    },
    hero: {
      name: "Marcus Vance",
      pronouns: "he/him",
      badge: "root@sec-ops:~$ status --active",
      title: "Systems Engineer & Security Researcher",
      tagline: "Low-level systems, kernel development, network security, and infrastructure resilience.",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
      location: "Austin, TX (Remote)",
      primaryCta: {
        text: "./inspect-projects.sh",
        link: "#projects",
      },
      secondaryCta: {
        text: "./send-message.sh",
        link: "#contact",
      },
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "marcus@security.dev",
      },
    },
    about: {
      enabled: true,
      title: "$ cat about_me.txt",
      summary: "I build robust, high-performance systems and uncover security vulnerabilities before bad actors can.",
      story: "Passionate about Linux internals, Rust, distributed protocols, and zero-trust infrastructure architecture.",
      stats: [
        { label: "CVEs Discovered", value: "7" },
        { label: "Kernel Patches Merged", value: "14" },
        { label: "Uptime Record", value: "99.999%" },
      ],
      quickFacts: [
        "Rust, C, Assembly, Go",
        "Linux eBPF & Packet Filtering",
        "Zero-Trust Architecture",
      ],
    },
    skills: {
      enabled: true,
      title: "$ ls -la skills/",
      categories: [
        {
          name: "Low-Level & Languages",
          skills: [
            { name: "Rust", level: "Expert" },
            { name: "C / C++", level: "Advanced" },
            { name: "Go", level: "Advanced" },
            { name: "Python / Bash", level: "Expert" },
          ],
        },
        {
          name: "Security & Infrastructure",
          skills: [
            { name: "eBPF & Linux Kernel", level: "Advanced" },
            { name: "Kubernetes & Network Policy", level: "Expert" },
            { name: "Penetration Testing & Red Teaming", level: "Advanced" },
            { name: "Cryptography & PKI", level: "Intermediate" },
          ],
        },
      ],
    },
    experience: {
      enabled: true,
      title: "$ history | grep employment",
      items: [
        {
          id: "exp-marcus-1",
          company: "IronGate Cyber Defense",
          role: "Staff Security Infrastructure Engineer",
          period: "2021 - Present",
          location: "Austin, TX",
          type: "Full-Time",
          description: "Building zero-trust network infrastructure and autonomous intrusion defense systems.",
          achievements: [
            "Implemented custom eBPF network filtering layer dropping DDoS attack vectors at kernel level with 0% CPU spike.",
            "Audited mission-critical cryptographic modules for FedRAMP High certification.",
          ],
          technologies: ["Rust", "eBPF", "Linux", "WireGuard", "Kubernetes"],
        },
      ],
    },
    projects: {
      enabled: true,
      title: "$ find ./projects -type f",
      items: [
        {
          id: "proj-marcus-1",
          title: "PacketGuard-rs",
          tagline: "High-speed network packet inspection and anomaly filter written in Rust.",
          description: "Zero-copy packet parsing engine capable of wire-speed packet analysis on 10Gbps interfaces.",
          technologies: ["Rust", "XDP", "eBPF", "Prometheus"],
          liveUrl: "",
          githubUrl: "https://github.com",
          imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
          featured: true,
          metric: "🛡️ Defended 100M+ malicious requests",
        },
      ],
    },
    services: {
      enabled: false,
      title: "Services",
      items: [],
    },
    testimonials: {
      enabled: false,
      title: "Testimonials",
      items: [],
    },
    education: {
      enabled: true,
      title: "$ cat credentials.log",
      items: [
        {
          id: "edu-marcus-1",
          degree: "B.S. in Computer Engineering",
          institution: "University of Texas at Austin",
          year: "2015 - 2019",
          details: "Specialized in Embedded Systems, Computer Architecture, and Cryptography.",
        },
      ],
    },
    contact: {
      enabled: true,
      title: "$ ping marcus@security.dev",
      subtitle: "Encrypted communications welcomed. Send an inquiry or reach out directly.",
      email: "marcus@security.dev",
      location: "Austin, TX",
    },
    footer: {
      customText: "TERMINAL_SESSION: EXECUTED_CLEANLY [STATUS: 200 OK]",
      showBadge: true,
    },
  },
];
