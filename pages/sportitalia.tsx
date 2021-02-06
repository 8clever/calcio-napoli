import { Container } from "../src/components/Grid";
import Layout from "../src/components/Layout"

const title = "Calcio Napoli - Statistiche dettagliate della partita";

export const SportItalia = () => {
  return (
    <Layout title={title} description={title}>
      <Container page fluid>
        <div className="iframe-container">
          <iframe 
            frameBorder="0"
            src="https://sportcenter.sir.sportradar.com/sportitalia/" />
        </div>
      </Container>
      <style jsx>{`
        .iframe-container {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: calc(100vh - 50px);
        }
        .iframe-container > iframe {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }  
      `}</style>
    </Layout>
  )
}

export default SportItalia;