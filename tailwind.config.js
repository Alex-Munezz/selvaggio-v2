/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#19352a",
        "deep-forest": "#0d1d17",
        gold: "#c8a45d",
        "gold-light": "#dfc27f",
        cream: "#f6f3ec",
        charcoal: "#171916",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};