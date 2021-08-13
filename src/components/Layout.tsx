import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from './Header'
import { Footer } from './Footer'
import { theme } from './Theme'
import { media } from './Media'
import { useRouter } from "next/router";
import { makeUrl } from './Pagination'
import { AdResponsive, Analytics } from './AdSlot'
import { useAmp } from 'next/amp'
import { Container } from './Grid'
import { CookiesNotif } from "./CookiesNotif";

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
  const isAmp = useAmp();

  const getLinkRel = () => {
    if (props.hybrid) {
      if (isAmp) {
        const canonicalUrl = media.domain + makeUrl(router.route, { ...router.query, amp: null });
        return <link rel="canonical" href={canonicalUrl} />;
      } 
      const amphtmlUrl = media.domain + makeUrl(router.route, { ...router.query, amp: 1 })
      return <link rel="amphtml" href={amphtmlUrl} />;
    }
    const canonicalUrl = media.domain + makeUrl(router.route, router.query);
    return <link rel="canonical" href={canonicalUrl} />
  }

  return (
    <Head>
      <title>{title}</title>
      {getLinkRel()}
      <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="preconnect" href="https://i.ytimg.com" />
      <link rel='apple-touch-icon' sizes='180x180' href='/static/icons/icon-180x180.png' />
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
      h1 {
        font-size: 3.7em;
        margin: 35px 0;
      }
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
      <Analytics />
      <Container fluid>
        <AdResponsive />
      </Container>
      {children}
      <Footer />
      <GlobalStyle />
      <CookiesNotif />
    </>
  )
}

export default Layout