import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./Components/App";

document.body.classList.add("dark-mode");

const container = document.getElementById("root");
if (!container) throw new Error("Missing #root element");

const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
