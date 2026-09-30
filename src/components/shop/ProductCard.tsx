"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { SnackImage } from "../art/SnackImage";
import { Stars } from "../ui/Stars";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.2, 0.7, 0.1, 1] }}
      className="group relative flex flex-col"
    >
      <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="relative block aspect-square overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
          <SnackImage src={product.image} alt={product.name} art={product.art} />
        </div>

        {product.badge && <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wider text-choc">{product.badge}</span>}

        {/* ingredients surface on hover (always visible on touch) */}
        <ul className="absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5 opacity-0 transition duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 pointer-coarse:translate-y-0 pointer-coarse:opacity-100">
          {product.ingredients.slice(0, 4).map((ing) => (
            <li key={ing} className="rounded-full bg-choc/80 px-3 py-1 text-xs font-medium text-cream backdrop-blur">
              {ing}
            </li>
          ))}
        </ul>
      </Link>

      <div className="flex flex-1 flex-col py-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight tracking-tight">
            <Link href={`/product/${product.slug}`} className="hover:text-orange">{product.name}</Link>
          </h3>
          <p className="shrink-0 text-base font-semibold">{formatPrice(product.price)}</p>
        </div>
        <p className="mt-1.5 text-[15px] leading-snug text-choc/65">{product.tagline}</p>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Stars value={product.rating} />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-choc/50">({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-sm text-choc/50">{product.weight}</span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </motion.article>
  );
}
