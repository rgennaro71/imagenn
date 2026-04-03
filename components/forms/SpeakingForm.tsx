"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(1, "Organization is required"),
  eventName: z.string().min(1, "Event name is required"),
  eventType: z.enum(["Keynote", "Panel", "Workshop", "Podcast", "Other"]),
  audienceSize: z.enum(["<50", "50-200", "200-500", "500-1000", "1000+"]),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
});

type SpeakingFormData = z.infer<typeof schema>;

export function SpeakingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, control, formState: { errors } } = useForm<SpeakingFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SpeakingFormData) => {
    setLoading(true);
    setServerError(null);
    try {
      const res = await fetch("/api/speaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
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
          Inquiry received — we&apos;ll be in touch within 2 business days.
        </h3>
        <p className="text-sm text-slate-muted">Thank you for the invitation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-xs text-slate-muted mb-1.5 block">Your Name *</Label>
          <Input id="name" {...register("name")} placeholder="Full name" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="text-xs text-slate-muted mb-1.5 block">Email *</Label>
          <Input id="email" type="email" {...register("email")} placeholder="Work email" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="company" className="text-xs text-slate-muted mb-1.5 block">Organization *</Label>
        <Input id="company" {...register("company")} placeholder="Company or event organization" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
        {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>}
      </div>

      <div>
        <Label htmlFor="eventName" className="text-xs text-slate-muted mb-1.5 block">Event Name *</Label>
        <Input id="eventName" {...register("eventName")} placeholder="Conference, podcast, or event name" className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted" />
        {errors.eventName && <p className="text-red-400 text-xs mt-1">{errors.eventName.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs text-slate-muted mb-1.5 block">Event Type *</Label>
          <Controller
            name="eventType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full bg-obsidian-surface border-white/10 text-slate-primary">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-obsidian-elevated border-white/10">
                  {(["Keynote", "Panel", "Workshop", "Podcast", "Other"] as const).map((t) => (
                    <SelectItem key={t} value={t} className="text-slate-secondary focus:text-slate-primary">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.eventType && <p className="text-red-400 text-xs mt-1">{errors.eventType.message}</p>}
        </div>
        <div>
          <Label className="text-xs text-slate-muted mb-1.5 block">Audience Size *</Label>
          <Controller
            name="audienceSize"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full bg-obsidian-surface border-white/10 text-slate-primary">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent className="bg-obsidian-elevated border-white/10">
                  {(["<50", "50-200", "200-500", "500-1000", "1000+"] as const).map((s) => (
                    <SelectItem key={s} value={s} className="text-slate-secondary focus:text-slate-primary">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.audienceSize && <p className="text-red-400 text-xs mt-1">{errors.audienceSize.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="preferredDate" className="text-xs text-slate-muted mb-1.5 block">Preferred Date (optional)</Label>
        <Input id="preferredDate" type="date" {...register("preferredDate")} className="bg-obsidian-surface border-white/10 text-slate-primary" />
      </div>

      <div>
        <Label htmlFor="message" className="text-xs text-slate-muted mb-1.5 block">Additional Context (optional)</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Tell us more about the event, audience, and what you're looking for..."
          rows={4}
          className="bg-obsidian-surface border-white/10 text-slate-primary placeholder:text-slate-muted resize-none"
        />
      </div>

      {serverError && <p className="text-red-400 text-sm">{serverError}</p>}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          buttonVariants({ size: "lg" }),
          "w-full bg-indigo hover:bg-indigo-dark text-white font-semibold h-12"
        )}
      >
        {loading ? "Submitting..." : "Submit Speaking Inquiry"}
      </button>
    </form>
  );
}
