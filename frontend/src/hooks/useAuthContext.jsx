import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const user = useContext(AuthContext);

  if (!user) {
    throw new Error("useAuthContext should be used inside AuthContextProvider");
  }

  return user;
};
