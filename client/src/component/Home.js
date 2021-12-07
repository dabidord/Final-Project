import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import ListingFeed from "./ListingFeed";

const Home = () => {
  let navigate = useNavigate();
  const { user } = useAuth0();
  const { isAuthenticated } = useAuth0();

  console.log(user);

  return (
    <>
      {isAuthenticated && (
        <Container>
          <UserContainer>
            <Avatar
              onClick={() => navigate("/profile")}
              alt="avatar"
              src={user.picture}
            />
            <Nickname>{user.nickname}</Nickname>
          </UserContainer>
          <Button
            onClick={() => {
              navigate("/create");
            }}
          >
            New listing
          </Button>
        </Container>
      )}
      <ListingFeed />
    </>
  );
};

const Container = styled.div`
  width: 50%;
  height: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  border-bottom: 2px solid #2c5ff6;
  padding-bottom: 20px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Nickname = styled.div`
  font-size: 16px;
  margin: 0 20px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: auto;
  width: 50px;
  cursor: pointer;
`;

const Button = styled.button`
  margin: 0 20px;
  width: 100px;
  height: 30px;
  border: none;
  background-color: #26d49c;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

export default Home;
