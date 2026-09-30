export type PieceKind =
  | "chip"
  | "popcorn"
  | "nut"
  | "almond"
  | "choc"
  | "chilli"
  | "salt"
  | "cookie"
  | "corn"
  | "caramel"
  | "spice";

export type MoodId = "spicy" | "sweet" | "salty" | "crunchy" | "light" | "party";

export type Category =
  | "Chips"
  | "Nachos"
  | "Popcorn"
  | "Nuts"
  | "Chocolate"
  | "Cookies"
  | "Granola"
  | "Trail Mix"
  | "Boxes";

/** Drives the designed fallback artwork shown until a real photo exists. */
export interface ArtSpec {
  bg: [string, string];
  accent: string;
  kinds: PieceKind[];
  label?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** GBP */
  price: number;
  rating: number;
  reviewCount: number;
  category: Category;
  moods: MoodId[];
  ingredients: string[];
  weight: string;
  badge?: string;
  featured?: boolean;
  /** 1–5 */
  notes: { crunch: number; heat: number; sweetness: number };
  /** Resolved from /public/images automatically — see IMAGES.md */
  image?: string;
  art: ArtSpec;
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  profile: string[];
  kind: PieceKind;
  bg: [string, string];
  image?: string;
}

export interface Mood {
  id: MoodId;
  label: string;
  emoji: string;
  blurb: string;
  color: string;
}

export interface Review {
  id: string;
  quote: string;
  name: string;
  city: string;
  product: string;
  rating: number;
}

export interface SocialPost {
  id: string;
  title: string;
  caption: string;
  handle: string;
  art: ArtSpec;
  image?: string;
}

export interface CartLine {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  art?: ArtSpec;
  slug?: string;
  note?: string;
}
