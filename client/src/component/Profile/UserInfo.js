import React from "react";
import styled from "styled-components";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";

const UserInfo = ({ thisUser }) => {
  return (
    <>
      <Container>
        <Info>
          <AiOutlineUser size={28} />
          <Title> Name:</Title>
          {thisUser?.name}
        </Info>
        <Info>
          <AiOutlineMail size={28} />
          <Title>Email:</Title>
          {thisUser?.email}
        </Info>
        <Info>
          <GoLocation size={28} />
          <Title> Location:</Title>
          {thisUser?.location}
        </Info>
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

const Info = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  font-size: 20px;
`;

export default UserInfo;
