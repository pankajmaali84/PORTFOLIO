/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#8B5CF6', dark: '#7C3AED' },
      },
    },
  },
  plugins: [],
}
