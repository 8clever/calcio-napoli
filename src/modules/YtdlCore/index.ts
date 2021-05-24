import qs from "querystring";
import { ytdl } from "./types";

interface getInfoOptions {
  lang?: string;
  requestCallback?: () => {};
  requestOptions?: {};
}

const jsonClosingChars = /^[)\]}'\s]+/;
const parseJSON = (json: string) => {
  if (!json || typeof json === 'object') {
    return json;
  } 
  try {
    json = json.replace(jsonClosingChars, '');
    return JSON.parse(json);
  } catch (err) {
    throw Error(`Error parsing: ${err.message}`);
  }
};

const INFO_HOST = 'www.youtube.com';
const INFO_PATH = '/get_video_info';
const VIDEO_EURL = 'https://youtube.googleapis.com/v/';

export const getVideoInfo = async (id: string, options: getInfoOptions): Promise<ytdl.videoInfo> => {
  const url = new URL(`https://${INFO_HOST}${INFO_PATH}`);
  url.searchParams.set('video_id', id);
  url.searchParams.set('eurl', VIDEO_EURL + id);
  url.searchParams.set('ps', 'default');
  url.searchParams.set('gl', 'US');
  url.searchParams.set('hl', options.lang || 'en');
  url.searchParams.set("html5", '1');
  // fetch info
  const res = await fetch(url.toString(), {
    credentials: "omit"
  });
  const text = await res.text();
  let info = qs.parse(text) as any;
  // parse info
  const videoInfo = parseJSON(info.player_response);
  const rvs = qs.parse(info.rvs);
  // add related videos
  videoInfo.related_videos = [];
  for (let i = 0;i<rvs.title.length;i++) {
    const title = rvs.title[i];
    const thumbnail = rvs.iurlhq[i] || rvs.iurlmq[i];
    const match = thumbnail.match(/\/vi\/([^\/]+)\//);
    const id = match && match[1] || "";
    videoInfo.related_videos.push({
      id,
      title,
      thumbnails: [
        {
          url: thumbnail
        }
      ]
    });
  }
  // change author
  videoInfo.videoDetails.author = {
    name: videoInfo.videoDetails.author
  }
  // set thumbs
  videoInfo.videoDetails.thumbnails = videoInfo.videoDetails.thumbnail.thumbnails;
  // set publishDate
  videoInfo.videoDetails.publishDate = videoInfo.microformat.playerMicroformatRenderer.publishDate;
  // set description
  videoInfo.videoDetails.description = videoInfo.videoDetails.shortDescription;
  return videoInfo;
};