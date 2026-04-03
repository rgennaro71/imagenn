// components/sections/WaitlistSection.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { cn } from "@/lib/utils";

const waitlistSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export function WaitlistSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setLoading(true);
    setServerError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative overflow-hidden section-padding"
      style={{ background: "linear-gradient(135deg, #0d0d20 0%, #0a0a1a 50%, #080814 100%)" }}
    >
      <GlowOrb color="indigo" size="lg" className="-top-32 right-1/4 opacity-40" />
      <GlowOrb color="cyan" size="md" className="bottom-0 left-1/4 opacity-30" />

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative content-width px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo/10 subtle-border mb-6">
          <Sparkles size={13} className="text-indigo-light" />
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-light">Coming Soon</span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-tight tracking-tight mb-6 max-w-3xl mx-auto">
          The Future of Work Is Being Built Right Now.
        </h2>

        <p className="text-lg text-slate-secondary max-w-2xl mx-auto leading-relaxed mb-10">
          IMAGENN.AI is developing a suite of AI-powered SaaS products for organizations
          ready to lead — not follow — the automation era. Join the waitlist for early access.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-indigo/10 glow-border">
            <CheckCircle size={20} className="text-cyan-brand" />
            <p className="text-slate-primary font-medium">You're on the list — we'll be in touch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <Input
                {...register("firstName")}
                placeholder="First name"
                className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted h-12"
              />
              {errors.firstName && <p className="text-red-400 text-xs mt-1 text-left">{errors.firstName.message}</p>}
            </div>
            <div className="flex-[2]">
              <Input
                {...register("email")}
                type="email"
                placeholder="Work email"
                className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted h-12"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1 text-left">{errors.email.message}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                buttonVariants(),
                "h-12 px-6 font-semibold whitespace-nowrap text-white",
                "bg-gradient-to-r from-indigo to-cyan-brand disabled:opacity-50"
              )}
            >
              {loading ? "Joining..." : "Join the Waitlist"}
            </button>
          </form>
        )}

        {serverError && <p className="text-red-400 text-sm mt-3">{serverError}</p>}
        {!submitted && <p className="text-xs text-slate-muted mt-4">No spam. Early access only. Be first.</p>}
      </div>
    </section>
  );
}
