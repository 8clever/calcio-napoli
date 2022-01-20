import { NextApiRequest, NextApiResponse } from "next";
import { media } from "../../../src/components/Media";

export const container = (body: string) => {
  return (
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${body}
    </urlset> 
    `
  )
}

export const item = (path: string = "", lastmod?: Date) => {
  return (
    `
    <url>
      <loc>${media.domain + path}</loc>
      ${lastmod ? `<lastmod>${lastmod.toJSON()}</lastmod>` : ""}
    </url>
    `
  )
}

export default async function handler (
  req: NextApiRequest, 
  res: NextApiResponse
) {
  req
  const items: string[] = [];

  [ media.menu ].forEach(m => {
    m.forEach(i => {
      items.push(item(i.href))
    })
  });

  res.setHeader("Content-type", "application/xml; charset=utf-8");
  res.send(
    container(
      items.join("")
    )
  );
}