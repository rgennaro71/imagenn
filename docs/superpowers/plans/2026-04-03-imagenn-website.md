# IMAGENN.AI Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full IMAGENN.AI marketing website — a premium dark-aesthetic Next.js site with 12-section homepage, 8 inner pages, 3 functional forms, and MDX-powered insights.

**Architecture:** Next.js 14 App Router with a shared design system (Tailwind tokens + shadcn/ui). Homepage is a single scroll-driven page; inner pages share the same Navbar/Footer layout shell. All content-driven data (use cases, site config, insights articles) lives in dedicated content files, never hardcoded in components.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Playfair Display + DM Sans (Google Fonts), React Hook Form + Zod, Resend, Vercel Analytics, Lucide React, next-mdx-remote

---

## Chunk 1: Project Setup & Design System

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Create: `next.config.ts`

- [ ] **Step 1: Scaffold the project in the existing directory**

```bash
cd /Users/rob-26/Documents/htdocs/imagenn
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --use-npm
```

When prompted:
- Would you like to use Turbopack? → **No**

- [ ] **Step 2: Verify scaffold succeeded**

```bash
ls -la | grep -E "package.json|tsconfig|tailwind|next.config"
```

Expected: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts` all present.

- [ ] **Step 3: Install additional dependencies**

```bash
npm install framer-motion lucide-react react-hook-form @hookform/resolvers zod resend next-mdx-remote gray-matter reading-time @vercel/analytics
npm install -D @types/node
```

- [ ] **Step 4: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted:
- Which style? → **Default**
- Which base color? → **Slate**
- CSS variables? → **Yes**

- [ ] **Step 5: Add required shadcn components**

```bash
npx shadcn@latest add button input label textarea select tabs badge card
```

- [ ] **Step 6: Verify install**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with shadcn/ui and dependencies"
```

---

### Task 2: Configure Tailwind design tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `tailwind.config.ts` with IMAGENN.AI design tokens**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dark: "#4f46e5",
        },
        cyan: {
          brand: "#22d3ee",
          alt: "#0ea5e9",
        },
        obsidian: {
          DEFAULT: "#08091a",
          secondary: "#0d0d20",
          surface: "#0f0f28",
          elevated: "#13132a",
        },
        slate: {
          primary: "#f8fafc",
          secondary: "#94a3b8",
          muted: "#64748b",
          border: "rgba(255,255,255,0.06)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(90deg, #818cf8, #22d3ee)",
        "gradient-brand-diagonal": "linear-gradient(135deg, #6366f1, #22d3ee)",
        "gradient-dark": "linear-gradient(135deg, #08091a 0%, #0d0d20 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(99,102,241,0.08)",
        "glow-md": "0 0 60px rgba(99,102,241,0.12)",
        card: "0 4px 20px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      maxWidth: {
        content: "1280px",
      },
      spacing: {
        section: "96px",
        "section-sm": "64px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

- [ ] **Step 2: Install tailwindcss-animate plugin**

```bash
npm install tailwindcss-animate
```

- [ ] **Step 3: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222 47% 6%;
    --foreground: 210 40% 98%;
    --card: 222 47% 8%;
    --card-foreground: 210 40% 98%;
    --popover: 222 47% 6%;
    --popover-foreground: 210 40% 98%;
    --primary: 239 84% 67%;
    --primary-foreground: 0 0% 100%;
    --secondary: 215 28% 17%;
    --secondary-foreground: 210 40% 98%;
    --muted: 215 28% 17%;
    --muted-foreground: 215 20% 65%;
    --accent: 215 28% 17%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
    --border: 215 28% 12%;
    --input: 215 28% 12%;
    --ring: 239 84% 67%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-obsidian text-slate-primary font-sans antialiased;
  }
  h1, h2 {
    @apply font-serif;
  }
  h3, h4, h5, h6 {
    @apply font-sans;
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-gradient-brand bg-clip-text text-transparent;
  }
  .section-padding {
    @apply py-section px-4 sm:px-6 lg:px-8;
  }
  .section-padding-sm {
    @apply py-section-sm px-4 sm:px-6 lg:px-8;
  }
  .content-width {
    @apply max-w-content mx-auto;
  }
  .glow-border {
    border: 1px solid rgba(99,102,241,0.3);
  }
  .subtle-border {
    border: 1px solid rgba(255,255,255,0.06);
  }
}
```

- [ ] **Step 4: Verify Tailwind config compiles**

```bash
npm run dev &
sleep 5 && curl -s http://localhost:3000 | head -20
kill %1
```

Expected: HTML response returned (no build error).

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts app/globals.css package.json package-lock.json
git commit -m "chore: configure Tailwind design tokens for IMAGENN.AI brand"
```

---

### Task 3: Configure fonts and site config

**Files:**
- Create: `lib/site-config.ts`
- Create: `lib/fonts.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `lib/fonts.ts`**

```typescript
// lib/fonts.ts
import { Playfair_Display, DM_Sans } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
```

- [ ] **Step 2: Create `lib/site-config.ts`**

```typescript
// lib/site-config.ts

export const siteConfig = {
  name: "IMAGENN.AI",
  tagline: "Modernize How Your Business Thinks.",
  description:
    "IMAGENN.AI is an AI innovation and automation company helping organizations modernize operations, eliminate bottlenecks, and build AI-powered foundations for scalable growth.",
  url: "https://imagenn.ai",
  ogImage: "/og-image.png",

  // Contact & booking
  calendlyUrl: "https://calendly.com/imagennai", // Rob to update
  adminEmail: "hello@imagenn.ai", // Rob to update
  contactEmail: "hello@imagenn.ai",

  // Founder
  founder: {
    firstName: "Rob",
    lastName: "LAST_NAME_PLACEHOLDER", // Rob to update before launch
    fullName: "Rob LAST_NAME_PLACEHOLDER",
    title: "Founder & CEO, IMAGENN.AI",
    bio: "Rob is a sought-after voice on AI innovation, digital transformation, and the future of how organizations work.",
  },

  // Stats — set showStats: true and populate values before launch
  showStats: false,
  stats: {
    organizationsServed: "50+",
    automationsDeployed: "200+",
    avgEfficiencyGains: "40%",
  },

  // Speaking engagements — add entries to show section on /speaking
  speakingEngagements: [] as Array<{
    event: string;
    role: string;
    date: string;
    location: string;
  }>,

  // Speaking testimonials — add entries to show section on /speaking
  speakingTestimonials: [] as Array<{
    quote: string;
    name: string;
    title: string;
    company: string;
  }>,

  // Social links
  social: {
    linkedin: "https://linkedin.com/company/imagennai",
    twitter: "https://twitter.com/imagennai",
  },

  // Navigation
  nav: [
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "About", href: "/about" },
    { label: "Speaking", href: "/speaking" },
    { label: "Insights", href: "/insights" },
  ],
};
```

- [ ] **Step 3: Update `app/layout.tsx`**

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import { playfair, dmSans } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-obsidian text-slate-primary font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add lib/site-config.ts lib/fonts.ts app/layout.tsx
git commit -m "feat: add site config, fonts, and root layout"
```

---

### Task 4: Build shared UI primitives

**Files:**
- Create: `components/shared/SectionHeader.tsx`
- Create: `components/shared/GradientText.tsx`
- Create: `components/shared/GlowOrb.tsx`
- Create: `components/shared/BackgroundGrid.tsx`
- Create: `components/shared/CTASection.tsx`

- [ ] **Step 1: Create `components/shared/SectionHeader.tsx`**

```typescript
// components/shared/SectionHeader.tsx
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-16", align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-tight tracking-tight mb-4">
        {heading}
      </h2>
      {subheading && (
        <p className="text-lg text-slate-secondary max-w-2xl mx-auto leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/shared/GradientText.tsx`**

```typescript
// components/shared/GradientText.tsx
import { cn } from "@/lib/utils";

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("bg-gradient-brand bg-clip-text text-transparent", className)}>
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create `components/shared/GlowOrb.tsx`**

```typescript
// components/shared/GlowOrb.tsx
import { cn } from "@/lib/utils";

interface GlowOrbProps {
  color?: "indigo" | "cyan";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: "w-48 h-48", md: "w-72 h-72", lg: "w-96 h-96" };

