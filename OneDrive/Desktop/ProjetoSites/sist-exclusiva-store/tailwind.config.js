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
          bg: '#FEFEFE',
          surface: '#FAE7E7',
          surfaceHover: '#F5D8D8',
          surfaceLight: '#FDF7F7',
          primary: '#CF7C89',
          primaryHover: '#BE6B78',
          primaryLight: '#FCECEF',
          secondary: '#AA8B97',
          secondaryDark: '#7A5B67',
          text: '#0E0606',
          border: '#EED9DC',
          borderLight: '#F3E5E7',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
