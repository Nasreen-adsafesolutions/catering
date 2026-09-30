# CRUNCH & CO.

Premium snack-brand storefront. Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion.

```bash
npm run dev      # http://localhost:3000
npm run build && npm start
```

> Node 18 is supported (hence Next 15 / Tailwind 4.1). On Node ≥ 20 you can upgrade both.

## Structure

```
src/
  app/                 routes: / · /shop · /product/[slug] · /[page] (about, faqs, …)
  components/
    art/               procedural SVG snacks + <SnackImage> (photo-or-artwork slot)
    layout/            Header, CartDrawer, SearchDialog, Footer, providers
    sections/          one file per homepage section
    shop/              ProductCard, AddToCart, quantity control, shop filters
    ui/                Button, Magnetic, SplitText, Stars, NewsletterForm
  context/             CartContext (persisted) · ToastContext
  data/                mock products + editorial content
  lib/api.ts           async data layer — swap bodies for CMS/API calls
  lib/images.ts        resolves /public/images/<key>.* → real photo, else artwork
```

## Swapping in real data

All data flows through `src/lib/api.ts` (`getProducts`, `getIngredients`, …). Each returns plain
serialisable objects typed in `src/lib/types.ts`, so pointing them at a CMS/API changes nothing
else. Prices, categories, moods, ingredients and images are all fields on those types.

## Images

See [IMAGES.md](./IMAGES.md). Drop photography into `public/images/` and it replaces the built-in
artwork automatically.

## Motion

Kept deliberately light: simple fade/fade-up reveals on scroll (Framer Motion `whileInView`, once
each), a couple of short user-triggered springs (cart, toasts, size picker), and one CSS keyframe
(`animate-float`) for a handful of decorative pieces. Scrolling is native (no smooth-scroll
library) — it's cheaper and already smooth by default. The marquee is pure CSS
(`.marquee-track` in `globals.css`), so it costs nothing on the main thread. There are no
scroll-scrubbed or pinned sections and no per-frame JavaScript loops anywhere in the app.
`MotionConfig reducedMotion="user"` makes every animation respect `prefers-reduced-motion`
automatically; the magnetic button effect only runs on fine pointers (mouse), never touch.
