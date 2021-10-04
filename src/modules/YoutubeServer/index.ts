import { google, youtube_v3 } from 'googleapis'
import { Client } from "youtubei";
import { media } from '../../components/Media';
import { Youtube } from '../Youtube';

export class YoutubeServer {

  googleClient: youtube_v3.Youtube;

  youtubeiClient: Client;

  constructor () {
    if (!process.env.YOUTUBE_API_KEY) {
      throw new Error("YOUTUBE_API_KEY: Invalid env variable");
    }

    this.googleClient = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API_KEY
    });

    this.youtubeiClient = new Client();
  }

  public getVideo: YoutubeServer.GetVideoInfo = async (id) => {
    let lastError = '';
    for await (const method of this.getVideoGenerator()) {
      try {
        const video = await method(id);
        return video;
      } catch (e: any) {
        lastError = e.message;
      }
    }
    throw new Error(lastError);
  }

  public static YOUTUBEI_NEXT_REQUEST = new Date().valueOf();

  public static DEFAULT_DELAY =
    process.env.GET_VIDEO_DELAY ?
    Number(process.env.GET_VIDEO_DELAY) :
    1000;

  private * getVideoGenerator () {
    if (new Date().valueOf() > YoutubeServer.YOUTUBEI_NEXT_REQUEST) {
      const rnd = YoutubeServer.DEFAULT_DELAY * Math.random();
      const delay = new Date().valueOf() + YoutubeServer.DEFAULT_DELAY + rnd;
      YoutubeServer.YOUTUBEI_NEXT_REQUEST = delay;
      yield this.getVideoByYoutubei;
    }
    yield this.getVideoByGoogle;
    yield this.getVideoByYoutubeiSearch;
  }

  private VIDEO_DESCRIPTION_REGEX = /"description":{"simpleText":"([^"]+)"/g;

  /** custom method for receive youtube description */
  private getVideoDescrtiption = async (id: string) => {
    const res = await fetch("https://m.youtube.com/watch?v=" + id);
    const text = await res.text() as string;
    const m = this.VIDEO_DESCRIPTION_REGEX.exec(text);
    if (m) {
      const str = m[1].replace(/\\n/gmi, '\n');
      return str;
    }
    return null;
  }

  private getRelatedVideosByChannel = async () => {
    try {
      const relatedVideos = await this.youtubeiClient.search(media.channelName, { type: "video" });
      return relatedVideos.slice(0, 10).map(rv => {
        return {
          id: rv.id,
          image: rv.thumbnails.best || Youtube.DefaultImage(),
          title: rv.title
        }
      })
    } catch {
      return [];
    }
  }

  private getVideoByYoutubeiSearch: YoutubeServer.GetVideoInfo = async (id) => {
    const [ videos, relatedVideos, description ] = await Promise.all([
      this.youtubeiClient.search(id, { type: "video" }),
      this.getRelatedVideosByChannel(),
      this.getVideoDescrtiption(id)
    ]);
    const video = videos[0];
    if (!video) throw new Error("getVideoByYoutubeiSearch: Video not found");

    const thumb = video.thumbnails.best
    const image = thumb?.includes("maxres") ? thumb : Youtube.DefaultImage();

    return {
      id,
      publishDate: video.uploadDate || "",
      title: video.title || "",
      image,
      description: description || "",
      authorName: media.channelName,
      keywords: [],
      relatedVideos
    }
  }

  private getVideoByYoutubei: YoutubeServer.GetVideoInfo = async (id) => {
    const video = await this.youtubeiClient.getVideo(id);
    if (!video) throw new Error("Youtubei: findOne exception");

    const thumb = video.thumbnails.best
    const image = thumb?.includes("maxres") ? thumb : Youtube.DefaultImage();

    return {
      id: video.id,
      publishDate: video.uploadDate,
      title: video.title,
      image,
      description: video.description || "",
      authorName: media.channelName,
      keywords: video.tags,
      relatedVideos: video.related.slice(0, 10).map((v) => {
        return {
          id: v.id,
          image: v.thumbnails.best || "",
          title: v.title
        }
      })
    }
  }

  private getVideoByGoogle: YoutubeServer.GetVideoInfo = async (id) => {
    const { data } = await this.googleClient.videos.list({
      id: [
        id
      ],
      part: [
        "snippet"
      ]
    });

    const video = data?.items && data.items[0];
    if (!video) throw new Error("Video not found");

    const image = video.snippet?.thumbnails?.maxres?.url || Youtube.DefaultImage();
    const relatedVideos = await this.getRelatedVideosByChannel();
    return {
      id,
      publishDate: video.snippet?.publishedAt || "",
      title: video.snippet?.title || "",
      image,
      description: video.snippet?.description || "",
      authorName: media.channelName,
      keywords: video.snippet?.tags || [],
      relatedVideos
    }
  }

}

export namespace YoutubeServer {

  export interface RelatedVideo {
    id: string;
    image: string;
    title: string;
  }
  export interface Video {
    id: string;
    image: string;
    description?: string;
    title: string;
    publishDate: string;
    authorName: string;
    keywords: string[];
    relatedVideos: RelatedVideo[];
  }

  export type GetVideoInfo = (id: string) => Promise<Video> 
}
