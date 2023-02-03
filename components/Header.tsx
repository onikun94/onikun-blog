import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const Header:React.FC = () => {
  return (
    <Box px={4}>
        <Flex as="header" py="16" justifyContent="space-between" alignItems="center">
        <Heading size='2xl'  marginY="4">
          人生九蓮宝燈.com
        </Heading>
        </Flex>
    </Box>
  )
}

export default Header
