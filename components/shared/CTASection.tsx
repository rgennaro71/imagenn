// components/shared/CTASection.tsx
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { GlowOrb } from "./GlowOrb";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  heading: string;
  subheading: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  eyebrow?: string;
}

export function CTASection({
  heading,
  subheading,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  eyebrow,
}: CTASectionProps) {
  return (
    <section className="relative bg-obsidian-secondary overflow-hidden">
      <GlowOrb color="indigo" size="lg" className="-top-24 -right-24" />
      <GlowOrb color="cyan" size="md" className="-bottom-16 -left-16" />
      <div className="relative content-width section-padding text-center">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary mb-6 tracking-tight">
          {heading}
        </h2>
        <p className="text-lg text-slate-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryHref}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-indigo hover:bg-indigo-dark text-white font-semibold px-8"
            )}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/10 text-slate-secondary hover:border-indigo/50 hover:text-slate-primary"
              )}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
