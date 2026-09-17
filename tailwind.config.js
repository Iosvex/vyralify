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
        sans: ['"Clash Grotesk"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Clash Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        script: ['"Caveat"', 'cursive', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        dark: {
          950: '#000000',
          900: '#0A0A0A',
          850: '#111111',
          800: '#181818',
          700: '#242424',
        },
        volt: {
          DEFAULT: '#D1FE17',
          hover: '#BBF00E',
          dim: 'rgba(209, 254, 23, 0.12)',
          border: 'rgba(209, 254, 23, 0.3)',
        }
      },
    },
  },
  plugins: [],
}
