"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { ArtCanvas } from "../art/ArtCanvas";
import { SnackImage } from "../art/SnackImage";
import { ButtonEl } from "../ui/Button";
import { QuantityControl } from "../shop/QuantityControl";

const SIZES = [
  { n: 3, discount: 0, label: "The Taster" },
  { n: 5, discount: 0.05, label: "The Sharer" },
  { n: 8, discount: 0.1, label: "The Feast" },
] as const;

export function BoxBuilder({ products }: { products: Product[] }) {
  const { addLine, setOpen } = useCart();
  const { push } = useToast();
  const [size, setSize] = useState<3 | 5 | 8>(5);
  const [picks, setPicks] = useState<string[]>([]);

  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const eligible = useMemo(() => products.filter((p) => p.category !== "Boxes"), [products]);
  const tier = SIZES.find((s) => s.n === size)!;
  const full = picks.length >= size;
  const raw = picks.reduce((n, id) => n + (byId.get(id)?.price ?? 0), 0);
  const total = raw * (1 - tier.discount);
  const grouped = useMemo(() => {
    const m = new Map<string, number>();
    picks.forEach((id) => m.set(id, (m.get(id) ?? 0) + 1));
    return [...m].map(([id, qty]) => ({ p: byId.get(id)!, qty }));
  }, [picks, byId]);

  const changeSize = (n: 3 | 5 | 8) => {
    setSize(n);
    setPicks((cur) => cur.slice(0, n));
  };
  const qtyOf = (id: string) => picks.filter((x) => x === id).length;
  const setQtyOf = (id: string, q: number) => {
    setPicks((cur) => {
      const have = cur.filter((x) => x === id).length;
      if (q > have) return cur.length >= size ? cur : [...cur, id];
      const idx = cur.lastIndexOf(id);
      return idx < 0 ? cur : cur.filter((_, i) => i !== idx);
    });
  };

  const addBox = () => {
    addLine({
      id: `box-${size}-${[...picks].sort().join("-")}`,
      name: `Custom Snack Box (${size})`,
      price: Math.round(total * 100) / 100,
      art: { bg: ["#4A3826", "#1C1A17"], accent: "#8A6D35", kinds: grouped.map((g) => g.p.art.kinds[0]), label: "Snack Box" },
      note: grouped.map((g) => `${g.qty}× ${g.p.name}`).join(", "),
    });
    push(`Your ${size}-snack box is in the bag`, { label: "View bag", onClick: () => setOpen(true) });
    setPicks([]);
  };

  return (
    <section id="box" className="bg-cream-2 py-14 md:py-20">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange">Made by you</p>
        <h2 className="font-serif text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.1] tracking-[-0.035em]">
          A box of your favourites.
        </h2>

        <div role="radiogroup" aria-label="Box size" className="mt-10 flex flex-wrap gap-3">
          {SIZES.map((s) => {
            const on = s.n === size;
            return (
              <button key={s.n} role="radio" aria-checked={on} onClick={() => changeSize(s.n)} className={cn("relative rounded-xl border-2 px-6 py-4 text-left transition-colors", on ? "border-choc text-cream" : "border-choc/20 hover:border-choc/60")}>
                {on && <motion.span layoutId="size-bg" transition={{ type: "spring", stiffness: 400, damping: 34 }} className="absolute inset-0 rounded-[10px] bg-choc" />}
                <span className="relative z-10 block text-3xl font-extrabold leading-none">{s.n} <span className="text-base font-semibold">snacks</span></span>
                <span className="relative z-10 mt-1 block text-sm opacity-70">{s.label}{s.discount ? ` · save ${s.discount * 100}%` : ""}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* picker */}
          <ul className="grid gap-3 sm:grid-cols-2" aria-label="Choose snacks">
            {eligible.map((p) => {
              const q = qtyOf(p.id);
              return (
                <li key={p.id} className={cn("flex items-center gap-4 rounded-xl border-2 bg-cream p-3 transition-colors", q ? "border-orange" : "border-transparent")}>
                  <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg"><SnackImage src={p.image} alt="" art={p.art} sizes="80px" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold leading-tight">{p.name}</p>
                    <p className="mb-2 text-sm text-choc/60">{formatPrice(p.price)}</p>
                    <QuantityControl value={q} onChange={(n) => setQtyOf(p.id, n)} max={q + (full ? 0 : size - picks.length)} label={p.name} size="sm" />
                  </div>
                </li>
              );
            })}
          </ul>

          {/* the box */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border-2 border-choc/10 bg-cream p-5 text-choc shadow-2xl shadow-choc/10 md:p-7">
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold tracking-tight">Your Snack Box</h3>
                <p className="text-sm text-choc/55" aria-live="polite">{picks.length} / {size} chosen</p>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-choc/10">
                {/* scaleX (composited) instead of width (layout) — same fill effect, no layout recalculation per frame */}
                <motion.div className="h-full w-full origin-left rounded-full bg-yolk" animate={{ scaleX: picks.length / size }} transition={{ duration: 0.3, ease: [0.2, 0.7, 0.1, 1] }} />
              </div>

              <ul className={cn("mt-6 grid gap-2.5", size === 3 ? "grid-cols-3" : "grid-cols-4")} aria-label="Box contents">
                {Array.from({ length: size }).map((_, i) => {
                  const p = byId.get(picks[i]);
                  return (
                    <li key={i} className="relative aspect-square rounded-lg border-2 border-dashed border-choc/20 bg-choc/[0.03]">
                      <AnimatePresence>
                        {p && (
                          <motion.button
                            key={`${i}-${p.id}`}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.1, 1] }}
                            onClick={() => setPicks((cur) => cur.filter((_, idx) => idx !== i))}
                            aria-label={`Remove ${p.name}`}
                            className="group absolute inset-0 overflow-hidden rounded-lg transition-transform duration-200 hover:scale-105"
                          >
                            <ArtCanvas art={p.art} variant="pile" />
                            <span className="absolute inset-0 grid place-items-center bg-choc/60 text-2xl opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">×</span>
                          </motion.button>
                        )}
                      </AnimatePresence>
                      {!p && <span className="absolute inset-0 grid place-items-center text-xl text-choc/25">{i + 1}</span>}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 min-h-[4.5rem] border-t border-choc/12 pt-4">
                {grouped.length === 0 ? (
                  <p className="font-serif text-lg italic text-choc/45">Your box is empty — start picking snacks.</p>
                ) : (
                  <ul className="space-y-1.5 text-sm">
                    <AnimatePresence initial={false}>
                      {grouped.map(({ p, qty }) => (
                        <motion.li key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex justify-between gap-3">
                          <span>{qty} × {p.name}</span>
                          <span className="text-choc/65">{formatPrice(qty * p.price)}</span>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              <div className="mt-4 flex items-end justify-between border-t border-choc/12 pt-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-choc/50">Total</p>
                  {tier.discount > 0 && raw > 0 && <p className="text-sm text-yolk">You save {formatPrice(raw - total)}</p>}
                </div>
                <motion.p key={total.toFixed(2)} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl font-extrabold tracking-tight">{formatPrice(total)}</motion.p>
              </div>

              <ButtonEl size="lg" className="mt-5 w-full" disabled={!full} onClick={addBox}>
                {full ? "Add box to bag" : `Pick ${size - picks.length} more`}
              </ButtonEl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
