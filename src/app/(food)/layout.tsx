import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Providers } from "@/components/food/Providers";
import { FoodFooter } from "@/components/food/FoodFooter";
import { Nav } from "@/components/food/Nav";
import { getSiteContent } from "@/lib/api";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const { business } = await getSiteContent();
  const name = business.name || "Zaika Ghar";
  return {
    title: { default: `${name} — Homemade sweets, snacks & catering`, template: `%s · ${name}` },
    description: "Authentic homemade sweets, namkeen, cutlets and party platters, made fresh to order.",
  };
}

export const viewport: Viewport = { themeColor: "#fff6e8" };

export default async function FoodLayout({ children }: { children: React.ReactNode }) {
  const { business, announcement } = await getSiteContent();
  return (
    <div className={`${bricolage.variable} bg-paper font-sans text-crust`}>
      <Providers>
        <a href="#main" className="sr-only z-[110] rounded bg-tomato px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        {announcement?.enabled && announcement.text && (
          <p className="relative z-[60] bg-crust px-4 py-2 text-center text-sm font-semibold text-butter">{announcement.text}</p>
        )}
        <Nav name={business.name} />
        <main id="main">{children}</main>
        <FoodFooter />
      </Providers>
    </div>
  );
}
