import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const userAuth = () => {
  return useContext(AuthContext);
};

export default userAuth;
