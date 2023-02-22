import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { Text } from "@chakra-ui/react";

import { RenderBlocks } from "../components/ContentBlocks";
import { getNotionData, getPage, getBlocks } from "../lib/getNotionData";
import { PostType } from "../types/notion";

const databaseId = process.env.NOTION_DATABASE_ID;

export default function Post({ page, blocks }) {
  return (
    <>
      <Text>{page.properties.Date.date.start}</Text>
      <Text fontSize="4xl" mb="8" fontWeight="bold" textAlign="center">
        {page.properties.Slug.rich_text[0].plain_text}
      </Text>
      <RenderBlocks blocks={blocks} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const database = (await getNotionData(databaseId)) as PostType[];
  return {
    paths: database.map((page) => ({
      params: {
        slug: page.properties.Slug.rich_text[0].plain_text,
      },
    })),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { slug } = context.params;
  const database = (await getNotionData(databaseId)) as PostType[];
  const filter = database.filter(
    (blog) => blog.properties.Slug.rich_text[0].plain_text === slug
  );
  const page = await getPage(filter[0].id);
  const blocks = await getBlocks(filter[0].id);

  const childrenBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children) {
      block[block.type].children = childrenBlocks.find(
        (x) => x.id === block.id
      ).children;
    }
    return block;
  });
  console.log("Blocks = ", blocksWithChildren);
  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
  };
};
