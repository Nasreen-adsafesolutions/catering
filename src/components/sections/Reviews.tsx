"use client";

import { motion } from "framer-motion";
import type { Review } from "@/lib/types";
import { Stars } from "../ui/Stars";
import { SplitText } from "../ui/SplitText";

export function Reviews({ items }: { items: Review[] }) {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-14 md:px-10 md:py-20">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange">Snack lovers say</p>
      <h2 className="font-serif text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.1] tracking-[-0.035em]">
        <SplitText text="Worth the crumbs." />
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-6">
        {items.map((r, i) => {
          const span = i < 3 ? "md:col-span-2" : "md:col-span-3";
          return (
            <motion.figure
              key={r.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06, ease: [0.2, 0.7, 0.1, 1] }}
              className={`${span} flex flex-col justify-between rounded-2xl border border-choc/10 bg-cream-2 p-7 md:p-8`}
            >
              <div>
                <Stars value={r.rating} className="h-4 w-4" />
                <blockquote className="mt-4 text-xl leading-snug tracking-tight md:text-2xl">“{r.quote}”</blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-3 text-sm">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-choc text-sm font-semibold text-cream" aria-hidden>{r.name[0]}</span>
                <span>
                  <span className="block font-medium">{r.name} · {r.city}</span>
                  <span className="block text-choc/55">Verified · {r.product}</span>
                </span>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
