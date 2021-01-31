import { GetServerSideProps } from "next"
import { Col, Container, Row } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import React from "react";
import matchesParser, { Match } from "livesoccertv-parser";
import { AdResponsive } from "../src/components/AdSlot";

const title = "Calcio Napoli - Ultima partite Napoli. Prossima partite Napoli"

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
      <Container page>
        <h1>Ultima partite Napoli. Prossima partite Napoli</h1>
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
                      TV: {m.tvs.join(", ")}
                    </small>
                  </Col>
                  {
                    idx % 6 === 5 ?
                    <Col>
                      <AdResponsive />
                    </Col> :
                    null
                  }
                </React.Fragment>
              )
            })
          }
        </Row>
      </Container>
    </Layout>
  ) 
}

export const config = {
  amp: true
}

export default Matches;