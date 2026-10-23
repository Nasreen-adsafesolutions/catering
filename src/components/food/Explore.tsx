"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { SnackImage } from "../art/SnackImage";
import { AddToCartButton } from "../shop/AddToCartButton";
import { Reveal } from "./Reveal";

export function Explore({ products }: { products: Product[] }) {
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];
  const [cat, setCat] = useState("All");
  const list = products.filter((p) => cat === "All" || p.category === cat).slice(0, 6);

  return (
    <section id="explore" className="relative z-10 -mt-16 rounded-t-[2.5rem] bg-crust pb-36 pt-20 text-paper md:-mt-20 md:rounded-t-[4rem] md:pb-44 md:pt-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-butter">Browse the menu</p>
          <h2 className="mt-3 max-w-2xl font-head text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">Whatever you’re craving.</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-5 mt-10 flex gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cn("shrink-0 rounded-full border-2 px-6 py-2.5 font-head text-base font-bold transition-colors", cat === c ? "border-butter bg-butter text-crust" : "border-paper/25 text-paper/80 hover:border-paper/60")}>{c}</button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 flex items-end justify-between">
          <h3 className="font-head text-2xl font-bold md:text-3xl">{cat === "All" ? "Top picks" : cat}</h3>
          <Link href={cat === "All" ? "/shop" : `/shop?cat=${encodeURIComponent(cat)}`} className="text-sm font-semibold text-butter hover:underline">View all →</Link>
        </div>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <motion.li key={`${cat}-${p.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.05, ease: [0.2, 0.7, 0.1, 1] }}>
              <article className="group rounded-[2rem] bg-paper p-3 text-crust transition-transform duration-300 hover:-translate-y-1.5">
                <Link href={`/product/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden rounded-3xl bg-sauce" aria-label={p.name}>
                  <SnackImage src={p.image} alt={p.name} art={p.art} sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-butter px-3 py-1 text-xs font-extrabold">{p.weight}</span>
                </Link>
                <div className="px-3 pb-3 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-head text-xl font-bold"><Link href={`/product/${p.slug}`} className="hover:text-tomato">{p.name}</Link></h4>
                    <p className="shrink-0 rounded-full bg-sauce px-2.5 py-1 text-sm font-bold"><span className="text-tomato">★</span> {p.rating}</p>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-crust/60">{p.tagline}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-head text-lg font-extrabold">{formatPrice(p.price)}</p>
                    <AddToCartButton product={p} round />
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