export function GlowOrb({ color = "indigo", size = "md", className }: GlowOrbProps) {
  const style =
    color === "indigo"
      ? { background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }
      : { background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)" };

  return (
    <div
      className={cn("absolute pointer-events-none rounded-full", sizeMap[size], className)}
      style={style}
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 4: Create `components/shared/BackgroundGrid.tsx`**

```typescript
// components/shared/BackgroundGrid.tsx
export function BackgroundGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
      }}
    />
  );
}
```

- [ ] **Step 5: Create `components/shared/CTASection.tsx`**

```typescript
// components/shared/CTASection.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "./GlowOrb";

interface CTASectionProps {
  heading: string;
  subheading: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  eyebrow?: string;
}

export function CTASection({
  heading,
  subheading,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  eyebrow,
}: CTASectionProps) {
  return (
    <section className="relative bg-obsidian-secondary overflow-hidden">
      <GlowOrb color="indigo" size="lg" className="-top-24 -right-24" />
      <GlowOrb color="cyan" size="md" className="-bottom-16 -left-16" />
      <div className="relative content-width section-padding text-center">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary mb-6 tracking-tight">
          {heading}
        </h2>
        <p className="text-lg text-slate-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-indigo hover:bg-indigo-dark text-white font-semibold px-8">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button asChild size="lg" variant="outline" className="border-white/10 text-slate-secondary hover:border-indigo/50 hover:text-slate-primary">
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/shared/
git commit -m "feat: add shared UI primitives (SectionHeader, GradientText, GlowOrb, BackgroundGrid, CTASection)"
```

---

## Chunk 2: Layout Shell

### Task 5: Build Navbar

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Create `components/layout/Navbar.tsx`**

```typescript
// components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-obsidian/90 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="content-width px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span
            className="font-serif font-bold text-xl tracking-wide"
            style={{
              background: "linear-gradient(90deg, #818cf8, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                pathname === item.href
                  ? "text-slate-primary"
                  : "text-slate-muted hover:text-slate-secondary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild size="sm" className="bg-indigo hover:bg-indigo-dark text-white font-semibold px-5">
            <Link href="/contact">Book a Call</Link>
          </Button>
        </div>

        <button
          className="md:hidden text-slate-secondary hover:text-slate-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-obsidian/95 backdrop-blur-md border-t border-white/5 px-4 py-6 flex flex-col gap-5">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-slate-secondary hover:text-slate-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="bg-indigo hover:bg-indigo-dark text-white font-semibold w-full mt-2">
            <Link href="/contact">Book a Call</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add sticky Navbar with mobile menu"
```

---

### Task 6: Build Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create `components/layout/Footer.tsx`**

```typescript
// components/layout/Footer.tsx
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const footerLinks = {
  Services: [
    { label: "AI Strategy & Mapping", href: "/services#ai-strategy" },
    { label: "AI-Powered Decision Support", href: "/services#decision-support" },
    { label: "Change Enablement", href: "/services#change-enablement" },
    { label: "Workflow Automation", href: "/services#workflow-automation" },
    { label: "All Services", href: "/services" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Speaking", href: "/speaking" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  Solutions: [
    { label: "Operations", href: "/solutions#operations" },
    { label: "Sales", href: "/solutions#sales" },
    { label: "Customer Experience", href: "/solutions#cx" },
    { label: "Leadership", href: "/solutions#leadership" },
    { label: "All Use Cases", href: "/solutions" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/5">
      <div className="content-width px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <span
              className="font-serif font-bold text-lg tracking-wide block mb-4"
              style={{
                background: "linear-gradient(90deg, #818cf8, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {siteConfig.name}
            </span>
            <p className="text-sm text-slate-muted leading-relaxed mb-6 max-w-xs">
              AI innovation and automation for organizations ready to modernize how they work and grow.
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-muted hover:text-indigo-light transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-muted hover:text-indigo-light transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-muted mb-5">
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-muted hover:text-slate-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-slate-muted hover:text-slate-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-slate-muted hover:text-slate-secondary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer with navigation columns and social links"
```

---

### Task 7: Wire layout shell

**Files:**
- Create: `app/(main)/layout.tsx`
- Create: `app/(main)/page.tsx`

- [ ] **Step 1: Create `app/(main)/layout.tsx`**

```typescript
// app/(main)/layout.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create placeholder `app/(main)/page.tsx`**

```typescript
// app/(main)/page.tsx
export default function HomePage() {
  return <div className="min-h-screen pt-24 text-slate-primary text-center">Homepage coming soon</div>;
}
```

- [ ] **Step 3: Remove the old `app/page.tsx`**

```bash
rm -f app/page.tsx
```

- [ ] **Step 4: Verify dev server renders Navbar + Footer**

```bash
npm run dev
```

Open http://localhost:3000 — confirm Navbar at top, Footer at bottom. No console errors.

- [ ] **Step 5: Commit**

```bash
git add "app/(main)/"
git commit -m "feat: wire layout shell with Navbar and Footer via route group"
```

---

## Chunk 3: Homepage Sections 01–06

### Task 8: Hero Section

**Files:**
- Create: `components/sections/HeroSection.tsx`
- Modify: `app/(main)/page.tsx`

- [ ] **Step 1: Create `components/sections/HeroSection.tsx`**

```typescript
// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { BackgroundGrid } from "@/components/shared/BackgroundGrid";
import { GradientText } from "@/components/shared/GradientText";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian pt-20">
      <BackgroundGrid />
      <GlowOrb color="indigo" size="lg" className="-top-32 -right-32 opacity-60" />
      <GlowOrb color="cyan" size="md" className="-bottom-24 -left-24 opacity-50" />

      <div className="relative content-width px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-muted mb-6">
            AI Innovation & Automation
          </p>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-slate-primary leading-[1.1] tracking-tight mb-8 max-w-4xl mx-auto">
            Modernize How Your{" "}
            <GradientText>Business Thinks.</GradientText>
          </h1>

          <p className="text-lg sm:text-xl text-slate-secondary max-w-2xl mx-auto leading-relaxed mb-10">
            We help ambitious organizations eliminate operational friction,
            automate what slows them down, and build the AI-powered foundation
            their next stage of growth demands.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-indigo hover:bg-indigo-dark text-white font-semibold px-8 h-12 text-base"
            >
              <Link href="/contact?intent=call">Book a Strategy Call</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/10 text-slate-secondary hover:border-indigo/40 hover:text-slate-primary h-12 text-base group"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Contact Us
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>

          <p className="text-sm text-slate-muted">
            Trusted by founders, CEOs, and operations leaders building the next chapter of their organization.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `app/(main)/page.tsx`**

```typescript
// app/(main)/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000. Confirm: full-viewport hero, serif headline, gradient text on "Business Thinks.", dual CTAs, glow orbs. No errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/HeroSection.tsx "app/(main)/page.tsx"
git commit -m "feat: add Hero section with editorial serif headline and dual CTA"
```

---

### Task 9: Credibility Strip

**Files:**
- Create: `components/sections/CredibilityStrip.tsx`

- [ ] **Step 1: Create `components/sections/CredibilityStrip.tsx`**

```typescript
// components/sections/CredibilityStrip.tsx
import { Brain, Zap, Settings, BarChart3 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const audiences = [
  "Founders", "CEOs", "COOs", "Innovation Leaders", "Operations Teams", "Transformation Leaders",
];

const capabilities = [
  { icon: Brain, label: "AI Strategy & Roadmapping" },
  { icon: Zap, label: "Workflow Automation" },
  { icon: Settings, label: "Operational Transformation" },
  { icon: BarChart3, label: "AI-Powered Decision Support" },
];

export function CredibilityStrip() {
  return (
    <section className="bg-obsidian-secondary border-y border-white/5">
      <div className="content-width px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
              Who We Help
            </p>
            <div className="flex flex-wrap gap-2">
              {audiences.map((a) => (
                <span
                  key={a}
                  className="text-sm text-slate-secondary px-3 py-1 rounded-full subtle-border bg-obsidian-surface"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
              Core Capabilities
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {capabilities.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-start gap-2">
                  <div className="w-8 h-8 rounded-md bg-indigo/10 flex items-center justify-center">
                    <Icon size={16} className="text-indigo-light" />
                  </div>
                  <span className="text-sm text-slate-secondary leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {siteConfig.showStats && (
          <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-white/5">
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-gradient mb-1">
                {siteConfig.stats.organizationsServed}
              </p>
              <p className="text-sm text-slate-muted">Organizations Served</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-gradient mb-1">
                {siteConfig.stats.automationsDeployed}
              </p>
              <p className="text-sm text-slate-muted">Automations Deployed</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-gradient mb-1">
                {siteConfig.stats.avgEfficiencyGains}
              </p>
              <p className="text-sm text-slate-muted">Avg. Efficiency Gains</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to homepage**

In `app/(main)/page.tsx`, import and add `<CredibilityStrip />` below `<HeroSection />`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/CredibilityStrip.tsx "app/(main)/page.tsx"
git commit -m "feat: add Credibility Strip with audiences, capabilities, and conditional stats"
```

---

### Task 10: Problem Section

**Files:**
- Create: `components/sections/ProblemSection.tsx`

- [ ] **Step 1: Create `components/sections/ProblemSection.tsx`**

```typescript
// components/sections/ProblemSection.tsx
import { AlertCircle, Layers, Hand, Clock, Lightbulb, GitMerge } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const problems = [
  {
    icon: Layers,
    title: "Legacy Infrastructure Mindset",
    description: "Outdated systems and thinking patterns holding back modern execution.",
  },
  {
    icon: GitMerge,
    title: "Disconnected Tools & Data",
    description: "Teams working in silos, decisions made without the full picture.",
  },
  {
    icon: Hand,
    title: "Manual Everything",
    description: "High-value people spending their time on low-value, repetitive work.",
  },
  {
    icon: Clock,
    title: "Slow Decision-Making",
    description: "Missing the window to act because insight arrives too late.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Paralysis",
    description: "Knowing AI matters but having no clear path to start with confidence.",
  },
  {
    icon: AlertCircle,
    title: "Operational Friction",
    description: "Bottlenecks that compound — slowing every team, every quarter.",
  },
];

export function ProblemSection() {
  return (
    <section className="section-padding bg-obsidian">
      <div className="content-width">
        <SectionHeader
          eyebrow="The Challenge"
          heading="Your Organization Deserves Better Than This."
          subheading="Most organizations are running on systems, processes, and mindsets built for a world that no longer exists."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group p-6 rounded-lg bg-obsidian-surface subtle-border hover:glow-border hover:bg-obsidian-elevated transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-md bg-red-500/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-red-400" />
              </div>
              <h3 className="font-sans font-semibold text-base text-slate-primary mb-2">{title}</h3>
              <p className="text-sm text-slate-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to homepage**

Add `<ProblemSection />` below `<CredibilityStrip />` in `app/(main)/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/ProblemSection.tsx "app/(main)/page.tsx"
git commit -m "feat: add Problem section with 6 pain point cards"
```

---

### Task 11: Services Section

**Files:**
- Create: `components/shared/ServiceCard.tsx`
- Create: `components/sections/ServicesSection.tsx`

- [ ] **Step 1: Create `components/shared/ServiceCard.tsx`**

```typescript
// components/shared/ServiceCard.tsx
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  variant?: "lead" | "secondary";
}

export function ServiceCard({ icon: Icon, title, description, href, variant = "secondary" }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block p-6 rounded-lg subtle-border transition-all duration-200",
        variant === "lead"
          ? "bg-obsidian-surface hover:bg-obsidian-elevated hover:glow-border"
          : "bg-obsidian-secondary hover:bg-obsidian-surface hover:border-white/10"
      )}
    >
      <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mb-4", variant === "lead" ? "bg-indigo/15" : "bg-indigo/10")}>
        <Icon size={variant === "lead" ? 22 : 18} className="text-indigo-light" />
      </div>
      <h3 className={cn("font-sans font-semibold text-slate-primary mb-2", variant === "lead" ? "text-lg" : "text-base")}>
        {title}
      </h3>
      {description && (
        <p className="text-sm text-slate-muted leading-relaxed mb-4">{description}</p>
      )}
      <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-light group-hover:gap-2 transition-all">
        Learn more <ArrowRight size={12} />
      </span>
    </Link>
  );
}
```

- [ ] **Step 2: Create `components/sections/ServicesSection.tsx`**

```typescript
// components/sections/ServicesSection.tsx
import Link from "next/link";
import { Brain, BarChart3, Users, Zap, Settings, BookOpen, HeadphonesIcon, Cpu } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { Button } from "@/components/ui/button";

