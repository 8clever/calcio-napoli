import { GetServerSideProps } from "next"
import { getPlaylist, PlaylistDetailed } from "scrape-yt";
import { Channel, IProps as ChannelProps } from "../src/components/Channel"

export const playListId = "PL2HP8OJyZJpNe-5yJdL9o5n-utvD_H2pP";

export const getServerSideProps: GetServerSideProps<ChannelProps> = async () => {
  const title = "Calcio Napoli Podcasts";
  const playlist = await getPlaylist(playListId, {
    useWorkerThread: true
  }) as PlaylistDetailed;
  return {
    props: {
      title,
      list: playlist.videos
    }
  }
}

export const config = {
  amp: true
}

export default Channel
