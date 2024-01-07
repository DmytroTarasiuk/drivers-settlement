import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormControl, FormLabel, Input } from "@mui/material";
import { Form, Formik } from "formik";

import AUTH_API from "../../api/auth";
import AuthContext from "../../context/auth-context";

import styles from "./styles.module.css";

interface MyFormValues {
  email: string;
  password: string;
}

function AuthForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    setIsLoading(true);

    const loginData = {
      username: enteredEmail,
      password: enteredPassword,
    };

    AUTH_API.login(loginData)
      .then((response) => {
        if (response.status === 200) {
          authCtx.login(response.data.token);
          history.push("/dashboard");
        } else {
          throw new Error("Authenfication Fail!");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setError(error.response.data.msg);
        } else {
          setError("Invalid credentials");
        }
        console.log(error);
        setIsLoading(false);
      });
  };

  const initialValues: MyFormValues = { email: "", password: "" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Form onSubmit={submitHandler} className={styles.form}>
        <h1>Login</h1>
        <FormControl>
          <FormLabel htmlFor="email">Login</FormLabel>
          <Input
            id="email"
            name="email"
            placeholder="Enter login"
            inputRef={emailInputRef}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            inputRef={passwordInputRef}
            required
          />
        </FormControl>

        <div className={styles.actions}>
          {!isLoading && <button>Login</button>}
          {isLoading && <p>Sending request...</p>}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </Form>
    </Formik>
  );
}

export default AuthForm;
