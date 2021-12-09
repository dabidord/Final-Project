import React, { useContext, useState } from "react";
import styled from "styled-components";
import { HiOutlinePencil } from "react-icons/hi";
//components
import ListingByUser from "./ListingByUser";
import EditProfile from "./EditProfile";
import UserInfo from "./UserInfo";
import FriendsList from "./FriendsList";
import UserBio from "./UserBio";
//contexts
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentUserContext } from "../Context/CurrentUser";

const Profile = () => {
  const { user } = useAuth0();
  const { currentUser } = useContext(CurrentUserContext);
  const [modify, setModify] = useState(false);
  const [about, setAbout] = useState(false);
  const [bio, setBio] = useState(false);
  const [friends, setFriends] = useState(false);
  const [ads, setAds] = useState(false);

  return (
    <>
      <Container>
        <HiOutlinePencil
          style={{ cursor: "pointer", marginBottom: "20px" }}
          onClick={() => {
            setAbout(false);
            setBio(false);
            setFriends(false);
            setAds(false);
            setModify(true);
          }}
        />
        <UserContainer>
          <img alt="avatar" src={user?.picture} />
          <InfoContainer>
            <NickName>{currentUser?.nickname}</NickName>
          </InfoContainer>
        </UserContainer>
      </Container>
      <UserNav>
        <Nav
          onClick={() => {
            setAbout(true);
            setBio(false);
            setFriends(false);
            setAds(false);
            setModify(false);
          }}
        >
          About
        </Nav>
        <Nav
          onClick={() => {
            setAbout(false);
            setBio(true);
            setFriends(false);
            setAds(false);
            setModify(false);
          }}
        >
          Bio
        </Nav>
        <Nav
          onClick={() => {
            setAbout(false);
            setBio(false);
            setFriends(true);
            setAds(false);
            setModify(false);
          }}
        >
          Friends
        </Nav>
        <Nav
          onClick={() => {
            setAbout(false);
            setBio(false);
            setFriends(false);
            setAds(true);
            setModify(false);
          }}
        >
          Ads
        </Nav>
      </UserNav>
      {modify === true && <EditProfile setModify={setModify} />}
      {about === true && <UserInfo currentUser={currentUser} />}
      {bio === true && <UserBio currentUser={currentUser} />}
      {friends === true && <FriendsList currentUser={currentUser} />}
      {ads === true && <ListingByUser currentUser={currentUser} />}
    </>
  );
};

export default Profile;

const UserNav = styled.div`
  width: 50%;
  max-height: 50px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 2px solid lightgrey;
  border-bottom: 1px solid lightgrey;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 120px;
  margin: 10px;
  align-items: center;
  color: #65676b;
  font-size: 20px;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    border-bottom: 2px solid #2c5ff6;
    transform: translateY(-1px);
    color: #2c5ff6;
  }
`;

const Container = styled.div`
  width: 50%;
  height: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  color: #65676b;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const NickName = styled.div`
  margin: 20px;
  font-weight: bold;
`;
