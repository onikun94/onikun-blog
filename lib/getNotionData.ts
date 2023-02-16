import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const getNotionData = async (databaseId:string) =>{
  const response = await notion.databases.query({
    database_id:databaseId,
    filter:{
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          }
        }
      ]
    },

    sorts: [
      {
        property: "Date",
        direction: "descending",
      }
    ]
  })
  return response.results
}

export const getPage = async (pageId:string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const getBlocks = async (blockId:string) => {
  const blocks = []
  let cursor:string
  while (true){
    const {results, next_cursor} = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId
    })
    blocks.push(...results)
    if(!next_cursor){
      break
    }
    cursor = next_cursor
   }
   return blocks
}
