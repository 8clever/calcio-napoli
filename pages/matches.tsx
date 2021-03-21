import { Container } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import React from "react";
import { ResponsiveIframe } from "../src/components/ResponsiveIframe";

const title = "Calcio Napoli - Partite recenti e imminenti del"

export const Matches = () => {
  const url = "/googlesearch?q=napoli+matches#sie=t;/m/048xg8;2;/m/03zv9;mt;fp;1;;"
  return (
    <Layout title={title} description={title}>
      <Container page fluid>
        <h1>Partite recenti e imminenti del</h1>
        <ResponsiveIframe 
          src={url}
          taggedElement={[
            "#sports-app",
            "#main"
          ]}
        />
      </Container>
    </Layout>
  ) 
}

export default Matches;