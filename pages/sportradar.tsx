import { Container } from "../src/components/Grid";
import Layout from "../src/components/Layout"
import React from "react";

const title = "Calcio Napoli - Statistiche dettagliate della partita";

export const SportItalia = () => {
  return (
    <Layout title={title} description={title}>
      <Container page fluid>
        <iframe
          style={{
            height: "200vh",
            width: "100%"
          }}
          frameBorder="false"
          src='https://sportcenter.sir.sportradar.com/sportitalia/' 
        />
      </Container>
    </Layout>
  )
}

export default SportItalia;