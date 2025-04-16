/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
<<<<<<< Updated upstream
        'solana-purple': '#9945FF',
        'solana-green': '#14F195'
      }
    }
=======
        'midnight': '#1C2526',
        'cyan': '#A3BFFA',
        'neon-green': '#00FFA3',
        'deep-blue': '#00153D',
        'orange': '#FBAC38',
        'bright-blue': '#009CDD',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
>>>>>>> Stashed changes
  },
  plugins: []
};
