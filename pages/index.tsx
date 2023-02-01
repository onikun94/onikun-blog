import { GetStaticProps, type NextPage } from "next";
import {
  Badge,
  Card,
  CardBody,
  Container,
  IconButton,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { getNotionData } from "../lib/getNotionData";
import Link from "next/link";
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { PostType } from "../types/notion";

type Props = { posts: (PageObjectResponse | PartialPageObjectResponse)[] };
type NotionPropsType = { posts: PostType[] };

const Home: NextPage<NotionPropsType> = ({ posts }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (

      <Container maxWidth="4xl">
        <IconButton
          // _focus={{_focus: "none"}} //周りの青いアウトラインが気になる場合に消す方法
          mb={10}
          aria-label="DarkMode Switch"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} //自分の好みでSunアイコンはreact-iconsを使用しています
          onClick={toggleColorMode}
        />
        <Text fontSize="4xl" fontWeight="bold" marginY="4">
          人生九蓮宝燈.com
        </Text>
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/${post.properties.Slug.rich_text[0].plain_text}`}
          >
            <Card key={post.id} marginY="2">
              <CardBody>
                <Text fontSize="2xl" fontWeight="bold">
                  {post.properties.Slug.rich_text[0].plain_text}
                </Text>
                <Stack direction="row">
                  {post.properties.Tag.multi_select.map((tag) => (
                    <Badge key={tag.name} colorScheme={tag.color}>
                      {tag.name}
                    </Badge>
                  ))}
                </Stack>
                <Text>
                  {post.properties.Description.rich_text[0].plain_text}
                </Text>
              </CardBody>
            </Card>
          </Link>
        ))}
      </Container>
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
