# IMAGENN.AI Website — Design Specification
**Date:** 2026-04-03  
**Status:** Approved by user  
**Project:** IMAGENN.AI — Premium AI Innovation & Automation startup website

---

## 1. Brand Direction

### Positioning
IMAGENN.AI is an AI innovation and automation company that helps organizations modernize how they work, eliminate operational bottlenecks, and build scalable foundations for the AI era. It is positioned as a **strategic transformation partner** — not a generic AI agency.

### Core Tagline (Approved)
> **"Modernize How Your Business Thinks."**

Supporting taglines for section use:
- "Practical AI. Smarter Operations. Stronger Growth."
- "Eliminate Legacy Thinking. Unlock Intelligent Growth."
- "AI Innovation for Organizations Ready to Move Forward."

### Target Audiences
- Founders, CEOs, COOs
- Innovation and digital transformation leaders
- Operations teams
- Enterprise decision-makers
- Mid-market growth companies
- Organizations with fragmented systems, manual workflows, and slow execution

---

## 2. Visual Identity

### Aesthetic (Approved)
**Dark Premium** — Deep navy/obsidian backgrounds with indigo-to-cyan gradient accents. Glows, layered surfaces. References: Vercel, Linear, Anthropic, Perplexity.

### Color Palette (Approved)
| Role | Color | Hex |
|------|-------|-----|
| Background primary | Deep obsidian | `#08091a` |
| Background secondary | Navy dark | `#0d0d20` |
| Background surface | Elevated dark | `#0f0f28` |
| Brand primary | Indigo | `#6366f1` |
| Brand primary light | Indigo light | `#818cf8` |
| Brand secondary | Cyan | `#22d3ee` |
| Brand secondary alt | Sky blue | `#0ea5e9` |
| Gradient | Indigo → Cyan | `linear-gradient(90deg, #818cf8, #22d3ee)` |
| Text primary | Near white | `#f8fafc` |
| Text secondary | Slate | `#94a3b8` |
| Text muted | Dark slate | `#64748b` |
| Border subtle | White alpha | `rgba(255,255,255,0.06)` |
| Border hover | Indigo alpha | `rgba(99,102,241,0.3)` |

### Typography (Approved)
| Role | Font | Fallback |
|------|------|----------|
| Display / H1 / H2 | Playfair Display (serif) | Georgia, serif |
| H3 / H4 | DM Sans (geometric sans) | system-ui |
| Body | DM Sans | system-ui |
| Labels / Caps | DM Sans | system-ui |
| Code / Mono | JetBrains Mono | monospace |

**Headline style:** Editorial serif, tight letter-spacing (`-0.01em`), heavy weight. Creates strategic consultancy feel that differentiates from typical AI tech companies.

### Logo / Wordmark (Approved)
Typographic wordmark for launch: `IMAGENN.AI` in Playfair Display with indigo-to-cyan gradient treatment. Placeholder until brand logo is finalized. Implemented in code/CSS.

### Design Principles
- Spacious sections with generous padding
- Strong visual hierarchy (clear H1 → body → CTA sequence)
- Layered surfaces (cards slightly elevated above section backgrounds)
- Subtle gradient orbs / glows as ambient decoration (not distracting)
- Premium hover states on all interactive elements
- Animated background: subtle grid or mesh, low opacity
- Editorial content blocks with strong left-aligned text hierarchy
- Mobile-first responsive, WCAG AA compliant

---

## 3. Site Architecture

### Approach (Approved)
**Approach A — SPA Immersive Homepage + Deep Inner Pages**

The homepage delivers the full brand narrative as a continuous scroll. Inner pages provide depth for specific audiences and services. 

### Navigation
```
IMAGENN.AI [wordmark] | Services | Solutions | About | Speaking | Insights | [Book a Call CTA]
```
- Sticky on scroll with background blur
- Mobile: hamburger menu
- CTA button: indigo gradient, always visible

### Sitemap
```
/                   → Homepage (SPA immersive, 12 sections)
/services           → Services deep-dive page
/solutions          → Use cases by business function
/about              → About IMAGENN.AI
/speaking           → Rob's speaking profile & booking
/insights           → Thought leadership hub
/insights/[slug]    → Individual article
/contact            → Contact page
/waitlist           → SaaS product waitlist landing page
```

---

## 4. Conversion Architecture

