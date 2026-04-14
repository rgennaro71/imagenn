// app/api/preview-login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const expectedUser = process.env.PREVIEW_USERNAME;
    const expectedPass = process.env.PREVIEW_PASSWORD;

    if (!expectedUser || !expectedPass) {
      return NextResponse.json({ error: "Preview auth not configured" }, { status: 500 });
    }

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      username !== expectedUser ||
      password !== expectedPass
    ) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set("imagenn_preview", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
