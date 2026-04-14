import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only gate /home (and nested /home/*)
  if (pathname === "/home" || pathname.startsWith("/home/")) {
    const cookie = req.cookies.get("imagenn_preview");
    if (!cookie || cookie.value !== "1") {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*"],
};
