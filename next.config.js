
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
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*"
      },
      {
        source: "/teams/ssc-napoli-194680/:path*",
        destination: "https://www.fctables.com/teams/ssc-napoli-194680/:path*"
      },
      {
        source: "/italy/serie-a/:path*",
        destination: "https://www.fctables.com/italy/serie-a/:path*"
      },
      {
        source: '/classifiche/:path*',
        destination: "https://sharing.iamcalcio.it/classifiche/:path*"
      },
      {
        source: '/assets/:path*',
        destination: "https://sportcenter.sir.sportradar.com/assets/:path*"
      },
      {
        source: '/sportitalia/:path*',
        destination: 'https://sportcenter.sir.sportradar.com/sportitalia/:path*',
      },
    ]
  },
};

if (process.env.NODE_ENV === "production") {
  config = withPWA(config);
}

module.exports = config;