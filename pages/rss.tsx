import { GetServerSideProps } from "next"
import Layout from "../src/components/Layout"
import RssParser from "rss-parser";
import { Container } from "../src/components/Grid";
import moment from "moment";
import { theme } from "../src/components/Theme";

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
      description=""
      title="Calcio Napoli | 24">
      <div style={{ minHeight: "100vh" }}>
        <Container>
          <h1>Calcio Napoli 24</h1>
          {
            props.items.map((i,idx) => {
              return (
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
          margin-bottom: 5px;
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
  amp: true
}

export default RSS;