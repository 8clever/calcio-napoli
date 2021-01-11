import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from './Header'
import { Footer } from './Footer'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
    </Head>
    <Header />
    {children}
    <Footer />
    <style jsx global>{`
      body {
        font-family: Roboto, sans-serif;
        padding: 30px;
        color: #444;
      }
    `}</style>
  </>
)

export default Layout
