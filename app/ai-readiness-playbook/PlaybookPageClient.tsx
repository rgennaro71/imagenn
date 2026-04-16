'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { ElegantShape } from '@/components/ui/shape-landing-hero'
import styles from './playbook.module.css'

// ─── Input primitives (matching /network design system) ───────────────────────

function LightInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean },
) {
  const { hasError, ...rest } = props
  const [focused, setFocused] = useState(false)
  return (
    <input
      {...rest}
      style={{
        width: '100%',
        height: '46px',
        padding: '0 13px',
        borderRadius: '5px',
        fontSize: '14px',
        background: '#FAFAF7',
        border: `1px solid ${hasError ? '#DC2626' : focused ? '#B45309' : '#DDD6CC'}`,
        color: '#18150F',
        outline: 'none',
        boxShadow: focused ? '0 0 0 3px rgba(180,83,9,0.08)' : 'none',
        transition: 'border-color 0.14s, box-shadow 0.14s',
        fontFamily: 'inherit',
        ...rest.style,
      }}
      onFocus={(e) => {
        setFocused(true)
        rest.onFocus?.(e)
      }}
      onBlur={(e) => {
        setFocused(false)
        rest.onBlur?.(e)
      }}
    />
  )
}

const lbl: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#7A6A58',
  marginBottom: '6px',
  display: 'block',
}

const fieldErrStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#DC2626',
  marginTop: '3px',
}

// ─── Animation ────────────────────────────────────────────────────────────────

const heroFade: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.2 + i * 0.14, ease: 'easeOut' },
  }),
}

// ─── Data ─────────────────────────────────────────────────────────────────────

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

