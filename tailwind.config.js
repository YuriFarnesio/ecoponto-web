/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        background: '#F0F0F5',
        placeholder: '#A0A0B2',
        texts: '#6C6C80',
        overlay: '#0E0A14',
        black: '#000000',

        title: '#322153',

        desaturated: '#E1FAEC',
        greenpeace: '#34CB79',
        ecogreen: '#2FB86E',

        danger: '#EF4444',
        dangerHovered: '#DE3333',
      },

      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },

      fontSize: {
        sm: ['0.875rem', '1rem'],
        base: ['1rem', '1.125rem'],
        '2xl': ['1.5rem', '1.75rem'],
        '4xl': ['2.25rem', '2.875rem'],
        '5xl': ['3.375rem', '4rem'],
      },

      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
}
