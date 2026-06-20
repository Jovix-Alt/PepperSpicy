# Pepper Spicy Restaurant — Vanilla HTML/CSS/JS

A static, dependency-free version of the restaurant site. No build step. No framework.

## Files

```
pepper-spicy-vanilla/
├── index.html       Page structure & all sections
├── styles.css       Design system (colors, fonts, animations)
├── menu.js          Restaurant info + full menu data (EDIT THIS)
├── app.js           Renders menu, search, scroll animations
└── assets/          Food photos + chili icon
```

## Run it

Just open `index.html` in a browser. Or serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Deploy anywhere static: Netlify, Vercel, GitHub Pages, S3, your own server.

## Edit prices / menu items

Open `menu.js`. Each category is an object with `id`, `title`, optional `tagline`, and `items`. Edit names and prices — the page re-renders on reload.

```js
{ id: "biriyani", title: "Biriyani Corner", items: [
  { name: "Malabar Dum Biriyani", price: "13" },
  ...
]}
```

Restaurant name, phones, hours, address all live in the `restaurant` object at the top of `menu.js`.

## Edit theme colors

Open `styles.css` → `:root`. Change four tokens to retheme the whole site:

```css
--spice:    oklch(0.58 0.24 22);   /* primary red */
--saffron:  oklch(0.84 0.18 88);   /* accent yellow */
--charcoal: oklch(0.18 0.02 30);   /* dark sections */
--cream:    oklch(0.97 0.02 80);   /* background */
```

## Swap images

Replace files in `assets/` keeping the same filenames, or update the `src=` paths in `index.html`.

## Animations

- CSS keyframes: `flicker` (chili), `spin` (hero ring), `marquee` (bottom strip), `fadeUp` (scroll-reveal).
- Scroll-reveal uses `IntersectionObserver` in `app.js` — add the class `reveal` to any element to animate it in.