### Primary Conversion Actions
1. **Book a Call / Contact Us** — Single combined form with toggle between intents. Used in Hero, Final CTA section, Contact page.
2. **Waitlist** — Email capture for IMAGENN.AI SaaS product pipeline. Used in Section 09 (homepage) and `/waitlist` page.
3. **Speaking Inquiry** — "Invite Rob to Speak" form on Speaking section and `/speaking` page.

### CTA Hierarchy
- **Primary CTA:** "Book a Strategy Call" (indigo gradient button)
- **Secondary CTA:** "Contact Us" (ghost/outline button)
- **Tertiary CTA:** "Join the Waitlist" (cyan accent, used in waitlist section)

### Form Design
- Combined contact form with radio/tab toggle: `Book a Call` | `Send a Message`
- Fields: Name, Email, Company, Role, Message/Goal (conditional on "Send a Message")
- For Book a Call: clicking submit redirects to Calendly (URL stored in `site-config.ts`). Form collects Name + Email only before redirecting, then sends a Resend notification email to admin.
- Waitlist form: First Name + Email only (minimal friction). On submit: inline success message ("You're on the list — we'll be in touch."), Resend confirmation email to user, Resend notification email to admin.
- Speaking inquiry: Name, Company, Event name, Event type (dropdown: Keynote / Panel / Workshop / Podcast / Other), Audience size (dropdown), Preferred date, Message. Success state: inline confirmation message + Resend confirmation to user and admin.
- All forms: client-side validation via Zod, server action or API route for submission, loading state on submit button, error state on failure.

---

## 5. Homepage — Section-by-Section Specification

### Section 01 — Hero
**Purpose:** Immediate clarity on who IMAGENN.AI is and what action to take.

**Layout:** Full-viewport height. Dark premium background. Centered content with subtle animated grid/mesh. Gradient orbs (indigo top-right, cyan bottom-left, low opacity).

**Content:**
- Eyebrow label: `AI INNOVATION & AUTOMATION` (uppercase, muted, letter-spaced)
- H1 (editorial serif): `Modernize How Your Business Thinks.`
- Subheadline: `We help ambitious organizations eliminate operational friction, automate what slows them down, and build the AI-powered foundation their next stage of growth demands.`
- Dual CTA: `[Book a Strategy Call]` (primary, indigo) + `[Contact Us →]` (ghost)
- Trust line: `Trusted by founders, CEOs, and operations leaders building the next chapter of their organization.`
- Visual: Abstract layered geometric / network graphic (right side or full-bleed behind content), premium and minimal

**Imagery direction:** Abstract dark visualization — think neural network nodes, interconnected geometry, or a stylized data flow. Indigo/cyan color temperature. Not literal robots or brains. SVG or Canvas animation preferred.

---

### Section 02 — Credibility Strip
**Purpose:** Rapidly establish who benefits and what IMAGENN.AI delivers.

**Layout:** Horizontal strip, dark surface background (`#0d0d20`). Left: "Who we help" labels. Right or full: capability highlights.

**Content:**
- Label: `WHO WE HELP`
- Tags: `Founders` · `CEOs` · `COOs` · `Innovation Leaders` · `Operations Teams` · `Digital Transformation Leaders`
- 4 capability highlights with icons:
  1. AI Strategy & Roadmapping
  2. Workflow Automation
  3. Operational Transformation
  4. AI-Powered Decision Support
- Stats: Three social proof metrics controlled by a `showStats: boolean` flag in `site-config.ts`. When `false`, the entire stat row is hidden via conditional render (not CSS). At v1 launch, `showStats` is set to `false`. Rob enables it by setting `showStats: true` and populating the three values in `site-config.ts`. The planner must wire up this conditional render as part of the build. Stub labels: `Organizations Served` · `Automations Deployed` · `Avg. Efficiency Gains`.

---

### Section 03 — The Problem
**Purpose:** Create resonance and urgency by naming the real pain.

**Layout:** Full-width section. Bold serif headline. 6-card grid below with pain point icons.

**Content:**
- H2: `Your Organization Deserves Better Than This.`
- Subheadline: `Most organizations are running on systems, processes, and mindsets built for a world that no longer exists.`
- 6 pain point cards:
  1. **Legacy Infrastructure Mindset** — Outdated systems holding back modern execution
  2. **Disconnected Tools & Data** — Teams working in silos, decisions made blind
  3. **Manual Everything** — High-value people doing low-value work
  4. **Slow Decision-Making** — Missing the window to act with confidence
  5. **Innovation Paralysis** — Knowing AI matters but not knowing where to start
  6. **Operational Friction** — Bottlenecks that compound and compound

