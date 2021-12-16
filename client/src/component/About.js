import React from "react";
import styled from "styled-components";
import logoblack from "../component/assets/logoblack.png";

const About = () => {
  return (
    <>
      <Container>
        <Logo alt="logo" src={logoblack} />
        <div>
          Huntree aims at creating a safe space for hunters to connect with
          hunting guides and land owners.
        </div>
        <div></div>
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

export default About;
