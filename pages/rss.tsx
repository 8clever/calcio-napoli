import { GetServerSideProps } from "next"
import Layout from "../src/components/Layout"
import RssParser from "rss-parser";
import { Container } from "../src/components/Grid";
import moment from "moment";
import { theme } from "../src/components/Theme";
import React from "react";
import { AdResponsive } from "../src/components/AdSlot";

interface IProps {
  items: Feed[]
}

interface Feed {
  title: string;
  isoDate: string; // date
  link: string;
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const parser = new RssParser();
  const feed = await parser.parseURL('https://www.calcionapoli24.it/feed/');
  const items = (feed.items as Feed[]);
  return {
    props: {
      items
    }
  }
}

export const RSS = (props: IProps) => {
  return (
    <Layout
      hybrid
      description="Calcio Napoli - 24 tutto napoli"
      title="Calcio Napoli | 24">
      <div style={{ minHeight: "100vh" }}>
        <Container>
          <h1>Calcio Napoli 24</h1>
          {
            props.items.map((i,idx) => {
              return (
                <React.Fragment key={idx}>
                  <div 
                    key={idx}
                    className="feed">
                    <a href={i.link}>
                      <h3 dangerouslySetInnerHTML={{
                        __html: i.title
                      }} />
                      {moment.utc(i.isoDate).local().format("DD.MM.YYYY HH:mm")}
                    </a>
                  </div>
                  {
                    idx % 10 === 9 ?
                    <AdResponsive /> : 
                    null
                  }
                </React.Fragment>
              )
            })
          }
        </Container>
      </div>
      <style jsx>{`
        .feed {
          margin-bottom: 15px;
        }
        .feed h3 {
          transition: all 0.3s;
          margin-bottom: 5px;
        }
        .feed h3:hover {
          color: ${theme.color.primary}
        }
        .feed a {
          color: ${theme.color.white};
          text-decoration: none;
        }
      `}</style>
    </Layout>
  )
}

export const config = {
  amp: "hybrid"
}

export default RSS;