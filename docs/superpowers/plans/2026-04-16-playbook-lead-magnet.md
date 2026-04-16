# Playbook Lead Magnet Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete lead magnet system — standalone landing page, email capture modal, Supabase lead storage, branded welcome email via Resend, and a gated thank-you page with auto-download.

**Architecture:** Server component landing page (metadata + JSON-LD) with a `'use client'` child for the modal form; `/api/subscribe` POST route with in-memory rate limiting, Supabase insert, and Resend emails; thank-you page uses sessionStorage gate to prevent direct access.

**Tech Stack:** Next.js 15 App Router, CSS Modules, Supabase (service role), `@react-email/components`, Resend (existing), Zod v4, in-memory rate limiting, GTM dataLayer analytics.

---

## Chunk 1: Foundation

### Task 1: Install packages

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install required packages**

```bash
npm install @supabase/supabase-js @react-email/components server-only
```

- [ ] **Step 2: Verify packages installed**

```bash
cat package.json | grep -E "@supabase|react-email|server-only"
```

Expected: all three packages appear in `dependencies`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install supabase, react-email, server-only for lead magnet"
```

---

### Task 2: Add environment variable placeholders

**Files:**
- Modify: `.env.local` (create if missing — never committed)

- [ ] **Step 1: Check if .env.local exists**

```bash
ls -la .env.local 2>/dev/null || echo "NOT FOUND"
```

- [ ] **Step 2: Add Supabase env vars**

Open `.env.local` and add (or create the file with):

```env
# Supabase — lead magnet
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> `RESEND_API_KEY` should already be present. Verify: `grep RESEND_API_KEY .env.local`

- [ ] **Step 3: Verify .env.local is gitignored**

```bash
grep ".env.local" .gitignore
```

Expected: `.env.local` line exists. If not, add it.

---

### Task 3: Supabase migration

**Files:**
- Create: `supabase/migrations/001_leads_table.sql`

- [ ] **Step 1: Create migrations directory**

```bash
mkdir -p supabase/migrations
```

- [ ] **Step 2: Write migration file**

Create `supabase/migrations/001_leads_table.sql`:

```sql
create extension if not exists "pgcrypto";

create table public.leads (
  id               uuid primary key default gen_random_uuid(),
  first_name       text not null,
  last_name        text,
  email            text not null unique,
  company          text,
  role             text,
  source           text not null,
  consent_given_at timestamptz not null,
  ip_address       inet,
  user_agent       text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Indexes
create index leads_email_idx      on public.leads (email);
create index leads_source_idx     on public.leads (source);
create index leads_created_at_idx on public.leads (created_at desc);

-- RLS: enabled, no permissive policies.
-- Service role key bypasses RLS natively — do NOT add an auth.role() policy.
alter table public.leads enable row level security;

-- auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_updated_at
  before update on public.leads
  for each row execute procedure update_updated_at();
```

> **Manual step:** Run this in the Supabase dashboard SQL editor (or `supabase migration up` if CLI is configured).

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/001_leads_table.sql
git commit -m "feat: add leads table migration for playbook lead magnet"
```

---

### Task 4: Rate limiter

**Files:**
- Create: `lib/rate-limit.ts`
- Test: manual via API route test in Task 7

- [ ] **Step 1: Write rate limiter**

Create `lib/rate-limit.ts`:

```typescript
const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 5

interface Entry {
  count: number
  resetAt: number
}

