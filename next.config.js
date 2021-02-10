
const withPWA = require('next-pwa');

const LANGS = {
  IT: "it"
}

let config = {
  pwa: {
    dest: 'public'
  },
  i18n: {
    locales: Object.values(LANGS),
    defaultLocale: LANGS.IT
  }
};

if (process.env.NODE_ENV === "production") {
  config = withPWA(config);
}

module.exports = config;