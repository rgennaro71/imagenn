// app/layout.tsx
import type { Metadata } from "next";
import { playfair, dmSans } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  logo: `${siteConfig.url}/og-image.png`,
  sameAs: [siteConfig.social.linkedin, siteConfig.social.twitter],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: siteConfig.contactEmail,
  },
  founder: {
    "@type": "Person",
    name: siteConfig.founder.fullName,
    jobTitle: siteConfig.founder.title,
  },
};

// JSON-LD content is a static config object — no user input, XSS risk is nil.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jsonLdString = JSON.stringify(jsonLd);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>
      <body className="bg-obsidian text-slate-primary font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
