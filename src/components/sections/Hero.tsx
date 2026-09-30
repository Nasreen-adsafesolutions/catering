"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { ArtSpec } from "@/lib/types";
import { ArtCanvas } from "../art/ArtCanvas";
import { Arrow, Button } from "../ui/Button";
import { Magnetic } from "../ui/Magnetic";
import { SplitText } from "../ui/SplitText";

const HERO_ART: ArtSpec = { bg: ["#2A1F14", "#120C07"], accent: "#D89F3A", kinds: ["chip", "popcorn", "nut", "chilli", "corn"], label: "Smoky BBQ" };
const STATS: [string, string][] = [["12", "flavours"], ["100%", "small-batch"], ["4.8★", "rated by snackers"]];

export function Hero({ image }: { image?: string }) {
  // Tracks scroll across the whole hero (0 at page load, 1 once scrolled past)
  // and maps it to a single composited `scale` on the background image — one
  // element, one transform property, no page-wide scroll-scrub.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[92svh] items-center justify-center overflow-hidden text-cream">
      <motion.div style={{ scale: imgScale }} className="absolute inset-0">
        {image ? (
          <Image src={image} alt="A selection of Crunch & Co. snacks" fill priority sizes="100vw" className="object-cover" />
        ) : (
          <ArtCanvas art={HERO_ART} variant="scene" />
        )}
      </motion.div>
      {/* scrim — keeps the headline legible over any photo or fallback art */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/55" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-24 text-center md:px-10">
        <motion.span initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 rounded-full bg-red px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cream">
          Home-made · Fresh weekly
        </motion.span>
        <h1 className="mt-6 font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.04em]">
          <SplitText immediate text="Something good" delay={0.15} />
          <br />
          <SplitText immediate text="for the cupboard." delay={0.25} className="italic text-yolk" />
        </h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-cream/85 md:text-lg">
          Smoky chips, salted popcorn, a little chocolate. Pick your favourites and keep a few bags handy.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }} className="mt-9 flex flex-col items-center gap-4">
          <Magnetic><Button href="/shop" size="lg">Shop all snacks <Arrow /></Button></Magnetic>
          <p className="text-xs text-cream/70">Free UK delivery on orders over £25</p>
        </motion.div>

        <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} className="mx-auto mt-12 flex max-w-md justify-center gap-8 border-t border-cream/20 pt-6 sm:gap-12">
          {STATS.map(([n, l]) => (
            <div key={l}>
              <dt className="text-2xl font-bold text-yolk md:text-3xl">{n}</dt>
              <dd className="mt-0.5 text-xs text-cream/70">{l}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
