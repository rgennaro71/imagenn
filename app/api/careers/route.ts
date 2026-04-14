// app/api/careers/route.ts
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
  portfolio: z.string().optional(),
  expertise: z.string().min(1),
  greatAt: z.string().min(10),
  recentWork: z.string().min(10),
  whyImagenn: z.string().min(10),
  wantToWorkOn: z.string().min(10),
  role: z.string().optional(),
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
      subject: "We received your application — IMAGENN.AI",
      html: `
        <h2>We've got your application, ${escHtml(data.fullName.split(" ")[0])}.</h2>
        <p>Thanks for applying to join IMAGENN.AI. We read every application personally.</p>
        <p>If there's alignment, we'll reach out directly — no long hiring cycles, no ghost responses.</p>
        <p>We move fast. You'll hear from us soon.</p>
        <p>— The IMAGENN.AI Team</p>
      `,
    });

    // Internal notification
    await resend.emails.send({
      from: `${siteConfig.name} <noreply@imagenn.ai>`,
      to: siteConfig.adminEmail,
      subject: `Careers application: ${data.fullName}${data.role ? ` — ${data.role}` : ""}`,
      html: `
        <h2>New Careers Application</h2>
        ${row("Name", data.fullName)}
        ${row("Email", data.email)}
        ${row("LinkedIn", data.linkedin)}
        ${data.portfolio ? row("Portfolio", data.portfolio) : ""}
        ${row("Area of Expertise", data.expertise)}
        ${data.role ? row("Role Interest", data.role) : ""}
        <hr />
        ${row("What They're Great At", data.greatAt)}
        ${row("Recent Work / Built", data.recentWork)}
        ${row("Why IMAGENN.AI", data.whyImagenn)}
        ${row("What They Want to Work On", data.wantToWorkOn)}
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
