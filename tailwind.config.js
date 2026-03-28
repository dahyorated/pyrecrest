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
          DEFAULT: '#5C3D2E',
          50: '#FAF5F0',
          100: '#F0E6D8',
          200: '#E0CCAF',
          300: '#C9A882',
          400: '#A8825A',
          500: '#8B6914',
          600: '#6B4E2E',
          700: '#5C3D2E',
          800: '#4A2E1E',
          900: '#3A1F10',
        },
        accent: {
          DEFAULT: '#8B6914',
          50: '#FBF7EE',
          100: '#F5ECDA',
          200: '#EBD9B5',
          300: '#DFC28A',
          400: '#C9A554',
          500: '#8B6914',
          600: '#7A5C10',
          700: '#65490D',
          800: '#50380A',
          900: '#3B2907',
        },
        success: '#10B981',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
        'hover': '0 20px 40px -8px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 30px rgba(139, 105, 20, 0.3)',
        'glow-lg': '0 0 60px rgba(139, 105, 20, 0.4)',
        'brown-glow': '0 0 30px rgba(92, 61, 46, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.7s ease-out',
        'slide-down': 'slideDown 0.7s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-25px)' },
        },
      },
    },
  },
  plugins: [],
}
