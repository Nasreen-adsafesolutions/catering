import { BoxBuilder } from "@/components/sections/BoxBuilder";
import { BrandStory } from "@/components/sections/BrandStory";
import { Featured } from "@/components/sections/Featured";
import { Hero } from "@/components/sections/Hero";
import { MoodPicker } from "@/components/sections/MoodPicker";
import { Reviews } from "@/components/sections/Reviews";
import { getFeaturedProducts, getMoods, getProducts, getReviews, getSiteImages } from "@/lib/api";

export default async function Home() {
  const [featured, products, moods, reviews, images] = await Promise.all([
    getFeaturedProducts(), getProducts(), getMoods(), getReviews(), getSiteImages(),
  ]);
  return (
    <>
      <Hero image={images.hero} />
      <Featured products={featured} />
      <MoodPicker moods={moods} products={products} />
      <BoxBuilder products={products} />
      <Reviews items={reviews} />
      <BrandStory image={images.story} />
    </>
  );
}
