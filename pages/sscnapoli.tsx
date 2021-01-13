import { AmpTwitter } from "react-amphtml"
import { Container } from "../src/components/Grid"
import Layout from "../src/components/Layout"

export const News = () => {
  return (
    <Layout 
      description="Calcio Napoli | SSC Napoli"
      title="Calcio Napoli | SSC Napoli">
      <Container page>
        <h1>SSC Napoli</h1>
        <AmpTwitter 
          {...{
            layout: "responsive",
            width: 300,
            height: 400
          }}
          data-timeline-source-type="list"
          data-timeline-id="1349427952413503492"
        />
      </Container>
    </Layout>
  )
}

export const config = {
  amp: true
}

export default News;