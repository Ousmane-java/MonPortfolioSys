// .eslintrc.js
module.exports = {
    root: true,
    extends: [
      'next/core-web-vitals'
      // Tu peux ajouter d'autres extensions si nécessaire
    ],
    rules: {
      'react/no-unescaped-entities': 'off', // Désactive la règle pour les apostrophes non échappées
    },
  };
  