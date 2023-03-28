import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import { Routes } from "./routes";

import { AuthProvider } from "./hooks/auth";

import theme from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <React.StrictMode>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </React.StrictMode>
  </ThemeProvider>
);
