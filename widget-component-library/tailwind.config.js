module.exports = {
  darkMode: 'class',
  future: {
    removeDeprecatedGapUtilities: true,
  },
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
      crosshair: 'crosshair',
      'zoom-in': 'zoom-in',
      'zoom-out': 'zoom-out',
    },
    textFillColor: theme => theme('borderColor'),
    textStrokeColor: theme => theme('borderColor'),
    textStrokeWidth: theme => theme('borderWidth'),
    paintOrder: {
      'fsm': { paintOrder: 'fill stroke markers' },
      'fms': { paintOrder: 'fill markers stroke' },
      'sfm': { paintOrder: 'stroke fill markers' },
      'smf': { paintOrder: 'stroke markers fill' },
      'mfs': { paintOrder: 'markers fill stroke' },
      'msf': { paintOrder: 'markers stroke fill' },
    },
    gradientColorStops: theme => ({
      'primary': '#FF8CFF',
      'secondary': '#785DFF'
    }),
    extend: {
      backgroundImage: {
        'top-blur': "url('/dfame-bg.svg')",
        'bubble': "url('/bubblebg.svg')",
        'cta': "url('/cta-bg.jpg')",
        'mint': "url('/mintbg.png')",
        'mint-second': "url('/mintbgsecond.png')",
        'noise': "url('/noise.png')",
        'main': "url('/main.png')",
        'alternative': "url('/alternative.png')",
        'card1': "url('/card-1.svg')",
        'card2': "url('/card-2.svg')",
        'card3': "url('/card-3.svg')",
      },
      colors: {
        'primary': '#FF8CFF',
        'secondary': '#785DFF',
        'mg-black': '#050F28',
        brand1: {
          light: '#9896FF',
          DEFAULT: '#633CFF',
        },
        brand2: {
          light: '#F5C6EB',
          DEFAULT: '#EB86D5',
        },
        brand3: {
          light: '#D0F4FF',
          DEFAULT: '#3DCFFD',
        },
        'mg-gray': '#8495BD',
        'mg-lightgray': '#B5C0D7',
        'mg-lightblue': '#EEF2F9',
        'bg-gray': '#FAFAFB',
      },
      animation: {
        pulse: "pulse 4s infinite",
      },
      fontFamily: {
        body: ['Karla', 'sans-serif'],
        'body': ['Karla', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
        'alternative': ['Shippori Mincho B1', 'serif']
      },
      borderRadius: {
        xl: "1em",
        '2-xl': "2rem",
      },
      boxShadow: {
        focus: '5px 5px 10px 10px rgba(196, 196, 196, 1)'
      },
      height: {
        xl: '75%'
      },
      fontSize: {
        'tiny': '.3rem',
        'nonexist': '0rem'
      },
      screens: {
        'tablet': '768px'
      },
      margin: {
        '14': '3.5rem'
      }
    },
  },
  variants: {
    scrollSnapType: ["responsive"],
    textFillColor: ['responsive'],
    textStrokeColor: ['responsive'],
    textStrokeWidth: ['responsive'],
    paintOrder: ['responsive'],
    mixBlendMode: ['responsive'],
    backgroundBlendMode: ['responsive'],
    isolation: ['responsive'],
    scale: ['group-hover'],
  },
  plugins: [require("tailwindcss-scroll-snap"),
  require('daisyui'),
  require('tailwindcss-blend-mode')(),
  require('@jinsung.lim/tailwindcss-filters'),
  require('tailwindcss-text-fill-stroke')(),],
};