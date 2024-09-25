module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'system-ui',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
      },
      colors: {
        lavenderPurple: '#9151b0',
        lightPink: '#cb90d2',
        deepLavender: '#7260c3',
        royalPurple: '#6930a1',
        brightMagenta: '#8f49bb',
        softPink: '#efa1cb',
        white: '#FFFFFF',
        darkPurple: '#863591',
        violet: '#623eaa',
        rosePink: '#f774aa',
        deepRed: '#8f2968',
        darkRed: '#98254c',
        darkBg: '#1a202c',
        darkText: '#e2e8f0',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
