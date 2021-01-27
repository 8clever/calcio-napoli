
interface Media {
  href: string;
  label: string;
  changefreq?: "hourly" | "weekly" | "daily" | "never"
}

export const media = {
  domain: "https://www.calcio-napoli.com",
  menu: [
    {
      href: "/",
      label: "Pagina iniziale",
      changefreq: "hourly"
    },
    {
      href: "/rss",
      label: "Calcio Napoli 24",
      changefreq: "hourly"
    },
    {
      href: "/matches",
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
  ] as Media[]
}