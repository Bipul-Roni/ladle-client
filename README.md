# 🥄 Ladle — A Shared Recipe Book

Ladle is a recipe book for home cooks. Save your own dishes, discover what other people cook, and like the recipes you love. The most-liked recipes rise to the top of the home page.

**🔗 Live site:** https://ladle-client.netlify.app
**🖥️ Server repository:** https://github.com/Bipul-Roni/ladle-server

## ✨ Features

- **Secure login and registration** — sign up with email and password or continue with Google, powered by Firebase Authentication. Passwords must include an uppercase letter, a lowercase letter and at least 6 characters.
- **Add, update and delete your own recipes** — every recipe stores an image, ingredients, instructions, cuisine type, preparation time and categories. Updates happen in a modal without leaving the page.
- **Top recipes on the home page** — the six most-liked recipes are fetched from MongoDB using `sort` and `limit` and shown in a three-column grid.
- **Like system with a live counter** — users can like any recipe as many times as they want, except their own, and the details page shows how many people are interested.
- **Filter recipes by cuisine** — narrow the All Recipes page to Italian, Mexican, Indian, Chinese or Others with a dropdown.
- **Protected private routes** — Add Recipe, My Recipes and Recipe Details need login, and logged-in users stay on their page after a reload.
- **Dark and light themes** — switch themes from the navbar; the choice is remembered on your device.
- **Fully responsive design** — built to work on mobile, tablet and desktop, with a custom food-themed 404 page.

## 🛠️ Built With

React · React Router · Tailwind CSS · Firebase Authentication · Swiper · React Toastify · SweetAlert2 · Lottie React · React Simple Typewriter · React Awesome Reveal · React Tooltip

## 🚀 Run Locally

```bash
git clone https://github.com/Bipul-Roni/ladle-client.git
cd ladle-client
npm install
# create .env.local with your Firebase keys and VITE_API_URL (see .env.example)
npm run dev
```
