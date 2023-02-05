import Header from "../components/Header";
import Footer from "../components/Footer";
import { ReactElement } from "react";
import { Container } from "@chakra-ui/react";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth="4xl">
      <Header />
      {children}
      <Footer />
    </Container>
  );
};
