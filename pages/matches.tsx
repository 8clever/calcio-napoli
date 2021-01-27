import { GetServerSideProps } from "next"
import { AmpIframe } from "react-amphtml"
import { Col, Container, Row } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import { theme } from "../src/components/Theme"
import matchesParser, { Match } from "livesoccertv-parser";

const title = "Calcio Napoli - Classifica Serie A tim. Ultima partite Napoli. Prossima partite Napoli"

interface IProps {
  matches: Match[]
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {

  const matches = await matchesParser("italy", "napoli", {
    timezone: "Europe/Rome"
  });

  return {
    props: {
      matches
    }
  }
}

export const Matches = (props: IProps) => {
  return (
    <Layout title={title} description={title}>
      <Container>
        <h1>Ultima partite Napoli. Prossima partite Napoli</h1>
      </Container>
      <Container>
        <Row>
          {
            props.matches.reverse().map((m,idx) => {
              return (
                <Col key={idx} md={6}>
                  <h2 style={{
                    marginBottom: 5
                  }}>{m.game}</h2>
                  <h4 style={{
                    marginTop: 0,
                    marginBottom: 5
                  }}>{m.competition}</h4>
                  <small style={{
                    marginBottom: 15
                  }}>
                    {
                      m.live ?
                      <span style={{
                        color: "#d81920"
                      }}>vivere</span> :

                      m.played ?
                      <span style={{
                        color: "#13cf00"
                      }}>Giocato</span> :

                      <span style={{
                        color: "gray"
                      }}>Non giocato</span>
                    }: {m.date} {m.time}
                    <br />
                    TV: {m.tvs.join(", ")}
                  </small>
                </Col>
              )
            })
          }
        </Row>
      </Container>
      <Container>
        <h2>Classifica Serie A tim</h2>
        <div 
          className="iframe-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
          <AmpIframe frameborder="0"  scrolling="no" 
            {...{
              width: "400",
              height: "700"
            }} 
            src="https://www.fctables.com/italy/serie-a/iframe/?type=table&lang_id=5&country=108&template=17&team=194680&timezone=Europe/Rome&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=1&form=1&width=400&height=700&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF" />
        </div>
        <div style={{ marginBottom: 20 }}>
          <small>
            <a 
              style={{
                textDecoration: "none",
                color: theme.color.white
              }}
              href="/games">
              Classifica Serie A tim
            </a>
          </small>
        </div>
      </Container>
      <style jsx>{`
        .iframe-container :global(amp-iframe) {
          margin-bottom: 40px;
        }
      `}</style>
    </Layout>
  ) 
}

export const config = {
  amp: true
}

export default Matches;