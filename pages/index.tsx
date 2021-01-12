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
      list: {
        ...list,
        playlist: list.playlist.slice(0, 10)
      }
    }
  }
}

const IndexPage = (props: IProps) => { 
  return (
    <Layout title="Calcio Napoli | Home">
      <div className="container">
        <Container>
          <Row>
            {
              props.list.playlist.map(i => {
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
        </Container>
      </div>
      <style jsx>{`
        a {
          color: ${theme.color.white}
        }
        .container {
          min-height: 100vh;
        }
        .img-responsive {
          transition: all 0.3s;
          position: relative;
          padding-top: 56%
        }
        .img-responsive:hover {
          transform: scale(1.1);
        }
        .img-responsive h3 {
          position: absolute;
          left: 10px;
          top: 10px;
        }
      `}</style>
    </Layout>
  )
}

export const config = {
  amp: true
}

export default IndexPage
