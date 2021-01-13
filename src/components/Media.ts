
interface Media {
  href: string;
  label: string;
}

export const media = {
  domain: "https://www.calcio-napoli.com",
  menu: [
    {
      href: "/",
      label: "Pagina iniziale"
    },
    {
      href: "/rss",
      label: "Calcio Napoli 24"
    },
    {
      href: "/games",
      label: "Classifica Serie a tim"
    },
    {
      href: "/ssc",
      label: "#SSCNapoli"
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
    }
  ] as Media[]
}