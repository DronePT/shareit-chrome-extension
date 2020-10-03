import React from "react";
import ReactDOM from "react-dom";
import ReactShadowRoot from "react-shadow-root";

import { App } from "./components";

import { createStoreProvider } from "./store";

import "./index.scss";
import { AuthProvider } from "./store/auth-context-provider";

const injectWrapper = document.body;
const app = document.createElement("div");

app.id = "shareit-inspireit--chrome-extension";

if (injectWrapper) injectWrapper.prepend(app);

const Store = createStoreProvider([AuthProvider]);

ReactDOM.render(
  <ReactShadowRoot>
    <React.StrictMode>
      <Store>
        <App />
      </Store>
    </React.StrictMode>
  </ReactShadowRoot>,
  document.getElementById("shareit-inspireit--chrome-extension")
);
