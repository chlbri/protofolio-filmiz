module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '3xl': '2000px',
      },
      body: {
        'background-color': '#06202A',
      },
    },
  },
  variants: {
    extend: {
      animation: ['group-hover', 'responsive', 'hover', 'focus'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
