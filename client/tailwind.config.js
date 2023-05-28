/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0A4D68',
        'secondary': '#088395',
        'tertiary': '#05BFDB',
        'quaternary': '#00FFCA',
      }
    },
    boxShadow: {
      sm: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      md: '0px 5px 15px rgba(0, 0, 0, 0.3)',
      dropdown: '0 2px 4px rgba(0, 0, 0, 0.2)'
    }
  },
  plugins: [require("daisyui")],
}

