"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
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

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(1, "Organization is required"),
  role: z.string().optional(),
  eventName: z.string().min(1, "Event name is required"),
  eventType: z.enum(["Keynote", "Panel", "Workshop", "Podcast", "Fireside Chat", "Executive Briefing", "Leadership Offsite", "Private Team Session", "Other"]),
  eventDate: z.string().optional(),
  audienceSize: z.enum(["Under 50", "50–200", "200–500", "500–1,000", "1,000+"]),
  format: z.enum(["In-person", "Virtual", "Hybrid", "Not sure yet"]),
  budget: z.enum(["Exploring options", "Under $5K", "$5K–$15K", "$15K–$30K", "$30K+"]).optional(),
  message: z.string().optional(),
});

type SpeakingFormData = z.infer<typeof schema>;

const inputClass = "bg-[#F1F5F9] border-transparent focus:border-indigo-400 focus:bg-white text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl h-11 text-sm transition-colors duration-200";
const labelClass = "text-xs font-semibold text-[#475569] mb-1.5 block tracking-wide";
const selectTriggerClass = "bg-[#F1F5F9] border-transparent text-[#0F172A] rounded-xl h-11 text-sm focus:border-indigo-400 focus:bg-white";

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
      <div className="py-14 text-center">
        <CheckCircle size={36} className="mx-auto mb-4" style={{ color: "#6366f1" }} />
        <h3 className="font-sans font-semibold text-lg mb-2" style={{ color: "#0F172A" }}>
          Inquiry received — we&apos;ll be in touch within 2 business days.
        </h3>
        <p className="text-sm" style={{ color: "#64748B" }}>
          Thank you for the invitation. We look forward to connecting about your event.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sp-name" className={labelClass}>Your Name *</Label>
          <Input id="sp-name" {...register("name")} placeholder="Full name" className={inputClass} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="sp-email" className={labelClass}>Work Email *</Label>
          <Input id="sp-email" type="email" {...register("email")} placeholder="your@organization.com" className={inputClass} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Organization + Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sp-company" className={labelClass}>Organization *</Label>
          <Input id="sp-company" {...register("company")} placeholder="Company or event organization" className={inputClass} />
          {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
        </div>
        <div>
          <Label htmlFor="sp-role" className={labelClass}>Your Role</Label>
          <Input id="sp-role" {...register("role")} placeholder="e.g. Event Director, Head of L&D" className={inputClass} />
        </div>
      </div>

      {/* Event Name */}
      <div>
        <Label htmlFor="sp-eventName" className={labelClass}>Event Name *</Label>
        <Input id="sp-eventName" {...register("eventName")} placeholder="Conference, podcast, or event name" className={inputClass} />
        {errors.eventName && <p className="text-red-500 text-xs mt-1">{errors.eventName.message}</p>}
      </div>

      {/* Event Type + Format */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className={labelClass}>Event Type *</Label>
          <Controller
            name="eventType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {(["Keynote", "Panel", "Workshop", "Podcast", "Fireside Chat", "Executive Briefing", "Leadership Offsite", "Private Team Session", "Other"] as const).map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType.message}</p>}
        </div>
        <div>
          <Label className={labelClass}>In-person / Virtual / Hybrid *</Label>
          <Controller
            name="format"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {(["In-person", "Virtual", "Hybrid", "Not sure yet"] as const).map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.format && <p className="text-red-500 text-xs mt-1">{errors.format.message}</p>}
        </div>
      </div>

      {/* Event Date + Audience Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sp-eventDate" className={labelClass}>Event Date</Label>
          <Input id="sp-eventDate" type="date" {...register("eventDate")} className={inputClass} />
        </div>
        <div>
          <Label className={labelClass}>Audience Size *</Label>
          <Controller
            name="audienceSize"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {(["Under 50", "50–200", "200–500", "500–1,000", "1,000+"] as const).map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.audienceSize && <p className="text-red-500 text-xs mt-1">{errors.audienceSize.message}</p>}
        </div>
      </div>

      {/* Budget */}
      <div>
        <Label className={labelClass}>Budget Range</Label>
        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Select range or exploring options" />
              </SelectTrigger>
              <SelectContent>
                {(["Exploring options", "Under $5K", "$5K–$15K", "$15K–$30K", "$30K+"] as const).map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="sp-message" className={labelClass}>Event Goals &amp; Context</Label>
        <Textarea
          id="sp-message"
          {...register("message")}
          placeholder="Tell us about your event, audience, and what you're hoping the audience takes away..."
          rows={4}
          className={`${inputClass} resize-none h-auto`}
        />
      </div>

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
        {loading ? "Submitting inquiry…" : "Submit Speaking Inquiry"}
      </button>

      <p className="text-xs text-center" style={{ color: "#94A3B8" }}>
        We respond within 2 business days. Both virtual and in-person engagements available.
      </p>
    </form>
  );
}
