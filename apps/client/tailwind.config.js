/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        secondary: '#0ea5e9',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
};
