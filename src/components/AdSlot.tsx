import { useAmp } from "next/amp"
import { AmpAd, AmpAutoAds } from "react-amphtml"
import React from "react";
import { media } from "./Media";

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

export const AdAuto = () => {
  return (
    <AmpAutoAds 
      type="adsense"
      data-ad-client={caPub}
    />
  )
}

export const AdResponsive = () => {
  const isAmp = useAmp();
  const idSlot = "8061989518";

  // React.useEffect(() => {
  //   if(typeof window !== 'undefined'){
  //     const w = window as any;
  //     (w.adsbygoogle = w.adsbygoogle || []).push({});
  //   }
  // }, []);

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

  return null;

  return (
    <ins className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={media.google.caPub}
      data-ad-slot={idSlot}
      data-ad-format="auto"
      data-full-width-responsive="true">
    </ins>
  )
}