import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Button onClick={() => loginWithRedirect()} id="qsLoginBtn">
        Log In
      </Button>
    </>
  );
};

const Button = styled.button`
  background-color: #26d49c;
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  width: 120px;
  margin-left: 80px;
`;

export default LoginButton;
