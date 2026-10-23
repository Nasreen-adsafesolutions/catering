"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { SearchDialog } from "./SearchDialog";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/snacks#moods", label: "Flavours" },
  { href: "/snacks#box", label: "Build a Box" },
  { href: "/snacks#story", label: "Our Story" },
];

export function Header({ products }: { products: Product[] }) {
  const { count, setOpen } = useCart();
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const closeSearch = useCallback(() => setSearch(false), []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 500 && y > prev && !menu);
  });

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !(e.target instanceof HTMLInputElement))) {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.7, 0.1, 1] }}
        className={cn("fixed inset-x-0 top-0 z-50 text-choc transition-[background,box-shadow,backdrop-filter] duration-300", scrolled ? "bg-cream/95 shadow-[0_1px_0_rgba(19,18,16,.08)] backdrop-blur-md" : "bg-cream")}
      >
        <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 md:px-10">
          <Logo />
          <ul className="hidden items-center gap-9 text-[15px] font-medium md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group relative py-2">
                  {l.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded bg-orange transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setSearch(true)} aria-label="Search snacks" className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-orange/15">
              <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            </button>
            <button onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`} className="relative grid h-11 w-11 place-items-center rounded-full transition hover:bg-orange/15">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span key={count} initial={{ scale: 0.3, y: -6 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 600, damping: 14 }} className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-orange px-1 text-[11px] font-bold text-cream">
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button onClick={() => setMenu((m) => !m)} aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="mobile-menu" className="grid h-11 w-11 place-items-center rounded-full md:hidden">
              <span className="relative block h-3.5 w-6">
                <span className={cn("absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300", menu ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 top-3 h-0.5 w-6 rounded bg-current transition-all duration-300", menu ? "top-1.5 -rotate-45" : "")} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" initial={{ clipPath: "circle(0% at 92% 4%)" }} animate={{ clipPath: "circle(150% at 92% 4%)" }} exit={{ clipPath: "circle(0% at 92% 4%)" }} transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }} className="fixed inset-0 z-40 flex flex-col justify-between bg-choc px-6 pb-10 pt-28 text-cream md:hidden">
            <ul className="space-y-1">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07 }}>
                  <Link href={l.href} onClick={() => setMenu(false)} className="block py-1 text-5xl font-extrabold tracking-tight active:text-orange">{l.label}</Link>
                </motion.li>
              ))}
            </ul>
            <p className="font-serif text-2xl italic text-yolk">Stay hungry. Stay crunchy.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog open={search} onClose={closeSearch} products={products} />
    </>
  );
}
