import type { Metadata } from "next";
import { GlowOrb } from "@/components/shared/GlowOrb";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "IMAGENN.AI terms of service — the rules and conditions governing your use of our website and services.",
};

export default function TermsPage() {
  return (
    <section className="relative pt-32 pb-20 bg-obsidian overflow-hidden min-h-screen">
      <GlowOrb color="cyan" size="md" className="-top-16 -left-16 opacity-20" />
      <div className="relative content-width px-4 sm:px-6 lg:px-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary mb-6 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-slate-secondary mb-10">Last updated: April 2026</p>

        <div className="prose prose-invert prose-slate prose-headings:font-sans prose-headings:font-semibold prose-p:text-slate-secondary prose-li:text-slate-secondary prose-strong:text-slate-primary max-w-none">
          <p>
            By accessing or using the IMAGENN.AI website (imagenn.ai), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>

          <h2>Use of Our Website</h2>
          <p>
            You may use our website for lawful purposes only. You agree not to use our website in any way that violates applicable laws or regulations, or that infringes on the rights of others.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website — including text, graphics, logos, and images — is the property of IMAGENN.AI and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            Our website is provided &quot;as is&quot; without warranties of any kind. We do not warrant that the website will be error-free, uninterrupted, or free of viruses or other harmful components.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, IMAGENN.AI shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of those websites. We encourage you to review the terms and privacy policies of any third-party websites you visit.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these Terms of Service from time to time. We will post the updated terms on this page with a revised &quot;last updated&quot; date. Your continued use of our website after any changes constitutes your acceptance of the new terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with applicable law, without regard to conflict of law provisions.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:hello@imagenn.ai" className="text-indigo-light hover:text-slate-primary transition-colors">
              hello@imagenn.ai
            </a>
            .
          </p>

          <p className="text-slate-muted text-sm mt-12">
            This is a placeholder terms of service document. Please have a qualified legal professional review and customize this document before launch.
          </p>
        </div>
      </div>
    </section>
  );
}
