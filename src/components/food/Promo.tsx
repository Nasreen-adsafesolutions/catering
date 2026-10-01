"use client";

import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { Reveal } from "./Reveal";

const CODE = "NOMLY50";

export function Promo() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);
  const b = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -20, reduce ? 0 : 50]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try { await navigator.clipboard.writeText(CODE); } catch { /* clipboard unavailable — still show feedback */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section ref={ref} className="relative z-20 -mt-16 overflow-hidden rounded-t-[2.5rem] bg-tomato pb-36 pt-20 text-white md:-mt-20 md:rounded-t-[4rem] md:pb-44 md:pt-28">
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-butter">New here?</p>
          <h2 className="mt-3 font-head text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[0.93] tracking-[-0.045em]">
            Your first order’s <span className="text-butter">half off.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/85">Take 50% off your first delivery, up to $12. No minimum spend, no catch.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={copy} className="group flex items-center gap-3 rounded-full border-2 border-dashed border-white/70 py-2.5 pl-6 pr-3 transition hover:border-white">
              <span className="font-head text-xl font-extrabold tracking-widest">{CODE}</span>
              <span className="rounded-full bg-butter px-4 py-1.5 text-sm font-extrabold text-crust transition group-active:scale-95" aria-live="polite">{copied ? "Copied!" : "Copy code"}</span>
            </button>
            <a href="#explore" className="rounded-full bg-crust px-7 py-3.5 font-bold transition hover:bg-white hover:text-crust">Start ordering</a>
          </div>
        </Reveal>

        <div className="relative mx-auto h-[420px] w-full max-w-[520px] md:h-[500px]">
          <motion.div style={{ y: a }} className="absolute left-0 top-4 w-[62%] rotate-[-5deg]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-[6px] border-paper shadow-2xl shadow-crust/30 transition-transform duration-500 hover:rotate-[-2deg]">
              <Image src="/images/food/burger2.jpg" alt="A loaded burger with fries" fill sizes="(min-width: 1024px) 320px, 55vw" className="object-cover" />
            </div>
          </motion.div>
          <motion.div style={{ y: b }} className="absolute bottom-0 right-0 w-[56%] rotate-[4deg]">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border-[6px] border-paper shadow-2xl shadow-crust/30 transition-transform duration-500 hover:rotate-[1deg]">
              <Image src="/images/food/pancakes.jpg" alt="A stack of pancakes with syrup" fill sizes="(min-width: 1024px) 290px, 50vw" className="object-cover" />
            </div>
          </motion.div>
          <div className="absolute right-2 top-0 grid h-28 w-28 rotate-12 place-items-center rounded-full bg-butter text-center text-crust shadow-xl md:h-32 md:w-32">
            <span className="font-head text-4xl font-extrabold leading-none md:text-5xl">50%<span className="block text-sm font-bold tracking-wide">OFF</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
