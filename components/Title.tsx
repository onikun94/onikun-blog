import { Badge, Card, CardBody, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Title = ({posts}) => {
  return (
    <>
      {posts.map((post) => (
        <>
        <Link
          key={post.id}
          href={`/${post.properties.Slug.rich_text[0].plain_text}`}
        >
          <Card key={post.id} marginY="2" _hover={{ textColor: "blue.500"}}>
            <CardBody>
              <Text _pointer-events={"none"}>{post.properties.Date.date.start}</Text>
              <Text fontSize="2xl" fontWeight="bold" my="1" id="a">
                {post.properties.Slug.rich_text[0].plain_text}
              </Text>
              <Stack direction="row" _pointer-events="none">
                {post.properties.Tag.multi_select.map((tag) => (
                  <Badge key={tag.name} colorScheme={tag.color}>
                    {tag.name}
                  </Badge>
                ))}
              </Stack>
              <Text mt="1" _pointer-events="none">
                {post.properties.Description.rich_text[0].plain_text}
              </Text>
            </CardBody>
          </Card>
        </Link>
        </>
      ))}
    </>
  )
}

export default Title
