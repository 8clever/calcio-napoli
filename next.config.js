
const withPWA = require('next-pwa');

const LANGS = {
  IT: "it"
}

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  i18n: {
    locales: Object.values(LANGS),
    defaultLocale: LANGS.IT
  }
})