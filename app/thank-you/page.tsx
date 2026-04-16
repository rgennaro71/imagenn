import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import ThankYouClient from './ThankYouClient'

export const metadata: Metadata = {
  title: 'Your Playbook is Ready | IMAGENN.ai',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <ThankYouClient />
    </>
  )
}
