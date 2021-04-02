import { GetServerSideProps } from "next"
import { PlaylistDetailed } from "scrape-yt";
import { Channel, IProps as ChannelProps } from "../src/components/Channel"
import { cache, getCache } from "../src/components/Cache";
import { ParsedUrlQuery } from "querystring";
import { Youtube } from "../src/modules/Youtube";

interface IProps extends ParsedUrlQuery {
  page: string;
}

export const getServerSideProps: GetServerSideProps<ChannelProps, IProps> = async (props) => {
  const title = "Calcio Napoli Podcasts";
  const playlist = getCache(cache.keys.ytchannel) as PlaylistDetailed;
  const limit = 10;
  const page = Number(props.query.page) || 1;
  const skip = limit * (page - 1);
  const videos = playlist.videos.slice(skip, skip + limit).map(v => {
    return {
      ...v,
      thumbnail: Youtube.MaxResDefault(v.id)
    }
  });
  return {
    props: {
      title,
      list: videos,
      pagination: {
        limit,
        page,
        totalCount: 100,
      }
    }
  }
}

export const config = {
  amp: "hybrid"
}

export default Channel
