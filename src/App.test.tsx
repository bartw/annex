import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("renders title and subtitle", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1 }).textContent
  ).toMatchInlineSnapshot(`"Annex"`);
  expect(
    screen.getByRole("heading", { level: 2 }).textContent
  ).toMatchInlineSnapshot(`"Append Only Micro Blogs"`);
});
