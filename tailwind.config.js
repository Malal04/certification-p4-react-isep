/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blu': 'rgba(17, 19, 77)',
        'custom-green': '#D8E63B',


      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #EFEEE9 0%, #DBDFE8 100%)',
       

      },
    },
  },
  plugins: [],
}