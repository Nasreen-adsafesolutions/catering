"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SplitText } from "../ui/SplitText";

export function BrandStory({ image }: { image?: string }) {
  return (
    <section id="story" className="mx-auto grid max-w-[1500px] gap-8 border-t border-choc/15 px-5 py-16 md:grid-cols-[1fr_2fr] md:px-10 md:py-24">
      <p className="text-sm text-choc/60">A little about us</p>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.5 }} className="max-w-2xl">
        <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
          <SplitText text="We keep good snacks around." />
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-choc/70">Something salty for a film. Nuts for the train home. A bag of popcorn opened before the kettle&apos;s boiled. That&apos;s the kind of snacking we have in mind.</p>
        <Link href="/about" className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-orange">More about Crunch &amp; Co. →</Link>
        {image && <div className="relative mt-8 aspect-[16/9] overflow-hidden"><Image src={image} alt="Snacks shared around a table" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" /></div>}
      </motion.div>
    </section>
  );
}
