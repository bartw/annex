import { useContext } from "react";
import { StreamContext } from "./context";

export const useStream = () => {
  return useContext(StreamContext);
};
