import { Container } from "../src/components/Grid";
import Layout from "../src/components/Layout"
import React from "react";
import { ResponsiveIframe } from "../src/components/ResponsiveIframe";

const title = "Calcio Napoli - Statistiche dettagliate della partita";

export const SportItalia = () => {
  return (
    <Layout title={title} description={title}>
      <Container page fluid>
        <ResponsiveIframe 
          src="/sportitalia" 
          taggedElement=".sr-sc-content"
        />
      </Container>
    </Layout>
  )
}

export default SportItalia;