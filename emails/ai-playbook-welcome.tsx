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
