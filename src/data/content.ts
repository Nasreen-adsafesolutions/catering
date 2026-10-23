import type { Ingredient, Mood, Review, SocialPost } from "@/lib/types";

export const moods: Mood[] = [
  { id: "spicy", label: "Spicy & Hot", emoji: "🔥", blurb: "Crisp chicken cutlets, savoury rolls, and golden samosas bursting with aroma.", color: "#5C2A22" },
  { id: "sweet", label: "Traditional Sweets", emoji: "🍯", blurb: "Ghee-rich thekua, sweet halwa puri, authentic karjekayi, and melt-in-mouth obbattu.", color: "#7A5A2E" },
  { id: "salty", label: "Savoury & Namkeen", emoji: "🧂", blurb: "Spiral crunchy chakli and tempered cornflakes chivda made with pure spices.", color: "#3E5560" },
  { id: "crunchy", label: "Maximum Crunch", emoji: "✨", blurb: "Deep-fried golden thekua, crispy murukku, and blistered spring rolls.", color: "#5C4530" },
  { id: "light", label: "Teatime Light", emoji: "☕", blurb: "Delicate chivda and warm obbattu perfect beside a steaming cup of chai.", color: "#A38B55" },
  { id: "party", label: "Family & Party", emoji: "🎉", blurb: "Platters of cutlets, samosas, rolls, and assorted festival sweet boxes.", color: "#8A6D35" },
];

export const ingredients: Omit<Ingredient, "image">[] = [
  { id: "pure-ghee", name: "Pure Desi Ghee", description: "Traditional churned ghee for the richest aroma and golden flaky crusts.", profile: ["Rich", "Nutty", "Aromatic"], kind: "caramel", bg: ["#5C4B2E", "#1C1712"] },
  { id: "organic-jaggery", name: "Organic Jaggery", description: "Unrefined mineral-rich sugarcane jaggery that gives sweet thekua and obbattu its soul.", profile: ["Earthy", "Caramel", "Sweet"], kind: "cookie", bg: ["#4A3826", "#181209"] },
  { id: "fennel-cardamom", name: "Cardamom & Fennel", description: "Whole green cardamom pods and sweet saunf ground fresh into sweet fillings.", profile: ["Fragrant", "Floral", "Sweet"], kind: "spice", bg: ["#5C3A22", "#1C130A"] },
  { id: "roasted-peanuts", name: "Roasted Peanuts", description: "Golden roasted runner peanuts tossed generously throughout our corn flakes chivda.", profile: ["Nutty", "Crunchy", "Toasty"], kind: "nut", bg: ["#4A4028", "#181509"] },
  { id: "curry-leaves", name: "Curry Leaves", description: "Fresh garden curry leaves flash-fried in oil for that unmistakable south Indian aroma.", profile: ["Herbal", "Citrus", "Crisp"], kind: "chilli", bg: ["#3E4A32", "#151912"] },
  { id: "ajwain-cumin", name: "Ajwain & Cumin", description: "Carom seeds and roasted jeera infused into chakli dough for ease of digestion and snap.", profile: ["Pungent", "Warm", "Digestive"], kind: "salt", bg: ["#3E4A52", "#14191C"] },
  { id: "coconut", name: "Desiccated Coconut", description: "Freshly grated and roasted dry coconut powering the luxurious filling of karjekayi.", profile: ["Sweet", "Nutty", "Tropical"], kind: "almond", bg: ["#4A3E2A", "#18140C"] },
  { id: "corn-flakes", name: "Golden Corn Flakes", description: "Crispy flakes that remain shatteringly crunchy when tossed with mustard seeds and turmeric.", profile: ["Crunchy", "Golden", "Light"], kind: "corn", bg: ["#6B5A28", "#20190C"] },
];

export const reviews: Review[] = [
  { id: "r1", quote: "The Fried Khajoor Thekua is just like my grandmother made back in Bihar. Pure ghee aroma and perfect snap.", name: "Ananya S.", city: "Bengaluru", product: "Fried Khajoor (Thekua)", rating: 5 },
  { id: "r2", quote: "Crispy Corn Flakes Chivda is our daily teatime staple now. Perfectly seasoned and not oily at all.", name: "Rajesh K.", city: "Hyderabad", product: "Crispy Corn Flakes Chivda", rating: 5 },
  { id: "r3", quote: "The chicken cutlets and rolls were a super hit at our house party! Ordered the frozen packs.", name: "Farhan M.", city: "Mumbai", product: "Chicken Cutlet", rating: 5 },
  { id: "r4", quote: "Karjekayi and Obbattu brought back childhood festival memories. Soft, generous filling and pure ingredients.", name: "Deepa N.", city: "Pune", product: "Obbattu (Holige / Puran Poli)", rating: 5 },
  { id: "r5", quote: "Best samosas and chakli we've ever ordered online. Truly authentic homemade flavour.", name: "Vikram P.", city: "Delhi NCR", product: "Samosa (Veg / Non-Veg)", rating: 5 },
];

