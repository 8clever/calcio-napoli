import { Container } from "../src/components/Grid";
import { GlobalStyle, LayoutHead } from "../src/components/Layout";
import Head from "next/head";

export const Search = () => {
  return (
    <>
      <LayoutHead 
        description="Calcio Napoli - Ricerca" 
        title="Calcio Napoli - Ricerca"
      />
      <Head>
        <script async src="https://cse.google.com/cse.js?cx=2f88dc326f65152c5" />
      </Head>
      <Container>
        <div className="gcse-search" suppressHydrationWarning={true} />
      </Container>
      <GlobalStyle />
    </>
  )
}

export default Search;