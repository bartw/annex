import React from "react";
import {
  fireEvent,
  render as rtlRender,
  RenderOptions,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthContext } from "../auth";
import { MockAuth } from "../../test/mock-auth";
import { SignUp } from ".";

const email = "my.e@ma.il";
const password = "super secret";

const render = (
  ui: React.ReactElement,
  {
    auth = null,
    ...options
  }: { auth?: MockAuth | null } & Omit<RenderOptions, "queries"> = {}
) => {
  const Wrapper: React.ComponentType = ({ children }) => (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

let authMock: MockAuth;

describe("without auth", () => {
  test("it renders nothing", () => {
    const { container } = render(<SignUp />, { auth: null });
    expect(container).toBeEmptyDOMElement();
  });
});

describe("with auth", () => {
  beforeEach(() => {
    authMock = new MockAuth();
    render(<SignUp />, { auth: authMock });
    authMock.fireCallbacks(false);
  });

  test("renders email, password inputs and submit button", () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test("on click submit button call signUp with email and password", () => {
    userEvent.type(screen.getByLabelText(/email/i), email);
    userEvent.type(screen.getByLabelText(/password/i), password);
    userEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(authMock.signUp).toHaveBeenCalledTimes(1);
    expect(authMock.signUp).toHaveBeenCalledWith({ email, password });
  });

  test("on submit from email field call signUp with email and password", () => {
    userEvent.type(screen.getByLabelText(/email/i), email);
    userEvent.type(screen.getByLabelText(/password/i), password);
    fireEvent.submit(screen.getByLabelText(/email/i));

    expect(authMock.signUp).toHaveBeenCalledTimes(1);
    expect(authMock.signUp).toHaveBeenCalledWith({ email, password });
  });

  test("on submit from password field call signUp with email and password", () => {
    userEvent.type(screen.getByLabelText(/email/i), email);
    userEvent.type(screen.getByLabelText(/password/i), password);
    fireEvent.submit(screen.getByLabelText(/password/i));

    expect(authMock.signUp).toHaveBeenCalledTimes(1);
    expect(authMock.signUp).toHaveBeenCalledWith({ email, password });
  });

  // these 👇 don't work (yet) because of issues with jsdom
  // https://github.com/jsdom/jsdom/issues/2933
  // https://github.com/jsdom/jsdom/issues/2898

  // test("signUp is not called when email is empty", () => {
  //   userEvent.type(screen.getByLabelText(/password/i), password);
  //   userEvent.click(screen.getByRole("button", { name: /sign up/i }));

  //   expect(authMock.signUp).not.toHaveBeenCalled();
  // });

  // test("signUp is not called when email is invalid", () => {
  //   userEvent.type(screen.getByLabelText(/email/i), "notanemail");
  //   userEvent.type(screen.getByLabelText(/password/i), password);
  //   userEvent.click(screen.getByRole("button", { name: /sign up/i }));

  //   expect(authMock.signUp).not.toHaveBeenCalled();
  // });

  // test("signUp is not called when password is empty", () => {
  //   userEvent.type(screen.getByLabelText(/email/i), email);
  //   userEvent.click(screen.getByRole("button", { name: /sign up/i }));

  //   expect(authMock.signUp).not.toHaveBeenCalled();
  // });
});
