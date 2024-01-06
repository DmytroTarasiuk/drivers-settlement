import React from "react";
import { Route, Switch } from "react-router-dom";
import Box from "@mui/material/Box";

import AuthForm from "../../AuthForm";

import styles from "./styles.module.css";

function AuthLayout() {
  return (
    <Box className={styles.container}>
      <Switch>
        <Route exact path="/" render={() => <AuthForm />} />
      </Switch>
    </Box>
  );
}

export default AuthLayout;
