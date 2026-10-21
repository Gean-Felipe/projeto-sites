/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#b89485',
          600: '#9d7565',
          700: '#7d594b',
          800: '#5c3e33',
          900: '#3e261e',
          950: '#23140e',
        },
        luxury: {
          gold: '#c5a059',
          dark: '#121417',
          card: '#1a1d24',
          border: '#2a2f3a',
          surface: '#f8fafc'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
