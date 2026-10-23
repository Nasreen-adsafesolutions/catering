"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { SnackImage } from "../art/SnackImage";

export interface HeroContent { badge?: string; line1?: string; line2?: string; line3?: string; text?: string; cta_label?: string; note?: string; image?: string }

export function Hero({ content = {}, image, product, rating, whatsapp }: { content?: HeroContent; image?: string; product?: Product; rating: number; whatsapp?: string }) {
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

  // The photo grows slightly as the hero scrolls away — one transform on one element.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : small ? 1.14 : 1.4]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, reduce || small ? 0 : -40]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div>
          <motion.span initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 rounded-full bg-butter/70 px-4 py-1.5 text-sm font-bold">
            <span aria-hidden className="h-2 w-2 rounded-full bg-basil" /> {content.badge || "Home-made · Fresh weekly"}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.7, 0.1, 1] }} className="mt-6 font-head text-[clamp(3rem,7.4vw,6.25rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
            {content.line1 || "Real ghar ka"}<br />
            <span className="text-tomato">{content.line2 || "zaika,"}</span><br />
            {content.line3 ?? "delivered."}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-6 max-w-md text-lg leading-relaxed text-crust/70">
            {content.text || "Traditional sweets, namkeen, cutlets and samosas made fresh in a home kitchen with pure ghee and hand-ground spices."}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }} className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="inline-flex h-14 items-center rounded-full bg-tomato px-8 font-bold text-white shadow-[0_12px_40px_-16px_rgba(42,22,14,.5)] transition hover:bg-crust active:scale-95">{content.cta_label || "Order now"}</Link>
            {whatsapp && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex h-14 items-center rounded-full border-2 border-crust px-7 font-bold transition hover:bg-crust hover:text-paper">Order on WhatsApp</a>}
          </motion.div>
          {content.note && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6 text-sm text-crust/60">{content.note}</motion.p>
          )}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.1, 1] }} className="relative mx-auto w-full max-w-[560px]">
          <motion.div style={{ y: lift }} className="relative">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[2.5rem] bg-tomato md:rounded-[3.5rem]">
              <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
                {image ? (
                  <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 540px, 90vw" className="object-cover" />
                ) : product ? (
                  <SnackImage src={product.image} alt={product.name} art={product.art} priority variant="scene" sizes="(min-width: 1024px) 540px, 90vw" />
                ) : null}
              </motion.div>
            </div>
            <div className="absolute -left-3 bottom-10 animate-float rounded-2xl bg-white px-4 py-3 shadow-xl shadow-crust/15 md:-left-10">
              <p className="text-xs font-semibold text-crust/50">Made fresh</p>
              <p className="font-head text-2xl font-extrabold">To order</p>
              <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-sauce"><div className="h-full w-2/3 rounded-full bg-basil" /></div>
            </div>
            <div className="absolute -right-2 top-8 rounded-2xl bg-butter px-4 py-3 shadow-xl shadow-crust/15 [animation:float_7s_ease-in-out_1s_infinite] md:-right-6">
              <p className="font-head text-2xl font-extrabold">{rating.toFixed(1)} ★</p>
              <p className="text-xs font-semibold text-crust/60">Customer rating</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
