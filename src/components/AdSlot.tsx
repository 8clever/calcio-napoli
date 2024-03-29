import { useAmp } from "next/amp"
import { AmpAd, AmpAnalytics, AmpAutoAds } from "react-amphtml"
import React from "react";
import { media } from "./Media";
import { theme } from "./Theme";
import { Script } from "./Script";

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
  const isAmp = useAmp();

  if (isAmp) {
    return (
      <AmpAutoAds 
        type="adsense"
        data-ad-client={caPub}
      />
    )
  }

  return (
    <Script 
      strategy="lazyOnload"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${media.google.caPub}`}
    />
  );
}

export const Analytics = () => {
  const isAmp = useAmp();

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
  
  return (
    <>
      <Script 
        id="analytics"
        dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-55674089-5');  
        `
      }}/>
      <Script 
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=UA-55674089-5"
      />
    </>
  );
}

const AdContainer = (props: { children?: React.ReactNode }) => {
  return (
    <div className="ad-container">
      {props.children}
      <style jsx>{`
        .ad-container {
          position: relative;
          overflow: hidden;
          min-height: 320px;
        }  
      `}</style>
    </div>
  )
}

const AdFallback = () => {
  return (
    <div className="ad-fallback">
      <div className="text">
        Non ci piacciono gli annunci proprio come te.
      </div>
      <style jsx>{`
        .ad-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          border-top: none;
        }
        .text {
          font-size: 20px;
          text-align: center;
          margin: auto;
          color: ${theme.pallete.background.text};
        }
      `}</style>
    </div>
  )
}

const slots = [{}];

export const AdResponsive = () => {
  const isAmp = useAmp();
  const idSlot = "8061989518";

  React.useEffect(() => {
    slots.push({});
  }, []);

  if (isAmp) {
    return (
      <AdContainer>
        <AdFallback />
        <AmpAd
          specName="amp-ad with data-enable-refresh attribute"
          data-enable-refresh
          height="320"
          width="100vw"
          type="adsense"
          data-ad-client={caPub}
          data-ad-slot={idSlot}
          data-auto-format="rspv"
          data-full-width="" 
        />
      </AdContainer>
    )
  }

  return (
    <AdContainer>
      <AdFallback />
      <Script 
        strategy="lazyOnload"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${media.google.caPub}`}
        crossOrigin="anonymous" 
      />
      <div style={{ height: 320 }}>
        {slots.map((...args) => {
          return (
            <ins 
              key={args[1]}
              className={"adsbygoogle"}
              style={{ 
                display: "inline-block", 
                position: "absolute",
                inset: 0,
                zIndex: 10 + args[1]
              }}
              data-ad-client={media.google.caPub}
              data-ad-slot={idSlot}
              data-ad-format="auto"
              data-full-width-responsive="true" 
            />
          )
        })}
      </div>
      <Script 
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({})
          `
        }} 
      />
    </AdContainer>
  )
}