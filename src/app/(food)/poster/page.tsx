import type { Metadata } from "next";
import { Poster } from "@/components/food/Poster";

export const metadata: Metadata = { title: "Our Homemade Favourites — Zaika Ghar" };

export default function PosterPage() {
  return <Poster />;
}
