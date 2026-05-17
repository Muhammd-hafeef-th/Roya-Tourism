/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf9ee',
          100: '#f8f0d4',
          200: '#f0dea4',
          300: '#e8c97a',
          400: '#ddb24e',
          500: '#c9a84c',
          600: '#b08a2e',
          700: '#8a6b22',
          800: '#6b5220',
          900: '#4a3a16',
        },
        cream: {
          50: '#fdfcfa',
          100: '#faf9f7',
          200: '#f5f2ec',
          300: '#ede8de',
          400: '#e0d8c8',
          500: '#cec4b0',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 25px 60px rgba(201, 168, 76, 0.12), 0 8px 25px rgba(0,0,0,0.06)',
        'luxury-lg': '0 40px 80px rgba(201, 168, 76, 0.18), 0 15px 40px rgba(0,0,0,0.08)',
        'gold-sm': '0 4px 15px rgba(201, 168, 76, 0.25)',
        gold: '0 8px 30px rgba(201, 168, 76, 0.35)',
        soft: '0 4px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
