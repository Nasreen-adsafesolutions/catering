import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/shop/ShopClient";
import { getMoods, getProducts } from "@/lib/api";

export const metadata: Metadata = { title: "Menu", description: "Traditional sweets, namkeen, cutlets, samosas and party boxes." };

export default async function ShopPage() {
  const [products, moods] = await Promise.all([getProducts(), getMoods()]);
  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-tomato">The full menu</p>
      <h1 className="mb-10 text-[clamp(3rem,8vw,7.5rem)] font-head font-extrabold leading-[0.95] tracking-[-0.045em]">
        Our <span className="text-tomato">menu</span>
      </h1>
      {/* useSearchParams inside ShopClient needs a Suspense boundary for the static export build */}
      <Suspense fallback={null}>
        <ShopClient products={products} moods={moods} />
      </Suspense>
    </div>
  );
}
