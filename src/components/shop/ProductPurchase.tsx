"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "./AddToCartButton";
import { QuantityControl } from "./QuantityControl";

export function ProductPurchase({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  return (
    <div className="mt-8 flex flex-wrap items-center gap-5">
      <QuantityControl value={qty} onChange={setQty} min={1} label={product.name} />
      <AddToCartButton product={product} qty={qty} size="lg" className="flex-1 sm:flex-none" />
      <p className="w-full text-sm text-choc/55 sm:w-auto">Total {formatPrice(product.price * qty)}</p>
    </div>
  );
}
