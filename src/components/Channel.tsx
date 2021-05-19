import { Col, Container, Row } from '../components/Grid'
import Layout from '../components/Layout'
import { StructuredData } from '../components/StructuredData';
import { media } from '../components/Media';
import { Pagination, PaginationProps } from './Pagination';
import React from "react";
import { Thumbanil } from './Thumbnail';
import Head from "next/head";

interface Video {
  id: string;
  thumbnail: string;
  title: string;
}
export interface IProps {
  list: Video[];
  title: string
  pagination?: PaginationProps
}

export const Channel = (props: IProps) => { 
  const videoList = props.list;
  const preload = props.list.slice(0, 2);
  return (
    <Layout 
      hybrid
      description={props.title}
      title={props.title}>
      <Head>
        {preload.map(i => {
          return (
            <link key={i.id} rel="preload" as="image" href={i.thumbnail} />
          )
        })}
      </Head>
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
            videoList.map((i) => {
              return (
                <React.Fragment key={i.id}>
                  <Col 
                    md={6}>
                    <Thumbanil 
                      href={`/news/${i.id}`}
                      imageSrc={i.thumbnail}
                      title={i.title}
                    />
                  </Col>
                </React.Fragment>
              )
            })
          }
        </Row>
        {
          props.pagination ?
          <Pagination {...props.pagination} /> :
          null
        }
      </Container>
    </Layout>
  )
}