import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.css";
import App from "./Components/App";

const container = document.getElementById("root");
if (!container) throw new Error("Missing #root element");

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
