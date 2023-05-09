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
        'custom-white': 'rgba(255, 255, 255, 0.7)'
      },
      textColor: {
        'custom-blue': '#0075C9',
        'custom-light-blue': '#008DF2',
        'custom-ai-blue': '#58b9ff'
      },
      borderColor: {
        'custom-blue': '#0075C9',
        'custom-light-blue': '#008DF2'
      }
    },
  },
  plugins: [],
}

