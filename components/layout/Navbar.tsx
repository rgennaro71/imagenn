// components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-obsidian/90 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="content-width px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span
            className="font-serif font-bold text-xl tracking-wide"
            style={{
              background: "linear-gradient(90deg, #818cf8, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                pathname === item.href
                  ? "text-slate-primary"
                  : "text-slate-muted hover:text-slate-secondary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-indigo hover:bg-indigo-dark text-white font-semibold px-5"
            )}
          >
            Book a Call
          </Link>
        </div>

        <button
          className="md:hidden text-slate-secondary hover:text-slate-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-obsidian/95 backdrop-blur-md border-t border-white/5 px-4 py-6 flex flex-col gap-5">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-slate-secondary hover:text-slate-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              buttonVariants(),
              "bg-indigo hover:bg-indigo-dark text-white font-semibold w-full mt-2 justify-center"
            )}
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
