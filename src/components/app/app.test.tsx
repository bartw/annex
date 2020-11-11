import React from "react";
import {
  act,
  render as rtlRender,
  RenderOptions,
  screen,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../auth";
import { MockAuth } from "../../test/MockAuth";
import { App } from ".";

const render = (
  ui: React.ReactElement,
  {
    auth = null,
    ...options
  }: { auth?: MockAuth | null } & Omit<RenderOptions, "queries"> = {}
) => {
  const Wrapper: React.ComponentType = ({ children }) => (
    <MemoryRouter>
      <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    </MemoryRouter>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

let authMock: MockAuth;
beforeEach(() => {
  authMock = new MockAuth();
  render(<App />, { auth: authMock });
});

test("renders title and subtitle", () => {
  expect(
    screen.getByRole("heading", { level: 1 }).textContent
  ).toMatchInlineSnapshot(`"Annex"`);

  expect(
    screen.getByRole("heading", { level: 2 }).textContent
  ).toMatchInlineSnapshot(`"Append Only Micro Blogs"`);
});

test("shows a loading state until the auth service is ready", () => {
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  act(() => authMock.fireCallbacks(false));

  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});

test("shows the correct menu items when not authenticated", async () => {
  act(() => authMock.fireCallbacks(false));

  const menuItems = screen
    .queryAllByRole("listitem")
    .map(({ textContent }) => textContent);

  expect(menuItems).toHaveLength(3);
  expect(menuItems).toEqual(["Home", "Sign Up", "Sign In"]);
});

test("shows the correct menu items when authenticated", async () => {
  act(() => authMock.fireCallbacks(true));

  const menuItems = screen
    .queryAllByRole("listitem")
    .map(({ textContent }) => textContent);

  expect(menuItems).toHaveLength(2);
  expect(menuItems).toEqual(["Home", "Sign Out"]);
});
