import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "../node_modules/bootstrap/dist/css/bootstrap-utilities.css";
import "../node_modules/bootstrap/dist/css/bootstrap-reboot.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>
);
