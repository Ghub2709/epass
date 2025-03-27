/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 5s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      container: {
        center: true,
        padding: '1rem',
      },
      typography: {
        DEFAULT: {
          css: {
            'h2': {
              marginTop: '2em',
              marginBottom: '1em',
            },
            'h3': {
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            'ul > li': {
              paddingLeft: '1.5em',
            },
            'blockquote': {
              borderLeftColor: '#22c55e',
              backgroundColor: '#f0fdf4',
              padding: '1em',
              borderRadius: '0.5em',
            },
            'table': {
              fontSize: '0.9em',
            },
            'th': {
              backgroundColor: '#f8fafc',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 