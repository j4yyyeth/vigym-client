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
        'custom-light-blue': '#008DF2'
      },
      textColor: {
        'custom-blue': '#0075C9',
        'custom-light-blue': '#008DF2'
      },
      borderColor: {
        'custom-blue': '#0075C9',
        'custom-light-blue': '#008DF2'
      }
    },
  },
  plugins: [],
}

