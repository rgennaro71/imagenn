// app/api/speaking/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  eventName: z.string().min(1),
  eventType: z.enum(["Keynote", "Panel", "Workshop", "Podcast", "Other"]),
  audienceSize: z.enum(["<50", "50-200", "200-500", "500-1000", "1000+"]),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: data.email,
      subject: `Speaking inquiry received — IMAGENN.AI`,
      html: `<h2>Thanks for reaching out, ${data.name}.</h2><p>We've received your speaking inquiry for <strong>${data.eventName}</strong>. We'll review the details and get back to you within 2 business days.</p><p>— The IMAGENN.AI Team</p>`,
    });

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: siteConfig.adminEmail,
      subject: `New speaking inquiry: ${data.eventName} (${data.eventType})`,
      html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Company:</strong> ${data.company}</p><p><strong>Event:</strong> ${data.eventName}</p><p><strong>Type:</strong> ${data.eventType}</p><p><strong>Audience:</strong> ${data.audienceSize}</p><p><strong>Preferred date:</strong> ${data.preferredDate ?? "—"}</p><p><strong>Message:</strong> ${data.message ?? "—"}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
