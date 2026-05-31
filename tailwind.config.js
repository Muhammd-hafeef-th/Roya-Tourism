/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '360px',      // Small phones
      'sm': '640px',      // Phones
      'md': '768px',      // Tablets
      'lg': '1024px',     // Small laptops
      'xl': '1280px',     // Laptops
      '2xl': '1536px',    // Large laptops
      '3xl': '1920px',    // Desktop
      '4xl': '2560px',    // Large TV
    },
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
        'forest-green': {
          50: '#f1f5f3',
          100: '#dde8e3',
          200: '#b8d4c4',
          300: '#8fbda2',
          400: '#5fa380',
          500: '#2d6b4f',
          600: '#235139',
          700: '#1a3d2a',
          800: '#152e20',
          900: '#0d1f14',
        },
        'fog-grey': {
          50: '#f8f9f9',
          100: '#f0f1f2',
          200: '#dfe0e1',
          300: '#cccdd0',
          400: '#a8aaad',
          500: '#868a8d',
          600: '#6b6f73',
          700: '#555a5f',
          800: '#3d4248',
          900: '#262b30',
        },
        'sunset-orange': {
          50: '#fff7f0',
          100: '#ffead7',
          200: '#ffd0ae',
          300: '#ffb080',
          400: '#ff8d4d',
          500: '#ff6b1f',
          600: '#f85a0a',
          700: '#d64508',
          800: '#b0360a',
          900: '#8b2a08',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      spacing: {
        'gutter': 'clamp(0.75rem, 5vw, 2rem)',
      },
      boxShadow: {
        luxury: '0 25px 60px rgba(201, 168, 76, 0.12), 0 8px 25px rgba(0,0,0,0.06)',
        'luxury-lg': '0 40px 80px rgba(201, 168, 76, 0.18), 0 15px 40px rgba(0,0,0,0.08)',
        'gold-sm': '0 4px 15px rgba(201, 168, 76, 0.25)',
        gold: '0 8px 30px rgba(201, 168, 76, 0.35)',
        soft: '0 4px 24px rgba(0,0,0,0.06)',
        'cinematic': '0 20px 50px rgba(251, 191, 36, 0.3), 0 0 40px rgba(251, 191, 36, 0.2)',
      },
    },
  },
  plugins: [],
};
