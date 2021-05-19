import { GetServerSideProps } from "next";
import { Channel, IProps as ChannelProps } from "../../src/components/Channel";
import { ParsedUrlQuery } from "querystring";
import { getServerSideProps as IndexServerSideProps } from "../index";

interface IParams extends ParsedUrlQuery {
  slug: string;
  page: string;
}

export const getServerSideProps: GetServerSideProps<ChannelProps, IParams> = async (props) => {
  return IndexServerSideProps({
    ...props,
    query: {
      ...props.query,
      slug: props.params?.slug || ""
    }
  });
}

export const config = {
  amp: "hybrid"
}

export default Channel