// components/sections/FutureProofSection.tsx
"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { cn } from "@/lib/utils";

export function FutureProofSection() {
  return (
    <section className="relative section-padding bg-obsidian overflow-hidden">
      <GlowOrb color="indigo" size="lg" className="top-0 left-1/4 opacity-20" />
      <GlowOrb color="cyan" size="md" className="bottom-0 right-1/4 opacity-15" />

      <div className="relative content-width px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-primary leading-tight tracking-tight mb-8">
          The organizations winning the next decade aren't waiting for the right moment.{" "}
          <span style={{ background: "linear-gradient(90deg,#818cf8,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            They're building it.
          </span>
        </h2>
        <p className="text-lg text-slate-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
          IMAGENN.AI exists to help ambitious organizations get ahead of change — not react to it.
          The tools, the strategy, the execution. All of it, built around what your organization
          actually needs to move forward.
        </p>
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-indigo hover:bg-indigo-dark text-white font-semibold px-8 h-12"
          )}
        >
          Start Your Transformation →
        </Link>
      </div>
    </section>
  );
}
