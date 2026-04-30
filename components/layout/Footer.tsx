// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const footerLinks = {
  Services: [
    { label: "AI Strategy & Mapping", href: "/services#ai-strategy" },
    { label: "AI-Powered Decision Support", href: "/services#decision-support" },
    { label: "Change Enablement", href: "/services#change-enablement" },
    { label: "Workflow Automation", href: "/services#workflow-automation" },
    { label: "All Services", href: "/services" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Speaking", href: "/speaking" },
    { label: "Insights", href: "/insights" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "AI Readiness Playbook", href: "/ai-readiness-playbook" },
    { label: "Join Waitlist", href: "/waitlist" },
  ],
  Solutions: [
    { label: "Operations", href: "/solutions#operations" },
    { label: "Sales", href: "/solutions#sales" },
    { label: "Customer Experience", href: "/solutions#cx" },
    { label: "Leadership", href: "/solutions#leadership" },
    { label: "All Use Cases", href: "/solutions" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/5">
      <div className="content-width px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/Logo-light.svg"
                alt={siteConfig.name}
                width={160}
                height={46}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-sm text-slate-muted leading-relaxed mb-6 max-w-xs">
              AI innovation and automation for organizations ready to modernize how they work and grow.
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-muted hover:text-indigo-light transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-muted hover:text-indigo-light transition-colors"
                aria-label="Twitter / X"
              >
                <XIcon size={18} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-muted mb-5">
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-muted hover:text-slate-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-slate-muted hover:text-slate-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-slate-muted hover:text-slate-secondary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
