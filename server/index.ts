import next from "next";
import express from "express";
import { media } from "../src/components/Media";
import { Mail } from "../src/modules/Mail";

const production = process.env.NODE_ENV === 'production'
const app = next({ dev: !production });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

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
    console.log(`> Ready on http://localhost:${port}`);

    const mail = new Mail();
    mail.send({
      to: "test-yc7lzlfb6@srv1.mail-tester.com",
      subject: "Info!",
      message: Mail.Doctype(`Server ready on port: ${port}`)
    });
  });
})
