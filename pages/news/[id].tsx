import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import ytdl from "ytdl-core";
import Layout from "../../src/components/Layout";
import _ from 'lodash';
import { Container, Row, Col } from "../../src/components/Grid";
import { WithContext, Thing } from "schema-dts";
import { media } from "../../src/components/Media"
import { StructuredData } from "../../src/components/StructuredData";
import { AdResponsive } from "../../src/components/AdSlot";
import { Thumbanil } from "../../src/components/Thumbnail";
import nextConfig from "../../next.config";
import { Youtube } from "../../src/components/Hybrid"

interface IProps {
  info: ytdl.videoInfo["videoDetails"],
  related: ytdl.videoInfo["related_videos"]
}

interface IQuery extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<IProps, IQuery> = async (props) => {
  try {
    const info = await ytdl.getBasicInfo(props.params!.id, {
      lang: nextConfig.i18n.defaultLocale
    });
    delete info.videoDetails.author.subscriber_count
    return {
      props: {
        info: info.videoDetails,
        related: info.related_videos.slice(0, 6)
      }
    }
  } catch (e) {
    return {
      redirect: {
        statusCode: 302,
        destination: "/"
      }
    }
  }
  
}

export const News = (props: IProps) => {
  const thing: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": props.info.title,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": media.domain + "/news/" + props.info.videoId
    },
    "image": [
      `https://img.youtube.com/vi/${props.info.videoId}/hqdefault.jpg`
    ],
    "datePublished": props.info.publishDate,
    "dateModified": props.info.publishDate,
    "publisher": {
      "@type": "Organization",
      "name": "Calcio Napoli",
      "logo": {
        "@type": "ImageObject",
        "url": media.domain + "/images/favicon.png"
      }
    },
    "author": {
      "@type": "Person",
      "name": props.info.author.name
    }
  }
  return (
    <Layout 
      hybrid
      og={{
        image: `https://img.youtube.com/vi/${props.info.videoId}/hqdefault.jpg`
      }}
      description={props.info.description || ""}
      title={props.info.title}>
      <StructuredData
        data={thing}
      />
      <div style={{ minHeight: "100vh" }}>
        <Container>
          <h1>{props.info.title}</h1>
          <Youtube
            width="480"
            height="270"
            videoId={props.info.videoId}
          />
          <p 
            style={{
              fontSize: 20,
              overflow: "hidden"
            }}
            dangerouslySetInnerHTML={{
            __html: props.info.description?.trim()
              .replace(/(https:\/\/([^\/\s]+)[^\s]*)/gmi, "<a target='_blank' href='$1'>$2</a>")
              .replace(/#([^\s]+)/gmi, "<a target='_blank' href='https://youtube.com/hashtag/$1'>#$1</a>")
              .replace(/\n/gmi, "<br/>")
              || ""
          }}></p>
          <AdResponsive />
          <h2>Notizie correlate</h2>
          <Row>
            {
              props.related.map(v => {
                return (
                  <Col md={6} key={v.id}>
                    <Thumbanil
                      imageSrc={v.thumbnails[v.thumbnails.length - 1].url}
                      href={`/news/${v.id}`}
                      title={v.title || ""}
                    />
                  </Col>
                )
              })
            }
          </Row>
          <p>
            <small>{props.info.keywords?.join(", ")}</small>
          </p>
        </Container>
      </div>
    </Layout>
  )
}

export const config = {
  amp: "hybrid"
}

export default News;