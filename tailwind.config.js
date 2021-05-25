module.exports = {
  purge: {
    enabled: true,
    mode: "all",
    preserveHtmlElements: false,
    content: [
      "./public/*.html",
      "./src/**/*.vue",
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#2c7976',

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
