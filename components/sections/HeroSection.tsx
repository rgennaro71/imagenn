// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { BackgroundGrid } from "@/components/shared/BackgroundGrid";
import { GradientText } from "@/components/shared/GradientText";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian pt-20">
      <BackgroundGrid />
      <GlowOrb color="indigo" size="lg" className="-top-32 -right-32 opacity-60" />
      <GlowOrb color="cyan" size="md" className="-bottom-24 -left-24 opacity-50" />

      <div className="relative content-width px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-muted mb-6">
            AI Innovation & Automation
          </p>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-slate-primary leading-[1.1] tracking-tight mb-8 max-w-4xl mx-auto">
            Modernize How Your{" "}
            <GradientText>Business Thinks.</GradientText>
          </h1>

          <p className="text-lg sm:text-xl text-slate-secondary max-w-2xl mx-auto leading-relaxed mb-10">
            We help ambitious organizations eliminate operational friction,
            automate what slows them down, and build the AI-powered foundation
            their next stage of growth demands.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact?intent=call"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-indigo hover:bg-indigo-dark text-white font-semibold px-8 h-12 text-base"
              )}
            >
              Book a Strategy Call
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/10 text-slate-secondary hover:border-indigo/40 hover:text-slate-primary h-12 text-base flex items-center gap-2 group"
              )}
            >
              Contact Us
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <p className="text-sm text-slate-muted">
            Trusted by founders, CEOs, and operations leaders building the next chapter of their organization.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
