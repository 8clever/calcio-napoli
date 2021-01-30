import { GetServerSideProps } from "next";
import { AmpAnalytics, AmpImg, AmpStory, AmpStoryGridLayer, AmpStoryPage } from "react-amphtml";
import { media } from "../src/components/Media";
import { theme } from "../src/components/Theme";
import { LayoutHead } from "../src/components/Layout"
import { IProps as ChannelProps } from "../src/components/Channel";
import { 
  getServerSideProps as indexProps,
} from "./index";

export const config = {
  amp: true
}

export const getServerSideProps: GetServerSideProps<ChannelProps> = indexProps;

const title = "Calcio Napoli | Stories"

const img = media.domain + "/images/favicon.png";

const Story = (props: ChannelProps) => {
  const list = props.list.playlist.slice(0, 10);
  return (
    <>
      <LayoutHead 
        title={title}
        description={title}
      />
      <AmpStory 
        standalone
        title={title}
        publisher="Calcio Napoli"
        publisher-logo-src={img}
        poster-portrait-src={img}
        poster-landscape-src={img}
        entity-logo-src={img}
        specName="default">
        <AmpAnalytics
          type="gtag" 
          id={"gtag"}
          config={"/analytics_story.json"}
          data-credentials="include">
        </AmpAnalytics>
        {list.map(i => {
          return (
            <AmpStoryPage 
              id={i.id}
              key={i.id}>
              <AmpStoryGridLayer template="fill">
                <AmpImg
                  animate-in="fade-in"
                  specName="default"
                  src={`https://img.youtube.com/vi/${i.id}/maxresdefault.jpg`}
                  width={853}
                  height={640}
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
                    <AmpImg 
                      src={img}
                      specName="default" 
                      height={30}
                      width={30}
                    />
                    <div className="brand">
                      Calcio Napoli
                    </div>
                  </div>
                  <a href={media.domain + "/news/" + i.id}>
                    <h1 animate-in="fly-in-bottom">
                      {i.name}
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
          margin-left: 15px;
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