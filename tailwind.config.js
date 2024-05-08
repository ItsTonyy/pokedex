/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        /* --- project --- */
        'type-bug': '#8cb230',
        'type-dark': '#58575f',
        'type-dragon': '#0f6ac0',
        'type-eletric': '#eed535',
        'type-fairy': '#ed6ec7',
        'type-fighting': '#d04164',
        'type-fire': '#fd7d24',
        'type-flying': '#748fc9',
        'type-ghost': '#556aae',
        'type-grass': '#62b957',
        'type-ground': '#dd7748',
        'type-ice': '#61cec0',
        'type-normal': '#9da0aa',
        'type-poison': '#a552cc',
        'type-psychic': '#ea5d60',
        'type-rock': '#baab82',
        'type-steel': '#417d9a',
        'type-water': '#4a90da',

        'background-type-bug': '#6bd674',
        'background-type-dark': '#6f6e78',
        'background-type-dragon': '#7383b9',
        'background-type-eletric': '#f2cb55',
        'background-type-fairy': '#eba8c3',
        'background-type-fighting': '#eb4971',
        'background-type-fire': '#ffa756',
        'background-type-flying': '#83a2e3',
        'background-type-ghost': '#8571be',
        'background-type-grass': '#8bbe8a',
        'background-type-ground': '#f78551',
        'background-type-ice': '#91d8df',
        'background-type-normal': '#b5b9c4',
        'background-type-poison': '#9f6397',
        'background-type-psychic': '#ff6568',
        'background-type-rock': '#d4c294',
        'background-type-steel': '#4c91b2',
        'background-type-water': '#58abf6',

        'background-white': '#ffffff',
        'background-default-input': '#f2f2f2',
        'background-pressed-input': '#e2e2e2',
        'background-modal': 'rgb(var(--that-black-color) / .50 )',

        'text-white': '#ffffff',
        'text-black': '#17171b',
        'text-grey': '#747476',
        'text-number': 'rgb(var(--that-black-color) / .60 )',

        'gradient-vector': 'bg-gradient-to-b from-gray-50 to-zinc-100',
        'gradient-pokeball': 'bg-gradient-to-b from-gray-200 to-zinc-50',
        'gradient-vector-grey': 'bg-gradient-to-br from-gray-300 to-zinc-50',
        'gradient-pokeball-grey': 'bg-gradient-to-br from-gray-300 to-gray-100',

        'height-short': '#ffc5e6',
        'height-medium': '#aebfd7',
        'height-tall': '#aaacb8',

        'weight-light': '#99cd7c',
        'weight-normal': '#57b2dc',
        'weight-heavy': '#5a92a5',

        /* --- shadcn --- */
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      saturate: {
        110: '1.10',
        115: '1.15',
        120: '1.20',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      height: {
        screen: ['100vh', '100svh'],
      },
      width: {
        3.5: '0.875rem',
      },
      backgroundImage: {
        'pokeball-white': 'url(assets/BackgroundImages/bg-pokeball-white.svg)',
        'card-pokeball-white':
          'url(assets/BackgroundImages/bg-card-pokeball-white.svg)',
        '6x3-grad': 'url(assets/BackgroundImages/6x3-grad.svg)',
        searchIcon: 'url(assets/Other/search.svg)',
        'pokeball-white-sheet':
          'url(assets/BackgroundImages/bg-pokeball-white-sheet.svg)',
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
      },
      fontSize: {
        title: '5.25rem',
        applicationTitle: '2rem',
        pokemonName: '1.625rem',
        filterTitle: '1rem',
        description: '1rem',
        pokemonNumber: '0.75rem',
        pokemonType: '0.75rem',
      },
      scale: {
        '115': '1.15'
      }
    },
    backgroundSize: {
      '10%': '10%',
      '20%': '20%',
      '30%': '30%',
      '40%': '40%',
      '45%': '45%',
      '50%': '50%',
      '60%': '60%',
      '70%': '70%',
      '75%': '75%',
      '80%': '80%',
    }
  },
  plugins: [require('tailwindcss-animate')],
};
