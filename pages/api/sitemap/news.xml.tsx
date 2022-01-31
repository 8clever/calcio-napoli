import { NextApiRequest, NextApiResponse } from "next";
import { media } from "../../../src/components/Media";
import { item, container } from "./static.xml";
import { Client } from "youtubei";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { pages = "0" } = req.query;
  const items: string[] = [];
  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;
  const datesMap = new Map([
    [ "se", sec ],
    [ "mi", min ],
    [ "ho", hour ],
    [ "da", day ],
    [ "we", day * 7 ],
    [ "mo", day * 30 ],
    [ "ye", day * 365 ],
  ]);

  const yt = new Client();
  const ch = await yt.findOne(media.channelName, { type: "channel" });
  await ch?.nextVideos(Number(pages));

  ch?.videos.forEach(i => {
    const [ count, age ] = (i.uploadDate || "")
      .replace("Streamed ", "")
      .split(" ") || [];
    const sign = age?.slice(0,2)
    const unit = datesMap.get(sign);
    const timestamp = 
      unit ?
      Date.now() - (unit * Number(count)) :
      Date.now()

    items.push(item("/news/" + i.id, new Date(timestamp)));
  });
  
  res.setHeader("Content-type", "application/xml; charset=utf-8");
  res.send(
    container(
      items.join("")
    )
  );
}