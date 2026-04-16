import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
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
      <Navbar />
      <PlaybookPageClient />
      <Footer />
    </>
  )
}
