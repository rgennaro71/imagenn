"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function ComingSoonClient() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onWaitlistSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) {
      setErrorMsg("Please enter a valid email.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const firstName = email.split("@")[0].replace(/[^a-zA-Z]/g, "") || "Friend";
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Try again.");
      setStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-[#f4efe6] font-sans flex flex-col">
      {/* Warm ambient orbs */}
      <Ambient />
      {/* Fine grain vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f4efe6 1px, transparent 1px), linear-gradient(to bottom, #f4efe6 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <Hero
        email={email}
        setEmail={setEmail}
        status={status}
        errorMsg={errorMsg}
        onSubmit={onWaitlistSubmit}
      />

      <HiddenLoginFooter />
    </div>
  );
}

function Ambient() {
  return (
    <div aria-hidden className="absolute inset-0 z-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, ease }}
        className="absolute left-[-20%] top-[-10%] h-[70vh] w-[70vh] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(217,160,89,0.22) 0%, rgba(217,160,89,0.06) 45%, transparent 72%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, delay: 0.2, ease }}
        className="absolute right-[-15%] bottom-[-15%] h-[80vh] w-[80vh] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(180,110,50,0.18) 0%, rgba(180,110,50,0.05) 45%, transparent 72%)",
        }}
      />
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        className="absolute left-1/2 top-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,185,120,0.10) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

function Hero({
  email,
  setEmail,
  status,
  errorMsg,
  onSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  status: "idle" | "loading" | "success" | "error";
  errorMsg: string;
  onSubmit: (e: FormEvent) => void;
}) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease } },
  };

  return (
    <section className="relative z-10 flex flex-1 items-center justify-center px-6 py-20 sm:px-10">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-3xl text-center"
      >
        {/* Wordmark */}
        <motion.div variants={item} className="mb-14 flex justify-center sm:mb-16">
          <Image
            src="/logo.png"
            alt="IMAGENN.AI"
            width={180}
            height={52}
            priority
            className="h-7 w-auto sm:h-8"
            style={{ mixBlendMode: "screen" }}
          />
        </motion.div>

        {/* Overline */}
        <motion.p
          variants={item}
          className="mb-8 text-[0.68rem] uppercase tracking-[0.42em] text-[#d9a059]"
        >
          <span className="inline-block h-px w-8 align-middle bg-[#d9a059]/60 mr-3" />
          In Development
          <span className="inline-block h-px w-8 align-middle bg-[#d9a059]/60 ml-3" />
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-serif text-[clamp(2.6rem,7vw,5.4rem)] leading-[1.02] tracking-[-0.02em] text-[#f4efe6]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          AI &amp; Digital Innovation
        </motion.h1>

        <motion.h2
          variants={item}
          className="mt-5 font-serif text-[clamp(1.1rem,2.2vw,1.7rem)] italic leading-snug text-[#c9b896]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Something big is coming.
        </motion.h2>

        {/* Divider */}
        <motion.div
          variants={item}
          className="mx-auto mt-12 h-px w-16 bg-gradient-to-r from-transparent via-[#d9a059]/70 to-transparent"
        />

        {/* Supporting copy */}
        <motion.p
          variants={item}
          className="mx-auto mt-10 max-w-xl text-[0.98rem] leading-relaxed text-[#a89c87]"
        >
          We&apos;re building the systems that bridge AI potential and real
          organizational change. Be the first to see what we&apos;re making.
        </motion.p>

        {/* Waitlist form */}
        <motion.div variants={item} className="mt-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease }}
                className="mx-auto max-w-md rounded-full border border-[#d9a059]/30 bg-[#d9a059]/[0.06] px-6 py-4 text-[0.95rem] text-[#e8d9bd]"
              >
                You&apos;re on the list. We&apos;ll be in touch.
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <label className="sr-only" htmlFor="cs-email">
                  Email
                </label>
                <input
                  id="cs-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-full border border-white/[0.09] bg-white/[0.03] px-6 py-4 text-[0.95rem] text-[#f4efe6] placeholder:text-[#6b6355] outline-none transition focus:border-[#d9a059]/50 focus:bg-white/[0.05]"
                  disabled={status === "loading"}
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative overflow-hidden rounded-full bg-[#d9a059] px-7 py-4 text-[0.9rem] font-medium tracking-wide text-[#0a0a0a] transition hover:bg-[#e8b06a] disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {status === "loading" ? "Joining…" : "Join Waitlist"}
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {status === "error" && (
            <p className="mt-4 text-sm text-[#d97a5a]">{errorMsg}</p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

function HiddenLoginFooter() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/preview-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setErr("Invalid credentials");
        setLoading(false);
        return;
      }
      window.location.href = "/home";
    } catch {
      setErr("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <footer className="relative z-10 pb-8 pt-6">
      <div ref={wrapRef} className="mx-auto flex w-full max-w-3xl flex-col items-center px-6">
        <AnimatePresence>
          {open && (
            <motion.form
              key="login"
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 8, height: 0 }}
              transition={{ duration: 0.45, ease }}
              className="mb-4 w-full max-w-xs overflow-hidden"
            >
              <div className="flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-sm">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  autoComplete="username"
                  className="w-full rounded-md bg-transparent px-3 py-2 text-[0.82rem] text-[#e8d9bd] placeholder:text-[#55504a] outline-none focus:bg-white/[0.03]"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  autoComplete="current-password"
                  className="w-full rounded-md bg-transparent px-3 py-2 text-[0.82rem] text-[#e8d9bd] placeholder:text-[#55504a] outline-none focus:bg-white/[0.03]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-[#d9a059]/90 px-3 py-2 text-[0.78rem] font-medium text-[#0a0a0a] transition hover:bg-[#d9a059] disabled:opacity-60"
                >
                  {loading ? "Checking…" : "Enter"}
                </button>
                {err && <p className="text-center text-[0.72rem] text-[#d97a5a]">{err}</p>}
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-[0.72rem] tracking-wide text-[#4d4841] transition hover:text-[#a89c87]"
          aria-label="Copyright"
        >
          © imagenn.ai
        </button>
      </div>
    </footer>
  );
}
