import { asset } from "@/lib/utils";

export interface PosterItem {
  id: string;
  name: string;
  hindi: string;
  note: string;
  /** Placeholder pricing in ₹ — edit here, the poster updates. */
  price: number;
  unit: string;
  /** Looks for public/images/poster/<id>.jpg; falls back to the tinted slot if it's missing. */
  image: string;
  bg: string;
}

export const POSTER_ITEMS: PosterItem[] = [
  { id: "khajoor", name: "Khajoor", hindi: "खजूर", note: "Soft, naturally sweet dates", price: 199, unit: "250 g", image: asset("/images/poster/khajoor.jpg"), bg: "#7a3b1d" },
  { id: "nippaat", name: "Nippaat", hindi: "निप्पट", note: "Crisp, spiced rice crackers", price: 149, unit: "250 g", image: asset("/images/poster/nippaat.jpg"), bg: "#c9791f" },
  { id: "chakkli", name: "Chakkli", hindi: "चकली", note: "Golden, crunchy spirals", price: 179, unit: "250 g", image: asset("/images/poster/chakkli.jpg"), bg: "#a8321a" },
];
