import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { AmpYoutube } from "react-amphtml";
import ytdl from "ytdl-core";
import Layout from "../../src/components/Layout";
import _ from 'lodash';
import { Container } from "../../src/components/Grid";
import { WithContext, Thing } from "schema-dts";
import { media } from "../../src/components/Media"
import { StructuredData } from "../../src/components/StructuredData";
import { AdResponsive } from "../../src/components/AdSlot";

interface IProps {
  info: ytdl.videoInfo["videoDetails"]
}

interface IQuery extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<IProps, IQuery> = async (props) => {
  try {
    const info = await ytdl.getBasicInfo(props.params!.id);
    delete info.videoDetails.author.subscriber_count
    return {
      props: {
        info: info.videoDetails
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
          <AmpYoutube 
            {...{
              layout: "responsive",
              width: "480",
              height: "270"
            } as any}
            data-videoid={props.info.videoId}
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
          <p>
            <small>{props.info.keywords?.join(", ")}</small>
          </p>
        </Container>
      </div>
    </Layout>
  )
}

export const config = {
  amp: true
}

export default News;