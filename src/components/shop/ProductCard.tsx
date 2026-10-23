"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { SnackImage } from "../art/SnackImage";
import { Reveal } from "../food/Reveal";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Reveal delay={(index % 4) * 0.06} className="h-full">
      <article className="group flex h-full flex-col">
        <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="relative block aspect-[4/5] overflow-hidden rounded-[2rem] bg-sauce">
          <SnackImage src={product.image} alt={product.name} art={product.art} sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw" />
          {product.badge && <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-extrabold">{product.badge}</span>}
          <span className="absolute right-4 top-4 rounded-full bg-crust/75 px-3 py-1 text-xs font-bold text-paper backdrop-blur">{product.weight}</span>
        </Link>
        <div className="mt-4 flex flex-1 items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-head text-xl font-bold leading-tight"><Link href={`/product/${product.slug}`} className="hover:text-tomato">{product.name}</Link></h3>
            <p className="mt-1 text-sm text-crust/60">{product.category} · <span className="text-tomato">★</span> {product.rating}</p>
            <p className="mt-2 font-head text-lg font-extrabold">{formatPrice(product.price)}</p>
          </div>
          <AddToCartButton product={product} round />
        </div>
      </article>
    </Reveal>
  );
}
