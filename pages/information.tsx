import { Container } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import { media } from "../src/components/Media"
import { theme } from "../src/components/Theme"
import dynamic from 'next/dynamic'

const MD = dynamic({
  ssr: false,
  loader: () => import("react-markdown") as any
})

const title = "Supportaci";

const wallets = media.wallets.map(w => {
  return `1. ${w.name}: **${w.address}**`
}).join("\n\n");

const text = `
  # ${title}

  Puoi supportarci utilizzando le seguenti criptovalute.

  ${wallets}

  Se desideri rimanere completamente anonimo nel supportare noi e il nostro progetto, puoi utilizzare la criptovaluta Monero

  Ti saremo eternamente grati in questo periodo difficile per noi.
`

export const News = () => {
  return (
    <Layout 
      disableAd
      hybrid
      description={title}
      title={title}>
      <Container page>
        <MD 
          children={text}
        />
      </Container>
      <style jsx>{`
        code {
          padding: 5px;
          background: gray;
        }
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
  amp: false
}

export default News;