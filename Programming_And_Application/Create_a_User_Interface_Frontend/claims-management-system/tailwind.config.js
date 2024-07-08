/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        citrus: '#F36B1D',
        midnight: '#000000',
        shadow: '#262626',
        pearl: '#F2F2F2',
        frost: '#FFFFFF',
      },
      fontFamily: {
        thin: ['Helvetica', 'sans-serif'],
        light: ['Helvetica', 'sans-serif'],
        normal: ['Helvetica', 'sans-serif'],
        medium: ['Helvetica', 'sans-serif'],
        bold: ['Helvetica', 'sans-serif'],
        heavy: ['Helvetica', 'sans-serif'],
        black: ['Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}