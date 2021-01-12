import { Col, Container, Row } from '../src/components/Grid'
import Layout from '../src/components/Layout'

const IndexPage = () => (
  <Layout title="Calcio Napoli | Home">
    <div style={{ height: "100vh" }}>
      <Container>
        <Row>
          <Col md={6}>
            12 
          </Col>
          <Col md={6}>
            34
          </Col>
        </Row>
      </Container>
    </div>
  </Layout>
)

export const config = {
  amp: true
}

export default IndexPage
