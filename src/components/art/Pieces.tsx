import type { CSSProperties } from "react";
import type { PieceKind } from "@/lib/types";

const CHIP_DOTS: [number, number][] = [[44, 42], [56, 58], [40, 70], [64, 74], [52, 30], [70, 80]];

/** Vector snack pieces drawn in a 100×100 box. Used for fallback art + floating decoration. */
export function PieceShape({ kind }: { kind: PieceKind }) {
  switch (kind) {
    case "chip":
      return (
        <g>
          <path d="M50 8 Q58 8 64 18 L92 74 Q97 86 84 88 L18 88 Q4 86 10 74 L38 18 Q42 8 50 8Z" fill="#F0A032" stroke="#C97316" strokeWidth="2.5" />
          <path d="M50 18 L80 76 L24 78Z" fill="#F7BC5C" opacity=".55" />
          {CHIP_DOTS.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="2.6" fill="#C4321C" opacity=".85" />
              <circle cx={x + 5} cy={y - 3} r="1.3" fill="#FFF6E0" />
            </g>
          ))}
        </g>
      );
    case "popcorn":
      return (
        <g fill="#FFF3D1" stroke="#EBCB86" strokeWidth="2">
          <circle cx="35" cy="55" r="18" />
          <circle cx="63" cy="52" r="20" />
          <circle cx="48" cy="32" r="18" />
          <circle cx="46" cy="68" r="16" />
          <circle cx="71" cy="72" r="14" />
          <circle cx="50" cy="52" r="6" fill="#F2B84B" stroke="none" />
        </g>
      );
    case "nut":
      return (
        <g>
          <path d="M30 14 C10 14 8 38 24 45 C10 54 16 84 38 84 C60 84 62 60 54 51 C68 42 64 14 44 14 Z" fill="#D9A066" stroke="#A8703A" strokeWidth="2.5" />
          <path d="M28 30 Q34 34 30 40 M42 62 Q48 66 44 72 M40 28 Q44 32 40 36" stroke="#A8703A" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      );
    case "almond":
      return (
        <g>
          <path d="M50 6 C76 26 80 64 50 94 C20 64 24 26 50 6Z" fill="#C8894B" stroke="#9A6330" strokeWidth="2.5" />
          <path d="M50 18 C56 40 56 62 50 82" stroke="#E2AE72" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
    case "choc":
      return (
        <g>
          <rect x="14" y="14" width="72" height="72" rx="6" fill="#4A2417" stroke="#2A1208" strokeWidth="2.5" />
          <path d="M14 50H86M50 14V86" stroke="#2A1208" strokeWidth="3" />
          <rect x="20" y="20" width="24" height="24" rx="3" fill="#6B3826" />
          <rect x="56" y="56" width="24" height="24" rx="3" fill="#5A2E1F" />
        </g>
      );
    case "chilli":
      return (
        <g>
          <path d="M30 30 C60 20 92 50 80 86 C76 94 66 90 66 80 C68 58 50 46 30 44 Z" fill="#D7261E" stroke="#8F120D" strokeWidth="2.5" />
          <path d="M38 36 C58 34 74 50 74 70" stroke="#F0645A" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7" />
          <path d="M30 30 C26 20 18 18 12 24 C20 30 24 38 30 44Z" fill="#3E7B2B" stroke="#25521A" strokeWidth="2" />
        </g>
      );
    case "salt":
      return (
        <g strokeLinejoin="round" stroke="#DDD5C6" strokeWidth="2.5">
          <polygon points="50,10 84,30 84,70 50,90 16,70 16,30" fill="#FFFFFF" />
          <polygon points="50,10 84,30 50,50 16,30" fill="#F4F0E8" />
          <polygon points="50,50 84,30 84,70 50,90" fill="#E8E2D6" />
        </g>
      );
    case "cookie":
      return (
        <g>
          <circle cx="50" cy="50" r="38" fill="#D39A55" stroke="#A9702F" strokeWidth="2.5" />
          {[[34, 36], [62, 32], [50, 54], [30, 64], [68, 62], [46, 76]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="6.5" ry="5" fill="#3A1D10" />
          ))}
        </g>
      );
    case "corn":
      return (
        <g>
          <path d="M50 10 C74 10 80 40 66 60 C60 70 60 84 50 90 C40 84 40 70 34 60 C20 40 26 10 50 10Z" fill="#FFC531" stroke="#D9A21A" strokeWidth="2.5" />
          <path d="M42 20 C36 34 38 48 44 58" stroke="#FFE38A" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      );
    case "caramel":
      return (
        <g>
          <path d="M20 55 C14 30 40 14 62 20 C86 26 90 56 74 74 C58 92 26 84 20 55Z" fill="#C7772A" stroke="#8E4E14" strokeWidth="2.5" />
          <ellipse cx="42" cy="36" rx="14" ry="7" fill="#F2B36A" opacity=".75" transform="rotate(-25 42 36)" />
        </g>
      );
    case "spice":
      return (
        <g>
          {[[30, 40, 9, "#D7261E"], [54, 30, 7, "#F26A1B"], [64, 54, 10, "#8B3A1A"], [38, 66, 8, "#FFC531"], [58, 76, 6, "#D7261E"], [22, 62, 5, "#F26A1B"], [76, 34, 5, "#8B3A1A"]].map(([x, y, r, c], i) => (
            <circle key={i} cx={x as number} cy={y as number} r={r as number} fill={c as string} />
          ))}
        </g>
      );
  }
}

