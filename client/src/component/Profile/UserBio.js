import React from "react";
import styled from "styled-components";
const UserBio = ({ thisUser }) => {
  return (
    <>
      <Container>
        <Title>About me :</Title> {thisUser?.bio}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 50%;
  height: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  color: #65676b;
`;

const Title = styled.div`
  margin: 20px 0;
  font-size: 24px;
  font-weight: bold;
`;

export default UserBio;
