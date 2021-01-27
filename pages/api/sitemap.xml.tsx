import { NextApiRequest, NextApiResponse } from "next";
import { media } from "../../src/components/Media";
import { getNewsList } from "../index";

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

  media.menu.forEach(i => {
    items.push(item(i.href, i.changefreq || "never"))
  })

  const list = await getNewsList();

  list.playlist.forEach(i => {
    items.push(item("/news/" + i.id, "never"))
  });
  
  res.setHeader("Content-type", "application/xml; charset=utf-8");
  res.send(
    container(
      items.join("")
    )
  );
}