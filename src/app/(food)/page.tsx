import { AppCta } from "@/components/food/AppCta";
import { Explore } from "@/components/food/Explore";
import { Hero } from "@/components/food/Hero";
import { HowItWorks } from "@/components/food/HowItWorks";
import { Popular } from "@/components/food/Popular";
import { Promo } from "@/components/food/Promo";
import { Reviews } from "@/components/food/Reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <Popular />
      <Explore />
      <Promo />
      <HowItWorks />
      <Reviews />
      <AppCta />
    </>
  );
}
