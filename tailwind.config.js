/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/layouts/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#f5f5f5',
          200: '#f0f0f0',
          300: '#d9d9d9',
          400: '#bfbfbf',
          500: '#8c8c8c',
          600: '#595959',
          700: '#434343',
          800: '#262626',
          900: '#1f1f1f',
        },
        brand: {
          DEFAULT: '#2FCBEA',
        },
      },
      boxShadow: {
        '3xl': '0 0 60px 0 rgba(0, 0, 0, 0.3)',
      },
    },
  },
};
