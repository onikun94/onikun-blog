
/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom/extend-expect"
import { render, screen, cleanup } from "@testing-library/react"
import { Hoge } from "../pages/hoge";
//import { initTestHelpers } from "next-page-tester"
//import { rest } from "msw"
//import { setupServer } from "msw/node"

describe("Top Page", () => {
  it("Should render the list of blog pre-fetched by getStaticProps",  () => {
    render(<Hoge/>);
    expect(screen.getByText("Hoge")).toBeInTheDocument();
  })
})
