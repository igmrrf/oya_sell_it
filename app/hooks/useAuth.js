import { useContext } from "react";
import AuthContext from "../auth/context";
import JWTDecode from "jwt-decode";
import { removeToken, storeToken } from "../auth/storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (data) => {
    const user = JWTDecode(data);
    setUser(user);
    storeToken(key);
  };
  
  signUp = (data) => {
    setUser(data);
  };

  const logOut = () => {
    setUser(null);
    removeToken();
  };
  return { user, logOut, logIn, signUp };
};
