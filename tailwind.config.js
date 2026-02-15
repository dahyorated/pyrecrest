/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#284498',
          50: '#E8EBF5',
          100: '#D1D7EB',
          200: '#A3AFD7',
          300: '#7587C3',
          400: '#475FAF',
          500: '#284498',
          600: '#20367A',
          700: '#18295B',
          800: '#101B3D',
          900: '#080E1E',
        },
        accent: {
          DEFAULT: '#FFC632',
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFC632',
          600: '#E6B02E',
          700: '#CC9B28',
          800: '#B38623',
          900: '#99711D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}
