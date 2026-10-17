"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { POSTER_ITEMS, type PosterItem } from "./poster-data";

const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Decorative paisley-ish corner motif, drawn once and reused. */
function Motif({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 110C10 50 50 10 110 10" />
      <path d="M10 85C10 45 45 10 85 10" opacity=".6" />
      <path d="M10 60C10 35 35 10 60 10" opacity=".35" />
      <circle cx="26" cy="26" r="6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Photo({ item }: { item: PosterItem }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl" style={{ background: item.bg }}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center p-6 text-center font-head text-5xl font-extrabold text-paper/25">{item.hindi}</div>
      ) : (
        <Image src={item.image} alt={`${item.name} — ${item.note}`} fill sizes="(min-width: 768px) 360px, 80vw" onError={() => setFailed(true)} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
      )}
    </div>
  );
}

export function Poster() {
  return (
    <section className="relative overflow-hidden bg-[#fbe9c4] px-5 pb-24 pt-28 text-crust md:px-8 md:pb-32 md:pt-36">
      <Motif className="absolute left-0 top-0 h-40 w-40 text-tomato/40 md:h-64 md:w-64" />
      <Motif className="absolute bottom-0 right-0 h-40 w-40 rotate-180 text-tomato/40 md:h-64 md:w-64" />

      <div className="relative mx-auto max-w-[1100px]">
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
          <p className="inline-block rounded-full bg-crust px-5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-butter">Fresh · Small batch · Homemade</p>
          <h1 className="mt-6 font-head text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
            Our Homemade<br /><span className="text-tomato">Favourites</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-crust/70">Traditional snacks made the way home does it. Packed fresh, delivered to your door.</p>
          <div aria-hidden className="mx-auto mt-8 flex items-center justify-center gap-3 text-tomato"><span className="h-px w-16 bg-current" /><span>✦</span><span className="h-px w-16 bg-current" /></div>
        </motion.header>

        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {POSTER_ITEMS.map((item, i) => (
            <motion.li key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.2, 0.7, 0.1, 1] }} className={i === 1 ? "md:-translate-y-6" : ""}>
              <article className="group mx-auto max-w-sm">
                <Photo item={item} />
                <div className="relative -mt-9 rounded-3xl bg-paper px-6 pb-6 pt-8 text-center shadow-xl shadow-crust/10 transition-transform duration-300 group-hover:-translate-y-1.5">
                  <div className="absolute -top-9 right-5 grid h-[4.5rem] w-[4.5rem] rotate-6 place-items-center rounded-full bg-tomato text-white shadow-lg">
                    <span className="font-head text-2xl font-extrabold leading-none">{rupee(item.price)}</span>
                  </div>
                  <p className="font-head text-sm font-bold text-tomato">{item.hindi}</p>
                  <h2 className="font-head text-4xl font-extrabold tracking-tight">{item.name}</h2>
                  <p className="mt-1 text-sm text-crust/60">{item.note}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-crust/45">{item.unit}</p>
                  <a href="#" className="mt-5 inline-block rounded-full bg-crust px-7 py-3 text-sm font-bold text-paper transition hover:bg-tomato active:scale-95">Order Now</a>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>

        <p className="mt-16 text-center text-sm font-semibold text-crust/50">Prices are indicative · Free delivery on orders above ₹499</p>
      </div>
    </section>
  );
}
