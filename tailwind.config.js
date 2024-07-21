/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "jakarta-sans": "Plus Jakarta Sans",
      },
      colors: {
        Slate100: "#e3f3fd",
        Slate300: "#9abed5",
        Slate500: "#6b94a8",
        Slate700: "#4e6e7e",
        Slate900: "#122f3f",
        Lime: "#d7da2f",
        Red: "#d73328",
      },
    },
  },
  plugins: [],
};
