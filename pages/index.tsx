import { GetStaticProps, type NextPage } from "next";
import { getNotionData } from "../lib/getNotionData";
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionPropsType } from "../types/notion";
import Title from "../components/Title";

type Props = { posts: (PageObjectResponse | PartialPageObjectResponse)[] };

const Home: NextPage<NotionPropsType> = ({ posts }) => {
  return (
    <Title posts={posts}/>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const database = await getNotionData(process.env.NOTION_DATABASE_ID);
  return {
    props: {
      posts: database,
    },
  };
};

export default Home;
