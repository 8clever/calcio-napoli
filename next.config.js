
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
      // root
      {
        source: "/:path*",
        destination: "/:path*"
      },
      // fctables
      {
        source: "/teams/ssc-napoli-194680/:path*",
        destination: "https://www.fctables.com/teams/ssc-napoli-194680/:path*"
      },
      {
        source: "/italy/serie-a/:path*",
        destination: "https://www.fctables.com/italy/serie-a/:path*"
      },
      // iamcalcio
      {
        source: '/classifiche/:path*',
        destination: "https://sharing.iamcalcio.it/classifiche/:path*"
      },
      // sportcenter
      {
        source: "/static/sportitalia/:path*",
        destination: "https://sportcenter.sir.sportradar.com/static/sportitalia/:path*"
      },
      {
        source: "/translations/:path*",
        destination: "https://sportcenter.sir.sportradar.com/translations/:path*"
      },
      {
        source: '/assets/:path*',
        destination: "https://sportcenter.sir.sportradar.com/assets/:path*"
      },
      {
        source: '/sportitalia/:path*',
        destination: 'https://sportcenter.sir.sportradar.com/sportitalia/:path*',
      },
      // google
      {
        source: "/async/:path*",
        destination: "https://www.google.com/async/:path*"
      },
      {
        source: "/xjs/:path*",
        destination: "https://www.google.com/xjs/:path*"
      },
      {
        source: "/gen_204/:path*",
        destination: "https://www.google.com/gen_204/:path*"
      },
      {
        source: '/googlesearch/:path*',
        destination: "https://www.google.com/search/:path*"
      }
    ]
  },
};

if (process.env.NODE_ENV === "production") {
  config = withPWA(config);
}

module.exports = config;