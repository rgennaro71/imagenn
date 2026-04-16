# AI Readiness Playbook — Lead Magnet Feature Spec
**Date:** 2026-04-16
**Status:** Approved — ready for implementation

---

## Overview

A standalone lead magnet flow that captures email subscribers in exchange for the IMAGENN.ai 2026 AI Readiness Playbook PDF. Subscribers are stored in Supabase, notified via Resend (branded React Email template), and the admin receives a notification on every new lead.

---

## Goals

1. Capture name + email leads in exchange for the playbook PDF
2. Store leads in Supabase with full audit trail (IP, user agent, consent timestamp)
3. Send a branded welcome email with download link via Resend
4. Notify admin on every submission
5. Rate-limit abuse without external infrastructure
6. Be SEO-optimised and analytics-instrumented

---

## New Files

| Path | Purpose |
|---|---|
| `app/ai-readiness-playbook/page.tsx` | Standalone conversion landing page |
| `app/ai-readiness-playbook/playbook.module.css` | CSS Modules styles (intentional design, not Tailwind) |
| `app/thank-you/page.tsx` | Server shell — exports metadata (no 'use client' conflict) |
| `app/thank-you/ThankYouClient.tsx` | Client component: sessionStorage gate, analytics, auto-download |
| `app/api/subscribe/route.ts` | POST API: validate → rate-limit → Supabase → Resend |
| `emails/ai-playbook-welcome.tsx` | React Email branded template |
| `lib/supabase/admin.ts` | Supabase admin client (service role) |
| `lib/rate-limit.ts` | In-memory rate limiter (5 req/IP/hour) |
| `supabase/migrations/001_leads_table.sql` | Leads table migration |
| `public/og/ai-playbook.jpg` | OG image (user places manually) |
| `public/IMAGENN-AI-Readiness-Playbook.pdf` | PDF (user places manually) |

---

## Packages to Install

```bash
npm install @supabase/supabase-js @react-email/components
```

Also install `server-only` (prevents accidental client bundling of the Supabase service key):
```bash
npm install server-only
```

No Upstash — rate limiting uses in-memory Map with TTL cleanup.

> ⚠️ **Known limitation:** In-memory rate limiting is best-effort on serverless. Each cold-start resets the Map. Acceptable for a lead magnet — revisit with Upstash Redis if abuse is observed.

---

## Environment Variables

Add to `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Already present
RESEND_API_KEY=your-resend-key
```

---

## Database Schema — `leads` table

File: `supabase/migrations/001_leads_table.sql`

```sql
create extension if not exists "pgcrypto";

create table public.leads (
  id               uuid primary key default gen_random_uuid(),
  first_name       text not null,
  last_name        text,                          -- nullable: form only collects firstName
  email            text not null unique,
  company          text,
  role             text,
  source           text not null,                 -- e.g. 'ai-readiness-playbook'
  consent_given_at timestamptz not null,
  ip_address       inet,
  user_agent       text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Indexes
create index leads_email_idx       on public.leads (email);
create index leads_source_idx      on public.leads (source);
create index leads_created_at_idx  on public.leads (created_at desc);

-- RLS
alter table public.leads enable row level security;

-- RLS enabled with NO permissive policies = no public/anon access.
-- The service role key bypasses RLS natively — do NOT add an auth.role() policy,
-- it will deny the service key client (auth.role() returns null in that context).

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

> **Note:** Migration is numbered `001` since this project has no existing Supabase migrations.
> Run: `supabase migration up` or apply via Supabase dashboard SQL editor.

---

## API Contract — `POST /api/subscribe`

### Request body (Zod schema)
```ts
{
  firstName: string (min 1),
  email:     string (valid email),
  consent:   boolean (must be true),
  source:    string (default: 'ai-readiness-playbook')
}
```

> lastName, company, and role are omitted from the form (minimal friction). The DB columns exist for future use.

### Responses
| Scenario | Status | Body |
|---|---|---|
| Success, new lead | 200 | `{ ok: true }` |
| Duplicate email | 200 | `{ ok: true, duplicate: true }` |
| Consent not given | 400 | `{ ok: false, error: "Consent required" }` |
| Zod validation fail | 400 | `{ ok: false, error: "Invalid input" }` |
| Rate limited | 429 | `{ ok: false, error: "Too many requests" }` |
| Any internal error | 500 | `{ ok: false, error: "Something went wrong" }` |

Internal error details are **never** exposed to the client.

### Rate limiting
- In-memory Map: key = IP address, value = `{ count, resetAt }`
- Limit: 5 requests per IP per 60 minutes
- Cleanup: stale entries pruned on each request
- IP extraction order (Vercel-safe): `x-real-ip` first (single trusted IP), then `x-forwarded-for?.split(',')[0].trim()` (take first entry, trim whitespace)
- If IP is `'unknown'`, **fail open** (allow the request) — never block legitimate users due to missing header

### Supabase insertion
- Uses service role client (bypasses RLS)
- **Duplicate detection:** Supabase returns `error.code === '23505'` on unique constraint violation — check the code, do NOT string-match the message (brittle). Return `{ ok: true, duplicate: true }`.
- Captures: `first_name`, `email`, `source`, `consent_given_at: new Date().toISOString()`, `ip_address`, `user_agent`

### Emails sent (via Resend)
1. **Welcome email → submitter**
   - From: `IMAGENN.AI <noreply@imagenn.ai>`
   - Subject: `Your AI Readiness Playbook is ready — IMAGENN.ai`
   - Template: `emails/ai-playbook-welcome.tsx` (React Email, rendered server-side)
   - Props: `{ firstName, downloadUrl: 'https://imagenn.ai/IMAGENN-AI-Readiness-Playbook.pdf', assessmentUrl: siteConfig.calendlyUrl }`
   - PDF as **link** (not attachment) — avoids spam filter triggers
   - **If Resend fails:** log the error server-side, do NOT roll back the DB insert, return `{ ok: true }` — lead is captured; email failure is non-fatal

2. **Admin notification → `siteConfig.adminEmail`**
   - Subject: `New playbook lead: {firstName} ({email})`
   - Plain HTML (no template needed)
   - Body: name, email, source, timestamp

---

## React Email Template — `emails/ai-playbook-welcome.tsx`

Props: `{ firstName: string, downloadUrl: string, assessmentUrl: string }`

Design spec:
- **Hero block**: dark navy `#0a0e27` background, Playfair Display heading
  - `Your AI Readiness Playbook is here, {firstName}` — "here" in italic orange `#E46212`
