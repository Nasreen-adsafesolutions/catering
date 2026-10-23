import type { PieceKind } from "@/lib/types";
import { Piece } from "../art/Pieces";

const words: [string, PieceKind][] = [["CRUNCH", "chip"], ["FLAVOUR", "chilli"], ["GOOD VIBES", "popcorn"]];

function Row() {
  return (
    <>
      {words.map(([w, k], i) => (
        <span key={i} className="flex items-center gap-8 pr-8 md:gap-14 md:pr-14">
          <span>{w}</span>
          <Piece kind={k} className="h-[0.8em] w-[0.8em] shrink-0" />
          <span className="font-serif font-normal italic">•</span>
        </span>
      ))}
    </>
  );
}

/**
 * A single continuously-scrolling strip, driven by a CSS keyframe animation
 * (see .marquee-track in globals.css) instead of a per-frame JS loop — the
 * browser compositor handles it independently of scrolling and React.
 */
export function MarqueeStrip() {
  return (
    <section aria-label="Crunch, flavour, good vibes" className="relative z-10 -my-1 overflow-hidden bg-orange py-6 text-cream md:py-8">
      <div className="marquee-track text-[clamp(3rem,8vw,7.5rem)] font-extrabold leading-none tracking-[-0.04em]">
        <Row />
        <span aria-hidden className="contents"><Row /></span>
      </div>
    </section>
  );
}
