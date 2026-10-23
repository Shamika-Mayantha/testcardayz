// Hand-drawn vector art for the scroll journey: the car's door seen from the
// outside, the cabin frame seen from the driver's seat, and the steering wheel.
// Everything is SVG so it stays sharp at any zoom the scroll animation applies.

export function DoorArt({ hinge = "left" }: { hinge?: "left" | "right" }) {
  const flip = hinge === "right" ? "translate(1600 0) scale(-1 1)" : undefined;

  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="door-paint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2b2b" />
          <stop offset="0.38" stopColor="#0c0c0c" />
          <stop offset="0.52" stopColor="#3a3a3a" />
          <stop offset="0.58" stopColor="#101010" />
          <stop offset="1" stopColor="#030303" />
        </linearGradient>
        <linearGradient id="door-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="door-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b4450" />
          <stop offset="0.5" stopColor="#0d1116" />
          <stop offset="1" stopColor="#020304" />
        </linearGradient>
        <linearGradient id="door-handle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9e9e9" />
          <stop offset="0.5" stopColor="#7a7a7a" />
          <stop offset="1" stopColor="#2a2a2a" />
        </linearGradient>
        <filter id="door-blur">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <clipPath id="door-window">
          <path d="M140 120 L1180 120 Q1340 120 1420 300 L1460 400 L140 400 Z" />
        </clipPath>
      </defs>

      <g transform={flip}>
        <rect width="1600" height="1000" fill="url(#door-paint)" />
        <rect width="1600" height="1000" fill="url(#door-sheen)" />

        {/* Window glass with a blurred reflection of the road outside */}
        <g clipPath="url(#door-window)">
          <rect width="1600" height="420" fill="url(#door-glass)" />
          <image
            href="/brand/hero.jpg"
            x="-200"
            y="-120"
            width="2000"
            height="700"
            preserveAspectRatio="xMidYMid slice"
            opacity="0.4"
            filter="url(#door-blur)"
          />
          <path d="M520 120 L760 120 L520 400 L300 400 Z" fill="#fff" opacity="0.06" />
        </g>
        <path
          d="M140 120 L1180 120 Q1340 120 1420 300 L1460 400 L140 400 Z"
          fill="none"
          stroke="#000"
          strokeWidth="18"
        />

        {/* Shut lines and body crease */}
        <path d="M70 60 V950" stroke="#000" strokeWidth="6" />
        <path d="M1540 60 V950" stroke="#000" strokeWidth="6" />
        <path d="M70 430 H1540" stroke="#000" strokeWidth="4" opacity="0.8" />
        <path d="M70 585 Q800 560 1540 585" stroke="#e10600" strokeWidth="3" fill="none" opacity="0.85" />
        <path d="M70 592 Q800 567 1540 592" stroke="#fff" strokeWidth="1" fill="none" opacity="0.12" />

        {/* Handle */}
        <rect x="1090" y="500" width="260" height="46" rx="23" fill="#000" opacity="0.7" />
        <rect x="1100" y="494" width="240" height="40" rx="20" fill="url(#door-handle)" />
        <rect x="1120" y="500" width="200" height="6" rx="3" fill="#fff" opacity="0.55" />

      </g>

      {/* Badge */}
      <text
        x={hinge === "right" ? 1460 : 140}
        textAnchor={hinge === "right" ? "end" : "start"}
        y="880"
        fill="#fff"
        opacity="0.35"
        fontFamily="monospace"
        fontSize="22"
        letterSpacing="10"
      >
        CAR DAYZ LANKA
      </text>
    </svg>
  );
}

export function CabinFrame() {
  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="cabin-dash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1b1b" />
          <stop offset="0.15" stopColor="#0b0b0b" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id="cabin-pillar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" />
          <stop offset="1" stopColor="#161616" />
        </linearGradient>
        <radialGradient id="cabin-glow" cx="0.5" cy="0" r="0.6">
          <stop offset="0" stopColor="#e10600" stopOpacity="0.12" />
          <stop offset="1" stopColor="#e10600" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Roof liner */}
      <path d="M0 0 H1600 V120 Q800 70 0 120 Z" fill="#050505" />
      {/* A-pillars */}
      <path d="M0 0 L300 0 L130 720 L0 780 Z" fill="url(#cabin-pillar)" />
      <path d="M1600 0 L1300 0 L1470 720 L1600 780 Z" fill="url(#cabin-pillar)" />
      {/* Rear-view mirror */}
      <rect x="796" y="80" width="8" height="40" fill="#111" />
      <rect x="680" y="112" width="240" height="64" rx="22" fill="#0a0a0a" stroke="#222" strokeWidth="3" />
      <rect x="696" y="124" width="208" height="40" rx="14" fill="#1a1d22" opacity="0.8" />
      {/* Dashboard */}
      <path
        d="M0 1000 V720 Q380 630 800 640 Q1220 630 1600 720 V1000 Z"
        fill="url(#cabin-dash)"
      />
      <path
        d="M0 720 Q380 630 800 640 Q1220 630 1600 720"
        fill="none"
        stroke="#e10600"
        strokeWidth="2.5"
        opacity="0.75"
      />
      <path d="M0 720 Q380 630 800 640 Q1220 630 1600 720 V860 H0 Z" fill="url(#cabin-glow)" />
      {/* Air vents */}
      <g fill="#050505" stroke="#262626" strokeWidth="2">
        <rect x="1060" y="700" width="150" height="46" rx="12" />
        <rect x="1250" y="712" width="150" height="46" rx="12" />
      </g>
    </svg>
  );
}

export function SteeringWheel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden>
      <defs>
        <linearGradient id="wheel-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="0.4" stopColor="#0d0d0d" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="300" r="250" fill="none" stroke="url(#wheel-rim)" strokeWidth="54" />
      <circle cx="300" cy="300" r="276" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.08" />
      <path d="M60 330 Q300 260 540 330" fill="none" stroke="#0b0b0b" strokeWidth="56" />
      <path d="M300 340 V540" stroke="#0b0b0b" strokeWidth="64" />
      <circle cx="300" cy="320" r="80" fill="#0a0a0a" stroke="#1f1f1f" strokeWidth="4" />
      <rect x="290" y="26" width="20" height="30" rx="4" fill="#e10600" />
      <text
        x="300"
        y="328"
        textAnchor="middle"
        fill="#e10600"
        fontFamily="monospace"
        fontSize="20"
        letterSpacing="4"
      >
        CDZ
      </text>
    </svg>
  );
}
