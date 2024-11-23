/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-purple': '#D6A5E2',   // Roxo claro
        'dark-purple': '#6B3F98',    // Roxo escuro para o dark mode
        'light-bg': '#F7F7F7',       // Cinza claro para o fundo no modo claro
        'dark-bg': '#2A2A2A',        // Fundo escuro no modo dark
        'text-light': '#000000',     // Texto preto no modo claro
        'text-dark': '#FFFFFF',      // Texto branco no modo escuro
      },
    },
  },
  plugins: [],
}

