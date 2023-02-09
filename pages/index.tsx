import { GetStaticProps, type NextPage } from "next";
import {
  Badge,
  Card,
  CardBody,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { getNotionData } from "../lib/getNotionData";
import Link from "next/link";
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { PostType } from "../types/notion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Title from "../components/Title";

type Props = { posts: (PageObjectResponse | PartialPageObjectResponse)[] };
type NotionPropsType = { posts: PostType[] };

const Home: NextPage<NotionPropsType> = ({ posts }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Title posts={posts}/>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const database = await getNotionData(process.env.NOTION_DATABASE_ID);
  console.log("database = ", database);

  return {
    props: {
      posts: database,
    },
  };
};

export default Home;
