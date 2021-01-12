import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { AmpYoutube } from "react-amphtml";
import ytdl from "ytdl-core";
import Layout from "../../src/components/Layout";
import _ from 'lodash';
import { Container } from "../../src/components/Grid";

interface IProps {
  info: ytdl.videoInfo["videoDetails"]
}

interface IQuery extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<IProps, IQuery> = async (props) => {
  const valid = await ytdl.validateID(props.params?.id || "");
  if (!valid) {
    return {
      redirect: {
        statusCode: 301,
        destination: "/"
      }
    }
  }
  const info = await ytdl.getInfo(props.params!.id);
  delete info.videoDetails.author.subscriber_count
  return {
    props: {
      info: info.videoDetails
    }
  }
}

export const News = (props: IProps) => {
  return (
    <Layout 
      description={props.info.description || ""}
      title={props.info.title}>
      <div style={{ minHeight: "100vh" }}>
        <Container>
          <h1>{props.info.title}</h1>
          <AmpYoutube 
            {...{
              layout: "responsive",
              width: "480",
              height: "270"
            } as any}
            data-videoid={props.info.videoId}
          />
          <p>{props.info.description}</p>
          <p>
            <small>{props.info.keywords?.join(", ")}</small>
          </p>
        </Container>
      </div>
    </Layout>
  )
}

export const config = {
  amp: true
}

export default News;