const store = new Map<string, Entry>()

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  // Fail open for unknown IPs — never block legitimate users
  if (ip === 'unknown') return { allowed: true, remaining: MAX_REQUESTS }

  const now = Date.now()

  // Prune stale entries
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key)
  }

  const entry = store.get(ip)

  if (!entry || entry.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: MAX_REQUESTS - entry.count }
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/rate-limit.ts
git commit -m "feat: add in-memory rate limiter (5 req/IP/hour)"
```

---

### Task 5: Supabase admin client

**Files:**
- Create: `lib/supabase/admin.ts`

- [ ] **Step 1: Create directory**

```bash
mkdir -p lib/supabase
```

- [ ] **Step 2: Write admin client**

Create `lib/supabase/admin.ts`:

```typescript
import 'server-only' // throws build error if accidentally bundled client-side
import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
)
```

- [ ] **Step 3: Commit**

```bash
git add lib/supabase/admin.ts
git commit -m "feat: add supabase admin client (service role, server-only)"
```

---

## Chunk 2: API & Email

### Task 6: React Email template

**Files:**
- Create: `emails/ai-playbook-welcome.tsx`

- [ ] **Step 1: Create emails directory**

```bash
mkdir -p emails
```

- [ ] **Step 2: Write email template**

Create `emails/ai-playbook-welcome.tsx`:

```tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface Props {
  firstName: string
  downloadUrl: string
  assessmentUrl: string
}

export default function AiPlaybookWelcome({ firstName, downloadUrl, assessmentUrl }: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your AI Readiness Playbook is ready to download, {firstName}</Preview>
      <Body style={body}>
        {/* Hero */}
        <Section style={hero}>
          <Container style={heroInner}>
            <Text style={brandLabel}>IMAGENN.AI</Text>
            <Heading style={heroHeading}>
              Your AI Readiness Playbook is{' '}
              <em style={accentItalic}>here</em>
              {', '}
              {firstName}.
            </Heading>
          </Container>
        </Section>

        {/* Body */}
        <Section style={contentSection}>
          <Container style={contentInner}>
            <Text style={bodyText}>
              Inside your playbook: 8 chapters covering the 90-day AI readiness framework,
              a use-case matrix for SMBs and mid-market teams, and the exact steps to start
              without wasting budget or falling behind competitors.
            </Text>
            <Text style={bodyText}>
              Ready to take this further? Book a free 30-minute AI Readiness Assessment
              with our team — we&apos;ll map out where AI fits in your business right now.
            </Text>

            <Button href={downloadUrl} style={primaryButton}>
              Download the Playbook →
            </Button>

            <Button href={assessmentUrl} style={secondaryButton}>
              Book a Free Assessment →
            </Button>

            <Hr style={divider} />

            <Text style={footerText}>
              Questions? Reply to this email or reach us at{' '}
              <a href="mailto:hello@imagenn.ai" style={link}>hello@imagenn.ai</a>
              <br />
              IMAGENN.AI · Vaughan, ON, Canada
              <br />
              <a href="#" style={link}>Unsubscribe</a>
            </Text>
          </Container>
        </Section>
      </Body>
    </Html>
  )
}

// Styles
const body: React.CSSProperties = {
  backgroundColor: '#f4f4f5',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  margin: 0,
  padding: 0,
}

const hero: React.CSSProperties = {
  backgroundColor: '#0a0e27',
  padding: '48px 0',
}

const heroInner: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '0 24px',
}

const brandLabel: React.CSSProperties = {
  color: '#E46212',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  margin: '0 0 16px',
}

const heroHeading: React.CSSProperties = {
  color: '#ffffff',
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '1.3',
  margin: 0,
}

const accentItalic: React.CSSProperties = {
  color: '#E46212',
  fontStyle: 'italic',
}

const contentSection: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '40px 0',
}

const contentInner: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '0 24px',
}

const bodyText: React.CSSProperties = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 20px',
}

const primaryButton: React.CSSProperties = {
  backgroundColor: '#E46212',
  borderRadius: '6px',
  color: '#ffffff',
  display: 'block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 28px',
  textAlign: 'center',
  textDecoration: 'none',
  margin: '24px 0 12px',
}

const secondaryButton: React.CSSProperties = {
  backgroundColor: 'transparent',
  border: '2px solid #E46212',
  borderRadius: '6px',
  color: '#E46212',
  display: 'block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 28px',
  textAlign: 'center',
  textDecoration: 'none',
  margin: '0 0 32px',
}

const divider: React.CSSProperties = {
  borderColor: '#e5e7eb',
  margin: '0 0 24px',
}

