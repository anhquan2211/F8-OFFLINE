import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

import "./assets/styles.css";

// Retrieve Auth0 configuration from Vite environment variables
const {
  VITE_REACT_APP_AUTH0_DOMAIN: domain,
  VITE_REACT_APP_AUTH0_CLIENT_ID: clientId,
} = import.meta.env;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
