import { Container } from "../src/components/Grid";
import { GlobalStyle, LayoutHead } from "../src/components/Layout";

export const Search = () => {
  return (
    <>
      <LayoutHead 
        description="Calcio Napoli - Ricerca" 
        title="Calcio Napoli - Ricerca"
      />
      <Container>
        <script async src="https://cse.google.com/cse.js?cx=2f88dc326f65152c5" />
        <div className="gcse-search" suppressHydrationWarning={true} />
      </Container>
      <GlobalStyle />
    </>
  )
}

export default Search;