---

### Section 04 — What We Do (Services)
**Purpose:** Structured, premium services overview with clear hierarchy.

**Layout:** Section header. 3 lead service cards (larger, prominent). Secondary row of additional services below.

**Lead Services (3 primary cards):**
1. **AI Strategy & Opportunity Mapping** — Identify where AI creates real business impact. Map your highest-value automation and intelligence opportunities. Build a roadmap that connects innovation to execution.
2. **AI-Powered Decision Support** — Move from gut feel to intelligent insight. We build decision frameworks and AI tools that surface the right information at the right moment — so leaders can act fast and confidently.
3. **Change Enablement & AI Adoption** — Technology alone doesn't transform organizations. We guide your teams through the cultural, operational, and workflow shifts that make AI adoption stick.

**Secondary services (smaller cards):**
- Workflow Automation
- Operational Transformation
- Intelligent Knowledge Systems
- Customer Experience Automation
- Internal Productivity Systems

CTA: `Explore All Services →`

---

### Section 05 — Solutions / Use Cases
**Purpose:** Show concrete, real-world applications that visitors recognize as their problems.

**Layout:** Tabbed or filterable interface. Filter by business function. Card grid of use cases.

**Filter tabs:** Operations · Sales · Marketing · Customer Experience · Leadership · Team Productivity · Knowledge Management

**Sample use cases per tab (3 cards each, homepage shows first 3 of active tab):**
- **Operations:** Automate reporting pipelines, streamline approval workflows, eliminate manual data entry
- **Sales:** Lead qualification automation, AI-assisted proposal generation, pipeline intelligence dashboards
- **Marketing:** Campaign performance automation, content brief generation, AI-assisted audience segmentation
- **Customer Experience:** Intelligent support routing, onboarding workflow automation, AI-powered FAQ resolution
- **Leadership:** Executive KPI dashboards, automated decision briefings, board reporting automation
- **Team Productivity:** Internal AI copilots, knowledge retrieval systems, meeting intelligence and summaries
- **Knowledge Management:** Centralized knowledge bases, document Q&A systems, onboarding knowledge automation

Each card: Problem → Solution → Impact

CTA: `See All Use Cases →`

---

### Section 06 — Why IMAGENN.AI
**Purpose:** Differentiate from generic AI agencies and consultants.

**Layout:** Bold serif headline left. 5-6 differentiator cards in grid right (or below on mobile).

**H2:** `We Build for Real Impact. Not for the Demo.`

**Differentiators:**
1. **Business-First, Not Tech Theater** — Every engagement starts with business outcomes, not technology. If AI doesn't move the needle, we don't build it.
2. **Execution-Focused** — We bridge strategy and implementation. You don't get a deck — you get results.
3. **Practical AI, Not Hype** — We deploy AI that works in your organization today, not theoretical solutions for a hypothetical future.
4. **Operational Depth** — We understand how organizations actually run — the processes, the friction, the people. That's where transformation happens.
5. **Modern UX + Process Thinking** — We build AI tools your teams actually want to use. Adoption is part of the design.
6. **Scalable from Day One** — Everything we build is designed to grow with your organization, not become tomorrow's legacy problem.

---

### Section 07 — How We Work
**Purpose:** Reduce uncertainty and make the engagement feel accessible and structured.

**Layout:** Horizontal 4-step timeline (desktop). Vertical (mobile). Each step: number, name, description, key outcome.

**4-Step Framework:**
1. **Discover** — We map your organization's current state: systems, workflows, data, people, and pain points. We find where AI creates real leverage.
2. **Design** — We architect the solution — AI strategy, automation design, process re-engineering — with your team's reality at the center.
3. **Build** — We implement. Automation workflows, AI-powered tools, decision systems. Practical, tested, integrated into how your organization works.
4. **Scale** — We help you grow the capability. Adoption support, team enablement, iteration cycles. The foundation grows with you.

---

### Section 08 — Speaking & Panels (Rob)
**Purpose:** Establish Rob as a credible AI thought leader and generate speaking bookings.

**Layout:** Two-column. Left: Rob's intro, headshot placeholder, expertise tags. Right: topics list, CTA.

