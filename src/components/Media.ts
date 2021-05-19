
interface Media {
  href: string;
  label: string;
  changefreq?: "hourly" | "weekly" | "daily" | "never",
  standalone?: boolean;
}

export const media = {
  google: {
    caPub: "ca-pub-7579927697787840"
  },
  domain: "https://www.calcio-napoli.com",
  menu: [
    {
      href: "/",
      label: "Pagina iniziale",
      changefreq: "hourly"
    },
    {
      href: "/sportradar",
      label: "Statistiche dettagliate della partita",
      changefreq: "never"
    },
    {
      href: "/matches",
      label: "Partite del Napoli",
      changefreq: "daily"
    },
    {
      href: "/seriea",
      label: "Classifica Serie A",
      changefreq: "daily",
    },
    {
      href: "/channels/CN24_Live",
      label: "Calcio Napoli 24 Live",
      changefreq: "daily"
    },
    {
      href: "/rss",
      label: "Calcio Napoli 24 News",
      changefreq: "hourly"
    },
    {
      href: "/sscnapoli",
      label: "#SSCNapoli",
      changefreq: "hourly",
      standalone: true
    },
    
  ] as Media[],
  media: [
    {
      href: "https://www.youtube.com/c/CalcioNapoliPodcasts",
      label: "YouTube"
    },
    {
      href: "https://www.facebook.com/CalcioNapoliPodcasts",
      label: "FaceBook"
    },
    {
      href: "https://twitter.com/GoalsNapoli",
      label: "Twitter"
    },
    {
      href: "/story",
      label: "Stories",
      standalone: true
    }
  ] as Media[],
  partners: [
    {
      href: "https://vip-software.herokuapp.com",
      label: "VIP Software"
    },
    {
      href: "https://puzzle.simple-games.fun/dirtyclean",
      label: "Dirty Clean"
    },
    {
      href: "/privacypolicy.html",
      label: "Privacy Policy",
      standalone: true
    }
  ] as Media[]
}