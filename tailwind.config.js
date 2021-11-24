module.exports = {
  mode: 'jit',
  purge: ['./public/index.html', './src/**/*.svelte'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fill: ['hover', 'focus']
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}