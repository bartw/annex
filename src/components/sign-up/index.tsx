import React, { useState } from "react";
import { useAuth } from "../auth";
import { Button } from "../button";
import { FormElement } from "../form-element";

export const SignUp = () => {
  const auth = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (!auth) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    auth.signUp({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <FormElement label="Email:">
        <input
          type="email"
          required
          value={email}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
        />
      </FormElement>
      <FormElement label="Password:">
        <input
          type="password"
          required
          value={password}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
        />
      </FormElement>
      <FormElement>
        <Button type="submit">Sign Up</Button>
      </FormElement>
    </form>
  );
};
