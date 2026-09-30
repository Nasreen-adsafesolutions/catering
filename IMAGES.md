# Image system

Every image slot renders **designed SVG artwork** until a real file exists. To swap in
photography, drop a file in `public/images/` using the key below (`avif`, `webp`, `jpg`, `jpeg`
or `png`). No code changes — `src/lib/images.ts` finds it and the UI switches over
(restart `next dev` / rebuild to pick up new files).

| Slot | File key | Format / style |
| --- | --- | --- |
| Hero | `hero` | 16:9+, ≥2400px. Full-bleed studio scene |
| Brand story | `story` | 4:5, lifestyle — people sharing snacks |
| Products (12) | `products/<slug>` | Square, **transparent PNG/WebP cut-out** (rendered over a tinted backdrop) |
| Ingredients (8) | `ingredients/<id>` | 3:4 macro. ids: `chilli sea-salt cocoa peanuts almonds caramel corn spices` |
| Social (6) | `social/s1` … `social/s6` | Square/portrait lifestyle. s1 friends, s2 movie night, s3 road trip, s4 office, s5 picnic, s6 party table |

Product slugs: `smoky-bbq-crunch`, `fiery-nacho-chips`, `himalayan-salt-popcorn`,
`chilli-lime-nuts`, `double-chocolate-bites`, `caramel-sea-salt-popcorn`, `brown-butter-cookies`,
`peanut-butter-granola-bites`, `sriracha-honey-trail-mix`, `sour-cream-chive-chips`,
`dark-choc-sea-salt-shards`, `movie-night-snack-box`.

## Suggested prompt base (keeps the set consistent)

> Premium commercial food photography, warm cream studio backdrop, single dramatic key light from
> the upper left with soft rim light, shallow depth of field, realistic crumbs and seasoning
> particles, ultra-detailed textures, appetising, no text, no logos. Subject: …

- **Hero:** crispy chips, popcorn, chocolate pieces, nuts, chilli/spices and an orange matte snack bag, mid-air crumbs.
- **Products:** the bag/box plus its contents, isolated on a plain background, then remove the background.
- **Ingredients:** extreme macro of the single ingredient filling the frame.
- **Lifestyle:** natural, candid, warm evening light; shot like an editorial campaign, faces optional.