const footerText: React.CSSProperties = {
  color: '#9ca3af',
  fontSize: '13px',
  lineHeight: '1.6',
  margin: 0,
}

const link: React.CSSProperties = {
  color: '#9ca3af',
}
```

- [ ] **Step 3: Commit**

```bash
git add emails/ai-playbook-welcome.tsx
git commit -m "feat: add React Email welcome template for AI playbook"
```

---

### Task 7: Subscribe API route

**Files:**
- Create: `app/api/subscribe/route.ts`

- [ ] **Step 1: Check existing waitlist route for Resend pattern**

Read `app/api/waitlist/route.ts` to confirm the Resend import pattern and `RESEND_API_KEY` usage.

- [ ] **Step 2: Write API route**

Create `app/api/subscribe/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { render } from '@react-email/components'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { checkRateLimit } from '@/lib/rate-limit'
import { escHtml } from '@/lib/utils'
import AiPlaybookWelcome from '@/emails/ai-playbook-welcome'
import { siteConfig } from '@/lib/site-config'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  firstName: z.string().min(1),
  email: z.string().email(),
  consent: z.literal(true),
  source: z.string().default('ai-readiness-playbook'),
})

function getIp(req: NextRequest): string {
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
}

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const { allowed } = checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    if (firstIssue?.path[0] === 'consent') {
      return NextResponse.json({ ok: false, error: 'Consent required' }, { status: 400 })
    }
    return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
  }

  const { firstName, email, source } = parsed.data
  const userAgent = req.headers.get('user-agent') ?? undefined

  let isDuplicate = false
  try {
    const { error } = await supabaseAdmin.from('leads').insert({
      first_name: firstName,
      email,
      source,
      consent_given_at: new Date().toISOString(),
      ip_address: ip === 'unknown' ? null : ip,
      user_agent: userAgent,
    })

    if (error) {
      if (error.code === '23505') {
        isDuplicate = true
      } else {
        console.error('[subscribe] Supabase error:', error)
        return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
      }
    }
  } catch (err) {
    console.error('[subscribe] Unexpected DB error:', err)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }

  // Send welcome email — non-fatal
  try {
    const downloadUrl = `${siteConfig.url}/IMAGENN-AI-Readiness-Playbook.pdf`
    const html = await render(
      AiPlaybookWelcome({ firstName, downloadUrl, assessmentUrl: siteConfig.calendlyUrl })
    )
    await resend.emails.send({
      from: 'IMAGENN.AI <noreply@imagenn.ai>',
      to: email,
      subject: 'Your AI Readiness Playbook is ready — IMAGENN.ai',
      html,
    })
  } catch (err) {
    console.error('[subscribe] Welcome email failed (non-fatal):', err)
  }

  // Admin notification — non-fatal
  try {
    const safeFirst = escHtml(firstName)
    const safeEmail = escHtml(email)
    const safeSource = escHtml(source)
    await resend.emails.send({
      from: 'IMAGENN.AI <noreply@imagenn.ai>',
      to: siteConfig.adminEmail,
      subject: `New playbook lead: ${firstName} (${email})`,
      html: `<p><strong>Name:</strong> ${safeFirst}</p>
<p><strong>Email:</strong> ${safeEmail}</p>
<p><strong>Source:</strong> ${safeSource}</p>
<p><strong>Time:</strong> ${new Date().toISOString()}</p>`,
    })
  } catch (err) {
    console.error('[subscribe] Admin notification failed (non-fatal):', err)
  }

  return NextResponse.json({ ok: true, ...(isDuplicate && { duplicate: true }) })
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors. Fix any type errors before proceeding.

- [ ] **Step 4: Commit**

```bash
git add app/api/subscribe/route.ts
git commit -m "feat: add /api/subscribe route with rate limiting, supabase, resend"
```

---

## Chunk 3: Frontend

### Task 8: CSS Modules stylesheet

**Files:**
- Create: `app/ai-readiness-playbook/playbook.module.css`

- [ ] **Step 1: Create directory**

```bash
mkdir -p app/ai-readiness-playbook
```