export const socialPosts: Omit<SocialPost, "image">[] = [
  { id: "s1", title: "Sunday Teatime", caption: "Hot chai and freshly fried corn flakes chivda.", handle: "@chai.and.snacks",
    art: { bg: ["#5C4B2E", "#1C1712"], accent: "#B85D2A", kinds: ["corn", "nut", "spice"] } },
  { id: "s2", title: "Festival Platter", caption: "Sweet Obbattu and crisp Karjekayi ready for celebrations.", handle: "@festive.table",
    art: { bg: ["#2E2620", "#100D0B"], accent: "#D49D42", kinds: ["cookie", "caramel", "almond"] } },
  { id: "s3", title: "Evening Cravings", caption: "Crispy hot chicken cutlets straight from the pan.", handle: "@eveningcravings",
    art: { bg: ["#3E4A52", "#14191C"], accent: "#B85D2A", kinds: ["chip", "chilli", "spice"] } },
  { id: "s4", title: "Office Snack Jar", caption: "Chakli spirals that vanish within 10 minutes of opening.", handle: "@desksnacker",
    art: { bg: ["#4A4028", "#181509"], accent: "#D89F3A", kinds: ["chip", "salt", "spice"] } },
  { id: "s5", title: "Handcrafted With Care", caption: "Rolling sweet thekua with traditional wooden moulds.", handle: "@grandmas.recipes",
    art: { bg: ["#5C5142", "#1E1A15"], accent: "#B85D2A", kinds: ["cookie", "caramel", "nut"] } },
  { id: "s6", title: "Party Snacks Platter", caption: "Samosas and spring rolls for weekend get-togethers.", handle: "@weekendgatherings",
    art: { bg: ["#5C2A22", "#1C1512"], accent: "#C4552A", kinds: ["chip", "chilli", "corn"] } },
];

export const infoPages: Record<string, { title: string; intro: string; sections: { h: string; p: string }[] }> = {
  about: {
    title: "About Our Homemade Kitchen",
    intro: "Authentic, handcrafted delicacies made right at home with pure ingredients and traditional recipes.",
    sections: [
      { h: "How it started", p: "We began in our home kitchen with simple family recipes passed down over generations. No preservatives, no industrial shortcuts—just honest food prepared with patience and love." },
      { h: "Pure ingredients", p: "We use 100% pure desi ghee, organic jaggery, fresh hand-pounded spices, and cold-pressed oils. Every batch is made in small quantities to ensure unbeatable freshness." },
    ],
  },
  contact: {
    title: "Contact & Custom Orders",
    intro: "Have a party order, festival inquiry, or custom box requirement? Get in touch with our kitchen.",
    sections: [
      { h: "Home Kitchen Orders", p: "WhatsApp & Call: +91 98765 43210 — we take fresh daily and pre-orders." },
      { h: "Bulk & Catering", p: "orders@zaikaghar.example for festivals, weddings, and office gatherings." },
    ],
  },
  faqs: {
    title: "Frequently Asked Questions",
    intro: "Everything you need to know about our fresh homemade items, storage, and delivery.",
    sections: [
      { h: "Are items freshly made?", p: "Yes! All sweets, chivda, and snacks are prepared in small batches upon order to ensure maximum crispness and flavour." },
      { h: "How do the frozen items work?", p: "Items like Cutlets, Rolls, and Samosas can be delivered either freshly fried and hot, or frozen with easy 5-minute air-fry/deep-fry instructions." },
      { h: "How long do the sweets and chivda stay fresh?", p: "Thekua and Karjekayi stay fresh in airtight containers for up to 30 days. Chivda stays crisp for 45 days. Obbattu is best enjoyed within 3–4 days." },
    ],
  },
  shipping: {
    title: "Delivery & Packaging",
    intro: "Delivered fresh to your doorstep in food-grade, airtight packaging.",
    sections: [
      { h: "Local Delivery", p: "Same-day and next-day delivery across the city. Free delivery on orders above ₹500." },
      { h: "Packaging", p: "Eco-friendly, multi-layer sealed boxes to preserve crunch and prevent breakage." },
    ],
  },
  returns: {
    title: "Quality Guarantee",
    intro: "Your satisfaction is our kitchen's priority.",
    sections: [
      { h: "Freshness Promise", p: "If any item does not meet your expectations in freshness or taste, notify us within 24 hours for a full replacement or refund." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "We respect your personal information and only use it to deliver your orders.",
    sections: [
      { h: "Data Security", p: "Your contact details and delivery addresses are never shared with third parties." },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "Simple, honest service terms.",
    sections: [
      { h: "Orders", p: "Orders are prepared fresh. Please allow reasonable notice for large festival quantities." },
    ],
  },
};
