import { Container } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import { GoogleIframe } from "./matches";

export const Games = () => {
  const google = "/googlesearch?q=napoli+matches#sie=t;/m/048xg8;2;/m/03zv9;st;fp;1;;"  
  return (
    <Layout 
      description="Classifica Serie A tim"
      title="Calcio Napoli | Classifica Serie A tim">
      <Container page fluid>
        <h1>Classifica Serie A tim</h1>
        <GoogleIframe src={google} />
      </Container>
    </Layout>
  )
}

export default Games;