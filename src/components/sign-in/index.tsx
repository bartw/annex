import React, { useState } from "react";
import { useAuth } from "../auth";
import { FormElement } from "../form-element";
import { Button } from "../button";

export const SignIn = () => {
  const auth = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (!auth) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    auth.signIn({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <Button type="submit">Sign In</Button>
      </FormElement>
    </form>
  );
};
