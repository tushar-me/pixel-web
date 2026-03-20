/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.vue",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#4C2746",
        secondary: "#E71C38"
      }
    },
  },
  plugins: [],
}