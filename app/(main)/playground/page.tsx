export default function PlaygroundPage() {
  const sizes = [
    { label: "text-4xl", px: "36px / 2.25rem", tailwind: "text-4xl" },
    { label: "text-5xl", px: "48px / 3rem", tailwind: "text-5xl" },
    { label: "text-6xl", px: "60px / 3.75rem", tailwind: "text-6xl" },
    { label: "text-7xl — current desktop md", px: "72px / 4.5rem", tailwind: "text-7xl" },
    { label: "text-8xl — current desktop xl", px: "96px / 6rem", tailwind: "text-8xl" },
  ];

  const headlines = [
    { line1: "Modernize How Your Business", line2: "Thinks." },
    { line1: "Ship AI That Actually Works.", line2: "Lead the Shift. Don't Chase It." },
  ];

  return (
    <div style={{ background: "#030303", minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "24px", marginBottom: "60px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,158,11,0.7)", marginBottom: "6px" }}>
            Font Size Playground
          </p>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)" }}>
            Both headline variants shown at each size. Current: <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px", color: "#a5b4fc" }}>text-7xl</code> on md, <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px", color: "#a5b4fc" }}>text-8xl</code> on xl.
          </p>
        </div>

        {/* Size comparisons */}
        {sizes.map((size) => (
          <div key={size.label} style={{ marginBottom: "72px" }}>
            {/* Size label */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,158,11,0.6)", whiteSpace: "nowrap" }}>
                {size.label}
              </span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.22)" }}>
                {size.px}
              </span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            </div>

            {/* Two variants side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", borderRadius: "12px", overflow: "hidden", background: "rgba(255,255,255,0.04)" }}>
              {headlines.map((hl, hi) => (
                <div key={hi} style={{ padding: "32px 28px", background: "#030303" }}>
                  <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "16px" }}>
                    Variant {hi + 1}
                  </p>
                  <h1
                    className={`font-serif font-bold tracking-tight ${size.tailwind}`}
                    style={{ lineHeight: 1.04, margin: 0 }}
                  >
                    <span style={{
                      backgroundImage: "linear-gradient(to bottom, white, rgba(255,255,255,0.8))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                      {hl.line1}
                    </span>
                    <br />
                    <span style={{
                      backgroundImage: hi === 0
                        ? "linear-gradient(to right, #a5b4fc, rgba(255,255,255,0.9), #c4b5fd)"
                        : "linear-gradient(to right, #fcd34d, rgba(255,255,255,0.9), #a5b4fc)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                      {hl.line2}
                    </span>
                  </h1>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
            Tell me which size looks right and I'll update the hero.
          </p>
        </div>
      </div>
    </div>
  );
}
