/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text1: '#fff'
      },
      opacity: {
        '45': '.45',
        '20': '.25',
        '60': '.60'
      }
    },
  },
  plugins: [],
}

