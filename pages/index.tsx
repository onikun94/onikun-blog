import { GetStaticProps, type NextPage } from "next";
import {
  Badge,
  Card,
  CardBody,
  Container,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getNotionData } from "../lib/getNotionData";
import Link from "next/link";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { PostType } from "../types/notion";

type Props = {posts:(PageObjectResponse | PartialPageObjectResponse)[]}
type NotionPropsType = {posts:PostType[]}

const Home: NextPage<NotionPropsType> = ({posts}) => {
  return (
    <Container marginY="16">
      <Text fontSize="3xl" backgroundColor="white" marginY="4">
        All
      </Text>
      {posts.map((post) => (
        <Link key={post.id} href={`/${post.properties.Slug.rich_text[0].plain_text}`}>
          <Card key={post.id} marginY="2">
            <CardBody>
              <Text fontSize="lg" fontWeight="bold">
                {post.properties.Slug.rich_text[0].plain_text}
              </Text>
              <Stack direction="row">
                {post.properties.Tag.multi_select.map((tag) => (
                  <Badge key={tag.name} colorScheme={tag.color}>
                    {tag.name}
                  </Badge>
                ))}
              </Stack>
              <Text>{post.properties.Description.rich_text[0].plain_text}</Text>
            </CardBody>
          </Card>
        </Link>
      ))}
    </Container>
  );
  //})
};

export const getStaticProps:GetStaticProps<Props>  = async () => {
  const database = await getNotionData(process.env.NOTION_DATABASE_ID);
  console.log("database = ", database);

  return {
    props: {
      posts: database,
    },
  };
};

export default Home;
