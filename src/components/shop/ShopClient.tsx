"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Category, Mood, MoodId, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Piece } from "../art/Pieces";
import { ProductCard } from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export function ShopClient({ products, moods, initialCategory }: { products: Product[]; moods: Mood[]; initialCategory?: string }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))] as ("All" | Category)[], [products]);
  const [cat, setCat] = useState<string>(categories.includes(initialCategory as Category) ? initialCategory! : "All");
  const [mood, setMood] = useState<MoodId | "all">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const out = products.filter((p) => (cat === "All" || p.category === cat) && (mood === "all" || p.moods.includes(mood)) && (!s || [p.name, p.tagline, p.category, ...p.ingredients].join(" ").toLowerCase().includes(s)));
    const sorters: Record<Sort, (a: Product, b: Product) => number> = {
      featured: () => 0,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...out].sort(sorters[sort]);
  }, [products, cat, mood, q, sort]);

  const reset = () => { setCat("All"); setMood("all"); setQ(""); };
  const chip = (on: boolean) => cn("shrink-0 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors", on ? "border-choc bg-choc text-cream" : "border-choc/20 hover:border-choc/60");

  return (
    <div>
      <div className="sticky top-[72px] z-30 -mx-5 space-y-3 border-b border-choc/10 bg-cream/90 px-5 py-4 backdrop-blur-md md:-mx-10 md:px-10">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <label htmlFor="shop-search" className="sr-only">Search snacks</label>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" aria-hidden><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            <input id="shop-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search snacks, flavours, ingredients…" className="h-12 w-full rounded-full border-2 border-choc/15 bg-cream pl-11 pr-4 outline-none transition focus:border-orange" />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <span className="sr-only md:not-sr-only">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-12 rounded-full border-2 border-choc/15 bg-cream px-4 outline-none focus:border-orange">
              <option value="featured">Featured</option>
              <option value="rating">Top rated</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0" role="group" aria-label="Filter by category">
          {categories.map((c) => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={chip(cat === c)}>{c}</button>)}
        </div>
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0" role="group" aria-label="Filter by mood">
          <button aria-pressed={mood === "all"} onClick={() => setMood("all")} className={chip(mood === "all")}>Any mood</button>
          {moods.map((m) => <button key={m.id} aria-pressed={mood === m.id} onClick={() => setMood(m.id)} className={chip(mood === m.id)}>{m.emoji} {m.label}</button>)}
        </div>
      </div>

      <p className="mt-6 text-sm text-choc/60" aria-live="polite">{list.length} snack{list.length === 1 ? "" : "s"}</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <AnimatePresence>
          {list.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <ProductCard product={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {list.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto flex max-w-md flex-col items-center py-24 text-center">
          <div className="relative mb-6 h-24 w-24"><Piece kind="chip" className="absolute inset-0 animate-float opacity-70" rotate={-15} /></div>
          <h2 className="font-serif text-4xl italic">No crumbs found.</h2>
          <p className="mt-2 text-choc/60">Nothing matches those filters. Try loosening them a little.</p>
          <button onClick={reset} className="mt-6 rounded-full bg-orange px-7 py-3 font-semibold text-cream transition hover:bg-choc">Clear filters</button>
        </motion.div>
      )}
    </div>
  );
}
