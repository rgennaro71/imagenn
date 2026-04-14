// app/api/network/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";
import { escHtml } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  linkedin: z.string().min(5),
  company: z.string().min(1),
  role: z.string().min(1),
  companySize: z.string().min(1),
  industry: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const row = (label: string, value: string) =>
      `<p><strong>${label}:</strong> ${escHtml(value)}</p>`;

    // Confirmation to applicant
    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: data.email,
      subject: "Your application to the IMAGENN Founders & Operators Network",
      html: `
        <h2>We've received your application, ${escHtml(data.fullName.split(" ")[0])}.</h2>
        <p>Thank you for applying to the IMAGENN Founders &amp; Operators Network.</p>
        <p>We'll be in touch within a few days to learn more about you and your work. If it looks like a fit, we'll set up a short call to connect.</p>
        <p>— The IMAGENN.AI Team</p>
      `,
    });

    // Internal notification
    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: siteConfig.adminEmail,
      subject: `Network application: ${data.fullName} — ${data.company}`,
      html: `
        <h2>New Network Application</h2>
        ${row("Name", data.fullName)}
        ${row("Email", data.email)}
        ${row("LinkedIn", data.linkedin)}
        ${row("Company", data.company)}
        ${row("Role", data.role)}
        ${row("Company Size", data.companySize)}
        ${data.industry ? row("Industry", data.industry) : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
