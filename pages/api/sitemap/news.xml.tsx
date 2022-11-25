import { NextApiRequest, NextApiResponse } from "next";
import { media } from "../../../src/components/Media";
import { YoutubeServer } from "../../../src/modules/YoutubeServer";
import { item, container } from "./static.xml";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { pages = "1" } = req.query;
  const items: string[] = [];
  const yt = new YoutubeServer();
  const videos = await yt.getChannelVideos(media.channelId, Number(pages));

  videos.forEach(i => {
    const timestamp = Date.now()
    items.push(item("/news/" + i.id, new Date(timestamp)));
  });

  res.setHeader("Content-type", "application/xml; charset=utf-8");
  res.send(
    container(
      items.join("")
    )
  );
}