/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#19352A",
        "deep-forest": "#0D1D17",
        gold: "#C8A45D",
        "gold-light": "#DFC27F",
        cream: "#F6F3EC",
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