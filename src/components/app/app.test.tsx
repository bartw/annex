import React from "react";
import {
  act,
  render as rtlRender,
  RenderOptions,
  screen,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../auth";
import { Auth, Credentials } from "../../services/Auth";
import { App } from ".";

const uuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

type Callback = (authenticated: boolean) => void;

class AuthMock implements Auth {
  private callbacks: Array<{ id: string; callback: Callback }> = [];

  signUp(credentials: Credentials): Promise<void> {
    return Promise.resolve();
  }

  signIn(credentials: Credentials): Promise<void> {
    return Promise.resolve();
  }

  signOut(): Promise<void> {
    return Promise.resolve();
  }

  resetPassword({ email }: { email: string }): Promise<void> {
    return Promise.resolve();
  }

  updatePassword({ password }: { password: string }): Promise<void> {
    return Promise.resolve();
  }

  onAuthStateChanged(callback: Callback): () => void {
    const id = uuid();
    this.callbacks = [...this.callbacks, { id, callback }];
    return () => {
      this.callbacks = this.callbacks.filter((cb) => id !== cb.id);
    };
  }

  fireCallbacks(authenticated: boolean): void {
    this.callbacks.forEach(({ callback }) => {
      callback(authenticated);
    });
  }

  isAuthenticated(): boolean {
    return false;
  }
}

const render = (
  ui: React.ReactElement,
  {
    auth = null,
    ...options
  }: { auth?: AuthMock | null } & Omit<RenderOptions, "queries"> = {}
) => {
  const Wrapper: React.ComponentType = ({ children }) => (
    <MemoryRouter>
      <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    </MemoryRouter>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

let authMock: AuthMock;
beforeEach(() => {
  authMock = new AuthMock();
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
