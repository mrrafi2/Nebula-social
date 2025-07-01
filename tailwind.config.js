/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cosmic: {
          purple: '#1a0b2e',
          'deep-purple': '#16213e',
          midnight: '#0f3460',
          cyan: '#00ffff',
          magenta: '#ff00ff',
          'electric-blue': '#0066ff',
          'neon-pink': '#ff006e',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          'white-20': 'rgba(255, 255, 255, 0.2)',
          'white-5': 'rgba(255, 255, 255, 0.05)',
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.5s ease-out',
        'ripple': 'ripple 0.6s linear',
        'particle': 'particle 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 255, 255, 0.7)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        particle: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) scale(0)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};