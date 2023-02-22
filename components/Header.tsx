import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box py="8">
      <Flex
        as="header"
        py="2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="xl" _hover={{ color: "blue.500" }}>
          <Link href="/">人生九蓮宝燈.com</Link>
        </Heading>
        <IconButton
          verticalAlign="middle"
          aria-label="DarkMode Switch"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </Flex>
        <Text fontSize="3xl">🀇🀇🀇🀈🀉🀊🀋🀌🀍🀎🀏🀏🀏 🀏</Text>
    </Box>
  );
};

export default Header;
