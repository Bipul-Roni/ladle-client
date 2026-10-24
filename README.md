# Ladle — a shared recipe book

Ladle is a recipe book for home cooks: save your own dishes, discover what others cook, and like the recipes you love. The most-liked recipes rise to the home page.

**Live site:** https://your-ladle-site.netlify.app
**Server repo:** https://github.com/your-username/ladle-server

## Features

- **Email and Google login** with Firebase, password rules (uppercase, lowercase, 6+ characters) and friendly error toasts.
- **Add, update and delete your recipes** — image, ingredients, instructions, cuisine, prep time and categories; updates happen in a modal.
- **Top recipes on the home page** — the six most-liked recipes, fetched with MongoDB `sort` + `limit`.
- **Like any recipe except your own**, as many times as you want, with a live “people interested” count on the details page.
- **Filter All Recipes by cuisine** (Italian, Mexican, Indian, Chinese, Others) with a shareable URL.
- **Private routes that survive a reload** — logged-in users stay put; logged-out users go to login and return where they started.
- **Dark and light themes**, fully responsive from phone to desktop, with a custom food-themed 404 page.

## Built with

React, React Router, Tailwind CSS, Firebase Auth, Swiper, React Toastify, SweetAlert2, Lottie React, React Simple Typewriter, React Awesome Reveal, React Tooltip.

## Run locally

```bash
npm install
cp .env.example .env.local   # add Firebase keys and VITE_API_URL
npm run dev
```

## Deploy

- **Netlify:** `npm run build`, deploy `dist/` (`public/_redirects` handles route reloads).
- **Firebase Hosting:** `npm run build && firebase deploy` (`firebase.json` rewrites every route to `index.html`).
- **Surge:** `npm run build && cp dist/index.html dist/200.html && surge dist`.

Add your live domain under Firebase Console → Authentication → Settings → Authorized domains.
