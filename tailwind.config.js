/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        headline: ['"General Sans"', '"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        display: ['"General Sans"', '"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', '-apple-system', 'sans-serif'],
        inter: ['"Inter"', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        black: '#000000',
        dark: {
          950: '#08090C',
          900: '#0C0D12',
          850: '#111319',
          800: '#181A22',
          700: '#262933',
        },
      },
    },
  },
  plugins: [],
}
