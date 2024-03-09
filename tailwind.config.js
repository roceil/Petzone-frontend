/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import containerQueries from '@tailwindcss/container-queries'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem'
        }
      },
      colors: {
        primary: '#ffffff',
        secondary: '#638889',
        third: '#F9EFDB',
        input_font: '#9BA5B7',
        font: '#415656'
      },
      keyframes: {
        upDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        upDown: 'upDown 1s ease-in-out infinite'
      }
    },
    screens: {
      sm: '576px',
      // => @media (min-width: 576px) { ... }

      md: '992px',
      // => @media (min-width: 992px) { ... }

      lg: '1280px',
      // => @media (min-width: 1280px) { ... }

      xl: '1440px'
      // => @media (min-width: 1440px) { ... }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#415656',

          secondary: '#638889',

          third: '#F9EFDB',

          input_font: '#9BA5B7',

          font: '#415656'
        }
      }
    ]
  },
  plugins: [daisyui, containerQueries]
}
