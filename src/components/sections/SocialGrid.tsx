"use client";

import { motion } from "framer-motion";
import type { SocialPost } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SnackImage } from "../art/SnackImage";
import { SplitText } from "../ui/SplitText";

const SPANS = ["row-span-2", "", "", "", "row-span-2", ""];

export function SocialGrid({ posts }: { posts: SocialPost[] }) {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-36">
      <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="text-[clamp(2.75rem,7vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em]">
          <SplitText text="Snack" /> <SplitText text="With Us" delay={0.15} className="font-serif font-normal italic text-orange" />
        </h2>
        <a href="#" className="text-lg font-semibold underline decoration-orange decoration-2 underline-offset-8 transition hover:text-orange">@crunchandco ↗</a>
      </div>
      <ul className="grid auto-rows-[38vw] grid-cols-2 gap-3 md:auto-rows-[20vw] md:grid-cols-3 md:gap-5 xl:auto-rows-[17vw]">
        {posts.map((p, i) => (
          <motion.li key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -6% 0px" }} transition={{ duration: 0.45, delay: (i % 3) * 0.06 }} className={cn(SPANS[i])}>
            <a href="#" aria-label={`${p.title} — ${p.caption}`} className="group relative block h-full w-full overflow-hidden rounded-[12px] bg-choc">
              <div className="absolute inset-0 will-change-transform transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.1,1)] group-hover:scale-110 group-focus-visible:scale-110">
                <SnackImage src={p.image} alt={p.title} art={p.art} variant="scene" sizes="(min-width:768px) 33vw, 50vw" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-choc/85 via-choc/10 to-transparent p-4 text-cream opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100 md:p-6">
                <p className="translate-y-3 text-lg font-extrabold leading-tight transition duration-500 group-hover:translate-y-0 md:text-2xl">{p.title}</p>
                <p className="mt-1 hidden translate-y-3 text-sm text-cream/80 transition delay-75 duration-500 group-hover:translate-y-0 md:block">{p.caption}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-yolk">{p.handle}</p>
              </div>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
