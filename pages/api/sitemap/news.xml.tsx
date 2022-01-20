import { NextApiRequest, NextApiResponse } from "next";
import { media } from "../../../src/components/Media";
import { item, container } from "./static.xml";
import { Client } from "youtubei";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { pages = "0" } = req.query;
  const items: string[] = [];

  const yt = new Client();
  const ch = await yt.findOne(media.channelName, { type: "channel" });
  await ch?.nextVideos(Number(pages));

  ch?.videos.forEach(i => {
    items.push(item("/news/" + i.id));
  });
  
  res.setHeader("Content-type", "application/xml; charset=utf-8");
  res.send(
    container(
      items.join("")
    )
  );
}