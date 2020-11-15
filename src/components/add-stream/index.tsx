import React, { useState } from "react";
import { useStream } from "../stream";
import { FormElement } from "../form-element";
import { Button } from "../button";

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
      <h3>Add Stream</h3>
      <FormElement label="Name:">
        <input
          type="text"
          required
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)
          }
        />
      </FormElement>
      <FormElement>
        <Button type="submit">Add Stream</Button>
      </FormElement>
    </form>
  );
};
