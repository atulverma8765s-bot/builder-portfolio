/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        cyber: {
          dark: '#0a0d14',
          card: '#111726',
          border: '#1f293d',
          accent: '#00f2fe',
        },
      },
    },
  },
  plugins: [],
}
