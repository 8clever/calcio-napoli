import next from "next";
import express from "express";
import { media } from "../src/components/Media";
import { Mail } from "../src/modules/Mail";
import ReactDOMServer from "react-dom/server";
import React from 'react';
import proxy from 'express-http-proxy';

const production = process.env.NODE_ENV === 'production'
const app = next({ dev: !production });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  const makeProxy = (from: string, to: string, replaces: string[]) => {
    server.use(from, proxy(to, {
      userResDecorator: async (...params) => {
        const data = params[1];
        let result = data.toString()

        for (const match of replaces) {
          //const re = new RegExp(`((?:href|src|p)=(?:"|')?)(${match})`, "gm")
          const re = new RegExp(`(${match})`, "gm")
          result = result.replace(re, `${from}$1`);
        }

        return result;
      }
    }))
  }

  makeProxy("/iframe/sportradar", "https://sportcenter.sir.sportradar.com", [
    '/static',
    '/assets',
    '/betradar/css',
    '/translations'
  ])

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
    const html = ReactDOMServer.renderToStaticMarkup(
      <Mail.Doctype>
        Server ready on port: {port}
      </Mail.Doctype>
    )
    mail.send({
      subject: "Info!",
      html,
      text: "Server ready on port: " + port
    });
  });
})
