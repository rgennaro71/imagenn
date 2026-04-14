// components/shared/HeroVisual.tsx
// Pure SVG orbital diagram — architectural, geometric, animated via SVG animateMotion

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-[560px] aspect-square" aria-hidden="true">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.18) 0%, rgba(34,211,238,0.06) 45%, transparent 75%)",
        }}
      />
      <svg
        viewBox="0 0 560 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <path id="path-outer" d="M 280 60 A 220 220 0 1 1 279.999 60" />
          <path id="path-mid" d="M 280 100 A 180 180 0 1 1 279.999 100" />
          <path id="path-inner" d="M 280 160 A 120 120 0 1 1 279.999 160" />
          <path id="path-ellipse-1" d="M 480 280 A 200 75 0 1 1 479.999 280" transform="rotate(-35 280 280)" />
          <path id="path-ellipse-2" d="M 430 280 A 150 55 0 1 1 429.999 280" transform="rotate(55 280 280)" />
          <filter id="glow-indigo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-core" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="core-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="60%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4f46e5" />
          </radialGradient>
          <radialGradient id="ring-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(99,102,241,0.35)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0)" />
          </radialGradient>
        </defs>

        {/* Concentric rings */}
        <circle cx="280" cy="280" r="230" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
        <circle cx="280" cy="280" r="200" stroke="rgba(99,102,241,0.12)" strokeWidth="1" />
        <circle cx="280" cy="280" r="160" stroke="rgba(99,102,241,0.1)" strokeWidth="1" />
        <circle cx="280" cy="280" r="120" stroke="rgba(34,211,238,0.1)" strokeWidth="1" />
        <circle cx="280" cy="280" r="80" stroke="rgba(99,102,241,0.12)" strokeWidth="1" />

        {/* Tilted ellipses */}
        <ellipse cx="280" cy="280" rx="200" ry="75" stroke="rgba(99,102,241,0.18)" strokeWidth="1" strokeDasharray="4 8" transform="rotate(-35 280 280)" />
        <ellipse cx="280" cy="280" rx="150" ry="55" stroke="rgba(34,211,238,0.14)" strokeWidth="1" strokeDasharray="3 10" transform="rotate(55 280 280)" />

        {/* Connection lines */}
        <line x1="280" y1="280" x2="400" y2="168" stroke="rgba(99,102,241,0.12)" strokeWidth="1" />
        <line x1="280" y1="280" x2="170" y2="380" stroke="rgba(34,211,238,0.1)" strokeWidth="1" />
        <line x1="280" y1="280" x2="430" y2="320" stroke="rgba(99,102,241,0.08)" strokeWidth="1" />

        {/* Static satellite nodes */}
        <circle cx="400" cy="168" r="5" fill="rgba(129,140,248,0.5)" />
        <circle cx="400" cy="168" r="2" fill="#818cf8" />
        <circle cx="170" cy="380" r="4" fill="rgba(34,211,238,0.4)" />
        <circle cx="170" cy="380" r="1.5" fill="#22d3ee" />
        <circle cx="430" cy="320" r="3.5" fill="rgba(129,140,248,0.35)" />
        <circle cx="430" cy="320" r="1.5" fill="#818cf8" />

        {/* Ring tick marks */}
        <circle cx="280" cy="80" r="2.5" fill="rgba(99,102,241,0.5)" />
        <circle cx="480" cy="280" r="2" fill="rgba(34,211,238,0.4)" />
        <circle cx="110" cy="200" r="2" fill="rgba(99,102,241,0.4)" />
        <circle cx="380" cy="450" r="2" fill="rgba(34,211,238,0.3)" />

        {/* Animated node — outer ring */}
        <circle r="7" fill="rgba(129,140,248,0.25)" filter="url(#glow-indigo)">
          <animateMotion dur="22s" repeatCount="indefinite" rotate="auto"><mpath href="#path-outer" /></animateMotion>
        </circle>
        <circle r="3.5" fill="#818cf8">
          <animateMotion dur="22s" repeatCount="indefinite" rotate="auto"><mpath href="#path-outer" /></animateMotion>
        </circle>

        {/* Animated node — outer ring offset */}
        <circle r="5" fill="rgba(34,211,238,0.2)" filter="url(#glow-cyan)">
          <animateMotion dur="22s" begin="-11s" repeatCount="indefinite" rotate="auto"><mpath href="#path-outer" /></animateMotion>
        </circle>
        <circle r="2.5" fill="#22d3ee">
          <animateMotion dur="22s" begin="-11s" repeatCount="indefinite" rotate="auto"><mpath href="#path-outer" /></animateMotion>
        </circle>

        {/* Animated node — mid ring, reverse */}
        <circle r="5.5" fill="rgba(129,140,248,0.2)" filter="url(#glow-indigo)">
          <animateMotion dur="16s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#path-mid" /></animateMotion>
        </circle>
        <circle r="2.5" fill="#a78bfa">
          <animateMotion dur="16s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#path-mid" /></animateMotion>
        </circle>

        {/* Animated node — tilted ellipse 1 */}
        <circle r="4.5" fill="rgba(99,102,241,0.25)" filter="url(#glow-indigo)">
          <animateMotion dur="18s" repeatCount="indefinite"><mpath href="#path-ellipse-1" /></animateMotion>
        </circle>
        <circle r="2" fill="#818cf8">
          <animateMotion dur="18s" repeatCount="indefinite"><mpath href="#path-ellipse-1" /></animateMotion>
        </circle>

        {/* Animated node — tilted ellipse 2, reverse */}
        <circle r="3.5" fill="rgba(34,211,238,0.2)" filter="url(#glow-cyan)">
          <animateMotion dur="13s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#path-ellipse-2" /></animateMotion>
        </circle>
        <circle r="1.5" fill="#22d3ee">
          <animateMotion dur="13s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#path-ellipse-2" /></animateMotion>
        </circle>

        {/* Animated node — inner ring */}
        <circle r="4" fill="rgba(34,211,238,0.2)" filter="url(#glow-cyan)">
          <animateMotion dur="10s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#path-inner" /></animateMotion>
        </circle>
        <circle r="1.8" fill="#22d3ee">
          <animateMotion dur="10s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#path-inner" /></animateMotion>
        </circle>

        {/* Pulsing core */}
        <circle cx="280" cy="280" r="28" fill="url(#ring-gradient)" />
        <circle cx="280" cy="280" r="18" fill="url(#core-gradient)" filter="url(#glow-core)">
          <animate attributeName="r" values="16;20;16" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="280" cy="280" r="7" fill="white" opacity="0.9" />
      </svg>
    </div>
  );
}
