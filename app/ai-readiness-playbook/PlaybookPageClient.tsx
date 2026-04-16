'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
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
