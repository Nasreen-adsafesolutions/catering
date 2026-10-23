import { AppCta } from "@/components/food/AppCta";
import { Explore } from "@/components/food/Explore";
import { Hero } from "@/components/food/Hero";
import { HowItWorks } from "@/components/food/HowItWorks";
import { Popular } from "@/components/food/Popular";
import { Promo } from "@/components/food/Promo";
import { Reviews } from "@/components/food/Reviews";
import { getProducts, getReviews, getSiteContent, getSiteImages } from "@/lib/api";

export default async function Home() {
  const [products, reviews, content, images] = await Promise.all([getProducts(), getReviews(), getSiteContent(), getSiteImages()]);
  const featured = products.filter((p) => p.featured);
  const popular = (featured.length ? featured : products).slice(0, 4);
  const rating = products.length ? products.reduce((s, p) => s + p.rating, 0) / products.length : 5;

  return (
    <>
      <Hero content={content.hero} image={images.hero} product={popular[0]} rating={rating} whatsapp={content.business.whatsapp} />
      <Popular products={popular} />
      <Explore products={products} />
      {content.promo?.enabled !== false && <Promo content={content.promo} products={popular.slice(1)} />}
      <HowItWorks content={content.how} />
      <Reviews items={reviews} rating={rating} />
      <AppCta content={content.cta} phone={content.business.phone} whatsapp={content.business.whatsapp} />
    </>
  );
}
