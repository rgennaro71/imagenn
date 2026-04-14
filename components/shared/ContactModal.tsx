// components/shared/ContactModal.tsx
"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, CheckCircle2, Shield } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultIntent?: "call" | "message";
}

const trustPoints = [
  { icon: CalendarDays, text: "30–45 min strategy call — no hard sell" },
  { icon: CheckCircle2, text: "Response within 1 business day" },
  { icon: Shield, text: "No commitment required" },
];

export function ContactModal({ isOpen, onClose, defaultIntent = "call" }: ContactModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
            style={{ background: "rgba(9,12,23,0.75)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Get in touch with IMAGENN.AI"
            className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-3xl flex flex-col md:flex-row"
            style={{
              boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            {/* Left — brand panel (light) */}
            <div
              className="hidden md:flex flex-col justify-between p-9 shrink-0 w-[42%]"
              style={{
                background: "#F0F4FF",
                borderRight: "1px solid rgba(99,102,241,0.1)",
              }}
            >
              <div>
                <span
                  className="font-serif font-bold text-xl tracking-wide"
                  style={{ color: "#4338CA" }}
                >
                  IMAGENN.AI
                </span>

                <div className="mt-10 mb-8">
                  <h2 className="font-serif text-2xl font-bold leading-snug mb-4" style={{ color: "#111827" }}>
                    Let's build something that matters.
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                    Whether you know exactly what you need or are still figuring it out —
                    a strategy conversation is the right first step.
                  </p>
                </div>

                {/* Divider */}
                <div
                  className="h-px w-full mb-8"
                  style={{ background: "rgba(99,102,241,0.15)" }}
                />

                {/* Trust bullets — clean, no icon containers */}
                <ul className="flex flex-col gap-4">
                  {trustPoints.map(({ text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "#4338CA" }}
                      />
                      <span className="text-sm leading-relaxed" style={{ color: "#374151" }}>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative orbital */}
              <div className="mt-10 opacity-20" aria-hidden="true">
                <svg viewBox="0 0 120 120" className="w-20 h-20">
                  <circle cx="60" cy="60" r="50" stroke="#4338CA" strokeWidth="1" fill="none" />
                  <circle cx="60" cy="60" r="35" stroke="#6366f1" strokeWidth="1" fill="none" strokeDasharray="4 6" />
                  <circle cx="60" cy="60" r="18" stroke="#4338CA" strokeWidth="1" fill="none" />
                  <circle cx="60" cy="60" r="5" fill="#4338CA" />
                </svg>
              </div>
            </div>

            {/* Right — clean white form panel */}
            <div className="flex-1 overflow-y-auto" style={{ background: "#FFFFFF" }}>
              {/* Panel header */}
              <div className="px-8 pt-10 pb-6 border-b" style={{ borderColor: "rgba(15,23,42,0.07)" }}>
                <h3 className="font-serif text-2xl font-bold mb-1.5" style={{ color: "#0F172A" }}>
                  {defaultIntent === "call" ? "Book a Strategy Call" : "Get in Touch"}
                </h3>
                <p className="text-sm" style={{ color: "#64748B" }}>
                  {defaultIntent === "call"
                    ? "Tell us about your organization and we'll find a time that works."
                    : "Send us a message and we'll respond within 1 business day."}
                </p>
              </div>

              {/* Form */}
              <div className="px-8 py-7">
                <ContactForm defaultIntent={defaultIntent} />
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
              style={{
                background: "rgba(15,23,42,0.06)",
                border: "1px solid rgba(15,23,42,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(15,23,42,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(15,23,42,0.06)";
              }}
            >
              <X size={14} style={{ color: "#64748B" }} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
