/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './App.tsx',
    './main.tsx',
    './Components/**/*.{tsx,ts}',
    './pages/**/*.{tsx,ts}',
    './context/**/*.{tsx,ts}',
    './lib/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        uptreek: {
          navy: '#0B1426',
          'navy-light': '#132040',
          'navy-mid': '#1a2d52',
          blue: '#1D4ED8',
          'blue-light': '#3B82F6',
          'blue-muted': '#1E3A8A',
          'blue-glow': '#60A5FA',
          gold: '#C9A84C',
          'gold-light': '#E5C96B',
          'gold-dark': '#A07B2A',
          'gold-bright': '#F5C518',
          white: '#FFFFFF',
          'off-white': '#F8FAFC',
          'off-white-2': '#EEF2FF',
          gray: '#64748B',
          'gray-light': '#E2E8F0',
          'gray-dark': '#334155',
          'gray-mid': '#94A3B8',
          dark: '#060D1B',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Montserrat"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #060D1B 0%, #0B1426 50%, #132040 100%)',
        'blue-gradient': 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
        'gold-gradient': 'linear-gradient(135deg, #A07B2A 0%, #C9A84C 50%, #E5C96B 100%)',
        'hero-gradient': 'linear-gradient(135deg, #060D1B 0%, #0B1426 40%, #1E3A8A 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(19,32,64,0.9) 0%, rgba(11,20,38,0.9) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201,168,76,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(201,168,76,0.3)',
        'blue': '0 4px 24px rgba(29,78,216,0.3)',
        'navy': '0 4px 24px rgba(11,20,38,0.5)',
        'card': '0 8px 32px rgba(6,13,27,0.4)',
        'glow-gold': '0 0 40px rgba(201,168,76,0.2)',
        'glow-blue': '0 0 40px rgba(59,130,246,0.2)',
      },
      borderRadius: {
        'xl2': '1.25rem',
        'xl3': '1.5rem',
      },
    },
  },
  plugins: [],
};
