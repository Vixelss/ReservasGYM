import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/* ①  variables → colores / fuentes
   ②  layout    → reset + helpers (.container, body oscuro) */
import "./styles/variables.css";
import "./styles/layout.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
