import { NextApiRequest, NextApiResponse } from "next";
import { media } from "../../src/components/Media";
import { Client } from "../../src/modules/YoutubeI";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  req

  const container = (body: string) => {
    return (
      `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         ${body}
      </urlset> 
      `
    )
  }

  const item = (path: string = "", changefreq: "hourly" | "weekly" | "daily" | "never") => {
    return (
      `
      <url>
        <loc>${media.domain + path}</loc>
        <changefreq>${changefreq}</changefreq>
      </url>
      `
    )
  }

  const items: string[] = [];

  [ media.menu ].forEach(m => {
    m.forEach(i => {
      items.push(item(i.href, i.changefreq || "never"))
    })
  })

  const yt = new Client();
  const ch = await yt.findOne(media.channelName, { type: "channel" });
  await ch?.nextVideos(0);

  ch?.videos.forEach(i => {
    items.push(item("/news/" + i.id, "weekly"));
  });
  
  res.setHeader("Content-type", "application/xml; charset=utf-8");
  res.send(
    container(
      items.join("")
    )
  );
}