import React, { ReactNode, useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import AuthGuard from "./components/HOC/AuthGuard";
import Layout from "./components/Layout";
import AuthLayout from "./components/Layout/AuthLayout";
import Raport from "./components/Raport";
import AuthContext from "./context/auth-context";

interface ILayoutRoute {
  exact?: boolean;
  path: string;
  component: ReactNode;
}

function App() {
  const authCtx = useContext(AuthContext);
  const LayoutRoute = ({ exact, path, component }: ILayoutRoute) => {
    return (
      <Route
        exact={exact}
        path={path}
        render={() => {
          return <Layout>{component}</Layout>;
        }}
      ></Route>
    );
  };

  return (
    <Router>
      <Switch>
        {!authCtx.isLoggedIn ? (
          <Route exact path={"/"} component={AuthLayout} />
        ) : (
          <Route path={"/"} exact>
            <Redirect to={"/dashboard"} />
          </Route>
        )}
        <LayoutRoute
          exact
          path="/dashboard"
          component={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <LayoutRoute
          exact
          path="/raport"
          component={
            <AuthGuard>
              <Raport />
            </AuthGuard>
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
