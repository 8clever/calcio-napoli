import { Col, Container, Row } from '../components/Grid'
import Layout from '../components/Layout'
import { AmpImg } from 'react-amphtml';
import { theme } from '../components/Theme';
import { StructuredData } from '../components/StructuredData';
import { media } from '../components/Media';
import { Video } from "scrape-yt";
import { Pagination } from './Pagination';
import React from "react";
import { AdResponsive } from './AdSlot';

export interface IProps {
  list: Video[];
  title: string
  pagination?: boolean;
}

export const Channel = (props: IProps) => { 
  const videoList = props.list;
  return (
    <Layout 
      description={props.title}
      title={props.title}>
      <StructuredData 
        data={{
          "@context":"https://schema.org",
          "@type":"ItemList",
          "itemListElement": videoList.map((v,idx) => {
            return {
              "@type":"ListItem",
              "position": idx + 1,
              "url": media.domain + "/news/" + v.id
            }
          })
        }}
      />
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": media.domain,
          "potentialAction": {
            "@type": "SearchAction",
            "target": media.domain + "/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <Container page>
        <h1>
          {props.title}
        </h1>
        <Row>
          {
            videoList.map((i,idx) => {
              return (
                <React.Fragment key={i.id}>
                  <Col 
                    md={6}>
                    <a href={`/news/${i.id}`}>
                      <div className="img-responsive">
                        <AmpImg 
                          specName="default"
                          src={i.thumbnail}
                          layout="fill"
                        />
                        <h3>{i.title}</h3>
                      </div>
                    </a>
                  </Col>
                  {
                    idx % 6 === 5 ?
                    <Col>
                      <AdResponsive />
                    </Col> : 
                    null
                  }
                </React.Fragment>
              )
            })
          }
        </Row>
        {
          props.pagination ?
          <Pagination /> :
          null
        }
      </Container>
      <style jsx>{`
        a {
          color: ${theme.color.white};
          text-decoration: none;
        }
        .img-responsive {
          transition: all 0.3s;
          position: relative;
          padding-top: 56%;
          overflow: hidden;
        }
        .img-responsive :global(amp-img) {
        }
        .img-responsive:hover {
          transform: scale(1.03);
        }
        .img-responsive h3 {
          margin: 0;
          padding: 5px;
          background: rgba(0,0,0,0.5);
          position: absolute;
          left: 0;
          bottom: 0;
        }
      `}</style>
    </Layout>
  )
}