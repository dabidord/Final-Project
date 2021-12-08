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
  const { about, setAbout } = useState(false);
  const { bio, setBio } = useState(false);
  const { friends, setFriends } = useState(false);
  const { ads, setAds } = useState(false);

  console.log(about, bio, friends, ads);
  return (
    <>
      <Container>
        <HiOutlinePencil
          style={{ cursor: "pointer" }}
          onClick={() => setModify(true)}
        />
        <UserContainer>
          <img alt="avatar" src={user?.picture} />
          <InfoContainer>
            <Name>{currentUser?.name}</Name>
            <NickName>{currentUser?.nickname}</NickName>
          </InfoContainer>
        </UserContainer>
      </Container>
      <UserNav>
        <Nav onClick={() => setAbout(true)}>About</Nav>
        <Nav onClick={() => setBio(true)}>Bio</Nav>
        <Nav onClick={() => setFriends(true)}>Friends</Nav>
        <Nav onClick={() => setAds(true)}>Ads</Nav>
      </UserNav>
      {modify === true && <EditProfile setModify={setModify} />}
      {about === true && <UserInfo setAbout={setAbout} />}
      {bio === true && <UserBio setBio={setBio} />}
      {friends === true && <FriendsList setFriends={setFriends} />}
      {ads === true && <ListingByUser setAds={setAds} />}
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

const Name = styled.div`
  margin: 20px;
  font-weight: bold;
`;