const leadServices = [
  {
    icon: Brain,
    title: "AI Strategy & Opportunity Mapping",
    description: "Identify where AI creates real business impact. Map your highest-value automation opportunities. Build a roadmap that connects innovation to execution.",
    href: "/services#ai-strategy",
  },
  {
    icon: BarChart3,
    title: "AI-Powered Decision Support",
    description: "Move from gut feel to intelligent insight. We build decision frameworks and AI tools that surface the right information at the right moment.",
    href: "/services#decision-support",
  },
  {
    icon: Users,
    title: "Change Enablement & AI Adoption",
    description: "Technology alone doesn't transform organizations. We guide your teams through the shifts that make AI adoption stick.",
    href: "/services#change-enablement",
  },
];

const secondaryServices = [
  { icon: Zap, title: "Workflow Automation", href: "/services#workflow-automation", description: "" },
  { icon: Settings, title: "Operational Transformation", href: "/services#operational-transformation", description: "" },
  { icon: BookOpen, title: "Intelligent Knowledge Systems", href: "/services#knowledge-systems", description: "" },
  { icon: HeadphonesIcon, title: "Customer Experience Automation", href: "/services#cx-automation", description: "" },
  { icon: Cpu, title: "Internal Productivity Systems", href: "/services#productivity", description: "" },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-obsidian-secondary">
      <div className="content-width">
        <SectionHeader
          eyebrow="What We Do"
          heading="AI That Moves Your Business Forward."
          subheading="Practical, execution-focused services designed to create real operational impact — not just strategy decks."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {leadServices.map((s) => <ServiceCard key={s.title} {...s} variant="lead" />)}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {secondaryServices.map((s) => <ServiceCard key={s.title} {...s} variant="secondary" />)}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="border-white/10 text-slate-secondary hover:border-indigo/40 hover:text-slate-primary">
            <Link href="/services">Explore All Services →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to homepage**

Add `<ServicesSection />` below `<ProblemSection />` in `app/(main)/page.tsx`.

- [ ] **Step 4: Commit**

```bash
git add components/shared/ServiceCard.tsx components/sections/ServicesSection.tsx "app/(main)/page.tsx"
git commit -m "feat: add Services section with lead and secondary service cards"
```

---

### Task 12: Solutions / Use Cases Section

**Files:**
- Create: `content/use-cases.ts`
- Create: `components/shared/UseCaseCard.tsx`
- Create: `components/sections/SolutionsSection.tsx`

- [ ] **Step 1: Create `content/use-cases.ts`**

```typescript
// content/use-cases.ts

export type UseCase = {
  category: string;
  problem: string;
  solution: string;
  impact: string;
};

export const useCases: Record<string, UseCase[]> = {
  Operations: [
    {
      problem: "Reporting takes hours of manual data aggregation every week.",
      solution: "Automated reporting pipelines pull data from all sources and deliver formatted reports on schedule.",
      impact: "Eliminate 80% of manual reporting time. Insights arrive faster, decisions improve.",
    },
    {
      problem: "Approval workflows are slow, inconsistent, and tracked in email threads.",
      solution: "Structured digital workflows route requests, capture decisions, and enforce SLAs automatically.",
      impact: "Decisions in hours instead of days. Full audit trail. Fewer things falling through the cracks.",
    },
    {
      problem: "Staff spend hours on manual data entry across disconnected systems.",
      solution: "AI-powered integrations and automation eliminate duplicate entry and keep systems in sync.",
      impact: "Hours reclaimed per week per person. Data accuracy improves. Staff focus on higher-value work.",
    },
  ],
  Sales: [
    {
      problem: "Sales reps waste time manually qualifying leads that will never convert.",
      solution: "AI scoring models evaluate inbound leads against your ideal customer profile automatically.",
      impact: "Reps focus only on high-probability opportunities. Conversion rates improve. Pipeline moves faster.",
    },
    {
      problem: "Writing proposals takes days and still ends up inconsistent.",
      solution: "AI-assisted proposal generation pulls from a curated library and customizes for each opportunity.",
      impact: "Proposals produced in hours. Consistent, on-brand, and tailored every time.",
    },
    {
      problem: "No visibility into where deals are stalling or why pipeline is slipping.",
      solution: "Pipeline intelligence dashboards surface risk signals and stall points in real time.",
      impact: "Managers intervene early. Forecasting accuracy improves. Revenue leakage reduced.",
    },
  ],
  Marketing: [
    {
      problem: "Campaign performance data is scattered across 5 different platforms.",
      solution: "Unified marketing automation pulls all performance data into one dashboard with automated alerts.",
      impact: "Single source of truth. Marketing decisions backed by complete data. Faster optimization cycles.",
    },
    {
      problem: "Content briefs take days to research and write from scratch.",
      solution: "AI brief generation tools produce research-backed content outlines from a target keyword or topic.",
      impact: "Brief production time cut by 70%. Content team focuses on writing, not research.",
    },
    {
      problem: "Audience segmentation is manual and based on guesswork.",
      solution: "AI-assisted segmentation analyzes behavioral data to identify meaningful audience clusters.",
      impact: "More precise targeting. Higher engagement rates. Less budget wasted on wrong audiences.",
    },
  ],
  "Customer Experience": [
    {
      problem: "Support tickets get routed to the wrong team and bounce between agents.",
      solution: "Intelligent routing classifies incoming requests by type, urgency, and expertise needed.",
      impact: "First-contact resolution improves. Handle time drops. Customer satisfaction scores rise.",
    },
    {
      problem: "New customer onboarding is inconsistent and relies on individual reps remembering the process.",
      solution: "Automated onboarding workflows trigger the right actions at the right time, every time.",
      impact: "Consistent experience for every customer. Time-to-value improves. Churn in first 90 days drops.",
    },
    {
      problem: "Support team spends most of their time answering the same questions repeatedly.",
      solution: "AI-powered FAQ resolution handles common queries automatically with escalation paths for complex cases.",
      impact: "50–70% of tier-1 queries handled without human intervention. Team focuses on complex issues.",
    },
  ],
  Leadership: [
    {
      problem: "Leadership doesn't have real-time visibility into KPIs — they wait for weekly reports.",
      solution: "Executive dashboards surface the metrics that matter, updated in real time from live data sources.",
      impact: "Leaders make decisions on current data. Weekly status meetings get shorter. Surprises decrease.",
    },
    {
      problem: "Board reporting takes the leadership team 2–3 days to compile every quarter.",
      solution: "Automated board reporting pulls data, formats slides, and flags anomalies for human review.",
      impact: "Reporting time drops from days to hours. Leadership spends time on narrative, not data assembly.",
    },
    {
      problem: "No structured way to capture and act on data needed for strategic decisions.",
      solution: "AI-powered decision briefing tools aggregate relevant data and surface it in the right format at decision time.",
      impact: "Faster, better-informed strategic decisions. Less meeting time spent gathering information.",
    },
  ],
  "Team Productivity": [
    {
      problem: "Teams spend hours searching for information spread across emails, docs, and chat.",
      solution: "Internal AI copilots connect to your knowledge sources and answer questions in natural language.",
      impact: "Information retrieval time drops dramatically. Onboarding new staff becomes faster and easier.",
    },
    {
      problem: "Meeting follow-up is inconsistent — action items get lost and decisions aren't recorded.",
      solution: "Meeting intelligence tools capture, transcribe, summarize, and distribute action items automatically.",
      impact: "Every meeting has a clear record. Action items tracked. Accountability improves.",
    },
    {
      problem: "Repetitive internal workflows slow every department but aren't worth a full engineering project.",
      solution: "Lightweight AI workflow tools handle the most common internal tasks with no engineering overhead.",
      impact: "Hours reclaimed per team per week. Morale improves when busywork disappears.",
    },
  ],
  "Knowledge Management": [
    {
      problem: "Institutional knowledge lives in people's heads and walks out the door when they leave.",
      solution: "Centralized, searchable knowledge bases capture processes, decisions, and expertise in structured formats.",
      impact: "Knowledge becomes a durable organizational asset. Onboarding faster. Expertise accessible to all.",
    },
    {
      problem: "Staff can't find answers in long policy documents or dense internal guides.",
      solution: "Document Q&A systems let staff ask questions in plain language and get accurate, cited answers instantly.",
      impact: "Information retrieval time drops from hours to seconds. Fewer interruptions to senior staff.",
    },
    {
      problem: "Onboarding new employees takes weeks because knowledge is unstructured and tribal.",
      solution: "AI-powered onboarding knowledge systems guide new hires through the right information at the right time.",
      impact: "Time-to-productivity for new hires improves significantly. Consistent onboarding every time.",
    },
  ],
};

export const useCaseCategories = Object.keys(useCases);
```

- [ ] **Step 2: Create `components/shared/UseCaseCard.tsx`**

```typescript
// components/shared/UseCaseCard.tsx
import { AlertCircle, Lightbulb, TrendingUp } from "lucide-react";

interface UseCaseCardProps {
  problem: string;
  solution: string;
  impact: string;
}

export function UseCaseCard({ problem, solution, impact }: UseCaseCardProps) {
  return (
    <div className="p-6 rounded-lg bg-obsidian-surface subtle-border hover:glow-border hover:bg-obsidian-elevated transition-all duration-200 flex flex-col gap-4">
      <div className="flex gap-3">
        <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
        <p className="text-sm text-slate-secondary leading-relaxed">{problem}</p>
      </div>
      <div className="flex gap-3">
        <Lightbulb size={15} className="text-indigo-light shrink-0 mt-0.5" />
        <p className="text-sm text-slate-secondary leading-relaxed">{solution}</p>
      </div>
      <div className="flex gap-3">
        <TrendingUp size={15} className="text-cyan-brand shrink-0 mt-0.5" />
        <p className="text-sm text-slate-muted leading-relaxed">{impact}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `components/sections/SolutionsSection.tsx`**

```typescript
// components/sections/SolutionsSection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { UseCaseCard } from "@/components/shared/UseCaseCard";
import { useCases, useCaseCategories } from "@/content/use-cases";
import { cn } from "@/lib/utils";

export function SolutionsSection() {
  const [activeCategory, setActiveCategory] = useState(useCaseCategories[0]);

  return (
    <section className="section-padding bg-obsidian">
      <div className="content-width">
        <SectionHeader
          eyebrow="Solutions"
          heading="Real Problems. Practical AI Solutions."
          subheading="Concrete automation and AI applications organized by where your organization needs them most."
          align="center"
        />

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {useCaseCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "bg-indigo text-white"
                  : "text-slate-muted hover:text-slate-secondary subtle-border bg-obsidian-surface hover:bg-obsidian-elevated"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {useCases[activeCategory].map((uc, i) => (
            <UseCaseCard key={i} {...uc} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="border-white/10 text-slate-secondary hover:border-indigo/40 hover:text-slate-primary">
            <Link href="/solutions">See All Use Cases →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add to homepage**

Add `<SolutionsSection />` below `<ServicesSection />` in `app/(main)/page.tsx`.

- [ ] **Step 5: Commit**

```bash
git add content/use-cases.ts components/shared/UseCaseCard.tsx components/sections/SolutionsSection.tsx "app/(main)/page.tsx"
git commit -m "feat: add Solutions section with tabbed use case cards"
```

---

### Task 13: Why IMAGENN.AI Section

**Files:**
- Create: `components/sections/WhyUsSection.tsx`

- [ ] **Step 1: Create `components/sections/WhyUsSection.tsx`**

```typescript
// components/sections/WhyUsSection.tsx
import { Target, Rocket, Wrench, Building2, Palette, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const differentiators = [
  {
    icon: Target,
    title: "Business-First, Not Tech Theater",
    description: "Every engagement starts with business outcomes, not technology. If AI doesn't move the needle, we don't build it.",
  },
  {
    icon: Rocket,
    title: "Execution-Focused",
    description: "We bridge strategy and implementation. You don't get a deck — you get results.",
  },
  {
    icon: Wrench,
    title: "Practical AI, Not Hype",
    description: "We deploy AI that works in your organization today, not theoretical solutions for a hypothetical future.",
  },
  {
    icon: Building2,
    title: "Operational Depth",
    description: "We understand how organizations actually run — the processes, the friction, the people. That's where transformation happens.",
  },
  {
    icon: Palette,
    title: "Modern UX + Process Thinking",
    description: "We build AI tools your teams actually want to use. Adoption is part of the design.",
  },
  {
    icon: TrendingUp,
    title: "Scalable from Day One",
    description: "Everything we build is designed to grow with your organization, not become tomorrow's legacy problem.",
  },
];

export function WhyUsSection() {
  return (
    <section className="section-padding bg-obsidian-secondary">
      <div className="content-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
              Why IMAGENN.AI
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-tight tracking-tight mb-6">
              We Build for Real Impact.{" "}
              <span className="text-gradient">Not for the Demo.</span>
            </h2>
            <p className="text-lg text-slate-secondary leading-relaxed">
              Most AI engagements end at strategy. We start there and go all the way to
              implementation, adoption, and scale — because that's where organizations actually change.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {differentiators.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-5 rounded-lg bg-obsidian-surface subtle-border hover:glow-border transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-md bg-indigo/10 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-indigo-light" />
                </div>
                <h3 className="font-sans font-semibold text-sm text-slate-primary mb-2">{title}</h3>
                <p className="text-sm text-slate-muted leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to homepage**

Add `<WhyUsSection />` below `<SolutionsSection />` in `app/(main)/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/WhyUsSection.tsx "app/(main)/page.tsx"
git commit -m "feat: add Why IMAGENN.AI section with 6 differentiator cards"
```

---

## Chunk 4: Homepage Sections 07–12

### Task 14: Process Section

**Files:**
- Create: `components/shared/ProcessStep.tsx`
- Create: `components/sections/ProcessSection.tsx`

- [ ] **Step 1: Create `components/shared/ProcessStep.tsx`**

```typescript
// components/shared/ProcessStep.tsx

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  outcome: string;
  isLast?: boolean;
}

export function ProcessStep({ number, title, description, outcome, isLast }: ProcessStepProps) {
  return (
    <div className="relative flex flex-col items-start">
      {!isLast && (
        <div
          className="hidden lg:block absolute top-5 left-full w-full h-px -translate-y-px"
          style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.3), transparent)" }}
          aria-hidden="true"
        />
      )}

      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white mb-5 shrink-0"
        style={{ background: "linear-gradient(135deg, #6366f1, #22d3ee)" }}
      >
        {number}
      </div>

      <h3 className="font-sans font-bold text-lg text-slate-primary mb-3">{title}</h3>
      <p className="text-sm text-slate-secondary leading-relaxed mb-4">{description}</p>
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-light">
          Outcome:{" "}
        </span>
        <span className="text-xs text-slate-muted">{outcome}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/sections/ProcessSection.tsx`**

```typescript
// components/sections/ProcessSection.tsx
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProcessStep } from "@/components/shared/ProcessStep";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We map your organization's current state: systems, workflows, data, people, and pain points. We find where AI creates real leverage — and where it doesn't.",
    outcome: "Clear picture of your highest-impact automation and AI opportunities.",
  },
  {
    number: "02",
    title: "Design",
    description: "We architect the solution — AI strategy, automation design, process re-engineering — with your team's reality at the center, not an idealized version of it.",
    outcome: "A practical roadmap your organization can actually execute.",
  },
  {
    number: "03",
    title: "Build",
    description: "We implement. Automation workflows, AI-powered tools, decision systems. Practical, tested, and integrated into how your organization works — not bolted on.",
    outcome: "Working AI systems deployed in your environment.",
  },
  {
    number: "04",
    title: "Scale",
    description: "We help you grow the capability. Adoption support, team enablement, iteration cycles. The foundation grows with you and compounds over time.",
    outcome: "An organization with expanding AI capability and competitive advantage.",
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding bg-obsidian">
      <div className="content-width">
        <SectionHeader
          eyebrow="How We Work"
          heading="From Strategy to Scale — All of It."
          subheading="A four-step framework designed to take you from insight to implementation without losing momentum."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <ProcessStep key={step.number} {...step} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to homepage**

Add `<ProcessSection />` below `<WhyUsSection />` in `app/(main)/page.tsx`.

- [ ] **Step 4: Commit**

```bash
git add components/shared/ProcessStep.tsx components/sections/ProcessSection.tsx "app/(main)/page.tsx"
git commit -m "feat: add Process section with Discover→Design→Build→Scale framework"
```

---

### Task 15: Speaking Section

**Files:**
- Create: `components/sections/SpeakingSection.tsx`

- [ ] **Step 1: Create `components/sections/SpeakingSection.tsx`**

```typescript
// components/sections/SpeakingSection.tsx
import Link from "next/link";
import { Mic, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const expertiseTags = [
  "AI Innovation", "Digital Transformation", "Future of Work",
  "Operational Intelligence", "AI Adoption & Change", "Business Modernization",
];

const topics = [
  "How Organizations Can Move Beyond Legacy Thinking",
  "Practical AI: What Works, What Doesn't, and What's Next",
  "The Automation Imperative for Mid-Market Companies",
  "Building an AI-Ready Organization",
  "AI and the Future of Operations",
];

export function SpeakingSection() {
  return (
    <section className="section-padding bg-obsidian-secondary">
      <div className="content-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-6">
              <Mic size={24} className="text-yellow-400" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
              Speaking & Panels
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-tight tracking-tight mb-6">
              Bring AI Innovation to Your Stage.
            </h2>
            <p className="text-lg text-slate-secondary leading-relaxed mb-8">
              {siteConfig.founder.firstName} is a sought-after voice on AI innovation,
              digital transformation, and the future of how organizations work — bringing
              practical insight to panels, keynotes, and executive briefings.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {expertiseTags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full subtle-border bg-obsidian-surface text-slate-secondary">
                  {tag}
                </span>
              ))}
            </div>

            <Button asChild className="bg-indigo hover:bg-indigo-dark text-white font-semibold">
              <Link href="/speaking" className="flex items-center gap-2">
                Invite {siteConfig.founder.firstName} to Speak
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-5">Topics</p>
            <ul className="flex flex-col gap-3">
              {topics.map((topic, i) => (
                <li key={topic} className="flex items-start gap-4 p-4 rounded-lg bg-obsidian-surface subtle-border">
                  <span
                    className="text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: "linear-gradient(90deg,#818cf8,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-slate-secondary">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to homepage**

Add `<SpeakingSection />` below `<ProcessSection />` in `app/(main)/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/SpeakingSection.tsx "app/(main)/page.tsx"
git commit -m "feat: add Speaking section for Rob's speaking engagements"
```

---

### Task 16: Waitlist Section

**Files:**
- Create: `components/sections/WaitlistSection.tsx`

- [ ] **Step 1: Create `components/sections/WaitlistSection.tsx`**

```typescript
// components/sections/WaitlistSection.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlowOrb } from "@/components/shared/GlowOrb";

const waitlistSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export function WaitlistSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setLoading(true);
    setServerError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative overflow-hidden section-padding"
      style={{ background: "linear-gradient(135deg, #0d0d20 0%, #0a0a1a 50%, #080814 100%)" }}
    >
      <GlowOrb color="indigo" size="lg" className="-top-32 right-1/4 opacity-40" />
      <GlowOrb color="cyan" size="md" className="bottom-0 left-1/4 opacity-30" />

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative content-width px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo/10 subtle-border mb-6">
          <Sparkles size={13} className="text-indigo-light" />
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-light">Coming Soon</span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-tight tracking-tight mb-6 max-w-3xl mx-auto">
          The Future of Work Is Being Built Right Now.
        </h2>

        <p className="text-lg text-slate-secondary max-w-2xl mx-auto leading-relaxed mb-10">
          IMAGENN.AI is developing a suite of AI-powered SaaS products for organizations
          ready to lead — not follow — the automation era. Join the waitlist for early access.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-indigo/10 glow-border">
            <CheckCircle size={20} className="text-cyan-brand" />
            <p className="text-slate-primary font-medium">You're on the list — we'll be in touch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <Input
                {...register("firstName")}
                placeholder="First name"
                className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted h-12"
              />
              {errors.firstName && <p className="text-red-400 text-xs mt-1 text-left">{errors.firstName.message}</p>}
            </div>
            <div className="flex-[2]">
              <Input
                {...register("email")}
                type="email"
                placeholder="Work email"
                className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted h-12"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1 text-left">{errors.email.message}</p>}
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-6 font-semibold whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #6366f1, #22d3ee)", color: "white" }}
            >
              {loading ? "Joining..." : "Join the Waitlist"}
            </Button>
          </form>
        )}

        {serverError && <p className="text-red-400 text-sm mt-3">{serverError}</p>}
        {!submitted && <p className="text-xs text-slate-muted mt-4">No spam. Early access only. Be first.</p>}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to homepage**

Add `<WaitlistSection />` below `<SpeakingSection />` in `app/(main)/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/WaitlistSection.tsx "app/(main)/page.tsx"
git commit -m "feat: add Waitlist section with email capture form"
```

---

### Task 17: FutureProof + InsightsPreview + FinalCTA Sections

**Files:**
- Create: `components/sections/FutureProofSection.tsx`
- Create: `components/shared/InsightCard.tsx`
- Create: `components/sections/InsightsPreviewSection.tsx`
- Create: `components/sections/FinalCTASection.tsx`
- Create: `components/forms/ContactForm.tsx` (stub — replaced fully in Chunk 5)

- [ ] **Step 1: Create `components/sections/FutureProofSection.tsx`**

```typescript
// components/sections/FutureProofSection.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "@/components/shared/GlowOrb";

export function FutureProofSection() {
  return (
    <section className="relative section-padding bg-obsidian overflow-hidden">
      <GlowOrb color="indigo" size="lg" className="top-0 left-1/4 opacity-20" />
      <GlowOrb color="cyan" size="md" className="bottom-0 right-1/4 opacity-15" />

      <div className="relative content-width px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-primary leading-tight tracking-tight mb-8">
          The organizations winning the next decade aren't waiting for the right moment.{" "}
          <span style={{ background: "linear-gradient(90deg,#818cf8,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            They're building it.
          </span>
        </h2>
        <p className="text-lg text-slate-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
          IMAGENN.AI exists to help ambitious organizations get ahead of change — not react to it.
          The tools, the strategy, the execution. All of it, built around what your organization
          actually needs to move forward.
        </p>
        <Button asChild size="lg" className="bg-indigo hover:bg-indigo-dark text-white font-semibold px-8 h-12">
          <Link href="/contact">Start Your Transformation →</Link>
        </Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/shared/InsightCard.tsx`**

```typescript
// components/shared/InsightCard.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InsightCardProps {
  category: string;
  title: string;
  description: string;
  readTime: string;
  slug: string;
}

export function InsightCard({ category, title, description, readTime, slug }: InsightCardProps) {
  return (
    <Link
      href={`/insights/${slug}`}
      className="group block p-6 rounded-lg bg-obsidian-surface subtle-border hover:glow-border hover:bg-obsidian-elevated transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-light px-2 py-1 bg-indigo/10 rounded">
          {category}
        </span>
        <span className="text-xs text-slate-muted">{readTime}</span>
      </div>
      <h3 className="font-sans font-semibold text-base text-slate-primary mb-3 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-slate-muted leading-relaxed mb-4">{description}</p>
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-light group-hover:gap-2.5 transition-all">
        Read more <ArrowRight size={12} />
      </span>
    </Link>
  );
}
```

- [ ] **Step 3: Create `components/sections/InsightsPreviewSection.tsx`**

```typescript
// components/sections/InsightsPreviewSection.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { InsightCard } from "@/components/shared/InsightCard";

const previewInsights = [
  {
    category: "Strategy",
    title: "Moving Beyond Legacy Infrastructure Mindset",
    description: "Why the biggest obstacle to AI adoption isn't technology — and what leaders need to address first.",
    readTime: "5 min read",
    slug: "moving-beyond-legacy-infrastructure-mindset",
  },
  {
    category: "Automation",
    title: "Where Automation Creates Immediate Business Value",
    description: "The 5 operational areas where automation delivers the fastest, most measurable return.",
    readTime: "6 min read",
    slug: "where-automation-creates-immediate-business-value",
  },
  {
    category: "AI Readiness",
    title: "AI Readiness for Mid-Market Companies",
    description: "A practical framework for organizations ready to move from AI curiosity to AI capability.",
    readTime: "7 min read",
    slug: "ai-readiness-for-mid-market-companies",
  },
];

export function InsightsPreviewSection() {
  return (
    <section className="section-padding bg-obsidian-secondary">
      <div className="content-width">
        <SectionHeader
          eyebrow="Insights"
          heading="Thinking That Moves Organizations Forward."
          subheading="Practical perspectives on AI adoption, operational transformation, and building organizations for the AI era."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {previewInsights.map((insight) => (
            <InsightCard key={insight.slug} {...insight} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="border-white/10 text-slate-secondary hover:border-indigo/40 hover:text-slate-primary">
            <Link href="/insights">Explore All Insights →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/forms/ContactForm.tsx` stub**

```typescript
// components/forms/ContactForm.tsx
// STUB — replaced fully in Chunk 5 Task 19
export function ContactForm() {
  return (
    <div className="text-slate-muted text-center p-8 subtle-border rounded-lg">
      Contact form loading...
    </div>
  );
}
```

- [ ] **Step 5: Create `components/sections/FinalCTASection.tsx`**

```typescript
// components/sections/FinalCTASection.tsx
import { ContactForm } from "@/components/forms/ContactForm";
import { GlowOrb } from "@/components/shared/GlowOrb";

export function FinalCTASection() {
  return (
    <section className="relative section-padding bg-obsidian overflow-hidden">
      <GlowOrb color="indigo" size="lg" className="-top-24 -right-24 opacity-50" />
      <GlowOrb color="cyan" size="md" className="-bottom-16 -left-16 opacity-40" />

      <div className="relative content-width px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-tight tracking-tight mb-6">
            Ready to Modernize How Your Organization Works?
          </h2>
          <p className="text-lg text-slate-secondary leading-relaxed">
            Whether you're ready to start or still working out where to begin — let's talk.
            A strategy conversation costs nothing. The status quo costs everything.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <ContactForm />
        </div>

        <p className="text-center text-xs text-slate-muted mt-6">
          No commitment required. We respond within 1 business day.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Complete `app/(main)/page.tsx` with all 12 sections**

```typescript
// app/(main)/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SpeakingSection } from "@/components/sections/SpeakingSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { FutureProofSection } from "@/components/sections/FutureProofSection";
import { InsightsPreviewSection } from "@/components/sections/InsightsPreviewSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CredibilityStrip />
      <ProblemSection />
      <ServicesSection />
      <SolutionsSection />
      <WhyUsSection />
      <ProcessSection />
      <SpeakingSection />
      <WaitlistSection />
      <FutureProofSection />
      <InsightsPreviewSection />
      <FinalCTASection />
    </>
  );
}
```

- [ ] **Step 7: Verify all 12 sections render**

```bash
npm run dev
```

Scroll through http://localhost:3000. All 12 sections visible. No console errors.

- [ ] **Step 8: Commit**

```bash
git add components/sections/ components/shared/InsightCard.tsx components/forms/ContactForm.tsx "app/(main)/page.tsx"
git commit -m "feat: complete homepage with all 12 sections"
```

---

## Chunk 5: Forms & API Routes

### Task 18: Waitlist API route

**Files:**
- Create: `app/api/waitlist/route.ts`
- Create: `.env.example`

- [ ] **Step 1: Create `app/api/waitlist/route.ts`**

```typescript
// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  firstName: z.string().min(1),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, email } = schema.parse(body);

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: email,
      subject: `You're on the IMAGENN.AI waitlist`,
      html: `<h2>You're on the list, ${firstName}.</h2><p>Thank you for joining the IMAGENN.AI product waitlist. You'll be among the first to access our AI-powered tools when they launch.</p><p>— The IMAGENN.AI Team</p>`,
    });

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: siteConfig.adminEmail,
      subject: `New waitlist signup: ${firstName} (${email})`,
      html: `<p><strong>Name:</strong> ${firstName}</p><p><strong>Email:</strong> ${email}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Create `.env.example`**

```bash
# .env.example
RESEND_API_KEY=re_YOUR_KEY_HERE
```

- [ ] **Step 3: Create `.env.local` with placeholder**

```bash
echo "RESEND_API_KEY=re_placeholder" > .env.local
```

- [ ] **Step 4: Test the route**

```bash
npm run dev &
sleep 3
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","email":"test@example.com"}'
kill %1
```

Expected: `{"success":true}` (email send fails silently without a real key — that's fine for now).

- [ ] **Step 5: Commit**

```bash
git add app/api/waitlist/route.ts .env.example
git commit -m "feat: add waitlist API route with Resend email notifications"
```

---

### Task 19: Contact API route + ContactForm component

**Files:**
- Create: `app/api/contact/route.ts`
- Modify: `components/forms/ContactForm.tsx` (replace stub)

- [ ] **Step 1: Create `app/api/contact/route.ts`**

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  intent: z.enum(["call", "message"]),
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const isCall = data.intent === "call";

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: data.email,
      subject: isCall ? "Your strategy call request — IMAGENN.AI" : "Thanks for reaching out — IMAGENN.AI",
      html: isCall
        ? `<h2>Thanks, ${data.name}.</h2><p>We received your request to book a strategy call. We'll send you a scheduling link within 1 business day.</p><p>— The IMAGENN.AI Team</p>`
        : `<h2>Thanks for reaching out, ${data.name}.</h2><p>We've received your message and will get back to you within 1 business day.</p><p>— The IMAGENN.AI Team</p>`,
    });

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: siteConfig.adminEmail,
      subject: `New ${isCall ? "call request" : "contact"}: ${data.name} (${data.company ?? "no company"})`,
      html: `<p><strong>Intent:</strong> ${data.intent}</p><p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Company:</strong> ${data.company ?? "—"}</p><p><strong>Role:</strong> ${data.role ?? "—"}</p><p><strong>Message:</strong> ${data.message ?? "—"}</p>`,
    });

    return NextResponse.json({ success: true, intent: data.intent });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Replace `components/forms/ContactForm.tsx` stub with full implementation**