- [ ] **Step 2: Write CSS Modules file**

Create `app/ai-readiness-playbook/playbook.module.css`:

```css
/* =============================================
   PLAYBOOK LEAD MAGNET — CSS MODULES
   Uses existing CSS vars: --font-playfair, --font-dm-sans
   ============================================= */

/* ---------- Page Shell ---------- */
.page {
  background-color: #0a0e27;
  color: #f1f5f9;
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  min-height: 100vh;
}

/* ---------- Top Bar ---------- */
.topBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.logo {
  font-family: var(--font-playfair), Georgia, serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.02em;
}

.resourcePill {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #e46212;
  border: 1px solid #e46212;
  border-radius: 100px;
  padding: 4px 12px;
}

/* ---------- Hero ---------- */
.hero {
  max-width: 760px;
  margin: 0 auto;
  padding: 80px 40px 64px;
  text-align: center;
}

.eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #e46212;
  margin: 0 0 20px;
}

.h1 {
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.15;
  color: #ffffff;
  margin: 0 0 24px;
}

.accent {
  color: #e46212;
  font-style: italic;
}

.subHeadline {
  font-size: 1.1rem;
  line-height: 1.65;
  color: #94a3b8;
  margin: 0 0 36px;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
}

.metaPills {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.metaPill {
  font-size: 0.8rem;
  font-weight: 600;
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  padding: 6px 16px;
}

.ctaBtn {
  display: inline-block;
  background-color: #e46212;
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  padding: 16px 36px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.ctaBtn:hover {
  background-color: #c9530d;
  transform: translateY(-1px);
}

/* ---------- Stats Section ---------- */
.statsSection {
  background: rgba(255, 255, 255, 0.03);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 56px 40px;
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
}

.statCard {
  text-align: center;
}

.statNumber {
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  color: #e46212;
  line-height: 1;
  margin: 0 0 8px;
}

.statLabel {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.4;
  margin: 0 0 4px;
}

.statSource {
  font-size: 0.7rem;
  color: #475569;
  margin: 0;
}

/* ---------- Chapters Section ---------- */
.chaptersSection {
  max-width: 900px;
  margin: 0 auto;
  padding: 72px 40px;
}

.sectionLabel {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #e46212;
  margin: 0 0 12px;
  text-align: center;
}

.sectionTitle {
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin: 0 0 48px;
}

.chaptersGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chapterCard {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: border-color 0.2s ease;
}

.chapterCard:hover {
  border-color: rgba(228, 98, 18, 0.3);
}

.chapterNum {
  font-family: var(--font-playfair), Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #e46212;
  line-height: 1;
  flex-shrink: 0;
  width: 32px;
}

.chapterTitle {
  font-size: 0.95rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 4px;
}

.chapterDesc {
  font-size: 0.82rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

/* ---------- CTA Band ---------- */
.ctaBand {
  background: linear-gradient(135deg, #1a1f3e 0%, #0a0e27 100%);
  border-top: 1px solid rgba(228, 98, 18, 0.2);
  border-bottom: 1px solid rgba(228, 98, 18, 0.2);
  padding: 72px 40px;
  text-align: center;
}

.ctaBandTitle {
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 32px;
}

/* ---------- Footer ---------- */
.footer {
  padding: 24px 40px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.footerText {
  font-size: 0.8rem;
  color: #475569;
  margin: 0;
}

.footerLink {
  color: #475569;
  text-decoration: underline;
}

/* ---------- Modal ---------- */
.modalOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modalCard {
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 460px;
  position: relative;
}

.modalClose {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  font-size: 1.25rem;
  line-height: 1;
  padding: 4px 8px;
}

.modalClose:hover {
  color: #374151;
}

.modalTitle {
  font-family: var(--font-playfair), Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0a0e27;
  margin: 0 0 8px;
}

.modalSub {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0 0 28px;
  line-height: 1.5;
}

.formGroup {
  margin-bottom: 16px;
}

.label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.input {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #111827;
  background: #ffffff;
  box-sizing: border-box;
  transition: border-color 0.15s ease;
  font-family: inherit;
}

.input:focus {
  outline: none;
  border-color: #e46212;
}

.input:disabled {
  background: #f9fafb;
  color: #9ca3af;
}

.consentRow {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 24px;
}

.checkbox {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: #e46212;
  cursor: pointer;
}

.consentText {
  font-size: 0.8rem;
  color: #6b7280;
  line-height: 1.45;
  margin: 0;
}

.submitBtn {
  width: 100%;
  background-color: #e46212;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  padding: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: inherit;
}

.submitBtn:hover:not(:disabled) {
  background-color: #c9530d;
}

.submitBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.formError {
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 12px;
  text-align: center;
}

/* ---------- Thank-You Page ---------- */
.thankYouPage {
  background-color: #0a0e27;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  font-family: var(--font-dm-sans), system-ui, sans-serif;
}

.thankYouCard {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 56px 48px;
  max-width: 520px;
  width: 100%;
  text-align: center;
}

.checkIcon {
  width: 64px;
  height: 64px;
  background: rgba(228, 98, 18, 0.12);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 1.75rem;
}

.thankYouTitle {
  font-family: var(--font-playfair), Georgia, serif;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 12px;
}

.thankYouSub {
  font-size: 1rem;
  color: #94a3b8;
  margin: 0 0 36px;
  line-height: 1.6;
}

.downloadBtn {
  display: inline-block;
  background-color: #e46212;
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  margin-bottom: 16px;
  transition: background-color 0.2s ease;
}

.downloadBtn:hover {
  background-color: #c9530d;
}

.assessmentBtn {
  display: block;
  color: #e46212;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  padding: 10px;
}

.assessmentBtn:hover {
  text-decoration: underline;
}

.thankYouFooter {
  margin-top: 40px;
}

.thankYouBack {
  font-size: 0.82rem;
  color: #475569;
  text-decoration: none;
}

.thankYouBack:hover {
  color: #94a3b8;
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
  .topBar {
    padding: 16px 20px;
  }

  .hero {
    padding: 56px 20px 48px;
  }

  .statsSection {
    padding: 48px 20px;
  }

  .statsGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .chaptersSection {
    padding: 56px 20px;
  }

  .chaptersGrid {
    grid-template-columns: 1fr;
  }

  .ctaBand {
    padding: 56px 20px;
  }

  .thankYouCard {
    padding: 40px 24px;
  }
}

@media (max-width: 480px) {
  .statsGrid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add app/ai-readiness-playbook/playbook.module.css
git commit -m "feat: add CSS Modules stylesheet for playbook lead magnet"
```

