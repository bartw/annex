import React, { useState } from "react";
import { useStream } from "../stream";

export const AddStream = () => {
  const stream = useStream();
  const [name, setName] = useState<string>("");

  if (!stream) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    stream.addStream(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          required
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)
          }
        />
      </label>
      <button type="submit">Add Stream</button>
    </form>
  );
};
