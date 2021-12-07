import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import AuthProvider from "./component/Context/AuthLogin";
import { ListingProvider } from "./component/Context/ListingContext";

ReactDOM.render(
  <AuthProvider>
    <ListingProvider>
      <App />
    </ListingProvider>
  </AuthProvider>,
  document.getElementById("root")
);
