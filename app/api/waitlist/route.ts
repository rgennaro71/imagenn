// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";
import { escHtml } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  firstName: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  role: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, email, company, role } = schema.parse(body);

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: email,
      subject: `You're on the IMAGENN.AI waitlist`,
      html: `<h2>You're on the list, ${escHtml(firstName)}.</h2><p>Thank you for joining the IMAGENN.AI product waitlist. You'll be among the first to access our AI-powered tools when they launch.</p><p>— The IMAGENN.AI Team</p>`,
    });

    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: siteConfig.adminEmail,
      subject: `New waitlist signup: ${firstName} (${email})`,
      html: `<p><strong>Name:</strong> ${escHtml(firstName)}</p><p><strong>Email:</strong> ${escHtml(email)}</p>${company ? `<p><strong>Company:</strong> ${escHtml(company)}</p>` : ""}${role ? `<p><strong>Role:</strong> ${escHtml(role)}</p>` : ""}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
