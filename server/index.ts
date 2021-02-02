import next from "next";
import express from "express";
import { media } from "../src/components/Media";

const production = process.env.NODE_ENV === 'production'
const app = next({ dev: !production });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express()
  
  server.all('*', (req, res) => {

    console.log(req.headers)
    if (req.headers["X-Forwarded-Proto"] === "http") {
      res.redirect(media.domain + req.originalUrl, 301);
      return;
    }

    return handle(req, res)
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  });
})