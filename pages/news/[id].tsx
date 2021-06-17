import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import _ from 'lodash';

import Layout from "../../src/components/Layout";
import { Container, Row, Col } from "../../src/components/Grid";
import { WithContext, Thing } from "schema-dts";
import { media } from "../../src/components/Media"
import { StructuredData } from "../../src/components/StructuredData";
import { Thumbanil } from "../../src/components/Thumbnail";
import { Youtube as HybridYoutube } from "../../src/components/Hybrid"
import Head from "next/head";
import { theme } from "../../src/components/Theme";
import { useAmp } from "next/amp";
import { getVideoInfo } from "../../src/modules/YtdlCore";
import { Youtube } from "../../src/modules/Youtube";
import { ytdl } from "../../src/modules/YtdlCore/types";
import Heroku from "heroku-client";
import { Queue } from "../../src/modules/Queue";

const { HEROKU_API_KEY } = process.env;

const rebootCodes = new Set<number>([ 429 ]);

interface News {
  id: string;
  image: string;
  description?: string;
  title: string;
  publishDate: string;
  authorName: string;
  keywords: string[];
  relatedVideos: {
    id: string;
    image: string;
    title: string;
  }[]
}

interface IProps {
  news: News;
}

interface IQuery extends ParsedUrlQuery {
  id: string;
}

let requestReboot = false;
let firstError = null as null | number;
const queue = new Queue<ytdl.videoInfo>();
export const getServerSideProps: GetServerSideProps<IProps, IQuery> = async (props) => {
  try {
    const video = await queue.resolve(async () => {
      return getVideoInfo(props.params?.id || "", {
        lang: props.locale 
      });
    });

    const thumb = video.videoDetails.thumbnails[video.videoDetails.thumbnails.length - 1].url;
    const image = thumb.includes("maxres") ? thumb : Youtube.DefaultImage();

    if (firstError) {
      const diff = (new Date().valueOf() - firstError) / 1000;
      console.log(`Success after: ${diff} sec`);
      firstError = null;
    }
    return {
      props: {
        news: {
          id: video.videoDetails.videoId,
          publishDate: video.videoDetails.publishDate,
          title: video.videoDetails.title,
          image,
          description: video.videoDetails.description || "",
          authorName: video.videoDetails.author?.name || "",
          keywords: video.videoDetails.keywords || [],
          relatedVideos: video.related_videos.slice(0, 10).map((v: any) => {
            return {
              id: v.id || "",
              image: v.thumbnails[v.thumbnails.length - 1].url,
              title: v.title || ""
            }
          })
        }
      }
    }
  } catch (e) {
    if (!firstError) {
      firstError = new Date().valueOf();
    }
    if (
      process.env.NODE_ENV === "production" &&
      e instanceof ytdl.CustomError && 
      rebootCodes.has(e.code) &&
      !requestReboot
    ) {
      requestReboot = true;
      const client = new Heroku({ token: HEROKU_API_KEY as string });
      await client.delete(`/apps/calcio-napoli/dynos`);
    }
    return {
      redirect: {
        statusCode: 302,
        destination: `/error?status=404&message=${e.message}`
      }
    }
  }
  
}

export const News = (props: IProps) => {
  const { 
    image, 
    description, 
    title, 
    id, 
    publishDate, 
    authorName, 
    relatedVideos,
    keywords
  } = props.news;
  const isAmp = useAmp();
  const logo = media.domain + "/images/logo_600x60.png";

  const thing: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": media.domain + "/news/" + id
    },
    "image": [
      image
    ],
    "datePublished": publishDate,
    "dateModified": publishDate,
    "publisher": {
      "@type": "Organization",
      "name": "Calcio Napoli",
      "logo": {
        "@type": "ImageObject",
        "url": logo
      }
    },
    "author": {
      "@type": "Person",
      "name": authorName
    }
  }
  return (
    <Layout 
      hybrid
      og={{
        image
      }}
      description={description || ""}
      title={title}>
      <Head>
        <link rel="preload" as="image" href={image} />
      </Head>
      <StructuredData
        data={thing}
      />
      <div style={{ minHeight: "100vh" }}>
        <Container page>
          <h1>{title}</h1>
          <HybridYoutube
            thumbnail={image}
            width="480"
            height="270"
            videoId={id}
          />
          <p 
            className="description-container"
            style={{
              fontSize: 20,
              overflow: "hidden"
            }}
            dangerouslySetInnerHTML={{
            __html: description?.trim()
              //.replace(/\"/gmi, "'")
              //.replace(/(https:\/\/([^\/\s,()]+)[^\s,()]+)/gmi, `<a rel="noreferrer" target="_blank" href="$1">$2</a>`)
              .replace(/\n/gmi, "<br/>")
              || ""
          }}></p>
          {
            isAmp ?
            null :
            <>
              <h2>Notizie correlate</h2>
              <Row>
                {
                  relatedVideos.map(v => {
                    return (
                      <Col md={6} key={v.id}>
                        <Thumbanil
                          imageSrc={v.image}
                          href={`/news/${v.id}`}
                          title={v.title || ""}
                        />
                      </Col>
                    )
                  })
                }
              </Row>
            </>
          }
          <p>
            {keywords.join(", ")}
          </p>
        </Container>
      </div>
      <style jsx>{`
        .description-container :global(a) {
          color: ${theme.color.white};
        }
      `}</style>
    </Layout>
  )
}

export const config = {
  amp: "hybrid"
}

export default News;