import { Container } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import React from "react";
import { ResponsiveIframe } from "../src/components/ResponsiveIframe";

const title = "Calcio Napoli - Partite recenti e imminenti del"

interface GoogleIframeProps {
  src: string;
}

export const GoogleIframe = (props: GoogleIframeProps) => {
  return (
    <ResponsiveIframe 
      src={props.src}
      taggedElement={[
        "#sports-app",
        "#main"
      ]}
      onComplete={(cw) => {
        const lb = cw.document.body.querySelector("#lb");
        lb?.remove();
      }}
    />
  )
}

export const Matches = () => {
  const url = "/googlesearch?q=napoli+matches#sie=t;/m/048xg8;2;/m/03zv9;mt;fp;1;;"
  return (
    <Layout title={title} description={title}>
      <Container page fluid>
        <h1>Partite recenti e imminenti del</h1>
        <GoogleIframe src={url} />
      </Container>
    </Layout>
  ) 
}

export default Matches;