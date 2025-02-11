import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { IbrahimStudioProvider } from "@ibrahimstudio/react";
import { AuthProvider } from "./lib/auth";
import { ApiProvider } from "./lib/api";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <IbrahimStudioProvider>
          <AuthProvider>
            <ApiProvider>
              <App />
            </ApiProvider>
          </AuthProvider>
        </IbrahimStudioProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
