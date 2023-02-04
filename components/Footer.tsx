import { Box, Center, Container, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const Footer:React.FC = () => {
  return (
    <Box  bottom="0" py="16" textAlign="center">
      <Text fontSize="xs" fontWeight="thin">
          © Copyright 2022 by onikun94.
      </Text>
    </Box>
  )
}

export default Footer
