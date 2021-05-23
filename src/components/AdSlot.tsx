import { useAmp } from "next/amp"
import { AmpAd, AmpAnalytics, AmpAutoAds } from "react-amphtml"
import React from "react";
import { media } from "./Media";
import { theme } from "./Theme";

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

interface IAnalytics {
  title?: string;
}

export const Analytics = (props: IAnalytics) => {
  const isAmp = useAmp();

  useScript("gtag", "https://www.googletagmanager.com/gtag/js?id=UA-55674089-5");

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
  
  return null;
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
          min-height: 320px;
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
      <AmpAd
        specName="amp-ad with data-enable-refresh attribute"
        data-enable-refresh
        height="320"
        type="adsense"
        data-ad-client={caPub}
        data-ad-slot={idSlot}
        data-auto-format="rspv"
        data-full-width="">
        <AdFallback />
      </AmpAd>
    )
  }

  return (
    <ins className="adsbygoogle"
      style={{ 
        display: "block", 
        height: 320,
        textDecorationLine: "none"
      }}
      data-ad-client={caPub}
      data-ad-slot={idSlot}
      data-ad-format="auto"
      data-full-width-responsive="true">
      <AdFallback />
    </ins>
  )
}