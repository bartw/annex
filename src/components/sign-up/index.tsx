import React from "react";

export const SignUp = () => {
  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};
