import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Header:React.FC = () => {
  return (
    <Box px={4}>
      <Link href='/'>
        <Flex as="header" py="16" justifyContent="space-between" alignItems="center">
        <Heading size='2xl'  marginY="4">
          人生九蓮宝燈.com
        </Heading>
        </Flex>
      </Link>
    </Box>
  )
}

export default Header
