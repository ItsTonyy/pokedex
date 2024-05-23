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
        'type-bug': 'rgb(var(--type-bug))',
        'type-dark': 'rgb(var(--type-dark))',
        'type-dragon': 'rgb(var(--type-dragon))',
        'type-electric': 'rgb(var(--type-electric))',
        'type-fairy': 'rgb(var(--type-fairy))',
        'type-fighting': 'rgb(var(--type-fighting))',
        'type-fire': 'rgb(var(--type-fire))',
        'type-flying': 'rgb(var(--type-flying))',
        'type-ghost': 'rgb(var(--type-ghost))',
        'type-grass': 'rgb(var(--type-grass))',
        'type-ground': 'rgb(var(--type-ground))',
        'type-ice': 'rgb(var(--type-ice))',
        'type-normal': 'rgb(var(--type-normal))',
        'type-poison': 'rgb(var(--type-poison))',
        'type-psychic': 'rgb(var(--type-psychic))',
        'type-rock': 'rgb(var(--type-rock))',
        'type-steel': 'rgb(var(--type-steel))',
        'type-water': 'rgb(var(--type-water))',

        'background-type-bug': 'rgb(var(--background-type-bug))',
        'background-type-dark': 'rgb(var(--background-type-dark))',
        'background-type-dragon': 'rgb(var(--background-type-dragon))',
        'background-type-electric': 'rgb(var(--background-type-electric))',
        'background-type-fairy': 'rgb(var(--background-type-fairy))',
        'background-type-fighting': 'rgb(var(--background-type-fighting))',
        'background-type-fire': 'rgb(var(--background-type-fire))',
        'background-type-flying': 'rgb(var(--background-type-flying))',
        'background-type-ghost': 'rgb(var(--background-type-ghost))',
        'background-type-grass': 'rgb(var(--background-type-grass))',
        'background-type-ground': 'rgb(var(--background-type-ground))',
        'background-type-ice': 'rgb(var(--background-type-ice))',
        'background-type-normal': 'rgb(var(--background-type-normal))',
        'background-type-poison': 'rgb(var(--background-type-poison))',
        'background-type-psychic': 'rgb(var(--background-type-psychic))',
        'background-type-rock': 'rgb(var(--background-type-rock))',
        'background-type-steel': 'rgb(var(--background-type-steel))',
        'background-type-water': 'rgb(var(--background-type-water))',

        'background-color': 'rgb(var(--background-color))',
        'background-default-input': 'rgb(var(--background-default))',
        'background-pressed-input': 'rgb(var(--background-pressed-input))',
        'background-modal': 'rgb(var(--that-black-color) / .50 )',

        'text-white': 'rgb(var(--text-white))',
        'text-black': 'rgb(var(--text-black))',
        'text-grey': 'rgb(var(--text-grey))',
        'text-number': 'rgb(var(--that-black-color) / .60 )',

        'gradient-vector': 'bg-gradient-to-b from-gray-50 to-zinc-100',
        'gradient-pokeball': 'bg-gradient-to-b from-gray-200 to-zinc-50',
        'gradient-vector-grey': 'bg-gradient-to-br from-gray-300 to-zinc-50',
        'gradient-pokeball-grey': 'bg-gradient-to-br from-gray-300 to-gray-100',

        'height-short': 'rgb(var(--height-short))',
        'height-medium': 'rgb(var(--height-medium))',
        'height-tall': 'rgb(var(--height-tall))',

        'weight-light': 'rgb(var(--weight-light))',
        'weight-normal': 'rgb(var(--weight-normal))',
        'weight-heavy': 'rgb(var(--weight-heavy))',

        'female': 'rgb(var(--female))',
        'male': 'rgb(var(--male))',

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
      brightness: {
        80: '.8',
        85: '.85'
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
        myAnimation: {
          from: {transform: 'translateX(30%)'},
          to: {transform: 'translateX(-45%)'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        textAnimation: 'myAnimation 30s alternate linear infinite',
      },
      height: {
        screen: ['100vh', '100svh'],
        1.5: '0.375rem'
      },
      width: {
        3.5: '0.875rem',
      },
      backgroundImage: {
        'pokeball-white': 'url(assets/BackgroundImages/bg-pokeball-white.svg)',
        'pokeball-dark': 'url(assets/BackgroundImages/bg-pokeball-dark.svg)',
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

        'specialSmall': '0.8rem',
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
