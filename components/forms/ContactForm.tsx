"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const schema = z.object({
  intent: z.enum(["call", "message"]),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof schema>;

interface ContactFormProps {
  defaultIntent?: "call" | "message";
}

export function ContactForm({ defaultIntent = "call" }: ContactFormProps) {
  const [intent, setIntent] = useState<"call" | "message">(defaultIntent);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { intent: defaultIntent },
  });

  const switchIntent = (val: "call" | "message") => {
    setIntent(val);
    setValue("intent", val);
  };

  const onSubmit = async (data: ContactFormData) => {
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
      <div className="py-8 text-center">
        <CheckCircle size={36} style={{ color: "#6366f1" }} className="mx-auto mb-4" />
        <h3 className="font-sans font-semibold text-lg mb-2" style={{ color: "#0F172A" }}>
          {intent === "call" ? "Request received — check your email." : "Message sent."}
        </h3>
        <p className="text-sm" style={{ color: "#64748B" }}>
          {intent === "call"
            ? "We've also opened Calendly so you can book a time directly."
            : "We respond within 1 business day."}
        </p>
      </div>
    );
  }

  const inputClass = "bg-[#F1F5F9] border-transparent focus:border-indigo-400 focus:bg-white text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl h-11 text-sm transition-colors duration-200";
  const labelClass = "text-xs font-semibold text-[#475569] mb-1.5 block tracking-wide";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Intent toggle */}
      <div className="grid grid-cols-2 gap-3">
        {(["call", "message"] as const).map((val) => {
          const isActive = intent === val;
          return (
            <button
              key={val}
              type="button"
              onClick={() => switchIntent(val)}
              className="py-3.5 px-3 rounded-lg text-sm font-semibold transition-all duration-200 text-center"
              style={isActive ? {
                background: "#312E81",
                color: "#FFFFFF",
                boxShadow: "0 2px 8px rgba(49,46,129,0.3)",
                border: "2px solid #312E81",
              } : {
                background: "#FFFFFF",
                color: "#64748B",
                border: "2px solid #E2E8F0",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#312E81";
                  (e.currentTarget as HTMLButtonElement).style.color = "#312E81";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E8F0";
                  (e.currentTarget as HTMLButtonElement).style.color = "#64748B";
                }
              }}
            >
              {val === "call" ? "Book a Strategy Call" : "Send a Message"}
            </button>
          );
        })}
      </div>
      <input type="hidden" {...register("intent")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className={labelClass}>Name *</Label>
          <Input id="name" {...register("name")} placeholder="Your name" className={inputClass} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email" className={labelClass}>Email *</Label>
          <Input id="email" type="email" {...register("email")} placeholder="Work email" className={inputClass} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company" className={labelClass}>Company</Label>
          <Input id="company" {...register("company")} placeholder="Organization name" className={inputClass} />
        </div>
        <div>
          <Label htmlFor="role" className={labelClass}>Your Role</Label>
          <Input id="role" {...register("role")} placeholder="e.g. CEO, COO, VP Ops" className={inputClass} />
        </div>
      </div>

      {intent === "message" && (
        <div>
          <Label htmlFor="message" className={labelClass}>Message</Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="What would you like to discuss?"
            rows={4}
            className={cn(inputClass, "resize-none h-auto")}
          />
        </div>
      )}

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-xl text-base font-semibold text-white transition-all duration-200 disabled:opacity-60"
        style={{
          background: "linear-gradient(135deg, #3730a3 0%, #312E81 100%)",
          boxShadow: "0 2px 8px rgba(49,46,129,0.3)",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(49,46,129,0.4)";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(49,46,129,0.3)";
        }}
      >
        {loading ? "Sending…" : intent === "call" ? (
          <span className="inline-flex items-center justify-center gap-2">
            <ExternalLink size={15} /> Request Strategy Call
          </span>
        ) : "Send Message"}
      </button>
    </form>
  );
}
