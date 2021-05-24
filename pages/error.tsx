import Layout from "../src/components/Layout";
import { useRouter } from "next/router";
import { Container } from "../src/components/Grid";

export const ErrorPage = () => {

  const router = useRouter();

  return (
    <Layout
      description={"Error"}
      title="Error">
      <Container page>
        <div style={{
          textAlign: "center"
        }}>
          <h1>Error: {router.query.status}</h1>
          <p>{router.query.message}</p>
        </div>
      </Container>
    </Layout>
  )
}

export default ErrorPage;