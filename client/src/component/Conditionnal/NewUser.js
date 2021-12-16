import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logoblack from "../assets/logoblack.png";

const NewUser = () => {
  const { user } = useAuth0();
  return (
    <>
      <Container>
        <Logo alt="logo" src={logoblack} />
        New kid on the block huh? We'd like to know a bit more about you :
        {"\u00a0"}
        <Link to={`/user/${user?.email}`}>Go to profile</Link>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #65676b;
  font-size: 20px;
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
`;

export default NewUser;
