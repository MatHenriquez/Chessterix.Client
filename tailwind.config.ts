import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        kimono: {
          '200': '#A04741',
          '700': '#914B43',
          '900': '#873D3A',
          '950': '#612F32'
        },
        gold: {
          '300': '#ffd700',
          '500': '#b8860b',
          '700': '#8b6914'
        },
        red: {
          main: '#6E0000'
        },
        bone: {
          '300': '#D4CFC7',
          '500': '#988D87',
          '700': '#6B625A'
        },
        wood: {
          '700': '#47240D',
          '800': '#2D1508'
        }
      },
      fontFamily: {
        stranger: ['var(--font-stranger)', 'sans-serif']
      },
      fontSize: {
        title: '10rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        glow: 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%': { textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' },
          '100%': { textShadow: '0 0 30px rgba(255, 215, 0, 0.8)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
