module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        slideUp: 'slideUp 2s ease-in-out forwards',
        float: 'float 2s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '30%': { opacity: 1, transform: 'translateY(0)' },
          '70%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(20px)' },
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
