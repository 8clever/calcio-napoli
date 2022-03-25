
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
  public static version = "1.0.13";

  public static email = "godofluck89@gmail.com";

  public static google: Google = {
    caPub: "ca-pub-7579927697787840"
  }

  public static wallets: Wallet[] = [
    {
      name: "BitCoin",
      address: "bc1qnehsxkuvzmhxwk0dhwvn6r7mewycrujcms7zf5"
    },
    {
      name: "Ethereum",
      address: "0x2713C6F3101EAe55f0D50264Ceb94538B1C9DECb"
    },
    {
      name: "Nano",
      address: "nano_17n137kyqsupq47xfjord3xfhnya8sepmfbu9ksqpcqcyd5ttcume8h9sh6s"
    },
    {
      name: "Monero",
      address: "48cjivzYnF7N3TuivqRffBW4CG36n3BcYXjaQjutNNBKgyhBc1r1gorRGcotStWqT9ML3PbFRgPWiTAkLJ2x7HE57vCmCij"
    }
  ]

  public static domain = "https://www.calcio-napoli.com";

  public static channelName = "CalcioNapoli24";

  public static channelTitle = "Calcio napoli oggi, area napoli, 1924, net, web ultimissime, ultime notizie mercato";

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
      href: "/channels/Calcio_Napoli_TV",
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
      href: "https://vip-software.herokuapp.com",
      label: "VIP Software"
    },
    {
      href: "https://taketopnews.com",
      label: "Take Top News"
    },
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
