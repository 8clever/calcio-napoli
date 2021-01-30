import { GetServerSideProps } from "next"
import { Channel, getNewsList, IProps as ChannelProps } from "../src/components/Channel"

export const getServerSideProps: GetServerSideProps<ChannelProps> = async () => {
  return {
    props: {
      list: await getNewsList()
    }
  }
}

export const config = {
  amp: true
}

export default Channel
