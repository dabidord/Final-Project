import React from "react";
import styled from "styled-components";
import logoblack from "../assets/logoblack.png";
const UserNotLogged = () => {
  return (
    <>
      <Container>
        <Logo alt="logo" src={logoblack} />
        <div>Please log in </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #65676b;
  font-size: 20px;
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
`;

export default UserNotLogged;
