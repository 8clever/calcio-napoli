import React from "react";
import Head from "next/head";
import { WithContext } from "schema-dts";

interface IProps {
  data: WithContext<any>
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