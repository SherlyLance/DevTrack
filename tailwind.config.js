/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      boxShadow: {
        'dark-soft': '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06)',
        'dark-hover': '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
        'dark-outline': '0 0 0 3px rgba(196, 196, 196, 0.45)'
      },
      backgroundColor: {
        'dark-800': '#1a202c',
        'dark-700': '#2d3748'
      }
    },
  },
  plugins: [],
};