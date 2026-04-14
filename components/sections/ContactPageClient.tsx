"use client";

import { motion } from "framer-motion";
import {
  Mail, Globe, Phone, ExternalLink, ArrowRight,
  CheckCircle2, Clock, MessageSquare, Calendar,
} from "lucide-react";
import { ContactFormNew } from "@/components/forms/ContactFormNew";
import { QRCodeContact } from "@/components/shared/QRCodeContact";

// ─── Contact methods ──────────────────────────────────────────────────────────

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@imagenn.ai",
    href: "mailto:hello@imagenn.ai",
  },
  {
    icon: Globe,
    label: "Website",
    value: "imagenn.ai",
    href: "https://imagenn.ai",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    value: "linkedin.com/in/robertgennaro",
    href: "https://www.linkedin.com/in/robertgennaro/",
    external: true,
  },
];

const nextSteps = [
  { icon: Clock, text: "We review your message promptly and respond within 1 business day." },
  { icon: MessageSquare, text: "We'll suggest the right next step based on what you share." },
  { icon: Calendar, text: "Strategy calls are 30–45 minutes — practical, focused, and tailored to your goals." },
  { icon: CheckCircle2, text: "No hard sell. Just a useful conversation about where you are and where you want to go." },
];

const trustPoints = [
  "No commitment required",
  "We respond within 1 business day",
  "Strategy calls are focused, practical, and pressure-free",
  "Virtual-first, flexible engagement options",
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ContactPageClient() {
  return (
    <>
      {/* ── 1. HERO ── */}
      <section
        className="relative pt-28 pb-20 overflow-hidden"
        style={{ background: "#090C17" }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 60% 50% at 20% 0%, black 30%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-[-15%] right-[-8%] w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px" style={{ background: "#6366f1" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.3)" }}>
                Get in Touch
              </span>
            </div>

            <h1
              className="font-serif font-bold tracking-tight leading-[1.05] mb-7"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)", color: "#F1F5F9" }}
            >
              Let&apos;s Start the<br />
              <span style={{ color: "#818cf8" }}>Right Conversation.</span>
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: "rgba(255,255,255,0.42)" }}>
              Whether you&apos;re exploring AI innovation, operational modernization, automation opportunities,
              or a broader transformation initiative — we&apos;ll help you determine the right next step.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2.5 h-12 px-8 rounded-lg font-semibold text-white text-sm transition-all duration-200"
                style={{ background: "#312E81", boxShadow: "0 2px 12px rgba(49,46,129,0.4)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#3730a3";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#312E81";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                Book a Strategy Call
                <ArrowRight size={15} />
              </a>
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.12)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.28)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                Send a Message
              </a>
            </div>

            {/* Trust bullets */}
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {trustPoints.map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <CheckCircle2 size={13} style={{ color: "#6366f1" }} />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. MAIN 2-COLUMN ── */}
      <section id="contact-form" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">

            {/* Left column */}
            <div className="flex flex-col gap-6">

              {/* Intro text */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "#6366f1" }}>
                  Contact
                </p>
                <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: "#0F172A" }}>
                  Reach Out Directly
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                  Use the form, or reach us through any of the channels below.
                  We&apos;re a focused team — you&apos;ll hear from a real person.
                </p>
              </div>

              {/* Contact methods */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(15,23,42,0.08)" }}
              >
                {contactMethods.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <a
                      key={m.label}
                      href={m.href}
                      {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-4 px-5 py-4 transition-colors duration-150"
                      style={{
                        background: "#FFFFFF",
                        borderBottom: i < contactMethods.length - 1 ? "1px solid rgba(15,23,42,0.06)" : "none",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#F8FAFC"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#FFFFFF"; }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "rgba(99,102,241,0.07)" }}
                      >
                        <Icon size={15} style={{ color: "#6366f1" }} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#94A3B8" }}>
                          {m.label}
                        </span>
                        <span className="text-sm font-medium" style={{ color: "#0F172A" }}>{m.value}</span>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* QR Code */}
              <QRCodeContact />
            </div>

            {/* Right column: form card */}
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(15,23,42,0.07)",
                boxShadow: "0 1px 4px rgba(15,23,42,0.05), 0 16px 48px rgba(15,23,42,0.06)",
              }}
            >
              <h3 className="font-serif text-xl font-bold mb-1" style={{ color: "#0F172A" }}>
                Get in Touch
              </h3>
              <p className="text-sm mb-7" style={{ color: "#64748B" }}>
                Tell us about your organization and what you&apos;re looking to accomplish.
              </p>
              <ContactFormNew />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT HAPPENS NEXT ── */}
      <section style={{ background: "#0D1120" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                After You Reach Out
              </p>
              <h2 className="font-serif text-2xl font-bold" style={{ color: "#F1F5F9" }}>
                What Happens Next
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {nextSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={i}
                    className="flex gap-4 p-5 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.15)" }}
                    >
                      <Icon size={15} style={{ color: "#818cf8" }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
                      {step.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FINAL REASSURANCE STRIP ── */}
      <section style={{ background: "#1E1B4B" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "#EEF2FF" }}>
                Not ready to commit? That&apos;s fine.
              </h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                Whether you&apos;re starting with strategy or ready to build — we&apos;ll meet you where you are.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 h-11 px-7 rounded-lg font-semibold text-sm transition-colors duration-200 hover:bg-[#EEF2FF]"
                style={{ background: "#FFFFFF", color: "#312E81" }}
              >
                Start the Conversation
                <ArrowRight size={14} />
              </a>
              <a
                href="/services"
                className="inline-flex items-center gap-2 h-11 px-7 rounded-lg font-semibold text-sm transition-colors duration-200 hover:border-white/30 hover:text-white"
                style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
