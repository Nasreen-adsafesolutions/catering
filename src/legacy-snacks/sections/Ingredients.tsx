"use client";

import { motion } from "framer-motion";
import type { Ingredient } from "@/lib/types";
import { SnackImage } from "../art/SnackImage";
import { SplitText } from "../ui/SplitText";

export function Ingredients({ items }: { items: Ingredient[] }) {
  return (
    <section id="ingredients" className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-36">
      <div className="mb-14 max-w-4xl md:mb-20">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange">What&apos;s inside</p>
        <h2 className="text-[clamp(2.75rem,7vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em]">
          <SplitText text="Good Ingredients." /> <SplitText text="Big Flavour." delay={0.2} className="font-serif font-normal italic text-orange" />
        </h2>
      </div>
      <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {items.map((ing, i) => (
          <motion.li key={ing.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.45, delay: (i % 4) * 0.06, ease: [0.2, 0.7, 0.1, 1] }} className={i % 5 === 1 ? "lg:translate-y-10" : i % 5 === 3 ? "lg:-translate-y-6" : ""}>
            <article tabIndex={0} aria-label={ing.name} className="group relative aspect-[3/4] overflow-hidden rounded-[14px] bg-choc text-cream outline-offset-4">
              <div className="absolute inset-0 will-change-transform transition-transform duration-[1100ms] ease-[cubic-bezier(.2,.7,.1,1)] group-hover:scale-110 group-focus-visible:scale-110">
                <SnackImage src={ing.image} alt={`${ing.name}, macro photograph`} art={{ bg: ing.bg, accent: ing.bg[0], kinds: [ing.kind, ing.kind, ing.kind] }} variant="pile" sizes="(min-width:1024px) 25vw, 50vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-choc/90 via-choc/10 to-transparent transition-colors duration-500 group-hover:from-choc/95 group-hover:via-choc/55 group-focus-visible:from-choc/95 group-focus-visible:via-choc/55" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">{ing.name}</h3>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] pointer-coarse:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-2 text-sm leading-snug text-cream/80 md:text-[15px]">{ing.description}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Flavour profile">
                      {ing.profile.map((f) => <li key={f} className="rounded-full border border-yolk/70 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-yolk">{f}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
