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
        red: {
          main: '#6E0000'
        },
        bone: {
          '500': '#988D87'
        },
        wood: {
          '700': '#47240D'
        }
      },
      fontFamily: {
        stranger: ['var(--font-stranger)', 'sans-serif']
      },
      fontSize: {
        title: '10rem'
      }
    }
  },
  plugins: []
};

export default config;
