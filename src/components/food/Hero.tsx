"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { asset } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setSmall(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // 0 at the top of the page → 1 once the hero has scrolled out. The photo is clipped by
  // its rounded frame, so growing it reads as the food moving toward you. A single
  // transform on a single element: compositor-only, no layout work per frame.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : small ? 1.14 : 1.4]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, reduce || small ? 0 : -40]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div>
          <motion.span initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 rounded-full bg-butter/70 px-4 py-1.5 text-sm font-bold">
            <span aria-hidden className="h-2 w-2 rounded-full bg-basil" /> Delivering in your area now
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.7, 0.1, 1] }} className="mt-6 font-head text-[clamp(3.25rem,9vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
            Good food,<br />
            <span className="text-tomato">right on</span><br />
            time.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-6 max-w-md text-lg leading-relaxed text-crust/70">
            Your favourite local kitchens, at your door in under 30 minutes. Hot, fresh and tracked every step of the way.
          </motion.p>

          <motion.form onSubmit={(e) => { e.preventDefault(); document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" }); }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }} className="mt-9 flex max-w-lg items-center gap-2 rounded-full bg-white p-2 pl-6 shadow-[0_12px_40px_-16px_rgba(42,22,14,.35)] focus-within:ring-2 focus-within:ring-tomato">
            <label htmlFor="address" className="sr-only">Delivery address</label>
            <svg aria-hidden viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-tomato"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
            <input id="address" type="text" placeholder="Delivery address" className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none placeholder:text-crust/40" />
            <button type="submit" className="h-12 shrink-0 rounded-full bg-tomato px-6 font-bold text-white transition hover:bg-crust active:scale-95 md:px-8">Order now</button>
          </motion.form>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6 flex items-center gap-3 text-sm text-crust/60">
            <span className="flex -space-x-2" aria-hidden>
              {["bg-tomato", "bg-butter", "bg-basil", "bg-crust"].map((c) => <span key={c} className={`h-7 w-7 rounded-full border-2 border-paper ${c}`} />)}
            </span>
            <span><strong className="text-crust">4.9</strong> from 2M+ happy orders</span>
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.1, 1] }} className="relative mx-auto w-full max-w-[560px]">
          <motion.div style={{ y: lift }} className="relative">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[2.5rem] bg-tomato md:rounded-[3.5rem]">
              <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
                <Image src={asset("/images/food/hero.jpg")} alt="A fresh pizza topped with pepperoni, olives and peppers on an orange table" fill priority sizes="(min-width: 1024px) 540px, 90vw" className="object-cover" />
              </motion.div>
            </div>

            <div className="absolute -left-3 bottom-10 animate-float rounded-2xl bg-white px-4 py-3 shadow-xl shadow-crust/15 md:-left-10">
              <p className="text-xs font-semibold text-crust/50">Arriving in</p>
              <p className="font-head text-2xl font-extrabold">22 min</p>
              <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-sauce"><div className="h-full w-2/3 rounded-full bg-basil" /></div>
            </div>
            <div className="absolute -right-2 top-8 rounded-2xl bg-butter px-4 py-3 shadow-xl shadow-crust/15 [animation:float_7s_ease-in-out_1s_infinite] md:-right-6">
              <p className="font-head text-2xl font-extrabold">4.9 ★</p>
              <p className="text-xs font-semibold text-crust/60">Top rated</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
