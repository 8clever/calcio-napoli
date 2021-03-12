import { useAmp } from "next/amp"
import { AmpAd, AmpAnalytics, AmpAutoAds } from "react-amphtml"
import React from "react";
import { media } from "./Media";
import Adsense from "react-adsense";

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

const makeScript = (id: string, src: string) => {
  const el = document.querySelector("#" + id);
  el?.remove();
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.body.appendChild(script);
}

const useScript = (id: string, src: string) => {
  const isLoaded = useTimeout(defaultTimeout);

  React.useEffect(() => {
    if (!isLoaded) return;
    makeScript(id, src);
  }, [ isLoaded ]);

  return [];
}

export const AdAuto = () => {
  const isAmp = useAmp();

  useScript("pagead", "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");

  if (isAmp) {
    return (
      <AmpAutoAds 
        type="adsense"
        data-ad-client={caPub}
      />
    )
  }

  return null;
}

export const Analytics = () => {
  const isAmp = useAmp();

  useScript("analytics", "https://www.googletagmanager.com/gtag/js?id=UA-55674089-5");

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
  
  return null;
}

export const AdResponsive = () => {
  const isAmp = useAmp();
  const idSlot = "8061989518";

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

  return (
    <Adsense.Google 
      client={caPub}
      slot={idSlot}
      responsive='true'
    />
  )
}