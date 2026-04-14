"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

// vCard string for Roberto Gennaro
const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Roberto Gennaro
ORG:IMAGENN.AI
TITLE:Founder & CEO
EMAIL;TYPE=INTERNET:hello@imagenn.ai
TEL;TYPE=CELL:+15551234567
URL:https://imagenn.ai
URL;TYPE=LinkedIn:https://www.linkedin.com/in/robertgennaro/
END:VCARD`;

// vCard download helper
function downloadVCard() {
  const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "roberto-gennaro.vcf";
  a.click();
  URL.revokeObjectURL(url);
}

export function QRCodeContact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, VCARD, {
      width: 160,
      margin: 2,
      color: {
        dark: "#0F172A",
        light: "#F8FAFC",
      },
    }).then(() => setReady(true));
  }, []);

  return (
    <div
      className="p-5 rounded-xl"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(15,23,42,0.08)",
        boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 6px 16px rgba(15,23,42,0.04)",
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#6366f1" }}>
        Scan to Save Contact
      </p>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "#64748B" }}>
        Scan on your mobile device to instantly save Roberto Gennaro&apos;s contact card.
      </p>

      <div className="flex gap-5 items-start">
        {/* QR canvas */}
        <div
          className="rounded-lg overflow-hidden flex-shrink-0 p-2"
          style={{
            background: "#F8FAFC",
            border: "1px solid rgba(15,23,42,0.08)",
            opacity: ready ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <canvas ref={canvasRef} />
        </div>

        {/* Contact detail + download */}
        <div className="flex flex-col gap-1.5 justify-center">
          <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>Roberto Gennaro</p>
          <p className="text-xs" style={{ color: "#6366f1" }}>Founder &amp; CEO, IMAGENN.AI</p>
          <div className="flex flex-col gap-1 mt-1">
            <p className="text-xs" style={{ color: "#64748B" }}>hello@imagenn.ai</p>
            <p className="text-xs" style={{ color: "#64748B" }}>+1 (555) 123-4567</p>
          </div>
          <button
            type="button"
            onClick={downloadVCard}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors duration-150"
            style={{
              background: "rgba(99,102,241,0.07)",
              color: "#4338CA",
              border: "1px solid rgba(99,102,241,0.15)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.12)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.07)"; }}
          >
            Download Contact Card
          </button>
        </div>
      </div>
    </div>
  );
}
