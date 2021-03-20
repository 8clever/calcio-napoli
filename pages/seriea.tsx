import { Container } from "../src/components/Grid"
import Layout from "../src/components/Layout"
import { ResponsiveIframe } from "../src/components/ResponsiveIframe";

export const Games = () => {
  const url = "/italy/serie-a/iframe/?type=table&lang_id=5&country=108&template=17&team=194680&timezone=Europe/Rome&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=1&form=1&width=520&height=700&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF";

  return (
    <Layout 
      description="Classifica Serie A tim"
      title="Calcio Napoli | Classifica Serie A tim">
      <Container page fluid>
        <h1>Classifica Serie A tim</h1>
        <ResponsiveIframe src={url} />
      </Container>
    </Layout>
  )
}

export default Games;