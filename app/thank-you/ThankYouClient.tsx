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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dl = ((window as any).dataLayer = (window as any).dataLayer || [])
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dl = ((window as any).dataLayer = (window as any).dataLayer || [])
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
        <a
          href={siteConfig.calendlyUrl}
          className={styles.assessmentBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
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
