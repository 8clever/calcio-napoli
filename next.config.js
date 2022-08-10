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
        source: "/client_204/:path*",
        destination: "https://www.google.com/client_204/:path*"
      },
      {
        source: '/complete/search/:path*',
        destination: "https://www.google.com/complete/search/:path*"
      },
      {
        source: '/googlesearch/:path*',
        destination: "https://www.google.com/search/:path*"
      },
      // sitemap xml
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap/static.xml',
      },
      {
        source: '/sitemap-news.xml',
        destination: '/api/sitemap/news.xml',
      },
    ]
  },
};

if (process.env.NODE_ENV === "production") {
  config = withPWA(config);
}

module.exports = config;