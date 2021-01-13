import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from './Header'
import { Footer } from './Footer'
import { theme } from './Theme'
import { AmpAnalytics } from 'react-amphtml'

type Props = {
  children?: ReactNode
  title?: string
  description?: string;
}

const Layout = ({ children, title = 'This is the default title', description = "" }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
    </Head>
    <AmpAnalytics
      type="gtag" 
      id={"gtag"}
      config={"/analytics.json"}
      data-credentials="include">
    </AmpAnalytics>
    <Header />
    {children}
    <Footer />
    <style jsx global>{`
      body {
        font-family: Roboto, sans-serif;
        font-size: 14px;
        background-color: ${theme.color.black};
        color: ${theme.color.white};
        max-width: 100vw;
        overflow-x: hidden;
      }
    `}</style>
  </>
)

export default Layout