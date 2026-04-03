"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
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

export function ContactForm() {
  const [intent, setIntent] = useState<"call" | "message">("call");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { intent: "call" },
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
      <div className="p-8 rounded-lg bg-obsidian-surface subtle-border text-center">
        <CheckCircle size={32} className="text-cyan-brand mx-auto mb-4" />
        <h3 className="font-sans font-semibold text-slate-primary text-lg mb-2">
          {intent === "call" ? "Request received — check your email." : "Message sent."}
        </h3>
        <p className="text-sm text-slate-muted">
          {intent === "call"
            ? "We've also opened Calendly so you can book a time directly."
            : "We respond within 1 business day."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-obsidian-surface subtle-border">
        {(["call", "message"] as const).map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => switchIntent(val)}
            className={cn(
              "py-2.5 rounded-md text-sm font-semibold transition-all duration-200",
              intent === val
                ? "bg-indigo text-white shadow"
                : "text-slate-muted hover:text-slate-secondary"
            )}
          >
            {val === "call" ? "Book a Strategy Call" : "Send a Message"}
          </button>
        ))}
      </div>
      <input type="hidden" {...register("intent")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-xs text-slate-muted mb-1.5 block">Name *</Label>
          <Input id="name" {...register("name")} placeholder="Your name" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="text-xs text-slate-muted mb-1.5 block">Email *</Label>
          <Input id="email" type="email" {...register("email")} placeholder="Work email" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company" className="text-xs text-slate-muted mb-1.5 block">Company</Label>
          <Input id="company" {...register("company")} placeholder="Organization name" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
        </div>
        <div>
          <Label htmlFor="role" className="text-xs text-slate-muted mb-1.5 block">Your Role</Label>
          <Input id="role" {...register("role")} placeholder="e.g. CEO, COO, VP Ops" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
        </div>
      </div>

      {intent === "message" && (
        <div>
          <Label htmlFor="message" className="text-xs text-slate-muted mb-1.5 block">Message</Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="What would you like to discuss?"
            rows={4}
            className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted resize-none"
          />
        </div>
      )}

      {serverError && <p className="text-red-400 text-sm">{serverError}</p>}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          buttonVariants({ size: "lg" }),
          "w-full bg-indigo hover:bg-indigo-dark text-white font-semibold h-12"
        )}
      >
        {loading ? "Sending..." : intent === "call" ? "Request Strategy Call" : "Send Message"}
        {intent === "call" && !loading && <ExternalLink size={14} className="ml-2" />}
      </button>
    </form>
  );
}
