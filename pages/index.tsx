import { GetServerSideProps } from "next"
import { PlaylistDetailed } from "scrape-yt";
import { Channel, IProps as ChannelProps } from "../src/components/Channel"
import { cache, getCache } from "../src/components/Cache";

export const getServerSideProps: GetServerSideProps<ChannelProps> = async () => {
  const title = "Calcio Napoli Podcasts";
  const playlist = getCache(cache.keys.ytchannel) as PlaylistDetailed;
  return {
    props: {
      title,
      list: playlist.videos
    }
  }
}

export const config = {
  amp: "hybrid"
}

export default Channel
