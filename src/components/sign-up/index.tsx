import React, { useState } from "react";
import { useAuth } from "../auth";

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
      <label>
        Email:
        <input
          type="email"
          required
          value={email}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          required
          value={password}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};
