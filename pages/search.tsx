import { theme } from "../src/components/Theme";
export const Search = () => {
  return (
    <>
      <style>{`
        body {
          background: ${theme.color.black};
          margin: 0;
        }
      `}</style>
      <script async src="https://cse.google.com/cse.js?cx=2f88dc326f65152c5"></script>
      <div className="gcse-search" suppressHydrationWarning={true} />
    </>
  )
}

export default Search;