```typescript
// components/forms/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const schema = z.object({
  intent: z.enum(["call", "message"]),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof schema>;

export function ContactForm() {
  const [intent, setIntent] = useState<"call" | "message">("call");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { intent: "call" },
  });

  const switchIntent = (val: "call" | "message") => {
    setIntent(val);
    setValue("intent", val);
  };

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      if (data.intent === "call") {
        window.open(siteConfig.calendlyUrl, "_blank", "noopener,noreferrer");
      }
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-lg bg-obsidian-surface subtle-border text-center">
        <CheckCircle size={32} className="text-cyan-brand mx-auto mb-4" />
        <h3 className="font-sans font-semibold text-slate-primary text-lg mb-2">
          {intent === "call" ? "Request received — check your email." : "Message sent."}
        </h3>
        <p className="text-sm text-slate-muted">
          {intent === "call"
            ? "We've also opened Calendly so you can book a time directly."
            : "We respond within 1 business day."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-obsidian-surface subtle-border">
        {(["call", "message"] as const).map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => switchIntent(val)}
            className={cn(
              "py-2.5 rounded-md text-sm font-semibold transition-all duration-200",
              intent === val
                ? "bg-indigo text-white shadow"
                : "text-slate-muted hover:text-slate-secondary"
            )}
          >
            {val === "call" ? "Book a Strategy Call" : "Send a Message"}
          </button>
        ))}
      </div>
      <input type="hidden" {...register("intent")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-xs text-slate-muted mb-1.5 block">Name *</Label>
          <Input id="name" {...register("name")} placeholder="Your name" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="text-xs text-slate-muted mb-1.5 block">Email *</Label>
          <Input id="email" type="email" {...register("email")} placeholder="Work email" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company" className="text-xs text-slate-muted mb-1.5 block">Company</Label>
          <Input id="company" {...register("company")} placeholder="Organization name" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
        </div>
        <div>
          <Label htmlFor="role" className="text-xs text-slate-muted mb-1.5 block">Your Role</Label>
          <Input id="role" {...register("role")} placeholder="e.g. CEO, COO, VP Ops" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
        </div>
      </div>

      {intent === "message" && (
        <div>
          <Label htmlFor="message" className="text-xs text-slate-muted mb-1.5 block">Message</Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="What would you like to discuss?"
            rows={4}
            className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted resize-none"
          />
        </div>
      )}

      {serverError && <p className="text-red-400 text-sm">{serverError}</p>}

      <Button
        type="submit"
        disabled={loading}
        size="lg"
        className="w-full bg-indigo hover:bg-indigo-dark text-white font-semibold h-12"
      >
        {loading ? "Sending..." : intent === "call" ? "Request Strategy Call" : "Send Message"}
        {intent === "call" && !loading && <ExternalLink size={14} className="ml-2" />}
      </Button>
    </form>
  );
}
```

