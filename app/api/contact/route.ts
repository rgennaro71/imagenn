// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";
import { escHtml } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  intent: z.enum(["call", "message"]),
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const isCall = data.intent === "call";

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: data.email,
      subject: isCall ? "Your strategy call request — IMAGENN.AI" : "Thanks for reaching out — IMAGENN.AI",
      html: isCall
        ? `<h2>Thanks, ${escHtml(data.name)}.</h2><p>We received your request to book a strategy call. We'll send you a scheduling link within 1 business day.</p><p>— The IMAGENN.AI Team</p>`
        : `<h2>Thanks for reaching out, ${escHtml(data.name)}.</h2><p>We've received your message and will get back to you within 1 business day.</p><p>— The IMAGENN.AI Team</p>`,
    });

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: siteConfig.adminEmail,
      subject: `New ${isCall ? "call request" : "contact"}: ${data.name} (${data.company ?? "no company"})`,
      html: `<p><strong>Intent:</strong> ${data.intent}</p><p><strong>Name:</strong> ${escHtml(data.name)}</p><p><strong>Email:</strong> ${escHtml(data.email)}</p><p><strong>Company:</strong> ${escHtml(data.company ?? "—")}</p><p><strong>Role:</strong> ${escHtml(data.role ?? "—")}</p><p><strong>Message:</strong> ${escHtml(data.message ?? "—")}</p>`,
    });

    return NextResponse.json({ success: true, intent: data.intent });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