---

### Task 9: PlaybookPageClient (client component)

**Files:**
- Create: `app/ai-readiness-playbook/PlaybookPageClient.tsx`

- [ ] **Step 1: Write client component**

Create `app/ai-readiness-playbook/PlaybookPageClient.tsx`:

```tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './playbook.module.css'

const STATS = [
  { number: '88%', label: 'of organisations are actively using AI tools', source: 'McKinsey, 2025' },
  { number: '29%', label: 'report meaningful ROI from those investments', source: 'Gartner, 2025' },
  { number: '79%', label: 'of leaders say AI readiness is a top-3 priority', source: 'Deloitte, 2025' },
  { number: '95%', label: 'of failed AI projects lacked a readiness framework', source: 'IBM, 2025' },
]

const CHAPTERS = [
  { num: '01', title: 'The AI Readiness Gap', desc: 'Why most organizations invest in AI and see nothing back.' },
  { num: '02', title: 'The 90-Day Framework', desc: 'A phased approach to building AI foundations that last.' },
  { num: '03', title: 'Use-Case Matrix', desc: 'Map the highest-value AI opportunities to your operations.' },
  { num: '04', title: 'Data Readiness', desc: 'What your data needs to look like before AI can work.' },
  { num: '05', title: 'Tooling Without the Hype', desc: 'Cut through vendor noise — what actually moves the needle.' },
  { num: '06', title: 'Change Management', desc: 'How to bring your team along without losing momentum.' },
  { num: '07', title: 'Measuring ROI', desc: 'The metrics that prove AI is working — and the ones that lie.' },
  { num: '08', title: 'Your 30-60-90 Plan', desc: 'A practical action plan you can start tomorrow.' },
]

export default function PlaybookPageClient() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Esc key closes modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email, consent, source: 'ai-readiness-playbook' }),
      })
      const data = await res.json()

      if (!res.ok || !data.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setIsLoading(false)
        return
      }

      sessionStorage.setItem('playbook_firstName', firstName)
      router.push('/thank-you')
    } catch {
      setError('Network error. Please check your connection and try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      {/* Top Bar */}
      <header className={styles.topBar}>
        <Link href="/" className={styles.logo}>IMAGENN.AI</Link>
        <span className={styles.resourcePill}>FREE RESOURCE</span>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>2026 AI Readiness Playbook</p>
        <h1 className={styles.h1}>
          How to Start with AI <span className={styles.accent}>Without</span> Falling Behind
        </h1>
        <p className={styles.subHeadline}>
          88% of organizations are using AI. Only 29% see ROI. This free 24-page playbook shows
          SMBs and mid-market teams exactly how to close that gap — in 22 minutes.
        </p>
        <div className={styles.metaPills}>
          <span className={styles.metaPill}>📄 24 Pages</span>
          <span className={styles.metaPill}>⏱ 22-Minute Read</span>
          <span className={styles.metaPill}>✓ Free PDF</span>
        </div>
        <button className={styles.ctaBtn} onClick={() => setIsOpen(true)}>
          Get the Free Playbook →
        </button>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {STATS.map((s) => (
            <div key={s.number} className={styles.statCard}>
              <p className={styles.statNumber}>{s.number}</p>
              <p className={styles.statLabel}>{s.label}</p>
              <p className={styles.statSource}>{s.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chapters */}
      <section className={styles.chaptersSection}>
        <p className={styles.sectionLabel}>What&apos;s Inside</p>
        <h2 className={styles.sectionTitle}>8 Chapters. One Clear Path.</h2>
        <div className={styles.chaptersGrid}>
          {CHAPTERS.map((ch) => (
            <div key={ch.num} className={styles.chapterCard}>
              <span className={styles.chapterNum}>{ch.num}</span>
              <div>
                <p className={styles.chapterTitle}>{ch.title}</p>
                <p className={styles.chapterDesc}>{ch.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className={styles.ctaBand}>
        <h2 className={styles.ctaBandTitle}>Stop reading about AI. Start building with it.</h2>
        <button className={styles.ctaBtn} onClick={() => setIsOpen(true)}>
          Get the Free Playbook →
        </button>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2026 IMAGENN.AI ·{' '}
          <Link href="/privacy" className={styles.footerLink}>Privacy</Link>
        </p>
      </footer>

      {/* Modal */}
      {isOpen && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false) }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className={styles.modalCard}>
            <button
              className={styles.modalClose}
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <h2 id="modal-title" className={styles.modalTitle}>Get Your Free Playbook</h2>
            <p className={styles.modalSub}>
              Enter your details below and we&apos;ll send the PDF straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className={styles.input}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="given-name"
                  placeholder="Your first name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Work Email</label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  placeholder="you@company.com"
                />
              </div>
              <div className={styles.consentRow}>
                <input
                  id="consent"
                  type="checkbox"
                  className={styles.checkbox}
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  disabled={isLoading}
                />
                <label htmlFor="consent" className={styles.consentText}>
                  I agree to receive occasional emails from IMAGENN.AI. Unsubscribe anytime.
                </label>
              </div>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isLoading || !consent}
              >
                {isLoading ? 'Sending...' : 'Send Me the Playbook →'}
              </button>
              {error && <p className={styles.formError}>{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/ai-readiness-playbook/PlaybookPageClient.tsx
git commit -m "feat: add PlaybookPageClient with modal form and page sections"
```

