import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { RenderBlocks } from "../components/ContentBlocks";
import { getNotionData, getPage, getBlocks } from "../lib/getNotionData";
import { Post } from "../types/notion";


const databaseId = process.env.NOTION_DATABASE_ID;

export default function Post ({page, blocks}) {
  return (
    <div>
  <h1 className="mb-5 text-3xl font-bold tracking-tight text-black md:text-5xl">
        {page.properties.Post.title[0].plain_text}
      </h1>

      <RenderBlocks blocks={blocks} />
    </div>
  );
};

export const getStaticPaths:GetStaticPaths = async () => {
  const database  = await getNotionData(databaseId) as Post[];
  return {
    paths: database.map((page) => ({
      params: {
        slug: page.properties.Slug.rich_text[0].plain_text,
      },
    })),
    fallback: false,
  };
};
export const getStaticProps:GetStaticProps = async (context:GetStaticPropsContext) => {
  const { slug } = context.params;
  const database = await getNotionData(databaseId) as Post[];
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

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
  };
};

