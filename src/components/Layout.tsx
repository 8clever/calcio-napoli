import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from './Header'
import { Footer } from './Footer'
import { theme } from './Theme'
import { AmpAnalytics } from 'react-amphtml'
import { media } from './Media'
import { useRouter } from "next/router";
import { AdAuto } from './AdSlot'

type Props = {
  children?: ReactNode
  title: string
  description: string;
  og?: {
    image?: string;
  }
}

export const LayoutHead = (props: Pick<Props, "title" | "description" | "og">) => {
  const { title, description } = props;
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
      <link rel="canonical" href={media.domain + router.asPath} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@GoalsNapoli" />
      <meta name="twitter:creator" content="@godofluck89" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={
        props.og?.image ?? 
        media.domain + "/images/matches_bg.jpg"
      } /> :
      <meta property="og:url" content={media.domain + router.asPath} />
      <meta property="og:type" content="website" />
    </Head>
  )
}

export const GlobalStyle = () => {
  return (
    <style jsx global>{`
      body {
        font-family: Roboto, sans-serif;
        font-size: 14px;
        background-color: ${theme.color.black};
        color: ${theme.color.white};
        max-width: 100vw;
        overflow-x: hidden;
      }
      .gsc-cursor * {
        color: ${theme.color.white};
      }
    `}</style>
  )
}

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <AdAuto />
      <LayoutHead {...props} />
      <AmpAnalytics
        type="gtag" 
        id={"gtag"}
        config={"/analytics.json"}
        data-credentials="include">
      </AmpAnalytics>
      <Header />
      <div>
        {children}
      </div>
      <Footer />
      <GlobalStyle />
    </>
  )
}

export default Layout