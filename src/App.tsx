import React, { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";

interface ILayoutRoute {
  exact?: boolean;
  path: string;
  component: ReactNode;
}

function App() {
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
        <LayoutRoute exact path="/dashboard" component={<Dashboard />} />
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Router>
  );
}

export default App;
