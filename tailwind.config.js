module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    colors: {
      white: "#fff",
      "trans-white": "hsla(0,0%,100%,.8)",
      black: "#000",
      gray: "#ddd",
      "light-gray": "#eee",
      "dark-gray": "#888",
      blue: "#232C93",
      red: "#b00",
    },
    fontFamily: {
      sans: [
        "Nunito Sans",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