---

### Task 10: Landing page server component

**Files:**
- Create: `app/ai-readiness-playbook/page.tsx`

- [ ] **Step 1: Write server component**

Create `app/ai-readiness-playbook/page.tsx`:

```tsx
import type { Metadata } from 'next'
import PlaybookPageClient from './PlaybookPageClient'

export const metadata: Metadata = {
  title: 'Free AI Readiness Playbook for Organizations | IMAGENN.ai',
  description:
    '88% of orgs use AI. Only 29% see ROI. Get the 22-minute playbook that shows SMBs and mid-market teams how to start — without falling behind. Free PDF.',
  alternates: { canonical: 'https://imagenn.ai/ai-readiness-playbook' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free AI Readiness Playbook | IMAGENN.ai',
    description:
      '88% of orgs use AI. Only 29% see ROI. Get the 22-minute playbook that shows SMBs and mid-market teams how to start — without falling behind. Free PDF.',
    type: 'website',
    url: 'https://imagenn.ai/ai-readiness-playbook',
    images: [{ url: '/og/ai-playbook.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Readiness Playbook for Organizations | IMAGENN.ai',
    description:
      '88% of orgs use AI. Only 29% see ROI. Get the 22-minute playbook that shows SMBs and mid-market teams how to start without falling behind.',
    images: ['/og/ai-playbook.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Start with AI (Without Falling Behind)',
  description:
    '88% of organizations use AI. Only 29% see ROI. This playbook shows SMBs and mid-market teams the exact framework to close the gap.',
  author: { '@type': 'Organization', name: 'IMAGENN.ai', url: 'https://imagenn.ai' },
  publisher: {
    '@type': 'Organization',
    name: 'IMAGENN.ai',
    logo: 'https://imagenn.ai/logo.png',
  },
  datePublished: '2026-04-16',
  url: 'https://imagenn.ai/ai-readiness-playbook',
}

// JSON-LD is a static config object — no user input, XSS risk is nil.
const jsonLdString = JSON.stringify(jsonLd)

export default function AIReadinessPlaybookPage() {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
      <PlaybookPageClient />
    </>
  )
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/ai-readiness-playbook/page.tsx
git commit -m "feat: add AI readiness playbook landing page with metadata and JSON-LD"
```

