import { Container } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import { media } from "../src/components/Media"
import { theme } from "../src/components/Theme"

const title = "Important Information"

export const News = () => {
  return (
    <Layout 
      disableAd
      hybrid
      description={title}
      title={title}>
      <Container page>
        <h1>{title}</h1>
        <p>
          Ciao. 
        </p>
        <p>
          Sono lo sviluppatore principale del progetto e sono follemente felice dei progressi compiuti nell'ultimo anno. Abbiamo 1000 utenti al giorno e 350 su dispositivi Android, è successo che non mi fossi prefissato obiettivi particolari, volevo solo imparare come funziona la SEO.
        </p>
        <p>
          È semplicemente successo che date le circostanze, account, carte, servizi all'estero sono bloccati e non c'è modo di pagare per i servizi Amazon e Cloudflare, da cui suppongo che questo progetto non sarà presto disponibile su Internet. Se hai domande o suggerimenti su come risolvere questa situazione, puoi contattarmi a <a href={`mailto:${media.email}`}>
            {media.email}
          </a>
        </p>
        <p>
          Grazie a tutti per essere con noi.
        </p>
      </Container>
      <style jsx>{`
        a {
          color: ${theme.pallete.primary.color};
          text-decoration: none;
          transition: .3s all;
        }
        a:hover {
          color: ${theme.pallete.primary.text};
        }
      `}</style>
    </Layout>
  )
}

export const config = {
  amp: true
}

export default News;