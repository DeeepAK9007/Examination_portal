import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { LoginContextProvider } from "./context/loginContext.tsx";
import { NavbarContextProvider } from "./context/navbarContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginContextProvider>
        <NavbarContextProvider>
          <App />
        </ NavbarContextProvider>
      </LoginContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
