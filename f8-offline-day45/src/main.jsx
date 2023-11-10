import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeProvider, CSSReset } from "@chakra-ui/react";

import App from "./App.jsx";
import theme from "./theme/theme.js";
import "./assets/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <ColorModeProvider options={{ useSystemColorMode: true }}>
      <CSSReset />
      <App />
    </ColorModeProvider>
  </ChakraProvider>
  /* </React.StrictMode> */
);
