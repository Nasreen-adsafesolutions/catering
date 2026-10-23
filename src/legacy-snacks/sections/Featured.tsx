"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "../shop/ProductCard";
import { SplitText } from "../ui/SplitText";

const Chevron = ({ flip }: { flip?: boolean }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={flip ? "rotate-180" : ""} aria-hidden>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export function Featured({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Native scroll-snap carousel — no animation library, the browser handles the smooth scroll and momentum.
  const scroll = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * trackRef.current.clientWidth * 0.85, behavior: "smooth" });

  return (
    <section id="featured" className="mx-auto max-w-[1500px] py-14 md:py-20">
      <div className="mb-8 flex flex-col justify-between gap-6 px-5 md:mb-10 md:flex-row md:items-end md:px-10">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange">The line-up</p>
          <h2 className="font-serif text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.1] tracking-[-0.035em]">
            <SplitText text="Start with these." />
          </h2>
        </div>
        <div className="flex items-center justify-between gap-6 md:justify-end">
          <Link href="/shop" className="group inline-flex items-center gap-2 text-lg font-semibold">
            <span className="border-b-2 border-choc pb-0.5 transition-colors group-hover:border-orange group-hover:text-orange">View all snacks</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>→</span>
          </Link>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} aria-label="Previous snacks" className="grid h-11 w-11 place-items-center rounded-full border border-choc/20 transition hover:border-orange hover:text-orange"><Chevron flip /></button>
            <button onClick={() => scroll(1)} aria-label="Next snacks" className="grid h-11 w-11 place-items-center rounded-full border border-choc/20 transition hover:border-orange hover:text-orange"><Chevron /></button>
          </div>
        </div>
      </div>

      <div ref={trackRef} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 md:gap-8 md:px-10">
        {products.map((p, i) => (
          <div key={p.id} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
