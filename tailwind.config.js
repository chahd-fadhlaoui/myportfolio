/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        generalsans: ['General Sans', 'sans-serif'],
      },
     colors: {
  primary: {
    DEFAULT: '#e40d6a',
    100: '#c9024e',
    200: '#bf3263',
    300: '#6e0331',
  },
  dark: {
    DEFAULT: '#1A1A1A',
    500: '#3A3A49',
  },
  white: {
    DEFAULT: '#ffd1e2',
    800: '#ffd2e5',
    700: '#D6D9E9',
    600: '#AFB0B6',
    500: '#62646C',
  }
},
      backgroundImage: {
        terminal: "url('/assets/terminal.png')",
      },
    },
  },
  plugins: [],
};