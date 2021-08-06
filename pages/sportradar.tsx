import { Container } from "../src/components/Grid";
import Layout from "../src/components/Layout"
import React from "react";
import { ResponsiveIframe } from "../src/components/ResponsiveIframe";
import moment from "moment-timezone";

const title = "Calcio Napoli - Statistiche dettagliate della partita";

export const SportItalia = () => {
  return (
    <Layout title={title} description={title}>
      <Container page fluid>
        <ResponsiveIframe 
          src="/sportitalia" 
          // taggedElement=".sr-sc-content"
          onComplete={(cw: any) => {
            /**
             * seems sportitalia not working and not maintained
             */
            const timezone = moment.tz.guess();
            cw.scAppOptions.timezone = timezone;
            cw.scAppOptions.cctx.timezone = timezone;
            cw.sportcenterInit();
          }}
        />
      </Container>
    </Layout>
  )
}

export default SportItalia;