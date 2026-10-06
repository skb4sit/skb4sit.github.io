# Basit's portfolio

A responsive static portfolio built with HTML, JavaScript, and locally compiled Tailwind CSS. No CDN is required for styling. The committed CSS lets GitHub Pages serve the site directly.

## Local development

From this directory:

```sh
npm ci
npm run build
python3 -m http.server 8000 --bind 127.0.0.1
```

Run `npm run dev` in another terminal to rebuild styles while editing. Content lives in `index.html`, interactions in `script.js`, and custom styles in `assets/input.css`. Commit the regenerated `assets/styles.css` after changes to Tailwind classes or custom styles.

Project and certification links come from the supplied resume. The small project illustrations are decorative representations, not screenshots of the live apps.

The header offers light, dark, and system appearance. The selection is saved locally; system mode follows device changes. `theme.js` applies it before the stylesheet loads. Anchor navigation scrolls smoothly unless the visitor prefers reduced motion. The ASCII profile and SVG cloud footer need no external assets.
