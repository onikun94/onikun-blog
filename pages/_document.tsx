import { Box, ColorModeScript, Container } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "../lib/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Container  centerContent marginY="16" marginX="auto">
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Main />
            <NextScript />
          </Container>
        </body>
      </Html>
    );
  }
}
