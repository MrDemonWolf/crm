/** @type {import('tailwindcss').Config} */

import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

module.exports = {
  content: [
    "components/**/*.vue",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "plugins/**/*.js",
    "nuxt.config.js",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [forms, typography, aspectRatio],
};
