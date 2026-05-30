export default {
  content: ['./src/**/*.{html,ts,scss}'],

  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        danger: '#ef4444',
      },
      borderWidth: {
        3: '3px',
      },
      zIndex: {
        toast: '9999',
      },
    },
  },

  plugins: [],
};
