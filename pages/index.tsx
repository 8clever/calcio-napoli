import { GetServerSideProps } from "next"
import { Channel, IProps as ChannelProps } from "../src/components/Channel"
import { media } from "../src/components/Media";
import ytch from 'yt-channel-info'
import { YoutubeServer } from "../src/modules/YoutubeServer";

interface IQuery {
  page: string;
  slug?: string;
}

type Cache = {
  expired: number;
  props: ChannelProps
}

const cache: Record<string, Cache> = {};

export const getServerSideProps: GetServerSideProps<ChannelProps> = async (props) => {
  const query = props.query as any as IQuery;
  const key = JSON.stringify(query);
  const now = new Date().valueOf();

  if (cache[key] && cache[key].expired > now) {
    return {
      props: cache[key].props
    }
  }

  const channelId = query.slug || media.channelId
  const channelInfo = await ytch.getChannelInfo({ channelId });
  const limit = 10;
  const page = Number(query.page) || 1;
  const totalCount = limit * page;
  const loadTimes = Math.ceil(totalCount / 30);
  const yt = new YoutubeServer()
  const loadVideos = await yt.getChannelVideos(channelId, loadTimes);
  const videos = loadVideos.slice(totalCount - limit, totalCount)

  const responseProps: ChannelProps = {
    title: channelInfo.description,
    list: videos,
    pagination: {
      limit,
      page,
      totalCount: 100,
    }
  }

  cache[key] = {
    /** cache should expired after 6 hours */
    expired: now + 1000 * 60 * 60 * 6,
    props: responseProps
  };

  return {
    props: responseProps
  }

}

export const config = {
  amp: "hybrid"
}

export default Channel
