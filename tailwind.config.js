/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-blue': '#0075C9',
        'custom-light-blue': '#008DF2',
        'custom-white': 'rgba(255, 255, 255, 0.7)',
        'custom-g-blue-1': '#3B82F6',
        'custom-g-blue-2': '#008DF2',
        'custom-black': 'rgba(0, 0, 0, 0.8)'
      },
      textColor: {
        'custom-blue': '#0075C9',
        'custom-light-blue': '#008DF2',
      },
      borderColor: {
        'custom-blue': '#0075C9',
        'custom-light-blue': '#008DF2'
      }
    },
  },
  plugins: [],
}