export function Piece({ kind, className, style, rotate = 0 }: { kind: PieceKind; className?: string; style?: CSSProperties; rotate?: number }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden focusable="false">
      <g transform={`rotate(${rotate} 50 50)`}>
        <PieceShape kind={kind} />
      </g>
    </svg>
  );
}

export function Bag({ color = "#8A6D35", label = "Crunch", className }: { color?: string; label?: string; className?: string }) {
  const words = label.split(" ");
  return (
    <svg viewBox="0 0 240 320" className={className} aria-hidden focusable="false">
      <path d="M30 34 H210 L224 296 Q224 314 206 314 H34 Q16 314 16 296 Z" fill={color} />
      <path d="M30 34 H210 L224 296 Q224 314 206 314 H34 Q16 314 16 296 Z" fill="url(#bagshade)" />
      <defs>
        <linearGradient id="bagshade" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".28" />
        </linearGradient>
      </defs>
      <rect x="26" y="14" width="188" height="30" rx="3" fill="#000" opacity=".2" />
      <rect x="20" y="288" width="200" height="26" rx="3" fill="#000" opacity=".18" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line key={i} x1={32 + i * 7.6} x2={32 + i * 7.6} y1="16" y2="42" stroke="#fff" strokeOpacity=".12" strokeWidth="2" />
      ))}
      <circle cx="120" cy="165" r="70" fill="#F8F6F1" />
      <circle cx="120" cy="165" r="62" fill="none" stroke="#1C1A17" strokeWidth="1.5" strokeDasharray="2 5" />
      <text x="120" y="152" textAnchor="middle" fontSize="30" fontWeight="700" fill="#1C1A17" fontFamily="var(--font-sans), sans-serif" letterSpacing="-1">
        CRUNCH
      </text>
      <text x="120" y="180" textAnchor="middle" fontSize="26" fontWeight="500" fontStyle="italic" fill={color} fontFamily="var(--font-fraunces), serif">
        &amp; Co.
      </text>
      <text x="120" y="204" textAnchor="middle" fontSize={words.join(" ").length > 12 ? 8.5 : 11} fontWeight="700" fill="#1C1A17" letterSpacing={words.join(" ").length > 12 ? 1 : 2} fontFamily="var(--font-sans), sans-serif">
        {words.join(" ").toUpperCase()}
      </text>
    </svg>
  );
}
