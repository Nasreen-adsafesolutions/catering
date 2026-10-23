import type { PieceKind } from "@/lib/types";
import { Piece } from "../art/Pieces";
import { NewsletterForm } from "../ui/NewsletterForm";
import { SplitText } from "../ui/SplitText";

const P: { k: PieceKind; l: string; t: string; s: number; delay: number; rotate: number }[] = [
  { k: "chip", l: "6%", t: "14%", s: 84, delay: 0, rotate: -20 },
  { k: "chilli", l: "88%", t: "16%", s: 66, delay: 1, rotate: 30 },
  { k: "corn", l: "10%", t: "76%", s: 56, delay: 0.5, rotate: -30 },
];

export function Newsletter() {
  return (
    <section className="relative isolate overflow-hidden bg-cream-2 py-28 text-choc md:py-44">
      {P.map((p, i) => (
        <div key={i} aria-hidden className="pointer-events-none absolute hidden animate-float opacity-80 sm:block" style={{ left: p.l, top: p.t, width: p.s, height: p.s, animationDelay: `${p.delay}s` }}>
          <Piece kind={p.k} rotate={p.rotate} className="h-full w-full drop-shadow-[0_10px_10px_rgba(0,0,0,.2)]" />
        </div>
      ))}
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-orange">The Snack Club</p>
        <h2 className="text-[clamp(2.5rem,6.5vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.05em]">
          <SplitText text="Your Inbox" /> <SplitText text="Deserves" /> <SplitText text="Snacks Too." delay={0.15} className="font-serif font-normal italic text-orange" />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-choc/70">Get new flavour drops, limited editions, snack recipes, and occasional cravings.</p>
        <NewsletterForm className="mx-auto mt-10 max-w-xl" />
      </div>
    </section>
  );
}
