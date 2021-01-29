import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Container } from "../src/components/Grid";
import { GlobalStyle, LayoutHead } from "../src/components/Layout";
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
  return (
    <>
      <LayoutHead 
        description={`Calcio Napoli - ${q}`}
        title={`Calcio Napoli - ${q}`}
      />
      <Container>
        <StaticContent>
          <script async src="https://cse.google.com/cse.js?cx=2f88dc326f65152c5" />
          <div className="gcse-search" suppressHydrationWarning={true} />
        </StaticContent>
      </Container>
      <GlobalStyle />
    </>
  )
}

export default Search;