# Vanilla Webpack + Tailwind v4 Template

A minimal starter template using Webpack and Tailwind CSS v4.1.5.

This project supports:

- Bundling Tailwind CSS via `@import "tailwindcss";`
- Bundling JavaScript modules via `import` keyword
- Asset loading (images etc.)
- Output to the docs/ folder for GitHub Pages deployment

📁 Project Structure

```
your-project/
 ├── src/
 │ ├── index.html
 │ ├── styles/
 │ │    └── main.css
 │ ├── js/
 │ │    ├── main.js
 │ │    └── sayHello.js
 │ └── assets/
 │      └── example.png
 ├── docs/ <-- Final output
 ├── package.json
 ├── postcss.config.js
 ├── webpack.config.js
```

🚀 Getting Started

1. Install dependencies `npm install`

2. Build the project `npm run build`

This will create a docs/ folder with:

`index.html`  
`main.css`  
`main.js`  
`assets/`

Ready for deployment (e.g. GitHub Pages).

3. Watch for changes (optional)  
   `npm run start`

🧩 Tailwind Notes
Uses Tailwind CSS v4+

```css
/* Tailwind is imported using: */
@import "tailwindcss";

/* Defaults and theme variables are set using: */
@theme {
  --default-padding: 1rem;
}
```
