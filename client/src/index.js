import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import AuthProvider from "./component/Context/AuthLogin";
import { ListingProvider } from "./component/Context/ListingContext";
import { CurrentUserProvider } from "./component/Context/CurrentUser";
import { MapsProvider } from "./component/Context/MapsContext";

ReactDOM.render(
  <AuthProvider>
    <CurrentUserProvider>
      <ListingProvider>
        <MapsProvider>
          <App />
        </MapsProvider>
      </ListingProvider>
    </CurrentUserProvider>
  </AuthProvider>,
  document.getElementById("root")
);
