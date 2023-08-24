
interface MenuItem {
  href: string;
  label: string;
  changefreq?: "hourly" | "weekly" | "daily" | "never",
  standalone?: boolean;
}

interface Wallet {
  name: string;
  address: string;
}

interface Google {
  caPub: string;
}

class Media {
  public static version = "1.0.14";

  public static email = "godofluck89@gmail.com";

  public static google: Google = {
    caPub: "ca-pub-7579927697787840"
  }

  public static wallets: Wallet[] = [
    {
      name: "BitCoin",
      address: "1LKpi7TJvuUdPbcj8SzP88bXycDCuSdLEE"
    },
    {
      name: "Ethereum",
      address: "0xce8b071addc8ae739832dc67277eb1dea701d2fd"
    }
  ]

  public static domain = "https://www.calcio-napoli.com";

  public static channelName = "CalcioNapoli24";

  public static channelTitle = "Calcio napoli oggi, area napoli, 1924, net, web ultimissime, ultime notizie mercato";

  public static readonly channelId = "UCFZaLPCquo5ROTGiayRS8LQ"

  public static menu: MenuItem[] = [
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
      href: "/channels/UCDsSMbkW-poeGDgHlZ5yFMA",
      label: "Calcio Napoli TV",
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
  ]

  public static media: MenuItem[] = [
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
  ]

  public static partners: MenuItem[] = [
    {
      href: "/privacypolicy.html",
      label: "Privacy Policy",
      standalone: true
    }
  ]

}

export {
  Media as media,
  Media
}
