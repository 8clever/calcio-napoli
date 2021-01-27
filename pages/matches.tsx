import { AmpIframe } from "react-amphtml"
import { Container } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import { theme } from "../src/components/Theme"

const title = "Calcio Napoli - Classifica Serie A tim. Ultima partita Napoli. Prossima partita Napoli"

export const Matches = () => {
  return (
    <Layout title={title} description={title}>
      <Container>
        <h1>{title}</h1>
      </Container>
      <Container>
        <div style={{
          height: "75vh",
          display: "flex",
          backgroundImage: "url(/images/matches_bg.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: 20,
        }}>
          <h2 style={{
            margin: "auto",
            padding: 10,
            background: "rgba(0,0,0,0.4)",
            color: theme.color.white
          }}>
            Puoi controllare le tabelle qui sotto
          </h2>
        </div>
      </Container>
      <Container>
        <div 
          className="iframe-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
          <AmpIframe frameborder="0"  scrolling="no" 
            {...{
              width:"400",
              height:"200"
            }}
            src="https://www.fctables.com/teams/ssc-napoli-194680/iframe/?type=team-last-match&lang_id=5&country=108&template=17&team=194680&timezone=Europe/Rome&time=24&width=400&height=200&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF" />
          <AmpIframe frameborder="0"  scrolling="no" 
            {...{
              width: "400",
              height: "200"
            }}
            src="https://www.fctables.com/teams/ssc-napoli-194680/iframe/?type=team-next-match&lang_id=5&country=108&template=17&team=194680&timezone=Europe/Rome&time=24&width=400&height=200&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF" />
          <AmpIframe frameborder="0"  scrolling="no" 
            {...{
              width: "400",
              height: "700"
            }} 
            src="https://www.fctables.com/italy/serie-a/iframe/?type=table&lang_id=5&country=108&template=17&team=194680&timezone=Europe/Rome&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=1&form=1&width=400&height=700&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF" />
        </div>
        <div style={{ marginBottom: 20 }}>
          <small>
            <a 
              style={{
                textDecoration: "none",
                color: theme.color.white
              }}
              href="/games">
              Classifica Serie A tim
            </a>
          </small>
        </div>
      </Container>
      <style jsx>{`
        .iframe-container :global(amp-iframe) {
          margin-bottom: 20px;
        }
      `}</style>
    </Layout>
  ) 
}

export const config = {
  amp: true
}

export default Matches;