- [ ] **Step 3: Verify contact form renders**

```bash
npm run dev
```

Check http://localhost:3000 — scroll to Final CTA section. Toggle between "Book a Strategy Call" and "Send a Message". Both states render correctly with validation.

- [ ] **Step 4: Commit**

```bash
git add app/api/contact/route.ts components/forms/ContactForm.tsx
git commit -m "feat: add ContactForm with Book-a-Call/Message toggle and contact API route"
```

---

### Task 20: Speaking API route + SpeakingForm component

**Files:**
- Create: `app/api/speaking/route.ts`
- Create: `components/forms/SpeakingForm.tsx`

- [ ] **Step 1: Create `app/api/speaking/route.ts`**

```typescript
// app/api/speaking/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  eventName: z.string().min(1),
  eventType: z.enum(["Keynote", "Panel", "Workshop", "Podcast", "Other"]),
  audienceSize: z.enum(["<50", "50-200", "200-500", "500-1000", "1000+"]),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: data.email,
      subject: `Speaking inquiry received — IMAGENN.AI`,
      html: `<h2>Thanks for reaching out, ${data.name}.</h2><p>We've received your speaking inquiry for <strong>${data.eventName}</strong>. We'll review the details and get back to you within 2 business days.</p><p>— The IMAGENN.AI Team</p>`,
    });

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: siteConfig.adminEmail,
      subject: `New speaking inquiry: ${data.eventName} (${data.eventType})`,
      html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Company:</strong> ${data.company}</p><p><strong>Event:</strong> ${data.eventName}</p><p><strong>Type:</strong> ${data.eventType}</p><p><strong>Audience:</strong> ${data.audienceSize}</p><p><strong>Preferred date:</strong> ${data.preferredDate ?? "—"}</p><p><strong>Message:</strong> ${data.message ?? "—"}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Create `components/forms/SpeakingForm.tsx`**

```typescript
// components/forms/SpeakingForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().min(1, "Company is required"),
  eventName: z.string().min(1, "Event name is required"),
  eventType: z.enum(["Keynote", "Panel", "Workshop", "Podcast", "Other"]),
  audienceSize: z.enum(["<50", "50-200", "200-500", "500-1000", "1000+"]),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
});

