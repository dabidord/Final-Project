import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
//libraries
import { HiOutlinePencil } from "react-icons/hi";
//components
import ListingByUser from "./ListingByUser";
import EditProfile from "./EditProfile";
import UserInfo from "./UserInfo";
import ReviewForm from "./ReviewForm";
import UserBio from "./UserBio";
import Loading from "../Conditionnal/Loading";
import UserNotLogged from "../Conditionnal/UserNotLogged";
import Star from "../Rating/Star";
//contexts
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentUserContext } from "../Context/CurrentUser";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated } = useAuth0();
  const { currentUser, newUser } = useContext(CurrentUserContext);
  const [thisUser, setThisUser] = useState(false);
  const [modify, setModify] = useState(false);
  const [about, setAbout] = useState(false);
  const [bio, setBio] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [ads, setAds] = useState(true);
  const [status, setStatus] = useState("idle");
  let { email } = useParams();

  //************************************************************** */
  /// fetching user dynamically from params / email
  //************************************************************** */
  useEffect(() => {
    setStatus("loading");
    fetch(`/user/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (currentUser?.email === thisUser?.email) {
          setThisUser(currentUser);
        } else {
          setThisUser(data.data);
        }
        setStatus("loaded");
      });
  }, [currentUser, modify, email, thisUser?.email]);

  if (status === "loading") {
    return (
      <>
        <Loading />
      </>
    );
  } else if (newUser === true) {
    return (
      <>
        <EditProfile setModify={setModify} />
      </>
    );
  } else if (!currentUser) {
    return (
      <>
        <UserNotLogged />
      </>
    );
  } else {
    return (
      <>
        {isAuthenticated && newUser === false ? (
          <div>
            <Container>
              {currentUser?.email === thisUser?.email && (
                <HiOutlinePencil
                  style={{ cursor: "pointer", marginBottom: "20px" }}
                  onClick={() => {
                    setAbout(false);
                    setBio(false);
                    setReviews(false);
                    setAds(false);
                    setModify(true);
                  }}
                />
              )}
              <UserContainer>
                <Avatar alt="avatar" src={thisUser?.userpicture} />
                <InfoContainer>
                  <NickName>{thisUser?.nickname}</NickName>
                  <Star rating={thisUser?.rating} />
                </InfoContainer>
              </UserContainer>
            </Container>
            <UserNav>
              <Nav
                onClick={() => {
                  setAbout(false);
                  setBio(false);
                  setReviews(false);
                  setAds(true);
                  setModify(false);
                }}
              >
                Listings
              </Nav>
              <Nav
                onClick={() => {
                  setAbout(true);
                  setBio(false);
                  setReviews(false);
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
                  setReviews(false);
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
                  setReviews(true);
                  setAds(false);
                  setModify(false);
                }}
              >
                Reviews
              </Nav>
            </UserNav>
          </div>
        ) : null}
        {modify === true && <EditProfile setModify={setModify} />}
        {about === true && <UserInfo thisUser={thisUser} />}
        {bio === true && <UserBio thisUser={thisUser} />}
        {ads === true && <ListingByUser email={thisUser?.email} />}
        {reviews === true && (
          <ReviewForm thisUser={thisUser} currentUser={currentUser} />
        )}
      </>
    );
  }
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

const Avatar = styled.img`
  height: 120px;
  width: 120px;
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
