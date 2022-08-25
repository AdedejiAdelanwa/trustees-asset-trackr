/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#ffffff',
      darkgreen: '#345C45',
      lightgrey: '#F3F3F3',
      black: '#323232',
      lightgreen: '#BBF1D1',
      pitch: '#F9B353',
      lemongreen: '#97A92E',
      purple: '#9452A1'
    },
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
