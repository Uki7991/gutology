module.exports = {
  purge: {
    enabled: true,
    content: [
      "./public/*.html",
      "./src/**/*.vue",
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      mont: 'Montserrat, sans-serif'
    },
    extend: {
      
      colors: {
        primary: '#2c7976',

      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
