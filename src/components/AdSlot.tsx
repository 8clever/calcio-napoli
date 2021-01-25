import { AmpAd } from "react-amphtml"

const caPub = "ca-pub-7579927697787840"

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

export const AdResponsive = () => {
  return (
    <AmpAd
      specName="amp-ad with data-enable-refresh attribute"
      data-enable-refresh
      width="100vw" 
      height="320"
      type="adsense"
      data-ad-client={caPub}
      data-ad-slot="8061989518"
      data-auto-format="rspv"
      data-full-width="">
      <div {...{overflow:""} as any}></div>
    </AmpAd>
  )
}