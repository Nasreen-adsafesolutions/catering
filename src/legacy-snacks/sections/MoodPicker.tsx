"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Mood, MoodId, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "../shop/ProductCard";
import { SplitText } from "../ui/SplitText";

export function MoodPicker({ moods, products }: { moods: Mood[]; products: Product[] }) {
  const [active, setActive] = useState<MoodId>("spicy");
  const mood = moods.find((m) => m.id === active)!;
  const picks = useMemo(() => products.filter((p) => p.moods.includes(active)).sort((a, b) => b.rating - a.rating).slice(0, 3), [products, active]);

  return (
    <section id="moods" className="relative overflow-hidden bg-cream-2 py-14 text-choc md:py-20">
      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange">Sweet, salty, or a bit of heat</p>
        <h2 className="font-serif text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.1] tracking-[-0.035em]">
          <SplitText text="Find your flavour." />
        </h2>

        <div role="tablist" aria-label="Cravings" className="no-scrollbar -mx-5 mt-12 flex gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {moods.map((m) => {
            const on = m.id === active;
            return (
              <button
                key={m.id}
                role="tab"
                id={`tab-${m.id}`}
                aria-selected={on}
                aria-controls="mood-panel"
                onClick={() => setActive(m.id)}
                className={cn("relative shrink-0 rounded-full border-2 px-6 py-3.5 text-lg font-semibold transition-colors duration-300", on ? "border-transparent text-cream" : "border-choc/20 hover:border-choc/50")}
              >
                {on && <motion.span layoutId="mood-pill" transition={{ duration: 0.25, ease: [0.2, 0.7, 0.1, 1] }} className="absolute inset-0 rounded-full bg-orange" />}
                <span className="relative z-10 flex items-center gap-2.5">
                  <span aria-hidden>{m.emoji}</span>
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        <div id="mood-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-12">
          <AnimatePresence mode="wait">
            <motion.p key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }} className="max-w-xl font-serif text-2xl italic leading-snug text-choc/75 md:text-3xl">
              {mood.blurb}
            </motion.p>
          </AnimatePresence>
          <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
            <AnimatePresence mode="popLayout">
              {picks.map((p, i) => (
                <motion.div key={`${active}-${p.id}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, delay: i * 0.05, ease: [0.2, 0.7, 0.1, 1] }}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
