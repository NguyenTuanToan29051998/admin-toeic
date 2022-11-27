/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');
module.exports = {
  jit: true,
  // purge: ['./src/**/*.html', './src/**/*.{js, jsx, ts, tsx}'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
    './hocs/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        'green-00BF6F': '#00BF6F',
        'blue-1890FF': '#1890FF',
        'blue-2F80ED': '#2F80ED',
        'blue-40A9FF': '#40A9FF',
        'white-0A1B39': '#0A1B39',
        'white-D9D9D9': '#D9D9D9',
        'white-F9f9f9': '#F9f9f9',
        'white-F5F5F5': '#F5F5F5',
        'red-FF4D4F': '#FF4D4F',
        'red-FF7875': '#FF7875',
        'gray-00000040': '#00000040',
        'gray-E5E6EC': '#E5E6EC',
        'gray-0000008c': '#0000008c',
        'gray-F7F7F7': '#F7F7F7',
        'gray-828282': '#828282',
        'black-595959': '#595959',
        primary: {
          200: '#00BF6F',
          400: '#00B066',
          500: '#00854D',
          700: '#006B3E',
        },
        secondary: {
          200: 'rgba(182, 201, 252, 0.08)',
          300: '#18418A',
          500: '#112E61',
          700: '#0A1B39',
        },
        'c-white': 'rgba(182, 201, 252, 0.85)',
        'c-gray': 'rgba(0, 0, 0, 0.45)',
      },
      borderWidth: {
        '1': '1px',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
