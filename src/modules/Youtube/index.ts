import { media } from "../../components/Media"

export class Youtube {

  public static DefaultImage () {
    return media.domain + "/images/maxresdefault.jpg"
  }

  public static MaxResDefault (id: string) {
    return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  }
}

export namespace Youtube {
  
  export interface Video {
    author_name: string
    author_url: string;
    height: number;
    width: number;
    html: string;
    provider_name: string;
    provider_url: string;
    thumbnail_height: number;
    thumbnail_url: string;
    thumbnail_width: number;
    title: string;
    type: string
    version: string;
  }
}