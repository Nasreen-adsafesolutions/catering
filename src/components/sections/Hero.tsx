"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { ArtSpec } from "@/lib/types";
import { ArtCanvas } from "../art/ArtCanvas";
import { Arrow, Button } from "../ui/Button";
import { Magnetic } from "../ui/Magnetic";
import { SplitText } from "../ui/SplitText";

const HERO_ART: ArtSpec = { bg: ["#F1E9DE", "#E2D2BC"], accent: "#8A6D35", kinds: ["chip", "popcorn", "nut", "chilli", "corn"], label: "Smoky BBQ" };

export function Hero({ image }: { image?: string }) {
  // Scoped to just this image's own scroll range, one element, one transform
  // property (translateY, GPU-composited) — not a page-wide scroll-scrub.
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgWrapRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1500px] px-5 pb-14 pt-32 text-center md:px-10 md:pb-20 md:pt-44">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-sm text-choc/60">
          Crunch &amp; Co. — the snack cupboard
        </motion.p>
        <h1 className="mx-auto mt-5 max-w-3xl font-serif text-[clamp(3rem,8vw,7rem)] leading-[1.02] tracking-[-0.04em]">
          <SplitText immediate text="Something good" delay={0.1} />
          <br />
          <SplitText immediate text="for the cupboard." delay={0.2} className="italic text-orange" />
        </h1>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }} className="mt-9 flex flex-col items-center gap-4">
          <Magnetic><Button href="/shop" size="lg">Shop all snacks <Arrow /></Button></Magnetic>
          <p className="text-xs text-choc/55">Free UK delivery on orders over £25</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.7, 0.1, 1] }} className="mx-auto max-w-[1500px] px-5 pb-16 md:px-10 md:pb-24">
        <div ref={imgWrapRef} className="relative aspect-[16/7] overflow-hidden rounded-2xl md:aspect-[21/7]">
          <motion.div style={{ y: parallaxY }} className="absolute -inset-y-[8%] inset-x-0">
            {image ? (
              <Image src={image} alt="A selection of Crunch & Co. snacks" fill priority sizes="100vw" className="object-cover" />
            ) : (
              <ArtCanvas art={HERO_ART} variant="scene" />
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
