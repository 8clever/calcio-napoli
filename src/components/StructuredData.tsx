import React from "react";
import Head from "next/head";
import { Thing, WithContext } from "schema-dts";

interface IProps {
  data: WithContext<Thing>
}

export const StructuredData = (props: IProps) => {
  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(props.data)
      }} />
    </Head>    
  )
}