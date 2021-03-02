import { useAmp } from "next/amp"
import { AmpAd, AmpAnalytics, AmpAutoAds } from "react-amphtml"
import React from "react";
import { media } from "./Media";
import Head from "next/head";

const caPub = media.google.caPub

export const AdSlot = (props: {
  slot: string;
  width: string;
  height: string;
}) => {
  return (
    <AmpAd 
      data-enable-refresh
      specName="amp-ad with data-enable-refresh attribute"
      type="adsense"
      layout="fixed"
      data-ad-client={caPub}
      data-ad-slot={props.slot}
      {...props}>
    </AmpAd>
  )
}

export const AdSmallBanner = () => {
  return (
    <AdSlot 
      width={"320"}
      height={"60"}
      slot="8947055145"
    />
  )
}

const  defaultTimeout = 3000;

let pageLoaded = false;

const useTimeout = (ms: number) => {
  const [ loaded, setLoaded ] = React.useState(pageLoaded); 

  React.useEffect(() => {
    setTimeout(() => {
      pageLoaded = true;
      setLoaded(true);
    }, ms);
  }, []);

  return loaded;
}

const PageAd = () => {
  return (
    <Head>
      <script
        async
        data-ad-client={media.google.caPub}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
    </Head>
  )
}

export const AdAuto = () => {
  const isAmp = useAmp();
  const loaded = useTimeout(defaultTimeout);

  if (isAmp) {
    return (
      <AmpAutoAds 
        type="adsense"
        data-ad-client={caPub}
      />
    )
  }

  if (loaded) {
    return (
      <Head>
        <script
          async
          data-ad-client={media.google.caPub}
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
        <script 
          dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-55674089-5');
          `
        }} />
      </Head>
    )
  }

  return null;
}

export const Analytics = () => {
  const isAmp = useAmp();
  const loaded = useTimeout(defaultTimeout);

  if (isAmp) {
    return (
      <AmpAnalytics
        type="gtag" 
        id={"gtag"}
        config={"/analytics.json"}
        data-credentials="include">
      </AmpAnalytics>
    )
  }

  if (loaded) {
    return (
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-55674089-5" />
      </Head>
    )
  }
  
  return null;
}

export const AdResponsive = () => {
  const isAmp = useAmp();
  const idSlot = "8061989518";
  const isLoaded = useAmp();

  if (isAmp) {
    return (
      <AmpAd
        specName="amp-ad with data-enable-refresh attribute"
        data-enable-refresh
        width="100vw" 
        height="320"
        type="adsense"
        data-ad-client={caPub}
        data-ad-slot={idSlot}
        data-auto-format="rspv"
        data-full-width="">
        <div {...{overflow:""} as any}></div>
        <div {...{fallback:""}}>AD NONE</div>
      </AmpAd>
    )
  }

  if (isLoaded) {
    return (
      <>
        <PageAd />
        <ins className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            height: "100%"
          }}
          data-ad-client={caPub}
          data-ad-slot={idSlot}
          data-ad-format="auto"
          data-full-width-responsive="true" 
        />
        <script dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({});"
        }} />
      </>
    )
  }

  return null;
}