type SpeakingFormData = z.infer<typeof schema>;

export function SpeakingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SpeakingFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SpeakingFormData) => {
    setLoading(true);
    setServerError(null);
    try {
      const res = await fetch("/api/speaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-lg bg-obsidian-surface subtle-border text-center">
        <CheckCircle size={32} className="text-cyan-brand mx-auto mb-4" />
        <h3 className="font-sans font-semibold text-slate-primary text-lg mb-2">Inquiry received.</h3>
        <p className="text-sm text-slate-muted">We'll review the details and respond within 2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs text-slate-muted mb-1.5 block">Name *</Label>
          <Input {...register("name")} placeholder="Your name" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label className="text-xs text-slate-muted mb-1.5 block">Email *</Label>
          <Input type="email" {...register("email")} placeholder="Work email" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs text-slate-muted mb-1.5 block">Company *</Label>
          <Input {...register("company")} placeholder="Organization" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
          {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>}
        </div>
        <div>
          <Label className="text-xs text-slate-muted mb-1.5 block">Event Name *</Label>
          <Input {...register("eventName")} placeholder="e.g. AI Summit 2026" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
          {errors.eventName && <p className="text-red-400 text-xs mt-1">{errors.eventName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs text-slate-muted mb-1.5 block">Event Type *</Label>
          <Select onValueChange={(val) => setValue("eventType", val as SpeakingFormData["eventType"])}>
            <SelectTrigger className="bg-obsidian-surface border-white/10 text-slate-primary">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-obsidian-surface border-white/10">
              {["Keynote", "Panel", "Workshop", "Podcast", "Other"].map((t) => (
                <SelectItem key={t} value={t} className="text-slate-primary">{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.eventType && <p className="text-red-400 text-xs mt-1">Event type is required</p>}
        </div>
        <div>
          <Label className="text-xs text-slate-muted mb-1.5 block">Audience Size *</Label>
          <Select onValueChange={(val) => setValue("audienceSize", val as SpeakingFormData["audienceSize"])}>
            <SelectTrigger className="bg-obsidian-surface border-white/10 text-slate-primary">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent className="bg-obsidian-surface border-white/10">
              {["<50", "50-200", "200-500", "500-1000", "1000+"].map((s) => (
                <SelectItem key={s} value={s} className="text-slate-primary">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.audienceSize && <p className="text-red-400 text-xs mt-1">Audience size is required</p>}
        </div>
      </div>

      <div>
        <Label className="text-xs text-slate-muted mb-1.5 block">Preferred Date</Label>
        <Input type="date" {...register("preferredDate")} className="bg-obsidian-surface border-white/10 text-slate-primary" />
      </div>

      <div>
        <Label className="text-xs text-slate-muted mb-1.5 block">Additional Details</Label>
        <Textarea
          {...register("message")}
          placeholder="Tell us more about the event, format, audience, or any specific topics you'd like covered."
          rows={4}
          className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted resize-none"
        />
      </div>

      {serverError && <p className="text-red-400 text-sm">{serverError}</p>}

      <Button type="submit" disabled={loading} size="lg" className="w-full bg-indigo hover:bg-indigo-dark text-white font-semibold h-12">
        {loading ? "Sending..." : "Submit Speaking Inquiry"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/api/speaking/route.ts components/forms/SpeakingForm.tsx
git commit -m "feat: add SpeakingForm and speaking API route with Resend"
```

---

## Chunk 6: Inner Pages

### Task 21: Services page

**Files:**
- Create: `app/(main)/services/page.tsx`

- [ ] **Step 1: Create `app/(main)/services/page.tsx`**

Implement full Services page with all 8 services. Each service entry includes:
- Unique anchor `id` (e.g. `id="ai-strategy"`) for deep linking from Navbar footer links
- Icon, title, overview paragraph
- Who it's for (boxed callout)
- Pain points list (red dash prefix)
- Deliverables list (indigo arrow prefix)
- Business outcomes list (cyan checkmark prefix)

Services in order: AI Strategy, Decision Support, Change Enablement, Workflow Automation, Operational Transformation, Knowledge Systems, CX Automation, Productivity.

Full content for each service is defined in the design spec at `docs/superpowers/specs/2026-04-03-imagenn-website-design.md` Section 6 `/services`.

Page structure:
1. Hero section (pt-32, GlowOrb, H1 with gradient)
2. Services list section (stacked, `gap-20` between entries, two-column grid: left=title+overview+who, right=pains+deliverables+outcomes)
3. `<CTASection>` at bottom

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Open http://localhost:3000/services. All 8 services listed. Deep links (e.g. `/services#ai-strategy`) scroll correctly. CTA at bottom.

- [ ] **Step 3: Commit**

```bash
git add "app/(main)/services/"
git commit -m "feat: add Services page with full depth for all 8 services"
```

---

### Task 22: Solutions page

**Files:**
- Create: `app/(main)/solutions/layout.tsx`
- Create: `app/(main)/solutions/page.tsx`

- [ ] **Step 1: Create `app/(main)/solutions/layout.tsx`** (metadata only — needed because page.tsx uses "use client")

```typescript
// app/(main)/solutions/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  description: "AI and automation use cases organized by business function — Operations, Sales, CX, Leadership, and more.",
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 2: Create `app/(main)/solutions/page.tsx`**

```typescript
// app/(main)/solutions/page.tsx
"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { UseCaseCard } from "@/components/shared/UseCaseCard";
import { CTASection } from "@/components/shared/CTASection";
import { useCases, useCaseCategories } from "@/content/use-cases";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { cn } from "@/lib/utils";

export default function SolutionsPage() {
  const [activeCategory, setActiveCategory] = useState(useCaseCategories[0]);

  return (
    <>
      <section className="relative pt-32 pb-20 bg-obsidian overflow-hidden">
        <GlowOrb color="cyan" size="lg" className="-top-32 -left-32 opacity-40" />
        <div className="relative content-width px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">Solutions</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-primary leading-tight tracking-tight mb-6 max-w-3xl">
            Real Problems. <span className="text-gradient">Practical AI Solutions.</span>
          </h1>
          <p className="text-xl text-slate-secondary max-w-2xl leading-relaxed">
            21 concrete AI and automation applications organized by where your organization needs them most.
          </p>
        </div>
      </section>

      <section className="section-padding bg-obsidian-secondary">
        <div className="content-width px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {useCaseCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === cat
                    ? "bg-indigo text-white"
                    : "text-slate-muted hover:text-slate-secondary subtle-border bg-obsidian-surface hover:bg-obsidian-elevated"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {useCases[activeCategory].map((uc, i) => (
              <UseCaseCard key={i} {...uc} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="See Your Use Case Here?"
        heading="Let's Build It for Your Organization."
        subheading="Every use case is a proven starting point. The real work is mapping it to how your organization actually operates — that's what we do."
        primaryLabel="Book a Strategy Call"
        primaryHref="/contact?intent=call"
        secondaryLabel="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add "app/(main)/solutions/"
git commit -m "feat: add Solutions page with full filterable 21-card use case grid"
```

---

### Task 23: About, Speaking, Contact, Waitlist pages

**Files:**
- Create: `app/(main)/about/page.tsx`
- Create: `app/(main)/speaking/page.tsx`
- Create: `app/(main)/contact/page.tsx`
- Create: `app/(main)/waitlist/page.tsx`

- [ ] **Step 1: Create `app/(main)/about/page.tsx`**

Page structure:
1. Hero: large serif H1 "We exist to make AI real for organizations that are ready to move."
2. Mission section: two-column — left: mission copy, right: 5 principles list (→ prefix)
3. Founder section: Rob's name (from siteConfig), bio, link to /speaking
4. `<CTASection>`

Full content in spec Section 6 `/about`.

- [ ] **Step 2: Create `app/(main)/speaking/page.tsx`**

Page structure:
1. Hero: two-column — left: intro + H1 "Bring AI Innovation to Your Stage", right: headshot placeholder div
2. Topics section: 5 topic cards with numbered gradient prefix and description
3. Speaking formats section: 4 format cards (Keynote, Panel, Workshop, Podcast)
4. Past engagements: `{siteConfig.speakingEngagements.length > 0 && (...)}` conditional render
5. Testimonials: `{siteConfig.speakingTestimonials.length > 0 && (...)}` conditional render
6. Booking form section: `<SpeakingForm />`
7. FAQ section: 4 Q&A pairs

Full content in spec Section 6 `/speaking`.

- [ ] **Step 3: Create `app/(main)/contact/page.tsx`**

Page structure:
1. Full-viewport section with two columns
2. Left: H1 "Let's start the conversation.", subheadline, 3 trust bullets (✓ prefix)
3. Right: white-surface card containing `<ContactForm />`

Full content in spec Section 6 `/contact`.

- [ ] **Step 4: Create `app/(main)/waitlist/page.tsx`**

Page structure:
1. Hero: centered H1 "The Future of Work Is Being Built Right Now."
2. Benefits section: 3 cards (Priority Access, Founder Pricing, Shape the Product) + aspirational copy line
3. `<WaitlistSection />` (reused from homepage)

Full content in spec Section 6 `/waitlist`.

- [ ] **Step 5: Verify all pages**

```bash
npm run dev
```

Check `/about`, `/speaking`, `/contact`, `/waitlist` — all load without errors, layout shell present.

- [ ] **Step 6: Commit**

```bash
git add "app/(main)/about/" "app/(main)/speaking/" "app/(main)/contact/" "app/(main)/waitlist/"
git commit -m "feat: add About, Speaking, Contact, and Waitlist inner pages"
```

---

### Task 24: Insights pages + MDX setup

**Files:**
- Create: `lib/mdx.ts`
- Create: `content/insights/moving-beyond-legacy-infrastructure-mindset.mdx`
- Create: `content/insights/where-automation-creates-immediate-business-value.mdx`
- Create: `content/insights/ai-readiness-for-mid-market-companies.mdx`
- Create: `app/(main)/insights/page.tsx`
- Create: `app/(main)/insights/[slug]/page.tsx`

- [ ] **Step 1: Install `@tailwindcss/typography`**

```bash
npm install @tailwindcss/typography
```

Add to `tailwind.config.ts` plugins array:

```typescript
plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
```

- [ ] **Step 2: Create `lib/mdx.ts`**

```typescript
// lib/mdx.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type InsightFrontmatter = {
  title: string;
  description: string;
  category: string;
  slug: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
};

export type Insight = InsightFrontmatter & { content: string };

const INSIGHTS_DIR = path.join(process.cwd(), "content/insights");

export function getAllInsights(): InsightFrontmatter[] {
  const files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        ...(data as InsightFrontmatter),
        slug: file.replace(".mdx", ""),
        readTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getInsightBySlug(slug: string): Insight | null {
  const filePath = path.join(INSIGHTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    ...(data as InsightFrontmatter),
    slug,
    readTime: readingTime(content).text,
    content,
  };
}
```

- [ ] **Step 3: Create three MDX articles in `content/insights/`**

Article content is defined in the design spec. Create three files with frontmatter + body:

**`moving-beyond-legacy-infrastructure-mindset.mdx`** — frontmatter: `featured: true`, `category: Strategy`, `publishedAt: 2026-04-01`

**`where-automation-creates-immediate-business-value.mdx`** — frontmatter: `featured: false`, `category: Automation`, `publishedAt: 2026-03-20`

**`ai-readiness-for-mid-market-companies.mdx`** — frontmatter: `featured: false`, `category: AI Readiness`, `publishedAt: 2026-03-05`

Full article body text is in the design spec — copy from there.

- [ ] **Step 4: Create `app/(main)/insights/page.tsx`**

Page structure:
1. Hero section with `<SectionHeader>` (eyebrow: Insights, H1, subheadline)
2. Featured article card (`insights.find(i => i.featured)`)
3. Article grid for non-featured articles
4. `<WaitlistSection />` at bottom (serves as newsletter CTA)

- [ ] **Step 5: Create `app/(main)/insights/[slug]/page.tsx`**

Page structure:
1. Breadcrumb (Insights → Category)
2. Category badge + H1 + read time + date
3. `<MDXRemote source={insight.content} />` in `prose prose-invert` container (max-w-[720px])
4. Author block (Rob's initials avatar + name + title from siteConfig)
5. Related articles grid (2 cards, other insights)
6. `<CTASection>`

Add `generateStaticParams` and `generateMetadata` exports.

- [ ] **Step 6: Verify insights**

```bash
npm run build
npm run start
```

Open `/insights` — article list renders. Open `/insights/moving-beyond-legacy-infrastructure-mindset` — MDX renders correctly with prose styles.

- [ ] **Step 7: Commit**

```bash
git add lib/mdx.ts content/insights/ "app/(main)/insights/" tailwind.config.ts package.json package-lock.json
git commit -m "feat: add Insights pages with MDX articles and article detail layout"
```

---

## Chunk 7: SEO Layer & Final Polish

### Task 25: SEO technical files

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `public/llms.txt`
- Modify: `app/layout.tsx` (add JSON-LD schema)

- [ ] **Step 1: Create `app/sitemap.ts`**

```typescript
// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllInsights } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const insights = getAllInsights();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteConfig.url}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/solutions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/speaking`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/insights`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/waitlist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const insightRoutes: MetadataRoute.Sitemap = insights.map((i) => ({
    url: `${siteConfig.url}/insights/${i.slug}`,
    lastModified: new Date(i.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...insightRoutes];
}
```

- [ ] **Step 2: Create `app/robots.ts`**

```typescript
// app/robots.ts
import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Create `public/llms.txt`**

```text
# IMAGENN.AI

IMAGENN.AI is an AI innovation and automation company that helps organizations modernize how they work, eliminate operational bottlenecks, and build scalable foundations for the AI era.

## What We Do

- AI Strategy & Opportunity Mapping: Identify where AI creates real business impact and build a roadmap connecting innovation to execution.
- AI-Powered Decision Support: Build decision frameworks and AI tools that surface the right information at the right moment.
- Change Enablement & AI Adoption: Guide organizations through the cultural and operational shifts that make AI adoption stick.
- Workflow Automation: Identify, design, and deploy automation for high-friction, high-frequency processes.
- Operational Transformation: Comprehensive re-engineering of how organizations operate for the AI era.
- Intelligent Knowledge Systems: Build organizational intelligence layers that make information accessible to everyone.
- Customer Experience Automation: Automate customer-facing workflows that drive satisfaction and retention.
- Internal Productivity Systems: Deploy AI copilots and tools that make every person more effective.

## Who We Help

Founders, CEOs, COOs, innovation leaders, operations teams, and digital transformation leaders at mid-market and enterprise organizations.

## Core Tagline

"Modernize How Your Business Thinks."

## Contact

Website: https://imagenn.ai
Contact: https://imagenn.ai/contact
Waitlist: https://imagenn.ai/waitlist
Speaking: https://imagenn.ai/speaking
```

- [ ] **Step 4: Add Organization JSON-LD schema to `app/layout.tsx`**

**Important note:** `dangerouslySetInnerHTML` is used here only to inject JSON-LD structured data. The content is sourced entirely from `siteConfig` — a static server-side constant, never user input. There is no XSS risk. This is the standard Next.js pattern for JSON-LD.

Add the following inside `<body>`, before `{children}` in `app/layout.tsx`:

```typescript
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  sameAs: [siteConfig.social.linkedin, siteConfig.social.twitter],
};
```

```tsx
{/* JSON-LD: content is from static siteConfig only — not user input */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
/>
```

- [ ] **Step 5: Final build check**

```bash
npm run build
```

Expected: Build succeeds. All pages generate. No TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add app/sitemap.ts app/robots.ts public/llms.txt app/layout.tsx
git commit -m "feat: add sitemap, robots.txt, llms.txt, and Organization JSON-LD schema"
```

---

### Task 26: Privacy, Terms placeholder pages

**Files:**
- Create: `app/(main)/privacy/page.tsx`
- Create: `app/(main)/terms/page.tsx`

- [ ] **Step 1: Create both placeholder pages**

`app/(main)/privacy/page.tsx`:

```typescript
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-24 bg-obsidian">
      <div className="content-width px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl font-bold text-slate-primary mb-6">Privacy Policy</h1>
        <p className="text-slate-muted">Privacy policy coming soon. For questions, contact hello@imagenn.ai.</p>
      </div>
    </section>
  );
}
```

`app/(main)/terms/page.tsx`:

```typescript
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service" };
export default function TermsPage() {
  return (
    <section className="pt-32 pb-24 bg-obsidian">
      <div className="content-width px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl font-bold text-slate-primary mb-6">Terms of Service</h1>
        <p className="text-slate-muted">Terms of service coming soon. For questions, contact hello@imagenn.ai.</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Final end-to-end check**

```bash
npm run build && npm run start
```

Navigate: `/` → `/services` → `/solutions` → `/about` → `/speaking` → `/insights` → `/insights/moving-beyond-legacy-infrastructure-mindset` → `/contact` → `/waitlist` → `/privacy` → `/terms`

Confirm: All pages load. Navbar active states correct. Footer links work. No 404s. No console errors.

- [ ] **Step 3: Final commit**

```bash
git add "app/(main)/privacy/" "app/(main)/terms/"
git commit -m "feat: add Privacy and Terms placeholder pages — site complete"
```

---

## Environment Variables Reference

Before launch, configure `.env.local`:

```bash
RESEND_API_KEY=re_YOUR_KEY_HERE    # From resend.com dashboard
```

Before launch, update `lib/site-config.ts`:
- `calendlyUrl` — Rob's real Calendly booking URL
- `adminEmail` — Email to receive all form submissions
- `founder.lastName` + `founder.fullName` — Rob's last name
- `showStats: true` + populate `stats` values — once real numbers are available
- `speakingEngagements` — Add real past events (shows section automatically)
- `speakingTestimonials` — Add real testimonials (shows section automatically)
- `social.linkedin` + `social.twitter` — Real profile URLs
