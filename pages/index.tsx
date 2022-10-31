import { GetServerSideProps } from "next"
import { Channel, IProps as ChannelProps } from "../src/components/Channel"
import { media } from "../src/components/Media";
import { Client } from "youtubei"
import { Youtube } from "../src/modules/Youtube";

interface IQuery {
  page: string;
  slug: string;
  [key: string]: string;
}

type Cache = {
  expired: number;
  props: ChannelProps
}

const cache: Record<string, Cache> = {};

export const getServerSideProps: GetServerSideProps<ChannelProps> = async (props) => {
  const query = props.query as IQuery;
  const key = JSON.stringify(query);
  const now = new Date().valueOf();

  if (cache[key] && cache[key].expired > now) {
    return {
      props: cache[key].props
    }
  }

  const channelName = query.slug?.replace(/_/gmi, " ") || media.channelName;
  const channelTitle = query.slug?.replace(/_/gmi, " ") || media.channelTitle;
  const limit = 10;
  const page = Number(query.page) || 1;
  const totalCount = limit * page;
  const loadTimes = Math.ceil(totalCount / 30);
  const yt = new Client();

  const ch = await yt.findOne(channelName, { 
    type: "channel",
  });

  await ch?.nextVideos(loadTimes);

  const videos = (ch?.videos || [])
    .slice(totalCount - limit, totalCount)
    .map(v => {
      return {
        id: v.id,
        title: v.title,
        thumbnail: v.thumbnails.best || Youtube.DefaultImage()
      }
    });

  const responseProps: ChannelProps = {
    title: channelTitle,
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
