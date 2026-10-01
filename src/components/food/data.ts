export type CategoryId = "burgers" | "italian" | "asian" | "healthy" | "sweet";

export interface Dish {
  id: string;
  name: string;
  place: string;
  price: number;
  rating: number;
  minutes: number;
  image: string;
  tag?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  category: CategoryId;
  rating: number;
  reviews: string;
  minutes: string;
  fee: string;
  image: string;
}

const img = (name: string) => `/images/food/${name}.jpg`;

export const DISHES: Dish[] = [
  { id: "smash", name: "Double Smash Burger", place: "Alley Grill", price: 13.5, rating: 4.9, minutes: 22, image: img("burger"), tag: "Bestseller" },
  { id: "marg", name: "Wood-fired Margherita", place: "Forno Rosso", price: 15, rating: 4.8, minutes: 28, image: img("pizza") },
  { id: "ramen", name: "Spicy Prawn Ramen", place: "Kuro Noodle Bar", price: 14.25, rating: 4.9, minutes: 25, image: img("ramen"), tag: "New" },
  { id: "bowl", name: "Rainbow Harvest Bowl", place: "Green Table", price: 12, rating: 4.7, minutes: 18, image: img("bowl") },
];

export const CATEGORIES: { id: CategoryId | "all"; label: string; image: string }[] = [
  { id: "all", label: "All", image: img("bbq") },
  { id: "burgers", label: "Burgers", image: img("burger3") },
  { id: "italian", label: "Italian", image: img("pizza3") },
  { id: "asian", label: "Asian", image: img("sushi") },
  { id: "healthy", label: "Healthy", image: img("bowl2") },
  { id: "sweet", label: "Sweet", image: img("cake") },
];

export const RESTAURANTS: Restaurant[] = [
  { id: "r1", name: "Alley Grill", cuisine: "Smash burgers · Fries", category: "burgers", rating: 4.9, reviews: "2.1k", minutes: "15–25", fee: "Free delivery", image: img("fries-burger") },
  { id: "r2", name: "Forno Rosso", cuisine: "Neapolitan pizza", category: "italian", rating: 4.8, reviews: "1.8k", minutes: "25–35", fee: "$1.50 delivery", image: img("pizza2") },
  { id: "r3", name: "Kuro Noodle Bar", cuisine: "Ramen · Sushi", category: "asian", rating: 4.9, reviews: "3.4k", minutes: "20–30", fee: "Free delivery", image: img("ramen") },
  { id: "r4", name: "Green Table", cuisine: "Bowls · Salads", category: "healthy", rating: 4.7, reviews: "980", minutes: "15–20", fee: "$0.99 delivery", image: img("bowl2") },
  { id: "r5", name: "Honey & Flour", cuisine: "Pancakes · Cakes", category: "sweet", rating: 4.8, reviews: "1.2k", minutes: "20–30", fee: "Free delivery", image: img("pancakes") },
  { id: "r6", name: "Smoke & Fire BBQ", cuisine: "Grill · Burgers", category: "burgers", rating: 4.6, reviews: "760", minutes: "30–40", fee: "$2.00 delivery", image: img("bbq") },
  { id: "r7", name: "Pasta Pronto", cuisine: "Fresh pasta", category: "italian", rating: 4.7, reviews: "1.1k", minutes: "25–35", fee: "Free delivery", image: img("pasta") },
  { id: "r8", name: "Sakura Rolls", cuisine: "Sushi · Poke", category: "asian", rating: 4.8, reviews: "2.6k", minutes: "25–35", fee: "$1.99 delivery", image: img("sushi") },
  { id: "r9", name: "Leaf & Co.", cuisine: "Caesar · Grain bowls", category: "healthy", rating: 4.6, reviews: "640", minutes: "15–25", fee: "Free delivery", image: img("caesar") },
  { id: "r10", name: "Crumb Society", cuisine: "Cakes · Brunch", category: "sweet", rating: 4.9, reviews: "890", minutes: "20–30", fee: "$1.50 delivery", image: img("cake") },
  { id: "r11", name: "Bun Theory", cuisine: "Gourmet burgers", category: "burgers", rating: 4.8, reviews: "1.5k", minutes: "20–30", fee: "Free delivery", image: img("burger2") },
  { id: "r12", name: "Slice Club", cuisine: "Pizza by the slice", category: "italian", rating: 4.5, reviews: "520", minutes: "15–25", fee: "$0.99 delivery", image: img("pizza3") },
];

export const REVIEWS = [
  { name: "Maya R.", role: "Orders twice a week", color: "bg-tomato", text: "Hot, on time, and the courier even texted when they were outside. It's the only app I open when I'm hungry." },
  { name: "Daniel K.", role: "Night-shift nurse", color: "bg-basil", text: "3am ramen that actually arrives warm. The live tracking is accurate to the minute — genuinely impressive." },
  { name: "Priya S.", role: "Working from home", color: "bg-crust", text: "I switched from the big apps for the restaurants alone. Smaller kitchens, better food, no weird fees." },
];
