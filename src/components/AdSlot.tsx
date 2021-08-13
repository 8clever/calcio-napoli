import { useAmp } from "next/amp"
import { AmpAd, AmpAnalytics, AmpAutoAds } from "react-amphtml"
import React from "react";
import { media } from "./Media";
import { theme } from "./Theme";
import Script from 'next/script';

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

  React.useEffect(() => {
    ((window: any) => {
      window.adsbygoogle = [];
    })(window);
  }, []);

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
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${media.google.caPub}`}
    />
  );
}

interface IAnalytics {
  title?: string;
}

export const Analytics = (props: IAnalytics) => {
  const isAmp = useAmp();

  React.useEffect(() => {
    ((w: any) => {
      w.dataLayer = w.dataLayer || [];
      const gtag: any = function () {  
        w.dataLayer.push(arguments); 
      }
      gtag('js', new Date());
      gtag('config', 'UA-55674089-5', {
        'page_title' : props.title,
        'page_path': window.location.pathname
      });
    })(window);
  }, [ props.title ]);

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
    <Script 
      src="https://www.googletagmanager.com/gtag/js?id=UA-55674089-5"
    />
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
        AD slot <br/>
        <small>
          advertising helps us grow
        </small>
      </div>
      <style jsx>{`
        .ad-fallback {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          border-top: none;
        }
        .text {
          font-size: 20px;
          text-align: center;
          margin: auto;
          color: ${theme.color.white};
        }
      `}</style>
    </div>
  )
}

export const AdResponsive = () => {
  const isAmp = useAmp();
  const idSlot = "8061989518";

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
        async 
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${media.google.caPub}`}
        crossOrigin="anonymous" 
      />
      <ins 
        className="adsbygoogle"
        style={{ display: "block", height: 320 }}
        data-ad-client={media.google.caPub}
        data-ad-slot={idSlot}
        data-ad-format="auto"
        data-full-width-responsive="true" 
      />
      <Script 
        dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({})"
        }} 
      />
    </AdContainer>
  )
}