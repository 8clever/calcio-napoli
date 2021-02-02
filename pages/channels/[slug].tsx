import { GetServerSideProps } from "next";
import { Channel, IProps as ChannelProps } from "../../src/components/Channel";
import { ParsedUrlQuery } from "querystring";
import { search } from "scrape-yt";

interface IParams extends ParsedUrlQuery {
  slug: string;
  page: string;
}

export const getServerSideProps: GetServerSideProps<ChannelProps, IParams> = async (props) => {
  const title = (props.params?.slug || "SSC Napoli podcasts").replace(/_/gmi, " ")
  const page = Number(props.query.page) || 1;
  const limit = 10;
  return {
    props: {
      pagination: true,
      title,
      list: await search(title, {
        useWorkerThread: true,
        type: "video",
        page,
        limit
      })
    }
  }
}

export const config = {
  amp: "hybrid"
}

export default Channel