"use client";

import { useState } from "react";
import { NomlyLogo } from "./Logo";
import { Reveal } from "./Reveal";

const COLS = [
  { title: "Nomly", links: ["About", "Careers", "Press", "Blog"] },
  { title: "Partners", links: ["Add your restaurant", "Become a courier", "Business orders"] },
  { title: "Help", links: ["Support", "Safety", "Privacy", "Terms"] },
];

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return done ? (
    <p role="status" className="rounded-full bg-basil px-7 py-4 font-bold text-white">You’re in! Check your inbox for 10% off.</p>
  ) : (
    <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setDone(true); }} className="flex max-w-lg items-center gap-2 rounded-full bg-paper p-2 pl-6 text-crust">
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <input id="nl-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="min-w-0 flex-1 bg-transparent py-2 outline-none placeholder:text-crust/40" />
      <button type="submit" className="h-12 shrink-0 rounded-full bg-tomato px-6 font-bold text-white transition hover:bg-crust active:scale-95">Subscribe</button>
    </form>
  );
}

export function FoodFooter() {
  return (
    <footer className="relative z-50 -mt-16 overflow-hidden rounded-t-[2.5rem] bg-crust pt-20 text-paper md:-mt-20 md:rounded-t-[4rem] md:pt-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-head text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">Get <span className="text-butter">10% off</span> your next craving.</h2>
          <p className="mb-8 mt-5 max-w-md text-paper/65">Weekly deals and new restaurants near you. No spam, ever.</p>
          <Newsletter />
        </Reveal>

        <div className="mt-20 grid gap-12 border-t border-paper/15 pt-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <NomlyLogo light />
            <p className="mt-4 max-w-xs text-paper/60">Great food from the kitchens you love, delivered fast.</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.title}>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-paper/45">{c.title}</h3>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}><a href="#" className="inline-block transition hover:translate-x-1 hover:text-butter">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-16 border-t border-paper/15 pt-6 text-sm text-paper/45">© {new Date().getFullYear()} Nomly. A fictional food delivery brand.</p>
      </div>
      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap pt-6 text-center font-head text-[26vw] font-extrabold leading-[0.72] tracking-[-0.06em] text-paper/[0.06]">nomly</p>
    </footer>
  );
}
