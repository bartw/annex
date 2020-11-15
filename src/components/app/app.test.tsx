import React from "react";
import {
  act,
  render as rtlRender,
  RenderOptions,
  screen,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../auth";
import { MockAuth } from "../../test/mock-auth";
import { MockStream } from "../../test/mock-stream";
import { App } from ".";
import userEvent from "@testing-library/user-event";

jest.mock("../../services/FirebaseStream", () => ({
  __esModule: true,
  FirebaseStream: MockStream,
}));

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

describe("without auth", () => {
  test("shows a loading state when auth is not available", () => {
    render(<App />, { auth: null });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

describe("with auth", () => {
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
      .queryAllByRole("link")
      .map((element) => (element as HTMLLinkElement).href);

    expect(menuItems).toHaveLength(3);
    expect(menuItems).toEqual([
      "http://localhost/",
      "http://localhost/sign-up",
      "http://localhost/sign-in",
    ]);
  });

  test("shows the correct menu items when authenticated", async () => {
    authMock.getUserId.mockReturnValue("userId");

    act(() => authMock.fireCallbacks(true));

    const menuItems = screen
      .queryAllByRole("link")
      .map((element) => (element as HTMLLinkElement).href);

    expect(menuItems).toHaveLength(2);
    expect(menuItems).toEqual([
      "http://localhost/",
      "http://localhost/add-stream",
    ]);
  });

  test("shows a sign out button when authenticated", async () => {
    authMock.getUserId.mockReturnValue("userId");

    act(() => authMock.fireCallbacks(true));

    expect(
      screen.getByRole("button", { name: /sign out/i })
    ).toBeInTheDocument();
  });

  test("on click sign out button calls signOut", async () => {
    authMock.getUserId.mockReturnValue("userId");

    act(() => authMock.fireCallbacks(true));

    userEvent.click(screen.getByRole("button", { name: /sign out/i }));

    expect(authMock.signOut).toHaveBeenCalledTimes(1);
  });
});
