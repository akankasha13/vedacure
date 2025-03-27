/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      body: ['"Roboto"', "sans-serif"],
      mono: ['"Roboto Mono"', "monospace"],
      script: ['"Dancing Script"', "cursive"],
    },
    extend: {
      colors: {
        primary: "#1f2937",
      },
    },
  },
  plugins: [],
};