**Content:**
- H2: `Bring AI Innovation to Your Stage.`
- Subheadline: `Rob [LAST_NAME_PLACEHOLDER] is a sought-after voice on AI innovation, digital transformation, and the future of how organizations work.` — **Note:** Rob to supply full name before launch. Stored in `site-config.ts`, not hardcoded in component.
- Expertise tags: `AI Innovation` · `Digital Transformation` · `Future of Work` · `Operational Intelligence` · `AI Adoption & Change` · `Business Modernization`
- Topics Rob speaks on:
  - How Organizations Can Move Beyond Legacy Thinking
  - Practical AI: What Works, What Doesn't, and What's Next
  - The Automation Imperative for Mid-Market Companies
  - Building an AI-Ready Organization
  - AI and the Future of Operations
- Past engagements: **Omitted from v1 homepage section.** The Speaking section on the homepage shows only intro, tags, topics, and CTA. Past engagements and testimonials are added to `/speaking` page only once real content is available.
- CTA: `Invite Rob to Speak` → opens speaking inquiry form

---

### Section 09 — Product Waitlist
**Purpose:** Capture early adopter leads for IMAGENN.AI's SaaS product pipeline.

**Layout:** Full-width, indigo gradient treatment (dark premium gradient). High-contrast. Email capture form. Urgency/exclusivity framing.

**Content:**
- Eyebrow: `COMING SOON`
- H2: `The Future of Work Is Being Built Right Now.`
- Subheadline: `IMAGENN.AI is developing a suite of AI-powered SaaS products for organizations ready to lead — not follow — the automation era. Join the waitlist for early access.`
- Form: First Name + Email → `Join the Waitlist`
- Below form: `No spam. Early access only. Be first.`
- Visual: Abstract product UI silhouettes or glowing interface shapes — tease without revealing

---

### Section 10 — Future-Proof Your Organization
**Purpose:** Premium brand statement. Reinforces transformation narrative. Mid-page CTA moment.

**Layout:** Full-width, elevated surface. Large editorial serif headline. Supporting copy. CTA.

**Content:**
- H2: `The organizations winning the next decade aren't waiting for the right moment. They're building it.`
- Supporting copy: `IMAGENN.AI exists to help ambitious organizations get ahead of change — not react to it. The tools, the strategy, the execution. All of it, built around what your organization actually needs to move forward.`
- CTA: `Start Your Transformation →`

---

### Section 11 — Insights Preview
**Purpose:** Establish thought leadership. Support SEO. Give visitors a reason to return.

**Layout:** Section header + 3 article cards in a grid. Tags visible. "View all" link.

**Sample article topics:**
1. `Moving Beyond Legacy Infrastructure Mindset` — Why the biggest obstacle to AI adoption isn't technology.
2. `Where Automation Creates Immediate Business Value` — The 5 operational areas to automate first.
3. `AI Readiness for Mid-Market Companies` — A practical framework for organizations ready to move.

**Card format:** Category tag · Title · Short description · Read time · Read more →

CTA: `Explore All Insights →`

---

### Section 12 — Final CTA
**Purpose:** Close every visitor through a conversion action. No dead ends.

**Layout:** Full-width. Dark premium gradient backdrop. Large serif headline. Combined contact form.

**Content:**
- H2: `Ready to Modernize How Your Organization Works?`
- Subheadline: `Whether you're ready to start or still working out where to begin — let's talk. A strategy conversation costs nothing. The status quo costs everything.`
- Combined form (toggle): `Book a Strategy Call` | `Send Us a Message`
- Fields: Name, Email, Company, Role, Message
- Trust reassurance: `No commitment required. We respond within 1 business day.`

---

## 6. Inner Pages — High-Level Specification

### /services
Full-depth service page. For each of the 8 services:
- Overview headline + description
- Who it's for
- Key business pain points addressed
- What we deliver (deliverables list)
- Business outcomes
- CTA: Book a Strategy Call

### /solutions
Use cases organized by business function (Operations, Sales, Marketing, CX, Leadership, Team Productivity, Knowledge Management). Filterable grid. Each card: Problem → Solution → Impact. CTA per card. **Total cards at launch: 21 (3 per category × 7 categories).** All use case data is defined in a `content/use-cases.ts` data file — not hardcoded in the component.

### /about
- What IMAGENN.AI stands for
- Mission statement
- Perspective on AI and innovation (opinionated, not generic)
- Approach to transformation
- What makes IMAGENN.AI different
- Future-focused vision
- Rob's leadership/founder section
- CTA: Start a Conversation

