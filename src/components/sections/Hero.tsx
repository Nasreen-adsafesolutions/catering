"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { ArtSpec } from "@/lib/types";
import { ArtCanvas } from "../art/ArtCanvas";
import { Arrow, Button } from "../ui/Button";
import { Magnetic } from "../ui/Magnetic";
import { SplitText } from "../ui/SplitText";

const HERO_ART: ArtSpec = { bg: ["#E9DCC3", "#D8C49E"], accent: "#8A6D35", kinds: ["chip", "popcorn", "nut", "chilli", "corn"], label: "Smoky BBQ" };

export function Hero({ image }: { image?: string }) {
  // One light, scoped scroll effect on the product visual only — a gentle
  // scale as it comes into view, not a page-wide scroll-scrub.
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgWrapRef, offset: ["start end", "start start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [0.92, 1.05]);

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 px-5 pb-20 pt-32 md:grid-cols-2 md:gap-10 md:px-10 md:pb-28 md:pt-40">
        <div className="max-w-xl">
          <motion.span initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 rounded-full bg-red/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red">
            Home-made · Fresh weekly
          </motion.span>
          <h1 className="mt-6 font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.03] tracking-[-0.04em]">
            <SplitText immediate text="Something good" delay={0.15} />
            <br />
            <SplitText immediate text="for the cupboard." delay={0.25} className="italic text-orange" />
          </h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-6 max-w-sm text-base leading-relaxed text-choc/70 md:text-lg">
            Smoky chips, salted popcorn, a little chocolate. Pick your favourites and keep a few bags handy.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }} className="mt-9 flex flex-wrap items-center gap-6">
            <Magnetic><Button href="/shop" size="lg">Shop all snacks <Arrow /></Button></Magnetic>
            <p className="text-xs text-choc/55">Free UK delivery on orders over £25</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative mx-auto aspect-square w-full max-w-md">
          {/* soft shape behind the product — no photo-like asset, just a gradient */}
          <div aria-hidden className="absolute inset-[6%] rounded-full bg-gradient-to-br from-yolk/35 via-orange/20 to-transparent blur-2xl" />

          <div ref={imgWrapRef} className="relative h-full w-full overflow-hidden rounded-[2.5rem]">
            <motion.div style={{ scale: imgScale }} className="absolute inset-0">
              {image ? (
                <Image src={image} alt="A selection of Crunch & Co. snacks" fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover" priority />
              ) : (
                <ArtCanvas art={HERO_ART} variant="product" />
              )}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="absolute -bottom-5 -left-5 rounded-2xl bg-cream px-5 py-3.5 shadow-xl shadow-choc/15 md:-left-8">
            <p className="text-2xl font-bold tracking-tight text-choc">4.8<span className="text-orange">★</span></p>
            <p className="text-xs text-choc/55">Loved by snackers</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
