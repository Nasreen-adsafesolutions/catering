"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DISHES, type Dish } from "./data";
import { useFoodCart } from "./FoodCart";
import { Reveal } from "./Reveal";

function AddButton({ dish }: { dish: Dish }) {
  const { add } = useFoodCart();
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => { add(dish.price); setDone(true); setTimeout(() => setDone(false), 1200); }}
      aria-label={`Add ${dish.name} to bag`}
      className={cn("grid h-11 w-11 place-items-center rounded-full text-white transition active:scale-90", done ? "bg-basil" : "bg-tomato hover:bg-crust")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg key={done ? "ok" : "plus"} initial={{ scale: 0.4, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.4 }} transition={{ duration: 0.15 }} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {done ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M12 5v14M5 12h14" />}
        </motion.svg>
      </AnimatePresence>
    </button>
  );
}

export function Popular() {
  return (
    <section id="popular" className="relative bg-paper pb-36 md:pb-44">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-tomato">Popular right now</p>
            <h2 className="mt-3 max-w-xl font-head text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">What everyone’s ordering tonight.</h2>
          </div>
          <a href="#explore" className="group inline-flex items-center gap-2 rounded-full border-2 border-crust px-6 py-3 font-bold transition hover:bg-crust hover:text-paper">
            See all restaurants <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>

        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {DISHES.map((d, i) => (
            <li key={d.id} className={i % 2 === 1 ? "lg:translate-y-12" : ""}>
              <Reveal delay={(i % 2) * 0.08}>
                <article className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sauce">
                    <Image src={d.image} alt={d.name} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                    {d.tag && <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-extrabold">{d.tag}</span>}
                    <span className="absolute right-4 top-4 rounded-full bg-crust/75 px-3 py-1 text-xs font-bold text-paper backdrop-blur">{d.minutes} min</span>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-head text-xl font-bold leading-tight">{d.name}</h3>
                      <p className="mt-1 text-sm text-crust/60">{d.place} · <span className="text-tomato">★</span> {d.rating}</p>
                      <p className="mt-2 font-head text-lg font-extrabold">${d.price.toFixed(2)}</p>
                    </div>
                    <AddButton dish={d} />
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
