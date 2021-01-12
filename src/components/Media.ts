
interface Media {
  href: string;
  label: string;
}

export const media = {
  menu: [
    {
      href: "/",
      label: "Pagina iniziale"
    },
    {
      href: "/rss",
      label: "Calcio Napoli 24"
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