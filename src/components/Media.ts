
interface Media {
  href: string;
  label: string;
  changefreq?: "hourly" | "weekly" | "daily" | "never"
}

export const media = {
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
      changefreq: "daily"
    },
    {
      href: "/sscnapoli",
      label: "#SSCNapoli",
      changefreq: "hourly"
    }
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
      label: "Stories"
    }
  ] as Media[],
  partners: [
    {
      href: "https://vip-software.herokuapp.com",
      label: "VIP Software"
    }
  ] as Media[],
  search: [
    {
      href: `/search?q=Tutto+Napoli`,
      label: "Tutto Napoli",
      changefreq: "daily"
    },
    {
      href: `/search?q=Calcio+Napoli`,
      label: "Calcio Napoli",
      changefreq: "daily"
    },
    {
      href: `/search?q=Calcio+Napoli+24`,
      label: "Calcio Napoli 24",
      changefreq: "daily"
    },
    {
      href: `/search?q=Calcio+Mercato+Napoli`,
      label: "Calcio Mercato Napoli",
      changefreq: "daily"
    },
  ] as Media[]
}