import { useContext } from "react";
import FirebaseContext from "./context";

const useFirebase = () => {
  return useContext(FirebaseContext);
};

export default useFirebase;