- **Body**: white background, Inter/system-ui
  - Para 1: what's inside (8 chapters, 90-day framework, use-case matrix)
  - Para 2: 30-min free assessment CTA
- **Primary button**: `Download the Playbook →` → `downloadUrl` — orange `#E46212`
- **Secondary button**: `Book a Free Assessment →` → `assessmentUrl` — outlined
- **Footer**: `hello@imagenn.ai` · Vaughan, ON, Canada · unsubscribe placeholder
- Under 120 lines, default export

---

## Landing Page — `app/ai-readiness-playbook/page.tsx`

### Architecture
- **Server component** for the page shell (metadata, JSON-LD, static content)
- **`PlaybookPageClient`** child component (`'use client'`) handles modal open/close state and form submission only
- CSS Modules (`playbook.module.css`) for all custom styles — uses existing CSS variables `--font-playfair` and `--font-dm-sans`

### Metadata
```ts
export const metadata: Metadata = {
  title: 'Free AI Readiness Playbook for Organizations | IMAGENN.ai',
  description: '88% of orgs use AI. Only 29% see ROI. Get the 22-minute playbook that shows SMBs and mid-market teams how to start — without falling behind. Free PDF.',
  alternates: { canonical: 'https://imagenn.ai/ai-readiness-playbook' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free AI Readiness Playbook | IMAGENN.ai',
    description: '...',
    type: 'website',
    url: 'https://imagenn.ai/ai-readiness-playbook',
    images: [{ url: '/og/ai-playbook.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Readiness Playbook for Organizations | IMAGENN.ai',
    description: '88% of orgs use AI. Only 29% see ROI. Get the 22-minute playbook that shows SMBs and mid-market teams how to start without falling behind.',
    images: ['/og/ai-playbook.jpg'],
  },
}
```

### JSON-LD (Article schema, inline `<script>` in page body)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Start with AI (Without Falling Behind)",
  "description": "...",
  "author": { "@type": "Organization", "name": "IMAGENN.ai", "url": "https://imagenn.ai" },
  "publisher": { "@type": "Organization", "name": "IMAGENN.ai", "logo": "https://imagenn.ai/logo.png" },
  "datePublished": "2026-04-16",
  "url": "https://imagenn.ai/ai-readiness-playbook"
}
```

### Page sections (top → bottom)

1. **Top bar** — IMAGENN.ai logo (links to `/`) + `FREE RESOURCE` pill
2. **Hero** — eyebrow label · H1 · subheadline · 3 metadata pills (24 pages · 22 min · Free) · primary CTA `Get the Free Playbook →`
3. **Social proof stats** — 4-up stat cards: 88% / 29% / 79% / 95% (from PDF Ch.01, with source attribution)
4. **What's Inside** — 8 chapter cards (number in orange, title, one-line description)
5. **CTA band** — `Stop reading about AI. Start building with it.` + button
6. **Footer line** — © 2026 IMAGENN.ai · Privacy

### Modal (within `PlaybookPageClient`)
- Full-viewport overlay, backdrop blur
- Closes on Esc keydown or click-outside
- Form fields: First Name · Email · Consent checkbox (`I agree to receive occasional emails from IMAGENN.ai. Unsubscribe anytime.`)
- Submit button: `Send Me the Playbook →` / `Sending...` (loading state)
- Fields disabled during submission
- Inline error below submit button (red `#ef4444`) on API failure
- On success: `sessionStorage.setItem('playbook_firstName', firstName)` → `router.push('/thank-you')`

