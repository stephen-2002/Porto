/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E53935",
          blue: "#A9C1D9",
          ink: "#1A1A1A",
          cream: "#F4F1EA",
          sand: "#EAE4D3",
          paper: "#FFFDFC",
        },
      },
      fontFamily: {
        display: ["'Archivo Black'", "sans-serif"],
        accent: ["'Dancing Script'", "cursive"],
        body: ["'DM Sans'", "sans-serif"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
      },
    },
  },
  plugins: [],
};