### /speaking
- Full Rob speaking profile
- Topics list (expanded)
- Speaking format options (keynote, panel, workshop)
- Audience types
- Past engagements: section rendered only when `speakingEngagements` array in `site-config.ts` is non-empty; hidden at v1 launch
- Testimonials: section rendered only when `speakingTestimonials` array in `site-config.ts` is non-empty; hidden at v1 launch
- Full speaking inquiry form (Name, Company, Event name, Event type, Audience size, Date, Message)
- FAQ: How to book, lead time, travel, virtual vs. in-person

### /insights/[slug] — Article Detail Page
- Layout: constrained content width (720px max), large serif headline, body in DM Sans
- Sections: breadcrumb → category tag → title → read time → body content (MDX rendered) → author block (Rob) → CTA section (Book a Strategy Call) → 2 related article cards
- No comments, no social share buttons in v1

### /insights
- Featured article (large card)
- Category filter tabs
- Article grid
- Topic tags
- Newsletter / waitlist CTA module
- Pagination (static, no infinite scroll in v1)
- **Content sourcing:** MDX files stored in `content/insights/` directory. Each article is a `.mdx` file with frontmatter (title, slug, category, description, readTime, publishedAt, featured). No CMS in v1 — articles are authored as MDX and committed to the repo. Three starter articles included at launch matching the topics in Section 11.

### /contact
- Combined Book a Call / Contact Us toggle form
- What to expect after submitting
- Reassurance copy
- Response time commitment
- Qualification questions are **v2 scope** — omitted from v1 build entirely

### /waitlist
- Full dedicated waitlist landing page
- Expanded product teaser content (deliberately vague — "AI-powered SaaS tools for modern organizations")
- Benefits of early access (priority access, founder pricing, early influence on product direction)
- Email capture form (Name + Email, same as homepage waitlist form)
- Social proof module: **omitted from v1** — no real numbers yet. Replaced with aspirational copy: "Join forward-thinking organizations getting early access."

---

## 7. Component System

### Core Reusable Components
- `<Navbar>` — Sticky, blur background on scroll, mobile hamburger
- `<HeroSection>` — Full-viewport, animated background, dual CTA
- `<SectionHeader>` — Eyebrow label + H2 + optional subheadline
- `<ServiceCard>` — Lead and secondary variants, hover state, gradient border
- `<UseCaseCard>` — Problem/Solution/Impact format
- `<ProcessStep>` — Numbered, icon, description, outcome
- `<InsightCard>` — Category tag, title, description, read time
- `<ContactForm>` — Toggle between Book a Call / Contact Us
- `<WaitlistForm>` — Minimal email capture, high contrast
- `<SpeakingForm>` — Extended inquiry form
- `<CTASection>` — Reusable full-width CTA with form embed
- `<Footer>` — Logo, nav links, social, legal, newsletter

### Design Tokens
- Spacing scale: 4/8/12/16/24/32/48/64/80/96/128px
- Border radius: sm=6px, md=10px, lg=16px, xl=24px
- Shadow: `0 0 40px rgba(99,102,241,0.08)` (glow), `0 4px 20px rgba(0,0,0,0.4)` (card)
- Transition: `all 0.2s ease`
- Max content width: 1280px
- Section padding: 96px vertical (desktop), 64px (mobile)

---

## 8. Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animation:** Framer Motion
- **Fonts:** Playfair Display + DM Sans (Google Fonts)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Email:** Resend (modern transactional email API, first-class Next.js support). All form submissions (contact, waitlist, speaking) send confirmation emails via Resend. Admin notification emails go to a configured IMAGENN.AI address.
- **Analytics:** Vercel Analytics (zero-config with Next.js deployment, privacy-friendly, no cookie banner required)

---

## 9. SEO & LLM Discoverability

- Semantic HTML throughout (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`)
- Proper H1 → H2 → H3 hierarchy (one H1 per page)
- Descriptive meta titles and descriptions per page
- Open Graph tags for social sharing
- Schema.org structured data: Organization, Service, Person (Rob speaking), Article
- Clean internal linking between pages
- Entity-rich copy — specific, named services and outcomes
- FAQ sections on Services and Speaking pages
- `sitemap.xml` and `robots.txt`
- `llms.txt` for LLM discoverability

---

## 10. Build Order

1. Design system setup (tokens, fonts, base components)
2. Layout shell (Navbar, Footer, page wrapper)
3. Homepage — all 12 sections
4. Contact form + Waitlist form (functional)
5. Services page
6. Solutions page
7. About page
8. Speaking page
9. Insights page (static starter articles)
10. Contact page
11. Waitlist page
12. SEO layer (meta, schema, sitemap)
