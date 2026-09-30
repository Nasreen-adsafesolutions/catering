import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCartBar } from "@/components/layout/MobileCartBar";
import { Providers } from "@/components/layout/Providers";
import { getProducts } from "@/lib/api";
import "./globals.css";

const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Crunch & Co. — The snack cupboard", template: "%s · Crunch & Co." },
  description: "Bold flavours, irresistible crunch, and artisanal snacks made for every craving. Small-batch chips, popcorn, spiced nuts, chocolate and custom snack boxes.",
};

export const viewport: Viewport = { themeColor: "#FAF7F2" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await getProducts();
  return (
    <html lang="en" className={`${sans.variable} ${fraunces.variable}`}>
      <body>
        <Providers>
          <a href="#main" className="sr-only z-[110] rounded bg-orange px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
            Skip to content
          </a>
          <Header products={products} />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileCartBar />
        </Providers>
      </body>
    </html>
  );
}
