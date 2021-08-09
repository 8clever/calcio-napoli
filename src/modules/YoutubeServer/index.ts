import { google } from 'googleapis'
import { Client } from "youtubei";
import { media } from '../../components/Media';
import { Youtube } from '../Youtube';

if (!process.env.YOUTUBE_API_KEY) {
  throw new Error("YOUTUBE_API_KEY: Invalid env variable");
}

interface Video {
  id: string;
  image: string;
  description?: string;
  title: string;
  publishDate: string;
  authorName: string;
  keywords: string[];
  relatedVideos: {
    id: string;
    image: string;
    title: string;
  }[]
}

export class YoutubeServer {

  youtubeiClient = new Client();

  googleClient = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY
  });

  public getVideo = async (id: string): Promise<Video> => {
    let lastError = '';
    for await (const method of this.getVideoGenerator()) {
      if (!method) {
        break;
      }
      try {
        const video = await method(id);
        return video;
      } catch (e) {
        lastError = e.message;
      }
    }
    throw new Error(lastError);
  }

  private * getVideoGenerator () {
    yield this.getVideoByYoutubei;
    yield this.getVideoByGoogle;
  }

  private getVideoByYoutubei = async (id: string): Promise<Video> => {
    const client = new Client();
    const video = await client.getVideo(id);
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

  private getVideoByGoogle = async (id: string): Promise<Video> => {
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
    return {
      id,
      publishDate: video.snippet?.publishedAt || "",
      title: video.snippet?.title || "",
      image,
      description: video.snippet?.description || "",
      authorName: media.channelName,
      keywords: video.snippet?.tags || [],
      relatedVideos: []
    }
  }

}