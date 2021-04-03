import { GetServerSideProps } from "next";
import { AmpAnalytics, AmpImg, AmpStory, AmpStoryGridLayer, AmpStoryPage } from "react-amphtml";
import { media } from "../src/components/Media";
import { theme } from "../src/components/Theme";
import { LayoutHead } from "../src/components/Layout"
import { IProps as ChannelProps } from "../src/components/Channel";
import { 
  getServerSideProps as indexProps,
} from "./index";
import { ParsedUrlQuery } from "querystring";
import { Thing, WithContext } from "schema-dts";
import moment from "moment";
import { StructuredData } from "../src/components/StructuredData";

export const config = {
  amp: true
}

interface IProps extends ParsedUrlQuery {
  page: string;
}

export const getServerSideProps: GetServerSideProps<ChannelProps, IProps> = indexProps;

const title = "Calcio Napoli | Stories"

const posterPortrait = media.domain + "/images/logo_portrait.png";
const posterSquare = media.domain + "/images/logo_square.png";
const publisherLogo = media.domain + "/images/logo_96x96.png";
const logo = media.domain + "/images/logo_600x60.png";

const Story = (props: ChannelProps) => {

  const thing: WithContext<Thing> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": media.domain + "/story"
    },
    "image": props.list.map(i => i.thumbnail),
    "datePublished": moment().format("YYYY-MM-DD"),
    "dateModified": moment().format("YYYY-MM-DD HH:mm:ss"),
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
      "name": "Calcio Napoli Podcasts"
    }
  }

  return (
    <>
      <LayoutHead 
        title={title}
        description={title}
      />
      <StructuredData 
        data={thing}
      />
      <AmpStory 
        standalone
        title={title}
        publisher="Calcio Napoli"
        publisher-logo-src={publisherLogo}
        poster-portrait-src={posterPortrait}
        poster-square-src={posterSquare}
        specName="default">
        <AmpAnalytics
          type="gtag" 
          id={"gtag"}
          config={"/analytics_story.json"}
          data-credentials="include">
        </AmpAnalytics>
        {props.list.map(i => {
          return (
            <AmpStoryPage 
              id={i.id}
              key={i.id}>
              <AmpStoryGridLayer template="fill">
                <AmpImg
                  animate-in="fade-in"
                  specName="default"
                  src={i.thumbnail}
                  width={720}
                  height={1280}
                  layout={"fill"}
                >
                </AmpImg>
              </AmpStoryGridLayer>
              <AmpStoryGridLayer 
                template="vertical">
                <div className="container">
                  <div 
                    className="ico" 
                    animate-in-delay="0.3s"
                    animate-in-duration="2s"
                    animate-in="fade-in">
                    <div className="brand">
                      Calcio Napoli
                    </div>
                  </div>
                  <a href={media.domain + "/news/" + i.id}>
                    <h1 animate-in="fly-in-bottom">
                      {i.title}
                    </h1>
                  </a>
                </div>
              </AmpStoryGridLayer>
            </AmpStoryPage>
          )
        })}
      </AmpStory>
      <style jsx>{`
        :global(amp-story-grid-layer) {
          position: relative;
          padding: 0;
        }
        :global(amp-story-page) {
          background: black;
        }
        .ico {
          display: flex;
        }
        .ico .brand {
          align-self: flex-end;
          font-size: 18px;
        }
        .container {
          display: flex;
          position: absolute;
          flex-direction: column;
          justify-content: space-between;
          left:0;
          top:0;
          right:0;
          bottom: 0;
          padding: 40px 20px;
          color: ${theme.color.white};
          font-family: Roboto, sans-serif;
          font-size: 25px;
          background: rgba(0,0,0,0.4);
        }
        .container a {
          font-size: 30px;
          text-decoration: none;
          color: ${theme.color.white};
        }
      `}</style>
    </>
  )
}

export default Story;