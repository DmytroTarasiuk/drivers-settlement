import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../context/auth-context";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      history.replace("/");
    }
  }, [authCtx.isLoggedIn, history]);

  return <>{authCtx.isLoggedIn ? children : null}</>;
};

export default AuthGuard;
