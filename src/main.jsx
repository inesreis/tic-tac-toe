import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.js";
import { DeviceProvider } from "./context/DeviceContext.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <DeviceProvider>
        <App />
      </DeviceProvider>
    </ThemeProvider>
  </StrictMode>
);
