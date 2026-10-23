/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#067CF9', // Single Electric Blue Accent
          600: '#056ad6',
          700: '#0457b0',
          900: '#0F172A', // Deep Obsidian Navy
        },
        surface: {
          light: '#FFFFFF',
          glass: 'rgba(255, 255, 255, 0.75)',
          border: 'rgba(6, 124, 249, 0.12)',
          subtle: '#E2E8F0',
        },
        accent: {
          blue: '#067CF9',
          hover: '#0063D1',
          emerald: '#10B981',
        },
        black: '#000000',
        dark: {
          950: '#08090C',
          900: '#0C0D12',
          850: '#111319',
          800: '#181A22',
          700: '#262933',
        },
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', '"Inter"', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', '-apple-system', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', '-apple-system', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        geist: ['"Geist"', '"Inter"', '-apple-system', 'sans-serif'],
        mono: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
