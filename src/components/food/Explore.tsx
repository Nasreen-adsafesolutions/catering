"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CATEGORIES, RESTAURANTS, type CategoryId } from "./data";
import { Reveal } from "./Reveal";

function Heart({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  return (
    <button onClick={() => setOn((v) => !v)} aria-pressed={on} aria-label={`Save ${label}`} className="grid h-10 w-10 place-items-center rounded-full bg-paper/90 backdrop-blur transition active:scale-90">
      <svg viewBox="0 0 24 24" width="19" height="19" strokeWidth="2.2" strokeLinejoin="round" className={cn("transition-colors", on ? "fill-tomato stroke-tomato" : "fill-transparent stroke-crust")} aria-hidden>
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
      </svg>
    </button>
  );
}

export function Explore() {
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const list = (cat === "all" ? RESTAURANTS.slice(0, 6) : RESTAURANTS.filter((r) => r.category === cat)).slice(0, 6);

  return (
    <section id="explore" className="relative z-10 -mt-16 rounded-t-[2.5rem] bg-crust pb-36 pt-20 text-paper md:-mt-20 md:rounded-t-[4rem] md:pb-44 md:pt-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-butter">Browse by craving</p>
          <h2 className="mt-3 max-w-2xl font-head text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">Whatever you’re in the mood for.</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-5 mt-10 flex snap-x gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:gap-5 md:px-0">
            {CATEGORIES.map((c) => {
              const active = cat === c.id;
              return (
                <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={active} className="group flex shrink-0 snap-start flex-col items-center gap-3 md:w-[calc((100%-6.25rem)/6)]">
                  <span className={cn("relative block h-20 w-20 overflow-hidden rounded-full ring-4 ring-offset-4 ring-offset-crust transition-all duration-300 md:h-auto md:w-full md:aspect-square", active ? "ring-butter" : "ring-transparent group-hover:ring-paper/30")}>
                    <Image src={c.image} alt="" fill sizes="(min-width: 768px) 180px, 80px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <span className={cn("font-head text-base font-bold transition-colors md:text-lg", active ? "text-butter" : "text-paper/80")}>{c.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-14 flex items-end justify-between">
          <h3 className="font-head text-2xl font-bold md:text-3xl">{cat === "all" ? "Top picks near you" : `${CATEGORIES.find((c) => c.id === cat)?.label} near you`}</h3>
          <p className="text-sm text-paper/55">{list.length} places</p>
        </div>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <motion.li key={`${cat}-${r.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.05, ease: [0.2, 0.7, 0.1, 1] }}>
              <article className="group rounded-[2rem] bg-paper p-3 text-crust transition-transform duration-300 hover:-translate-y-1.5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sauce">
                  <Image src={r.image} alt={r.name} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute right-3 top-3"><Heart label={r.name} /></div>
                  <span className="absolute bottom-3 left-3 rounded-full bg-butter px-3 py-1 text-xs font-extrabold">{r.minutes} min</span>
                </div>
                <div className="px-3 pb-3 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-head text-xl font-bold">{r.name}</h4>
                    <p className="shrink-0 rounded-full bg-sauce px-2.5 py-1 text-sm font-bold"><span className="text-tomato">★</span> {r.rating}</p>
                  </div>
                  <p className="mt-1 text-sm text-crust/60">{r.cuisine}</p>
                  <p className="mt-3 text-sm font-semibold text-basil">{r.fee} <span className="font-normal text-crust/40">· {r.reviews} reviews</span></p>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
