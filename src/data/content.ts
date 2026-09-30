import type { Ingredient, Mood, Review, SocialPost } from "@/lib/types";

export const moods: Mood[] = [
  { id: "spicy", label: "Spicy", emoji: "🔥", blurb: "Heat that builds. Chilli, lime, sriracha and a little bit of danger.", color: "#5C2A22" },
  { id: "sweet", label: "Sweet", emoji: "🍫", blurb: "Caramel, cocoa and butter — the kind of sweet that earns a second handful.", color: "#7A5A2E" },
  { id: "salty", label: "Salty", emoji: "🧂", blurb: "Flaky, mineral, moreish. Salt done properly.", color: "#3E5560" },
  { id: "crunchy", label: "Crunchy", emoji: "🥜", blurb: "You'll hear these before you taste them. Maximum snap.", color: "#5C4530" },
  { id: "light", label: "Light", emoji: "🍿", blurb: "Airy, easy and endlessly snackable. Lighter on the tongue, not the flavour.", color: "#A38B55" },
  { id: "party", label: "Party", emoji: "🎉", blurb: "Big bags, bold flavours and plenty to go around.", color: "#8A6D35" },
];

export const ingredients: Omit<Ingredient, "image">[] = [
  { id: "chilli", name: "Chilli", description: "Sun-dried red chillies, slow-toasted and ground fresh for a clean, building heat.", profile: ["Smoky", "Fruity", "Warm"], kind: "chilli", bg: ["#5C2A22", "#1C1512"] },
  { id: "sea-salt", name: "Sea Salt", description: "Hand-harvested flakes that shatter on the tongue and lift every other flavour.", profile: ["Mineral", "Clean", "Bright"], kind: "salt", bg: ["#3E4A52", "#14191C"] },
  { id: "cocoa", name: "Cocoa", description: "Single-origin cocoa nibs and butter from small farms in Ecuador.", profile: ["Bitter", "Deep", "Roasted"], kind: "choc", bg: ["#4A3826", "#181209"] },
  { id: "peanuts", name: "Peanuts", description: "Plump runner peanuts, dry-roasted until golden and just-cracked crunchy.", profile: ["Toasty", "Buttery", "Earthy"], kind: "nut", bg: ["#4A4028", "#181509"] },
  { id: "almonds", name: "Almonds", description: "Whole California almonds, gently roasted for a sweet, woody snap.", profile: ["Sweet", "Woody", "Nutty"], kind: "almond", bg: ["#4A3E2A", "#18140C"] },
  { id: "caramel", name: "Caramel", description: "Butter caramel cooked low and slow in copper pots until deeply amber.", profile: ["Buttery", "Burnt sugar", "Rich"], kind: "caramel", bg: ["#5C4B2E", "#1C1712"] },
  { id: "corn", name: "Corn", description: "Heritage kernels grown for flavour: golden, sweet and made to pop.", profile: ["Sweet", "Grassy", "Golden"], kind: "corn", bg: ["#6B5A28", "#20190C"] },
  { id: "spices", name: "Spices", description: "Smoked paprika, cumin, garlic and pepper, blended in-house every week.", profile: ["Smoky", "Earthy", "Aromatic"], kind: "spice", bg: ["#5C3A22", "#1C130A"] },
];

export const reviews: Review[] = [
  { id: "r1", quote: "The chilli-lime flavour disappeared in about five minutes.", name: "Maya R.", city: "Manchester", product: "Chilli Lime Nuts", rating: 5 },
  { id: "r2", quote: "Finally, a snack box worth sharing… although I didn't.", name: "Jonas K.", city: "Bristol", product: "Movie Night Snack Box", rating: 5 },
  { id: "r3", quote: "The crunch is seriously addictive.", name: "Priya S.", city: "London", product: "Smoky BBQ Crunch", rating: 5 },
  { id: "r4", quote: "Caramel popcorn that actually tastes like caramel. Unreal.", name: "Tom B.", city: "Leeds", product: "Caramel Sea Salt Popcorn", rating: 5 },
  { id: "r5", quote: "Fiery Nachos are properly hot. I'm not complaining.", name: "Aisha M.", city: "Glasgow", product: "Fiery Nacho Chips", rating: 4 },
];

