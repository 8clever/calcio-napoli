import { GetServerSideProps } from "next"
import { Col, Container, Row } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import React from "react";
import matchesParser, { Match } from "livesoccertv-parser";
import { Anchor } from "../src/components/Hybrid";
import { ResponsiveIframe } from "../src/components/ResponsiveIframe";

const title = "Calcio Napoli - Partite recenti e imminenti del"
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
  const nextMatchUrl = "/teams/ssc-napoli-194680/iframe/?type=team-next-match&lang_id=5&country=108&template=17&team=194680&timezone=Europe/Rome&time=24&width=520&height=200&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF"

  return (
    <Layout title={title} description={title}>
      <Container page>
        <h1>Partite recenti e imminenti del</h1>
        <ResponsiveIframe 
          src={nextMatchUrl}
        />
        <Row>
          {
            props.matches.reverse().map((m,idx) => {
              return (
                <React.Fragment key={idx}>
                  <Col md={6}>
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
                        }}>Vivere</span> :

                        m.played ?
                        <span style={{
                          color: "#13cf00"
                        }}>Giocato</span> :

                        <span style={{
                          color: "gray"
                        }}>Non giocato</span>
                      }: {m.date} {m.time}
                      <br />
                      TV: <Anchor href="/sportitalia">Sport Italia</Anchor>
                    </small>
                  </Col>
                </React.Fragment>
              )
            })
          }
        </Row>
      </Container>
    </Layout>
  ) 
}

export default Matches;