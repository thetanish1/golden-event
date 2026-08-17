/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#F5D67A',
          400: '#F0C040',
          500: '#D4AF37',
          600: '#B8941E',
          700: '#8A6D1F',
          800: '#6B5218',
          900: '#4A3910',
        },
        charcoal: {
          50:  '#F5F5F5',
          100: '#E5E5E5',
          200: '#D4D4D4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#141414',
          950: '#0B0B0D',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #D4AF37 0%, #F5D67A 50%, #D4AF37 100%)',
        'gold-radial':      'radial-gradient(ellipse at center, #F5D67A 0%, #D4AF37 50%, #8A6D1F 100%)',
        'dark-gradient':    'linear-gradient(180deg, #0B0B0D 0%, #141414 100%)',
        'hero-overlay':     'linear-gradient(180deg, rgba(11,11,13,0.5) 0%, rgba(11,11,13,0.75) 60%, rgba(11,11,13,0.95) 100%)',
        'card-glow':        'radial-gradient(ellipse at top, rgba(212,175,55,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'gold-sm':  '0 0 8px rgba(212,175,55,0.3)',
        'gold-md':  '0 0 20px rgba(212,175,55,0.4)',
        'gold-lg':  '0 0 40px rgba(212,175,55,0.5)',
        'gold-xl':  '0 0 60px rgba(212,175,55,0.6)',
        'card':     '0 4px 24px rgba(0,0,0,0.5)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.7), 0 0 24px rgba(212,175,55,0.3)',
      },
      animation: {
        'fade-in':       'fadeIn 0.8s ease forwards',
        'fade-up':       'fadeUp 0.6s ease forwards',
        'float':         'float 3s ease-in-out infinite',
        'pulse-gold':    'pulseGold 2s ease-in-out infinite',
        'scroll-bounce': 'scrollBounce 1.5s ease-in-out infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'spin-slow':     'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(212,175,55,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(212,175,55,0.7)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%':      { transform: 'translateY(8px)', opacity: '0.6' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      transitionTimingFunction: {
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
