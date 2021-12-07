import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import ListingByUser from "./ListingByUser";
import { HiOutlinePencil } from "react-icons/hi";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { user } = useAuth0();
  const [modify, setModify] = useState(false);

  console.log(modify);

  return modify === false ? (
    <>
      <Container>
        <HiOutlinePencil
          style={{ cursor: "pointer" }}
          onClick={() => {
            setModify(true);
          }}
        />
        <UserContainer>
          <img alt="avatar" src={user?.picture} />
          <InfoContainer>
            <Name>{user?.nickname}</Name>
            <Email>{user?.email}</Email>
            <div></div>
            <div></div>
          </InfoContainer>
        </UserContainer>
      </Container>
      <ListingByUser />
    </>
  ) : (
    <EditProfile modify={modify} setModify={setModify} />
  );
};

const Container = styled.div`
  width: 50%;
  height: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
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

const Email = styled.div`
  margin: 20px;
`;

const Name = styled.div`
  margin: 20px;
`;

export default Profile;
