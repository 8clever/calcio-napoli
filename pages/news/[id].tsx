import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import ytdl from "ytdl-core";
import Layout from "../../src/components/Layout";
import _ from 'lodash';
import { Container, Row, Col } from "../../src/components/Grid";
import { WithContext, Thing } from "schema-dts";
import { media } from "../../src/components/Media"
import { StructuredData } from "../../src/components/StructuredData";
import { Thumbanil } from "../../src/components/Thumbnail";
import nextConfig from "../../next.config";
import { Youtube } from "../../src/components/Hybrid"
import { Youtube as Ytb } from "../../src/modules/Youtube"
import Head from "next/head";
import { theme } from "../../src/components/Theme";
import { useAmp } from "next/amp";

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
  const image = Ytb.MaxResDefault(props.info.videoId);
  const isAmp = useAmp();
  const logo = media.domain + "/images/logo_600x60.png";

  const thing: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": props.info.title,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": media.domain + "/news/" + props.info.videoId
    },
    "image": [
      image
    ],
    "datePublished": props.info.publishDate,
    "dateModified": props.info.publishDate,
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
      "name": props.info.author.name
    }
  }
  return (
    <Layout 
      hybrid
      og={{
        image
      }}
      description={props.info.description || ""}
      title={props.info.title}>
      <Head>
        <link rel="preload" as="image" href={image} />
      </Head>
      <StructuredData
        data={thing}
      />
      <div style={{ minHeight: "100vh" }}>
        <Container page>
          <h1>{props.info.title}</h1>
          <Youtube
            thumbnail={image}
            width="480"
            height="270"
            videoId={props.info.videoId}
          />
          <p 
            className="description-container"
            style={{
              fontSize: 20,
              overflow: "hidden"
            }}
            dangerouslySetInnerHTML={{
            __html: props.info.description?.trim()
              .replace(/(https:\/\/([^\/\s,()]+)[^\s,()]+)/gmi, "<a rel='noreferrer' target='_blank' href='$1'>$2</a>")
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
            </>
          }
          <p>
            {props.info.keywords?.join(", ")}
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