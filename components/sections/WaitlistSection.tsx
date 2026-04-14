// components/sections/WaitlistSection.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const waitlistSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

const earlyBenefits = [
  "Priority access before public launch",
  "Founder-tier pricing — locked in forever",
  "Direct input into product roadmap",
];

export function WaitlistSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>({ resolver: zodResolver(waitlistSchema) });

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
      id="waitlist"
      className="relative overflow-hidden section-padding"
      style={{
        background: "linear-gradient(135deg, #1a1100 0%, #110d00 40%, #0e0900 100%)",
      }}
    >
      {/* Amber radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(245,158,11,0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(217,119,6,0.07) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.5) 40%, rgba(251,191,36,0.3) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative content-width px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.25)",
              }}
            >
              <Sparkles size={13} style={{ color: "#f59e0b" }} />
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#f59e0b" }}
              >
                Product Waitlist — Now Open
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-[1.1] tracking-tight mb-5">
              The Future of Work Is{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Being Built Now.
              </span>
            </h2>

            <p className="text-lg text-slate-secondary leading-[1.75] mb-8">
              IMAGENN.AI is developing a suite of AI-powered tools for organizations
              ready to lead — not follow — the automation era. Join the waitlist for
              priority access, founder pricing, and a direct line to shape what we build.
            </p>

            {/* Benefits list */}
            <ul className="flex flex-col gap-3">
              {earlyBenefits.map((benefit, i) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      border: "1px solid rgba(245,158,11,0.3)",
                    }}
                  >
                    <CheckCircle size={11} style={{ color: "#f59e0b" }} />
                  </div>
                  <span className="text-sm text-slate-secondary">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div
                className="p-8 rounded-2xl text-center"
                style={{
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  boxShadow: "0 0 40px rgba(245,158,11,0.08)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: "rgba(245,158,11,0.15)",
                    border: "1px solid rgba(245,158,11,0.3)",
                  }}
                >
                  <CheckCircle size={24} style={{ color: "#f59e0b" }} />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-primary mb-2">
                  You&apos;re on the list.
                </h3>
                <p className="text-sm text-slate-muted leading-relaxed">
                  We&apos;ll be in touch with early access details before we launch.
                  Welcome to the future of work.
                </p>
              </div>
            ) : (
              <div
                className="p-8 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                <p className="text-sm font-semibold text-slate-primary mb-1">
                  Reserve your spot
                </p>
                <p className="text-xs text-slate-muted mb-6">
                  No spam. Early access only. Be first.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Input
                      {...register("firstName")}
                      placeholder="First name"
                      className="h-11"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#f1f5f9",
                      }}
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="Work email"
                      className="h-11"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#f1f5f9",
                      }}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {serverError && (
                    <p className="text-red-400 text-sm">{serverError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 group transition-all duration-300 disabled:opacity-50"
                    style={{
                      background: "linear-gradient(135deg, #d97706, #f59e0b)",
                      color: "#0e0906",
                      boxShadow: "0 0 24px rgba(245,158,11,0.35), 0 4px 12px rgba(0,0,0,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 40px rgba(245,158,11,0.5), 0 4px 16px rgba(0,0,0,0.5)";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 24px rgba(245,158,11,0.35), 0 4px 12px rgba(0,0,0,0.4)";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    }}
                  >
                    {loading ? "Joining..." : (
                      <>
                        Join the Waitlist
                        <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
