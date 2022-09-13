/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      md: {max: '800px'},
      sm: {max: '414px'}
    },
    colors: {
      white: "#FFFFFF",
      darkgreen: "#345C45",
      lightgrey: "#F3F3F3",
      grey: "#E2DFDF",
      black: "#323232",

      lightgreen: "#BBF1D1",
      pitch: "#F9B353",
      lemongreen: "#97A92E",
      purple: "#9452A1",
    },
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
    },

    screens: {
      sm: { max: "414px" },
      md: { max: "800px" },
    },

  },
  plugins: [],
};
