import React from "react";
import { useNavigate } from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";

const AuthProvider = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  let navigate = useNavigate();

  const onDirectCallBack = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onDirectCallBack={onDirectCallBack}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
