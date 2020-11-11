import React from "react";
import { render, screen } from "@testing-library/react";
import { SignUp } from ".";

test("renders email, password inputs and submit button", () => {
  render(<SignUp />);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
});
