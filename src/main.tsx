import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import "survey-core/defaultV2.min.css";
import { BrowserRouter } from "react-router-dom";

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
