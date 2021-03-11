import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from './Header'
import { Footer } from './Footer'
import { theme } from './Theme'
import { media } from './Media'
import { useRouter } from "next/router";
import { makeUrl } from './Pagination'
import { AdAuto, AdResponsive, Analytics } from './AdSlot'
import { useAmp } from 'next/amp'
import { Container } from './Grid'

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
      <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
      <link rel="canonical" href={canonical} />
      <link rel="manifest" href="/manifest.json" />
      <link rel="preconnect" href="https://i.ytimg.com" />
      <link rel='apple-touch-icon' sizes='180x180' href='/static/icons/icon-180x180.png' />
      {
        props.hybrid ?
        <link rel="amphtml" href={amphtml} /> :
        null
      }
      <meta name="yandex-verification" content="f844698faf7e8642" />
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#222627" />
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
        isAmp ? null :
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        /> 
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
      <Container>
        <AdResponsive />
      </Container>
      {children}
      <Footer />
      <GlobalStyle />
      <AdAuto />
      <Analytics />
    </>
  )
}

export default Layout