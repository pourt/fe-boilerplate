/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          default: '2rem',
          sm: '1rem',
          lg: '3rem',
          xl: '5rem',
          '2xl': '10rem',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
