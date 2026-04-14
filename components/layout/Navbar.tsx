// components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-3" : "py-5"
      )}
      style={isScrolled ? {
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 1px 0 rgba(15,23,42,0.07), 0 4px 24px rgba(15,23,42,0.06)",
      } : {
        background: "transparent",
      }}
    >
      <div className="content-width px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="IMAGENN"
            width={180}
            height={52}
            className="h-7 w-auto transition-all duration-300"
            style={isScrolled ? {
              filter: "invert(1)",
              mixBlendMode: "multiply",
            } : {
              mixBlendMode: "screen",
            }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.9rem] font-medium transition-colors duration-200"
              style={{
                color: isScrolled
                  ? pathname === item.href ? "#0F172A" : "#64748B"
                  : pathname === item.href ? "#F1F5F9" : "#94A3B8",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = isScrolled ? "#0F172A" : "#F1F5F9";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = isScrolled
                  ? pathname === item.href ? "#0F172A" : "#64748B"
                  : pathname === item.href ? "#F1F5F9" : "#94A3B8";
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Waitlist pill */}
          <a
            href="/waitlist"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200"
            style={isScrolled ? {
              background: "#d97706",
              border: "1px solid #b45309",
              color: "#ffffff",
              boxShadow: "0 1px 6px rgba(217,119,6,0.35)",
            } : {
              background: "rgba(245,158,11,0.18)",
              border: "1px solid rgba(245,158,11,0.4)",
              color: "#fbbf24",
              boxShadow: "0 0 12px rgba(245,158,11,0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLAnchorElement).style.background = isScrolled
                ? "#b45309" : "rgba(245,158,11,0.28)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.background = isScrolled
                ? "#d97706" : "rgba(245,158,11,0.18)";
            }}
          >
            <Sparkles size={11} />
            Join Waitlist
          </a>

        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden transition-colors duration-200"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ color: isScrolled ? "#334155" : "#94A3B8" }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 py-6 flex flex-col gap-5 border-t"
          style={{
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(15,23,42,0.07)",
          }}
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium transition-colors duration-200"
              style={{ color: pathname === item.href ? "#0F172A" : "#64748B" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/waitlist"
            className="w-full h-11 rounded-lg text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-200"
            style={{ background: "#d97706" }}
          >
            <Sparkles size={13} />
            Join Waitlist
          </a>
        </div>
      )}
    </header>
  );
}
