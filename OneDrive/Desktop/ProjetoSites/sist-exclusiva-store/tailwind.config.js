/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        store: {
          bg: '#FFFFFF',
          surface: '#F4F4F5',
          surfaceHover: '#E4E4E7',
          surfaceLight: '#FAFAFA',
          primary: '#18181B',
          primaryHover: '#27272A',
          primaryLight: '#F4F4F5',
          secondary: '#71717A',
          secondaryDark: '#52525B',
          text: '#09090B',
          border: '#E4E4E7',
          borderLight: '#F4F4F5',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
