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
import { Youtube } from "../../src/modules/Youtube";
import { Client, Video } from "youtubei"

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

export const getServerSideProps: GetServerSideProps<IProps, IQuery> = async (props) => {
  try {
    if (!props.params?.id) throw new Error("Invalid params ID");

    const yt = new Client();
    const video: Video = await yt.getVideo(props.params.id);
    if (!video) throw new Error("Video not found: " + props.params.id);

    const thumb = video.thumbnails.best
    const image = thumb?.includes("maxres") ? thumb : Youtube.DefaultImage();

    return {
      props: {
        news: {
          id: video.id,
          publishDate: video.uploadDate,
          title: video.title,
          image,
          description: video.description || "",
          authorName: media.channelName,
          keywords: video.tags,
          relatedVideos: video.related.slice(0, 10).map((v) => {
            return {
              id: v.id,
              image: v.thumbnails.best || "",
              title: v.title
            }
          })
        }
      }
    }
  } catch (e) {
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