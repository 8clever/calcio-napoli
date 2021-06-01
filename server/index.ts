import next from "next";
import express from "express";
import { media } from "../src/components/Media";
import { getVideoInfo } from "../src/modules/YtdlCore"

const production = process.env.NODE_ENV === 'production'
const app = next({ dev: !production });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const test = async (count: number) => {
  const arr = new Array(count);
  const promises = arr.map(() => {
    return getVideoInfo("iK0axRC3FsY", {});
  });
  await Promise.all(promises);
  console.log("Valid count: " + count);
};

(async () => {
  await test(1);
  await test(60);
  await test(120);
  await test(240);
  await test(480);
  await test(1000);
  await test(5000);
  await test(10000);
  await test(100000);
})();

app.prepare().then(() => {
  const server = express()
  
  server.all('*', (req, res) => {

    if (production && req.headers["x-forwarded-proto"] === "http") {
      res.redirect(media.domain + req.originalUrl, 301);
      return;
    }

    return handle(req, res)
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  });
})