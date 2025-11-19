/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9ebff',
          200: '#a8d4ff',
          300: '#78bdff',
          400: '#469fff',
          500: '#1c82ff',
          600: '#0065e0',
          700: '#004db0',
          800: '#003780',
          900: '#002150'
        }
      }
    }
  },
  plugins: []
};