export const socialPosts: Omit<SocialPost, "image">[] = [
  { id: "s1", title: "Friends sharing snacks", caption: "Sunday sharing session. Nobody counted.", handle: "@lena.eats",
    art: { bg: ["#5C4B2E", "#1C1712"], accent: "#8A6D35", kinds: ["popcorn", "chip", "choc"] } },
  { id: "s2", title: "Movie night", caption: "Lights down, volume up, snacks out.", handle: "@cinema.club",
    art: { bg: ["#2E2620", "#100D0B"], accent: "#6B4A32", kinds: ["popcorn", "caramel", "choc"] } },
  { id: "s3", title: "Road trip", caption: "Glovebox essentials, sorted.", handle: "@roadtripping",
    art: { bg: ["#3E4A52", "#14191C"], accent: "#8A6D35", kinds: ["chip", "nut", "salt"] } },
  { id: "s4", title: "Office snacks", caption: "The 3pm desk drawer, upgraded.", handle: "@deskside",
    art: { bg: ["#4A4028", "#181509"], accent: "#7A8A52", kinds: ["almond", "nut", "cookie"] } },
  { id: "s5", title: "Picnic", caption: "Blanket, sun, and an unreasonable amount of nuts.", handle: "@parkdays",
    art: { bg: ["#5C5142", "#1E1A15"], accent: "#B8945A", kinds: ["cookie", "nut", "corn"] } },
  { id: "s6", title: "Party table", caption: "The bowls empty first. Every time.", handle: "@houseparty",
    art: { bg: ["#5C2A22", "#1C1512"], accent: "#9C4A3C", kinds: ["chip", "chilli", "popcorn"] } },
];

export const infoPages: Record<string, { title: string; intro: string; sections: { h: string; p: string }[] }> = {
  about: {
    title: "About Crunch & Co.",
    intro: "We make bold, properly delicious snacks for every craving — and every moment worth sharing.",
    sections: [
      { h: "How it started", p: "Crunch & Co. began in a home kitchen with one stubborn idea: snacks shouldn't be an afterthought. We're a small, independent start-up and every batch is still made by hand." },
      { h: "What we care about", p: "Real ingredients, small batches, honest packaging and flavour that makes you look up from your phone." },
    ],
  },
  contact: {
    title: "Contact",
    intro: "Questions, collabs or a flavour idea? We read everything.",
    sections: [
      { h: "Customer care", p: "hello@crunchandco.example — we reply within one working day." },
      { h: "Wholesale", p: "wholesale@crunchandco.example for cafés, offices and retailers." },
    ],
  },
  faqs: {
    title: "FAQs",
    intro: "Quick answers to the things people ask most.",
    sections: [
      { h: "Are your snacks vegan?", p: "Most are. Each product page lists ingredients and allergens clearly." },
      { h: "How long do they stay fresh?", p: "At least six months sealed. Once opened, snack within a week (we know, we know)." },
      { h: "Can I build a mixed box?", p: "Yes — use the Build Your Own Snack Box section on the home page." },
    ],
  },
  shipping: {
    title: "Shipping",
    intro: "Fast, tracked delivery across the UK.",
    sections: [
      { h: "Delivery times", p: "Standard delivery is 2–4 working days. Express is next working day if ordered before 2pm." },
      { h: "Free shipping", p: "Free standard delivery on orders over £25." },
    ],
  },
  returns: {
    title: "Returns",
    intro: "If something isn't right, we'll make it right.",
    sections: [
      { h: "Damaged or wrong item", p: "Email us a photo within 14 days and we'll send a replacement or refund." },
      { h: "Changed your mind?", p: "Unopened items can be returned within 14 days of delivery." },
    ],
  },
  privacy: {
    title: "Privacy",
    intro: "We keep your data simple and safe.",
    sections: [
      { h: "What we collect", p: "Only what we need to fulfil your order and, if you opt in, send the Snack Club newsletter." },
      { h: "Your choices", p: "You can request a copy or deletion of your data at any time." },
    ],
  },
  terms: {
    title: "Terms",
    intro: "The small print, kept short.",
    sections: [
      { h: "Using the site", p: "This is a demo storefront with mock products. Nothing here is a real offer for sale." },
      { h: "Pricing", p: "Prices are in GBP and include VAT where applicable." },
    ],
  },
};
