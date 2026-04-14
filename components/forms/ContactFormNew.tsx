"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/lib/site-config";

// ─── Schema ──────────────────────────────────────────────────────────────────

const baseSchema = {
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  role: z.string().optional(),
  subject: z.enum(["ai-strategy", "automation", "transformation", "speaking", "partnerships", "general"]).optional(),
  message: z.string().optional(),
};

const callSchema = z.object({
  ...baseSchema,
  intent: z.literal("call"),
  orgSize: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"]).optional(),
  interest: z.enum(["operations", "ai-mapping", "automation", "decisions", "productivity", "cx", "unsure"]).optional(),
  timeline: z.enum(["immediately", "30days", "quarter", "exploring"]).optional(),
  challenge: z.string().optional(),
});

const messageSchema = z.object({
  ...baseSchema,
  intent: z.literal("message"),
});

type CallFormData = z.infer<typeof callSchema>;
type MessageFormData = z.infer<typeof messageSchema>;
type FormData = CallFormData | MessageFormData;

// ─── Styles ──────────────────────────────────────────────────────────────────

const inputBase = `
  w-full h-11 px-4 rounded-lg text-sm text-[#0F172A] bg-[#F8FAFC]
  border border-[rgba(15,23,42,0.12)]
  placeholder:text-[#94A3B8]
  focus:outline-none focus:border-[#6366f1] focus:bg-white
  transition-colors duration-150
`.replace(/\s+/g, " ").trim();

const labelBase = "block text-xs font-semibold text-[#475569] mb-1.5 tracking-wide";

const selectTriggerBase = `
  w-full h-11 px-4 rounded-lg text-sm text-[#0F172A] bg-[#F8FAFC]
  border border-[rgba(15,23,42,0.12)]
  focus:outline-none focus:border-[#6366f1] focus:bg-white
  transition-colors duration-150 text-left
`.replace(/\s+/g, " ").trim();

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelBase}>{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ContactFormNew() {
  const [intent, setIntent] = useState<"call" | "message">("call");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = intent === "call" ? callSchema : messageSchema;

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { intent },
  });

  const switchIntent = (val: "call" | "message") => {
    setIntent(val);
    reset({ intent: val } as FormData);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      if (data.intent === "call") {
        window.open(siteConfig.calendlyUrl, "_blank", "noopener,noreferrer");
      }
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-14 text-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}
        >
          <CheckCircle size={22} style={{ color: "#6366f1" }} />
        </div>
        <h3 className="font-sans font-semibold text-lg mb-2" style={{ color: "#0F172A" }}>
          {intent === "call" ? "Request received — we'll be in touch shortly." : "Message sent."}
        </h3>
        <p className="text-sm" style={{ color: "#64748B" }}>
          {intent === "call"
            ? "We've also opened Calendly so you can book a time directly."
            : "We respond within 1 business day."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Intent toggle */}
      <div
        className="grid grid-cols-2 gap-1 p-1 rounded-lg"
        style={{ background: "#F1F5F9", border: "1px solid rgba(15,23,42,0.08)" }}
      >
        {(["call", "message"] as const).map((val) => {
          const isActive = intent === val;
          return (
            <button
              key={val}
              type="button"
              onClick={() => switchIntent(val)}
              className="h-9 rounded-md text-sm font-semibold transition-all duration-150"
              style={isActive ? {
                background: "#312E81",
                color: "#FFFFFF",
                boxShadow: "0 1px 4px rgba(49,46,129,0.25)",
              } : {
                color: "#64748B",
              }}
            >
              {val === "call" ? "Book a Strategy Call" : "Send a Message"}
            </button>
          );
        })}
      </div>

      <input type="hidden" {...register("intent")} value={intent} />

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name *" error={errors.name?.message}>
          <input {...register("name")} placeholder="Your name" className={inputBase} />
        </Field>
        <Field label="Work Email *" error={errors.email?.message}>
          <input {...register("email")} type="email" placeholder="you@company.com" className={inputBase} />
        </Field>
      </div>

      {/* Company + Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Company / Organization">
          <input {...register("company")} placeholder="Organization name" className={inputBase} />
        </Field>
        <Field label="Your Role">
          <input {...register("role")} placeholder="e.g. CEO, COO, VP Ops" className={inputBase} />
        </Field>
      </div>

      {/* Subject */}
      <Field label="What are you reaching out about?">
        <Controller
          name={"subject" as keyof FormData}
          control={control}
          render={({ field }) => (
            <Select value={field.value as string} onValueChange={field.onChange}>
              <SelectTrigger className={selectTriggerBase}>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai-strategy">AI Strategy</SelectItem>
                <SelectItem value="automation">Workflow Automation</SelectItem>
                <SelectItem value="transformation">Operational Transformation</SelectItem>
                <SelectItem value="speaking">Speaking / Media</SelectItem>
                <SelectItem value="partnerships">Partnerships</SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      {/* Call-specific fields */}
      {intent === "call" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Organization Size">
              <Controller
                name={"orgSize" as keyof FormData}
                control={control}
                render={({ field }) => (
                  <Select value={field.value as string} onValueChange={field.onChange}>
                    <SelectTrigger className={selectTriggerBase}>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1–10 people</SelectItem>
                      <SelectItem value="11-50">11–50 people</SelectItem>
                      <SelectItem value="51-200">51–200 people</SelectItem>
                      <SelectItem value="201-500">201–500 people</SelectItem>
                      <SelectItem value="500+">500+ people</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field label="Preferred Timeline">
              <Controller
                name={"timeline" as keyof FormData}
                control={control}
                render={({ field }) => (
                  <Select value={field.value as string} onValueChange={field.onChange}>
                    <SelectTrigger className={selectTriggerBase}>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="30days">Within 30 days</SelectItem>
                      <SelectItem value="quarter">This quarter</SelectItem>
                      <SelectItem value="exploring">Exploring options</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </div>

          <Field label="Main Area of Interest">
            <Controller
              name={"interest" as keyof FormData}
              control={control}
              render={({ field }) => (
                <Select value={field.value as string} onValueChange={field.onChange}>
                  <SelectTrigger className={selectTriggerBase}>
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operations">Modernizing operations</SelectItem>
                    <SelectItem value="ai-mapping">AI opportunity mapping</SelectItem>
                    <SelectItem value="automation">Automation</SelectItem>
                    <SelectItem value="decisions">Decision support</SelectItem>
                    <SelectItem value="productivity">Internal productivity</SelectItem>
                    <SelectItem value="cx">Customer experience</SelectItem>
                    <SelectItem value="unsure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </>
      )}

      {/* Message */}
      <Field label={intent === "call" ? "Current Challenge or Initiative (optional)" : "Message"}>
        <textarea
          {...register(intent === "call" ? "challenge" as keyof FormData : "message" as keyof FormData)}
          rows={4}
          placeholder={intent === "call" ? "Briefly describe what you're working on or trying to solve..." : "What would you like to discuss?"}
          className={`${inputBase} h-auto resize-none py-3`}
        />
      </Field>

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-lg text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60"
        style={{ background: "#312E81", boxShadow: "0 2px 8px rgba(49,46,129,0.3)" }}
        onMouseEnter={(e) => {
          if (!loading) {
            (e.currentTarget as HTMLButtonElement).style.background = "#3730a3";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#312E81";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        }}
      >
        {loading ? "Sending…" : intent === "call" ? "Request Strategy Call" : "Send Message"}
      </button>

      <p className="text-xs text-center" style={{ color: "#94A3B8" }}>
        We respond within 1 business day. No commitment required.
      </p>
    </form>
  );
}
