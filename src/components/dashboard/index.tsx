import React, { useEffect, useState } from "react";
import { useStream } from "../stream";

export const Dashboard = () => {
  const stream = useStream();
  const [loading, setLoading] = useState<boolean>(true);
  const [streams, setStreams] = useState<string[]>([]);

  useEffect(() => {
    if (!stream) {
      return;
    }

    stream.getStreams().then((result) => {
      setStreams(result);
      setLoading(false);
    });
  }, [stream]);

  if (!stream) {
    return null;
  }

  return (
    <div>
      <h3>Dashboard</h3>
      {loading && <div>loading</div>}
      <ul>
        {streams.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};
