import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Container } from "../src/components/Grid";
import Layout, { GlobalStyle, LayoutHead } from "../src/components/Layout";
import { StaticContent } from "../src/components/StaticContent";

interface IProps {
  query: ParsedUrlQuery;
}

export const getServerSideProps: GetServerSideProps<IProps> = async (props) => {
  return {
    props: {
      query: props.query
    }
  }
}

export const Search = (props: IProps) => {
  const { q = "Ricerca" } = props.query;
  const title = `Calcio Napoli - ${q}`;
  return (
    <Layout
      description={title}
      title={title}>
      <Container page>
        <StaticContent>
          <script async src="https://cse.google.com/cse.js?cx=2f88dc326f65152c5" />
          <div style={{
            margin: "15px 0"
          }}>
            <div 
              className="gcse-search" suppressHydrationWarning={true} 
            />
          </div>
        </StaticContent>
      </Container>
    </Layout>
  )
}

export default Search;