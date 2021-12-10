import React from "react";
import styled from "styled-components";

const UserNotLogged = () => {
  return (
    <>
      <Container>Log in you chump (╯°□°）╯︵ ┻━┻</Container>
    </>
  );
};

const Container = styled.div`
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default UserNotLogged;
