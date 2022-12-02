import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import "./index.css";

import { createComposedStore } from "@state/index";

import Main from "./Main";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={createComposedStore()}>
      <Main />
    </ReduxProvider>
  </React.StrictMode>
);
