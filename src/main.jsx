import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import store from "./store/store.js";
import "semantic-ui-css/semantic.min.css";
import "./styles/themes.scss";
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
