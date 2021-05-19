import { GetServerSideProps } from "next"
import { Channel, IProps as ChannelProps } from "../src/components/Channel"
import { Client } from "youtubei";

interface IQuery {
  page: string;
  slug: string;
  [key: string]: string;
}

export const getServerSideProps: GetServerSideProps<ChannelProps> = async (props) => {
  const query = props.query as IQuery;
  const title = query.slug?.replace(/_/gmi, " ") || "Calcio Napoli Podcasts";
  const limit = 10;
  const page = Number(query.page) || 1;
  const totalCount = limit * page;
  const loadTimes = Math.ceil(totalCount / 30);
  const yt = new Client();

  const ch = await yt.findOne(title, { 
    type: "channel",
  });

  await ch?.nextVideos(loadTimes);

  const videos = (ch?.videos || [])
    .slice(totalCount - limit, totalCount)
    .map(v => {
      return {
        id: v.id,
        title: v.title,
        thumbnail: v.thumbnails[v.thumbnails.length - 1].url
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
