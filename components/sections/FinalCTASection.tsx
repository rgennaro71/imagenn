// components/sections/FinalCTASection.tsx
import { ContactForm } from "@/components/forms/ContactForm";
import { GlowOrb } from "@/components/shared/GlowOrb";

export function FinalCTASection() {
  return (
    <section className="relative section-padding bg-obsidian overflow-hidden">
      <GlowOrb color="indigo" size="lg" className="-top-24 -right-24 opacity-50" />
      <GlowOrb color="cyan" size="md" className="-bottom-16 -left-16 opacity-40" />

      <div className="relative content-width px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-tight tracking-tight mb-6">
            Ready to Modernize How Your Organization Works?
          </h2>
          <p className="text-lg text-slate-secondary leading-relaxed">
            Whether you're ready to start or still working out where to begin — let's talk.
            A strategy conversation costs nothing. The status quo costs everything.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <ContactForm />
        </div>

        <p className="text-center text-xs text-slate-muted mt-6">
          No commitment required. We respond within 1 business day.
        </p>
      </div>
    </section>
  );
}
