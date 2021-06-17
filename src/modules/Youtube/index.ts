import { media } from "../../components/Media"

export class Youtube {

  public static DefaultImage () {
    return media.domain + "/images/maxresdefault.jpg"
  }

  public static MaxResDefault (id: string) {
    return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  }
}