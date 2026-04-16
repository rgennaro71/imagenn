import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit } from '@/lib/rate-limit'
import { siteConfig } from '@/lib/site-config'

const LIVE_BACKEND = process.env.SUBSCRIBE_BACKEND_LIVE === 'true'

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

  // --- STUB MODE (default until SUBSCRIBE_BACKEND_LIVE=true) ---
  if (!LIVE_BACKEND) {
    console.log('[SUBSCRIBE STUB]', {
      firstName,
      email,
      source,
      timestamp: new Date().toISOString(),
    })
    return NextResponse.json({ ok: true, stubbed: true })
  }

  // --- LIVE MODE ---
  const { getSupabaseAdmin } = await import('@/lib/supabase/admin')
  const { Resend } = await import('resend')
  const { render } = await import('@react-email/components')
  const { escHtml } = await import('@/lib/utils')
  const { default: AiPlaybookWelcome } = await import('@/emails/ai-playbook-welcome')

  const supabaseAdmin = getSupabaseAdmin()
  const resend = new Resend(process.env.RESEND_API_KEY)

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