---

## Thank-You Page — `app/thank-you/page.tsx` + `ThankYouClient.tsx`

### Server shell (`page.tsx`) — server component
```ts
// exports metadata safely — metadata exports only work in server components
export const metadata: Metadata = {
  title: 'Your Playbook is Ready | IMAGENN.ai',
  robots: { index: false, follow: false }, // no-index: thank-you pages shouldn't rank
}
export default function ThankYouPage() {
  return <ThankYouClient />
}
```

### Client component (`ThankYouClient.tsx`) — `'use client'`

### Gate logic (on mount)
```ts
const firstName = sessionStorage.getItem('playbook_firstName')
if (!firstName) router.replace('/ai-readiness-playbook')
```

### Page content
- Checkmark icon + `Thanks, {firstName}.` heading
- `Your playbook is downloading...` subtext
- Manual download button: `Download the Playbook Now →` → `/IMAGENN-AI-Readiness-Playbook.pdf` (new tab, `download` attribute)
- Secondary CTA: `Book a Free AI Readiness Assessment →` → `siteConfig.calendlyUrl`

### Auto-download
```ts
useEffect(() => {
  const timer = setTimeout(() => {
    const a = document.createElement('a')
    a.href = '/IMAGENN-AI-Readiness-Playbook.pdf'
    a.download = 'IMAGENN-AI-Readiness-Playbook.pdf'
    a.click()
  }, 1500)
  return () => clearTimeout(timer)
}, [])
```

### Analytics (GTM dataLayer push)
**On mount:**
```ts
window.dataLayer?.push({ event: 'lead_magnet_downloaded', source: 'ai-readiness-playbook' })
window.dataLayer?.push({ event: 'generate_lead', currency: 'CAD', value: 50, source: 'ai-readiness-playbook' })
```

**On manual download button click:**
```ts
window.dataLayer?.push({ event: 'pdf_download_clicked', file_name: 'IMAGENN-AI-Readiness-Playbook.pdf' })
```

All guarded with `typeof window !== 'undefined'`.

---

## Rate Limiter — `lib/rate-limit.ts`

```ts
// In-memory Map: ip → { count, resetAt }
// 5 requests per 60 minutes per IP
// Stale entries pruned on each call
```

Returns `{ allowed: boolean, remaining: number }`.

---

## Supabase Admin Client — `lib/supabase/admin.ts`

```ts
import 'server-only' // prevents accidental client-side bundling of service key
import { createClient } from '@supabase/supabase-js'
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } } // no session storage on server
)
```

Service role only — never imported by any client component. The `server-only` import throws a build error if accidentally bundled client-side.

---

## Pre-Launch Checklist (manual actions required before going live)

- [ ] `public/IMAGENN-AI-Readiness-Playbook.pdf` — copy from Downloads
- [ ] `public/og/ai-playbook.jpg` — OG image (1200×630)
- [ ] `public/logo.png` — confirm this file exists; referenced in JSON-LD structured data (`https://imagenn.ai/logo.png`) — Google Search Console will flag it if missing
- [ ] `siteConfig.calendlyUrl` in `lib/site-config.ts` — update from placeholder to real booking link before launch (currently `https://calendly.com/imagennai`); broken link appears in welcome email and thank-you page CTA
- [ ] Supabase project created and migration applied
- [ ] Resend domain `imagenn.ai` verified for sending
- [ ] All env vars added to Vercel project settings

---

## Implementation Notes

- No new UI libraries — framer-motion already available for modal animation if desired
- `escHtml` utility already exists in `lib/utils.ts` — use for admin email HTML
- `siteConfig.calendlyUrl` and `siteConfig.adminEmail` already in `lib/site-config.ts`
- Existing Resend pattern from `app/api/waitlist/route.ts` is the model to follow
- Do NOT use `next/headers` in client components — IP extracted in the API route only
- `window.dataLayer` must be cast: `(window as any).dataLayer = (window as any).dataLayer || []`
