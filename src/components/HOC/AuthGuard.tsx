import { useContext } from "react";

//import { useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const AuthGuard = (component: any) => {
  const authCtx = useContext(AuthContext);
  //const history = useHistory();

  if (authCtx.isLoggedIn) {
    return component;
  }
  //history.replace("/");
};

export default AuthGuard;
