import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const NewUser = () => {
  const { user } = useAuth0();
  return (
    <>
      <Container>
        Add info
        <Link to={`/user/${user?.email}`}>Go to profile</Link>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default NewUser;
