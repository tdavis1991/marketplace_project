/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    boxShadow: {
      sm: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      md: '0px 5px 15px rgba(0, 0, 0, 0.3)',
      dropdown: '0 2px 4px rgba(0, 0, 0, 0.2)'
    }
  },
  plugins: [],
}

