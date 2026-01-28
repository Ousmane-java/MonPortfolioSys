// postcss.config.js
module.exports = {
  plugins: {
    // Utilise maintenant le plugin séparé
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
// Si vous utilisez Tailwind CSS v3 ou supérieur, vous pouvez également utiliser le plugin intégré
// module.exports = {
//   plugins: [
//     require('@tailwindcss/postcss7-compat')('./tailwind.config.js'),
//     require('autoprefixer'),
//   ],
// }