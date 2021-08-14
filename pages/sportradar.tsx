import { GlobalStyle, LayoutHead } from "../src/components/Layout"
import React from "react";
import { Header } from "../src/components/Header";

const title = "Calcio Napoli - Statistiche dettagliate della partita";

export const SportItalia = () => {
  return (
    <>
      <GlobalStyle />
      <LayoutHead title={title} description={title} />
      <Header />
      <iframe
        style={{
          height: "calc(100vh - 53px)",
          width: "100%"
        }}
        frameBorder="false"
        src='https://sportcenter.sir.sportradar.com/sportitalia/' 
      />
    </>
  )
}

export default SportItalia;