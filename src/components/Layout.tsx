import React from "react";
import { Header } from "./Header";
import Head from "next/head";

interface IProps {
  children?: React.ReactNode,
  title: string;
  description: string;
}

export const Layout = (props: IProps) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description || ""} />
      </Head>
      <Header />
      {props.children}
    </>
  )
}