---

### Task 11: ThankYouClient component

**Files:**
- Create: `app/thank-you/ThankYouClient.tsx`

- [ ] **Step 1: Create directory**

```bash
mkdir -p app/thank-you
```

- [ ] **Step 2: Write client component**

Create `app/thank-you/ThankYouClient.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import styles from '../ai-readiness-playbook/playbook.module.css'

const PDF_PATH = '/IMAGENN-AI-Readiness-Playbook.pdf'
const PDF_FILENAME = 'IMAGENN-AI-Readiness-Playbook.pdf'

export default function ThankYouClient() {
  const router = useRouter()
  const [firstName, setFirstName] = useState<string | null>(null)

  useEffect(() => {
    const name = sessionStorage.getItem('playbook_firstName')
    if (!name) {
      router.replace('/ai-readiness-playbook')
      return
    }
    setFirstName(name)

    // GTM analytics
    const dl = (window as any).dataLayer = (window as any).dataLayer || []
    dl.push({ event: 'lead_magnet_downloaded', source: 'ai-readiness-playbook' })
    dl.push({ event: 'generate_lead', currency: 'CAD', value: 50, source: 'ai-readiness-playbook' })

    // Auto-download after 1.5s
    const timer = setTimeout(() => {
      const a = document.createElement('a')
      a.href = PDF_PATH
      a.download = PDF_FILENAME
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  function handleManualDownload() {
    const dl = (window as any).dataLayer = (window as any).dataLayer || []
    dl.push({ event: 'pdf_download_clicked', file_name: PDF_FILENAME })
  }

  // Prevent flash before sessionStorage check resolves
  if (!firstName) return null

  return (
    <div className={styles.thankYouPage}>
      <div className={styles.thankYouCard}>
        <div className={styles.checkIcon}>✓</div>
        <h1 className={styles.thankYouTitle}>Thanks, {firstName}.</h1>
        <p className={styles.thankYouSub}>
          Your playbook is downloading... If it doesn&apos;t start automatically, use the button below.
        </p>
        <a
          href={PDF_PATH}
          download={PDF_FILENAME}
          className={styles.downloadBtn}
          onClick={handleManualDownload}
        >
          Download the Playbook Now →
        </a>
        <a href={siteConfig.calendlyUrl} className={styles.assessmentBtn} target="_blank" rel="noopener noreferrer">
          Book a Free AI Readiness Assessment →
        </a>
        <div className={styles.thankYouFooter}>
          <Link href="/ai-readiness-playbook" className={styles.thankYouBack}>
            ← Back to the playbook page
          </Link>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/thank-you/ThankYouClient.tsx
git commit -m "feat: add ThankYouClient with sessionStorage gate, auto-download, GTM"
```

