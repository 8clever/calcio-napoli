import { GetServerSideProps } from "next";
import { AmpImg, AmpStory, AmpStoryGridLayer, AmpStoryPage } from "react-amphtml";
import { media } from "../src/components/Media";
import { theme } from "../src/components/Theme";
import { LayoutHead } from "../src/components/Layout"
import { 
  getServerSideProps as indexProps,
  IProps
} from "./index";

export const config = {
  amp: true
}

export const getServerSideProps: GetServerSideProps<IProps> = indexProps;

const title = "Calcio Napoli | Stories"

const img = media.domain + "/images/favicon.png";

const Story = (props: IProps) => {
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
        specName="default">
        {list.map(i => {
          return (
            <AmpStoryPage 
              id={i.id}
              key={i.id}>
              <AmpStoryGridLayer template="vertical">
                <AmpImg
                  animate-in="fly-in-top"
                  style={{
                    marginTop: "15%"
                  }}
                  specName="default"
                  src={`https://img.youtube.com/vi/${i.id}/hqdefault.jpg`}
                  width={600}
                  height={450}
                  layout={"responsive"}
                >
                </AmpImg>
              </AmpStoryGridLayer>
              <AmpStoryGridLayer template="vertical">
                <div className="container">
                  <div className="ico" animate-in="fade-in">
                    <AmpImg 
                      src={img}
                      specName="default" 
                      height={60}
                      width={60}
                    />
                    <div className="brand">
                      Calcio Napoli
                    </div>
                  </div>
                  <h1 animate-in="fly-in-bottom">{i.name}</h1>
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
          margin-bottom: 15px;
        }
        .ico .brand {
          align-self: flex-end;
          margin-left: 15px;
          font-size: 18px;
        }
        .container {
          position: absolute;
          padding: 20px;
          bottom: 0;
          color: ${theme.color.white};
          font-family: Roboto, sans-serif;
          font-size: 25px;
        }
      `}</style>
    </>
  )
}

export default Story;