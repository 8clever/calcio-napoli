import { GetServerSideProps } from 'next'
import { Col, Container, Row } from '../src/components/Grid'
import Layout from '../src/components/Layout'
import { Playlist, scrapePlaylist } from "youtube-playlist-scraper";
import { AmpImg } from 'react-amphtml';
import { theme } from '../src/components/Theme';

interface IProps {
  list: Playlist
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const listId = "PL2HP8OJyZJpNe-5yJdL9o5n-utvD_H2pP";
  const list = await scrapePlaylist(listId);
  return {
    props: {
      list
    }
  }
}

const IndexPage = (props: IProps) => { 
  const videoList = props.list.playlist.slice(0, 10);

  return (
    <Layout title="Calcio Napoli | Ultime notizie">
      <div className="container">
        <Container>
          <h1>Ultime notizie</h1>
          <Row>
            {
              videoList.map(i => {
                return (
                  <Col 
                    key={i.id}
                    md={6}>
                    <a href={`/news/${i.id}`}>
                      <div className="img-responsive">
                        <AmpImg 
                          specName="default"
                          src={`https://img.youtube.com/vi/${i.id}/hqdefault.jpg`}
                          layout="fill"
                        />
                        <h3>{i.name}</h3>
                      </div>
                    </a>
                  </Col>
                )
              })
            }
          </Row>
          <h2>Ultime novità</h2>
          <Row>
            {
              props.list.playlist.map(i => {
                return (
                  <Col 
                    key={i.id}
                    md={6}>
                    <a href={`/news/${i.id}`}>{i.name}</a>
                    <small>{i.title}</small>
                  </Col>
                )
              })
            }
          </Row>
        </Container>
      </div>
      <style jsx>{`
        a {
          color: ${theme.color.white};
          text-decoration: none;
        }
        .container {
          min-height: 100vh;
        }
        .img-responsive {
          transition: all 0.3s;
          position: relative;
          padding-top: 56%;
          overflow: hidden;
        }
        .img-responsive :global(amp-img) {
          margin-top: -10%;
          margin-bottom: -10%;
        }
        .img-responsive:hover {
          transform: scale(1.03);
        }
        .img-responsive h3 {
          margin: 0;
          padding: 5px;
          background: rgba(0,0,0,0.5);
          position: absolute;
          left: 0;
          bottom: 0;
        }
      `}</style>
    </Layout>
  )
}

export const config = {
  amp: true
}

export default IndexPage