---

### Task 12: Thank-you page server shell

**Files:**
- Create: `app/thank-you/page.tsx`

- [ ] **Step 1: Write server shell**

Create `app/thank-you/page.tsx`:

```tsx
import type { Metadata } from 'next'
import ThankYouClient from './ThankYouClient'

export const metadata: Metadata = {
  title: 'Your Playbook is Ready | IMAGENN.ai',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return <ThankYouClient />
}
```

- [ ] **Step 2: Run TypeScript check and dev build**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/thank-you/page.tsx
git commit -m "feat: add thank-you server shell with noindex metadata"
```

---

### Task 13: Manual file placement and smoke test

**Files:**
- `public/IMAGENN-AI-Readiness-Playbook.pdf` — copy manually from Downloads
- `public/og/ai-playbook.jpg` — create manually (1200×630)
- `public/logo.png` — verify exists (referenced in JSON-LD)

- [ ] **Step 1: Copy PDF to public/**

```bash
cp ~/Downloads/IMAGENN-AI-Readiness-Playbook.pdf public/IMAGENN-AI-Readiness-Playbook.pdf
```

- [ ] **Step 2: Create og/ directory and verify**

```bash
mkdir -p public/og
ls public/og/
```

Place `ai-playbook.jpg` (1200×630) in `public/og/`. Create a placeholder if needed:

```bash
# Placeholder check — replace with real image before launch
ls public/og/ai-playbook.jpg 2>/dev/null || echo "⚠️  OG image missing — add before launch"
```

- [ ] **Step 3: Verify logo.png exists**

```bash
ls public/logo.png 2>/dev/null || echo "⚠️  public/logo.png missing — add before launch (referenced in JSON-LD)"
```

- [ ] **Step 4: Start dev server and smoke test**

```bash
npm run dev
```

Open in browser:

1. `http://localhost:3000/ai-readiness-playbook` — page loads, hero visible, CTA button works
2. Click "Get the Free Playbook →" — modal opens
3. Press Esc — modal closes
4. Click outside modal — modal closes
5. Submit form with valid data — redirects to `/thank-you`
6. `/thank-you` — shows name, auto-download triggers, manual download button works
7. Navigate directly to `/thank-you` (no sessionStorage) — redirects back to `/ai-readiness-playbook`

- [ ] **Step 5: Commit manual files (PDF only — not OG image if missing)**

```bash
git add public/IMAGENN-AI-Readiness-Playbook.pdf
git commit -m "feat: add AI readiness playbook PDF to public/"
```

---

## Pre-Launch Checklist

Before going live, verify each item:

- [ ] `public/IMAGENN-AI-Readiness-Playbook.pdf` in place
- [ ] `public/og/ai-playbook.jpg` created (1200×630)
- [ ] `public/logo.png` exists (referenced in JSON-LD, Google Search Console will flag if missing)
- [ ] `siteConfig.calendlyUrl` updated to real booking link in `lib/site-config.ts` (currently placeholder)
- [ ] Supabase project created + migration `001_leads_table.sql` applied
- [ ] Resend domain `imagenn.ai` verified for sending
- [ ] All three env vars added to Vercel project settings:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
