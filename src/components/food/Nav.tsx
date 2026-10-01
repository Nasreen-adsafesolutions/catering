"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useFoodCart } from "./FoodCart";
import { NomlyLogo } from "./Logo";

const LINKS = [
  { href: "#popular", label: "Popular" },
  { href: "#explore", label: "Restaurants" },
  { href: "#how", label: "How it works" },
  { href: "#reviews", label: "Reviews" },
];

export function Nav() {
  const { count, total } = useFoodCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <nav aria-label="Main" className={cn("mx-auto flex h-14 max-w-[1280px] items-center justify-between rounded-full px-4 pl-5 transition-all duration-300 md:h-16 md:pl-6", scrolled || open ? "bg-paper/85 shadow-[0_8px_30px_-12px_rgba(42,22,14,.25)] backdrop-blur-md" : "bg-transparent")}>
        <NomlyLogo />
        <ul className="hidden items-center gap-8 text-[15px] font-semibold md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="relative py-2 transition-colors hover:text-tomato">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#explore" className="relative flex h-10 items-center gap-2 rounded-full bg-crust px-4 text-sm font-bold text-paper transition hover:bg-tomato md:h-11" aria-label={`Your bag: ${count} items`}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
            <span className="tabular-nums">{count > 0 ? `$${total.toFixed(2)}` : "Bag"}</span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }} className="grid h-5 min-w-5 place-items-center rounded-full bg-butter px-1 text-[11px] font-extrabold text-crust">
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
          <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="food-menu" className="grid h-10 w-10 place-items-center rounded-full md:hidden">
            <span className="relative block h-3 w-5">
              <span className={cn("absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300", open ? "top-1 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 top-2.5 h-0.5 w-5 rounded bg-current transition-all duration-300", open && "top-1 -rotate-45")} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="food-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mx-auto mt-2 max-w-[1280px] rounded-3xl bg-paper p-3 shadow-xl shadow-crust/15 md:hidden">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-head text-2xl font-bold active:bg-sauce">{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
