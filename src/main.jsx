import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'
import { I18nProvider } from "./i18n.jsx";
import App from "./App";
import "./styles.css";
import { loadTheme } from "./theme";
loadTheme();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <I18nProvider>
          <App />
        </I18nProvider>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);
