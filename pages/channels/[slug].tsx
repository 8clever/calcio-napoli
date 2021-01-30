import { GetServerSideProps } from "next";
import { Channel, IProps as ChannelProps } from "../../src/components/Channel";
import { search } from "scrape-yt";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps<ChannelProps, IParams> = async (props) => {
  const title = (props.params?.slug || "Calcio Napoli").replace(/_/gmi, " ")
  const videos = await search(title, {
    type: "video",
    limit: 100
  });
  return {
    props: {
      list: {
        title,
        playlist: videos.map(v => {
          return {
            id: v.id,
            title: v.title,
            name: v.title
          }
        })
      }
    }
  }
}

export const config = {
  amp: true
}

export default Channel