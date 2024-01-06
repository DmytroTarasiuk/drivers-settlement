import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { createStore } from "redux";

import { AuthContextProvider } from "./context/auth-context";
import reducers from "./redux/reducer";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const store = createStore(reducers);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <AuthContextProvider>
    <Provider store={store}>
      <React.StrictMode>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </React.StrictMode>
    </Provider>
  </AuthContextProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
