import { Box, Center, Container, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const Footer:React.FC = () => {
  return (
    <Box px="4" py="32">
        <Center fontSize="sm" fontWeight="light" marginY="4">
          © Copyright 2022 by onikun94.
        </Center>
    </Box>
  )
}

export default Footer
