import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Providers } from "@/components/food/Providers";
import { FoodFooter } from "@/components/food/FoodFooter";
import { Nav } from "@/components/food/Nav";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Nomly — Good food, right on time",
  description: "Order from your favourite local kitchens and get hot, fresh food delivered in under 30 minutes.",
};

export const viewport: Viewport = { themeColor: "#fff6e8" };

export default function FoodLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${bricolage.variable} bg-paper font-sans text-crust`}>
      <Providers>
        <a href="#main" className="sr-only z-[110] rounded bg-tomato px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <FoodFooter />
      </Providers>
    </div>
  );
}
