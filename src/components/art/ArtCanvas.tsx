import type { ArtSpec, PieceKind } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Bag, PieceShape } from "./Pieces";

type Variant = "product" | "pile" | "scene";

// x, y, size, rotation
const PRODUCT: [number, number, number, number][] = [
  [30, 296, 84, -20], [285, 290, 92, 25], [150, 322, 68, 10], [316, 182, 60, 40],
  [4, 176, 64, -35], [326, 62, 54, 15], [30, 62, 52, -10], [206, 336, 70, -8],
];
const PILE: [number, number, number, number][] = [
  [60, 150, 150, 10], [190, 130, 150, -25], [40, 250, 140, 30], [190, 250, 150, -10],
  [270, 210, 120, 45], [120, 190, 170, -5], [10, 70, 100, -40], [280, 70, 110, 20],
];
const SCENE: [number, number, number, number][] = [
  [20, 30, 90, -15], [300, 20, 100, 20], [160, 60, 80, 8], [60, 150, 110, 35], [270, 150, 96, -30],
  [190, 210, 120, 12], [20, 280, 100, -18], [130, 300, 90, 25], [300, 290, 110, -10], [220, 110, 70, 50],
  [100, 100, 60, -50], [340, 220, 70, 15],
];

const BOKEH: [number, number, number][] = [[60, 60, 46], [330, 90, 60], [250, 30, 30], [340, 320, 50], [80, 340, 38]];

/** Designed fallback artwork — fills its parent. Replace by dropping a real photo in /public/images. */
export function ArtCanvas({ art, variant = "product", className }: { art: ArtSpec; variant?: Variant; className?: string }) {
  const [c1, c2] = art.bg;
  const kinds = art.kinds;
  const pick = (i: number): PieceKind => kinds[i % kinds.length];
  const layout = variant === "product" ? PRODUCT : variant === "pile" ? PILE : SCENE;

  const pieces = layout.map(([x, y, s, r], i) => (
    <svg key={i} x={x} y={y} width={s} height={s} viewBox="0 0 100 100" overflow="visible">
      <g transform={`rotate(${r} 50 50)`}>
        <PieceShape kind={pick(i)} />
      </g>
    </svg>
  ));

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} style={{ background: `radial-gradient(110% 90% at 50% 25%, ${c1}, ${c2})` }}>
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden focusable="false">
        {BOKEH.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.08 + (i % 3) * 0.03} />
        ))}
        <g style={{ filter: "drop-shadow(0 10px 9px rgba(19,18,16,.5))" }}>
        {variant === "product" ? (
          <>
            {pieces.slice(3)}
            <svg x="112" y="52" width="176" height="235" viewBox="0 0 240 320">
              <g transform="rotate(-4 120 160)">
                <Bag color={art.accent} label={art.label ?? "Snack"} />
              </g>
            </svg>
            {pieces.slice(0, 3)}
          </>
        ) : (
          pieces
        )}
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(90% 80% at 50% 45%, transparent 55%, rgba(20,8,3,.35))" }} />
    </div>
  );
}
