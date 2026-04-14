import type { Metadata } from "next";
import { GlowOrb } from "@/components/shared/GlowOrb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "IMAGENN.AI privacy policy — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <section className="relative pt-32 pb-20 bg-obsidian overflow-hidden min-h-screen">
      <GlowOrb color="indigo" size="md" className="-top-16 -right-16 opacity-20" />
      <div className="relative content-width px-4 sm:px-6 lg:px-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary mb-6 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-secondary mb-10">Last updated: April 2026</p>

        <div className="prose prose-invert prose-slate prose-headings:font-sans prose-headings:font-semibold prose-p:text-slate-secondary prose-li:text-slate-secondary prose-strong:text-slate-primary max-w-none">
          <p>
            This Privacy Policy describes how IMAGENN.AI (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares information about you when you use our website and services.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you fill out a contact form, join our waitlist, or book a call. This may include your name, email address, company name, and any other information you choose to provide.
          </p>
          <p>
            We also automatically collect certain information when you visit our website, including your IP address, browser type, referring URLs, and pages viewed. We use this information to improve our website and services.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and requests</li>
            <li>Send you updates about our services and product launches (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your information for as long as necessary to fulfill the purposes for which it was collected and to comply with our legal obligations.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at hello@imagenn.ai.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:hello@imagenn.ai" className="text-indigo-light hover:text-slate-primary transition-colors">
              hello@imagenn.ai
            </a>
            .
          </p>

          <p className="text-slate-muted text-sm mt-12">
            This is a placeholder privacy policy. Please have a qualified legal professional review and customize this document before launch.
          </p>
        </div>
      </div>
    </section>
  );
}
