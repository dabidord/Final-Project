import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import AuthProvider from "./component/Context/AuthLogin";
import { ListingProvider } from "./component/Context/ListingContext";
import { CurrentUserProvider } from "./component/Context/CurrentUser";

ReactDOM.render(
  <AuthProvider>
    <CurrentUserProvider>
      <ListingProvider>
        <App />
      </ListingProvider>
    </CurrentUserProvider>
  </AuthProvider>,
  document.getElementById("root")
);
