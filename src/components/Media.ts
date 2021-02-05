
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
  playListId: "PL2HP8OJyZJpNe-5yJdL9o5n-utvD_H2pP",
  domain: "https://www.calcio-napoli.com",
  menu: [
    {
      href: "/",
      label: "Pagina iniziale",
      changefreq: "hourly"
    },
    {
      href: "/rss",
      label: "Calcio Napoli 24 News",
      changefreq: "hourly"
    },
    {
      href: "/channels/CN24_Live",
      label: "Calcio Napoli 24 Live",
      changefreq: "daily"
    },
    {
      href: "/matches",
      label: "Ultimissime partite Napoli",
      changefreq: "daily"
    },
    {
      href: "/seriea",
      label: "Classifica Serie A",
      changefreq: "daily",
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
      ampOnly: true
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