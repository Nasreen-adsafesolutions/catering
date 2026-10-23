"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { SnackImage } from "../art/SnackImage";
import { Reveal } from "./Reveal";

export interface PromoContent { enabled?: boolean; eyebrow?: string; title?: string; highlight?: string; text?: string; code?: string; badge?: string; button_label?: string; button_link?: string }

export function Promo({ content = {}, products }: { content?: PromoContent; products: Product[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);
  const b = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -20, reduce ? 0 : 50]);
  const [copied, setCopied] = useState(false);
  const code = content.code;
  const [p1, p2] = products;

  const copy = async () => {
    try { await navigator.clipboard.writeText(code!); } catch { /* clipboard unavailable — still show feedback */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section ref={ref} className="relative z-20 -mt-16 overflow-hidden rounded-t-[2.5rem] bg-tomato pb-36 pt-20 text-white md:-mt-20 md:rounded-t-[4rem] md:pb-44 md:pt-28">
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-butter">{content.eyebrow || "Planning a celebration?"}</p>
          <h2 className="mt-3 font-head text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[0.93] tracking-[-0.045em]">
            {content.title || "Festival & party orders,"} <span className="text-butter">{content.highlight || "made easy."}</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/85">{content.text || "Sweet boxes, namkeen and snack platters for weddings, festivals and office gatherings. Tell us the date and headcount — we’ll handle the rest."}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            {code && (
              <button onClick={copy} className="group flex items-center gap-3 rounded-full border-2 border-dashed border-white/70 py-2.5 pl-6 pr-3 transition hover:border-white">
                <span className="font-head text-xl font-extrabold tracking-widest">{code}</span>
                <span className="rounded-full bg-butter px-4 py-1.5 text-sm font-extrabold text-crust transition group-active:scale-95" aria-live="polite">{copied ? "Copied!" : "Copy code"}</span>
              </button>
            )}
            <Link href={content.button_link || "/contact"} className="rounded-full bg-crust px-7 py-3.5 font-bold transition hover:bg-white hover:text-crust">{content.button_label || "Plan your order"}</Link>
          </div>
        </Reveal>

        <div className="relative mx-auto h-[420px] w-full max-w-[520px] md:h-[500px]">
          {p1 && (
            <motion.div style={{ y: a }} className="absolute left-0 top-4 w-[62%] rotate-[-5deg]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-[6px] border-paper shadow-2xl shadow-crust/30 transition-transform duration-500 hover:rotate-[-2deg]">
                <SnackImage src={p1.image} alt={p1.name} art={p1.art} />
              </div>
            </motion.div>
          )}
          {p2 && (
            <motion.div style={{ y: b }} className="absolute bottom-0 right-0 w-[56%] rotate-[4deg]">
              <div className="relative aspect-square overflow-hidden rounded-[2rem] border-[6px] border-paper shadow-2xl shadow-crust/30 transition-transform duration-500 hover:rotate-[1deg]">
                <SnackImage src={p2.image} alt={p2.name} art={p2.art} />
              </div>
            </motion.div>
          )}
          {content.badge && (
            <div className="absolute right-2 top-0 grid h-28 w-28 rotate-12 place-items-center rounded-full bg-butter text-center text-crust shadow-xl md:h-32 md:w-32">
              <span className="px-2 font-head text-2xl font-extrabold leading-tight md:text-3xl">{content.badge}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