const HERO_PILLS = [
  { stat: '95%', label: 'of failed AI projects lacked a readiness framework', source: 'IBM, 2025' },
  { stat: '90 days', label: 'to measurable results with the right framework', source: 'IMAGENN Framework' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlaybookPageClient() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [consent, setConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {}
    if (!firstName.trim()) errs.firstName = 'First name is required'
    if (!lastName.trim()) errs.lastName = 'Last name is required'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = 'Enter a valid email'
    if (!consent) errs.consent = 'You must agree to continue'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      return
    }
    setFieldErrors({})
    setIsLoading(true)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          company,
          role,
          consent,
          source: 'ai-readiness-playbook',
        }),
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

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — two-column: left content anchor + right inline form card
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="get-playbook" style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 8% 52%, rgba(99,102,241,0.07) 0%, transparent 58%)',
        }} />

        {/* Geometric shapes */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <ElegantShape delay={0.2} width={440} height={100} rotate={-8}
            gradient="from-indigo-500/[0.08]" className="right-[-4%] top-[6%]" />
          <ElegantShape delay={0.4} width={240} height={58} rotate={14}
            gradient="from-violet-500/[0.06]" className="right-[14%] top-[58%]" />
          <ElegantShape delay={0.6} width={130} height={34} rotate={-22}
            gradient="from-indigo-400/[0.05]" className="left-[3%] bottom-[12%]" />
        </div>

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(6,7,15,0.5) 0%, transparent 12%, transparent 88%, rgba(6,7,15,0.85) 100%)',
        }} />

        <div style={{
          position: 'relative', maxWidth: '1280px', margin: '0 auto',
          padding: 'clamp(5.5rem, 11vh, 7.5rem) clamp(1.25rem, 4vw, 3rem) clamp(4rem, 8vh, 5.5rem)',
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 xl:gap-16 items-start">

            {/* ── LEFT — headline block ── */}
            <div style={{ paddingTop: '8px' }}>

              <motion.p
                custom={0} variants={heroFade} initial="hidden" animate="visible"
                style={{
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em',
                  textTransform: 'uppercase', color: 'rgba(129,140,248,0.7)',
                  marginBottom: '22px',
                }}>
                2026 AI Readiness Playbook
              </motion.p>

              <motion.h1
                custom={1} variants={heroFade} initial="hidden" animate="visible"
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(2.6rem, 5vw, 3.75rem)',
                  fontWeight: 700, lineHeight: 1.07, color: '#f1f5f9',
                  letterSpacing: '-0.02em', marginBottom: '24px',
                }}>
                The 90-Day AI Plan Your{' '}
                <em style={{ fontStyle: 'italic', color: '#E46212' }}>
                  Competitors
                </em>
                {' '}Hope You Never See
              </motion.h1>

              <motion.p
                custom={2} variants={heroFade} initial="hidden" animate="visible"
                style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', lineHeight: 1.75,
                  color: 'rgba(241,245,249,0.48)', maxWidth: '34rem', marginBottom: '36px',
                }}>
                88% of organizations use AI. Only 29% see ROI — because they skipped the 5
                readiness pillars. This 24-page playbook shows you exactly which ones they
                miss, plus the 7 mistakes that kill 2 out of 3 AI initiatives — so you avoid
                the $2M pilot graveyard.
              </motion.p>

              {/* Stat pills */}
              <motion.div
                custom={3} variants={heroFade} initial="hidden" animate="visible"
                style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '390px', marginBottom: '28px' }}>
                {HERO_PILLS.map((pill, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '12px 16px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: '1.4rem', fontWeight: 700, color: '#818cf8',
                      lineHeight: 1, flexShrink: 0, minWidth: '4.5rem',
                    }}>
                      {pill.stat}
                    </span>
                    <div>
                      <p style={{ fontSize: '12px', color: 'rgba(241,245,249,0.52)', lineHeight: 1.45, margin: 0 }}>
                        {pill.label}
                      </p>
                      <p style={{ fontSize: '10px', color: 'rgba(241,245,249,0.22)', margin: '2px 0 0', fontStyle: 'italic' }}>
                        {pill.source}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Meta pills */}
              <motion.div
                custom={4} variants={heroFade} initial="hidden" animate="visible"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['📄 24 Pages', '⏱ 22-Minute Read', '✓ Free PDF'].map((pill) => (
                  <span key={pill} style={{
                    fontSize: '12px', fontWeight: 500, color: 'rgba(142,163,187,0.75)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '100px', padding: '5px 13px',
                  }}>
                    {pill}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT — inline form card ── */}
            <motion.div
              custom={5} variants={heroFade} initial="hidden" animate="visible"
              style={{
                padding: 'clamp(24px, 3vw, 34px)',
                borderRadius: '12px',
                background: 'rgba(250,246,238,0.05)',
                border: '1px solid rgba(250,246,238,0.1)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
              }}>

              <p style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '1.45rem', fontWeight: 700, color: '#f1f5f9',
                marginBottom: '14px', lineHeight: 1.25,
              }}>
                Get Your Free Playbook
              </p>

              {/* Curiosity-bullet preview */}
              <p style={{
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#B45309',
                marginBottom: '10px',
              }}>
                Inside this 24-page playbook
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'The 5 pillars 95% of failed AI pilots skip',
                  'The exact 90-day framework we use with $15K–$50K clients',
                  'The 7 mistakes that kill 2 out of 3 AI initiatives',
                  'A governance checklist aligned to EU AI Act + ISO 42001',
                ].map((bullet) => (
                  <li key={bullet} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
                    <Check
                      size={16}
                      style={{ color: '#B45309', flexShrink: 0, marginTop: '2px' }}
                      aria-hidden="true"
                    />
                    <span style={{ fontSize: '0.875rem', color: 'rgba(241,245,249,0.72)', lineHeight: 1.5 }}>
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '1.25rem 0' }} />

              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>

                {/* First + Last Name */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={lbl}>First Name *</label>
                    <LightInput
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First"
                      autoComplete="given-name"
                      disabled={isLoading}
                      hasError={!!fieldErrors.firstName}
                    />
                    {fieldErrors.firstName && (
                      <p style={fieldErrStyle}>{fieldErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label style={lbl}>Last Name *</label>
                    <LightInput
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last"
                      autoComplete="family-name"
                      disabled={isLoading}
                      hasError={!!fieldErrors.lastName}
                    />
                    {fieldErrors.lastName && (
                      <p style={fieldErrStyle}>{fieldErrors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Work Email */}
                <div>
                  <label style={lbl}>Work Email *</label>
                  <LightInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    disabled={isLoading}
                    hasError={!!fieldErrors.email}
                  />
                  {fieldErrors.email && (
                    <p style={fieldErrStyle}>{fieldErrors.email}</p>
                  )}
                </div>

                {/* Company + Role */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={lbl}>
                      Company{' '}
                      <span style={{
                        fontWeight: 400, textTransform: 'none',
                        letterSpacing: 0, color: '#B0A090', fontSize: '10px',
                      }}>
                        optional
                      </span>
                    </label>
                    <LightInput
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company name"
                      autoComplete="organization"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label style={lbl}>
                      Role{' '}
                      <span style={{
                        fontWeight: 400, textTransform: 'none',
                        letterSpacing: 0, color: '#B0A090', fontSize: '10px',
                      }}>
                        optional
                      </span>
                    </label>
                    <LightInput
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="CEO, VP Ops…"
                      autoComplete="organization-title"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Consent */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input
                    id="playbook-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    disabled={isLoading}
                    style={{
                      width: '16px', height: '16px', marginTop: '2px',
                      flexShrink: 0, accentColor: '#B45309', cursor: 'pointer',
                    }}
                  />
                  <label
                    htmlFor="playbook-consent"
                    style={{
                      fontSize: '11.5px', color: 'rgba(241,245,249,0.32)',
                      lineHeight: 1.5, cursor: 'pointer', margin: 0,
                    }}>
                    I agree to receive occasional emails from IMAGENN.AI. Unsubscribe anytime.
                  </label>
                </div>
                {fieldErrors.consent && (
                  <p style={fieldErrStyle}>{fieldErrors.consent}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading || !consent}
                  style={{
                    width: '100%', height: '50px', marginTop: '2px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    fontSize: '14px', fontWeight: 700,
                    borderRadius: '8px', border: 'none',
                    background: '#E46212', color: '#FFFFFF',
                    cursor: isLoading || !consent ? 'not-allowed' : 'pointer',
                    opacity: !consent ? 0.5 : 1,
                    boxShadow: '0 4px 20px rgba(228,98,18,0.3)',
                    transition: 'box-shadow 0.2s ease, transform 0.15s ease, opacity 0.15s ease',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading && consent) {
                      const el = e.currentTarget
                      el.style.boxShadow = '0 6px 28px rgba(228,98,18,0.5)'
                      el.style.transform = 'translateY(-1px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.boxShadow = '0 4px 20px rgba(228,98,18,0.3)'
                    el.style.transform = 'translateY(0)'
                  }}>
                  {isLoading
                    ? 'Sending…'
                    : <><span>Send Me the Playbook</span><ArrowRight size={14} /></>}
                </button>

                {error && (
                  <p style={{ fontSize: '12px', color: '#ef4444', textAlign: 'center', margin: 0 }}>
                    {error}
                  </p>
                )}

                <p style={{
                  fontSize: '0.8125rem', fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.75)',
                  textAlign: 'center', margin: 0, lineHeight: 1.55,
                }}>
                  &ldquo;This framework saved us from a $180K mistake with the wrong AI vendor.&rdquo;
                </p>
                <p style={{
                  fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)',
                  textAlign: 'center', margin: '0.5rem 0 0', lineHeight: 1.45,
                }}>
                  — Operations Director, mid-market SaaS &middot; Updated April 2026 with EU AI Act guidance
                </p>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS — unchanged
      ═══════════════════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════════════════
          CHAPTERS — unchanged
      ═══════════════════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════════════════
          CTA BAND — scroll anchor replaces modal trigger
      ═══════════════════════════════════════════════════════════════════ */}
      <section className={styles.ctaBand}>
        <h2 className={styles.ctaBandTitle}>Stop reading about AI. Start building with it.</h2>
        <a href="#get-playbook" className={styles.ctaBtn}>
          Get the Free Playbook →
        </a>
      </section>

    </div>
  )
}
