import { media } from "../../components/Media"
import fetch from "node-fetch";

export class Youtube {

  public static DefaultImage () {
    return media.domain + "/images/maxresdefault.jpg"
  }

  public static MaxResDefault (id: string) {
    return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  }

  public static YOUTUBE_URL = "https://www.youtube.com";

  public static async GetVideoInfo (id: string): Promise<Youtube.Video> {
    const urlVideo = new URL(`${Youtube.YOUTUBE_URL}/watch`);
    urlVideo.searchParams.set("v", id);

    const urlEmbed = new URL(`${Youtube.YOUTUBE_URL}/oembed`);
    urlEmbed.searchParams.set("url", urlVideo.toString());
    urlEmbed.searchParams.set("format", "json");

    const res = await fetch(urlEmbed.toString());
    const json = await res.json();
    return json;
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