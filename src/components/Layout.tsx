import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from './Header'
import { Footer } from './Footer'
import { theme } from './Theme'
import { AmpAnalytics } from 'react-amphtml'
import { media } from './Media'
import { useRouter } from "next/router";
import { makeUrl } from './Pagination'
import { useAmp } from 'next/amp'

type Props = {
  hybrid?: boolean;
  children?: ReactNode
  title: string
  description: string;
  og?: {
    image?: string;
  }
}

export const LayoutHead = (props: Pick<Props, "title" | "description" | "og" | "hybrid">) => {
  const { title, description } = props;
  const router = useRouter();
  const q = Object.assign({}, router.query);
  delete q.amp;
  const canonical = media.domain + makeUrl(router.route, q);
  q.amp = "1";
  const amphtml = media.domain + makeUrl(router.route, q);
  const isAmp = useAmp();
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
      <link rel="canonical" href={canonical} />
      {
        props.hybrid ?
        <link rel="amphtml" href={amphtml} /> :
        null
      }
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
      {
        isAmp ? 
        <>
          <AmpAnalytics
            type="gtag" 
            id={"gtag"}
            config={"/analytics.json"}
            data-credentials="include">
          </AmpAnalytics>
        </> : <>
          <script
            key="adsense"
            async
            data-ad-client={media.google.caPub}
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-55674089-5"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-55674089-5');
            `
          }} />
        </>
      }
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
        margin: 0;
      }
      .gsc-cursor * {
        color: ${theme.color.white};
      }
      div > .gsc-control-cse {
        padding: 0;
      }
    `}</style>
  )
}

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <LayoutHead {...props} />
      <Header />
      {children}
      <Footer />
      <GlobalStyle />
    </>
  )
}

export default Layout