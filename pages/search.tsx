import { Container } from "../src/components/Grid";
import { GlobalStyle, LayoutHead } from "../src/components/Layout";
import { StaticContent } from "../src/components/StaticContent";

export const Search = () => {
  return (
    <>
      <LayoutHead 
        description="Calcio Napoli - Ricerca" 
        title="Calcio Napoli - Ricerca"
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