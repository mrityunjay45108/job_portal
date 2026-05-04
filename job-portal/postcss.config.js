/* export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
} */


// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }


module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}