import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import moment from "moment";
const ListingFeed = () => {
  const [listings, setListings] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("/listing")
      .then((res) => res.json())
      .then((data) => {
        setListings(data.data);
      });
  }, []);

  // const handleProfileClick = (_id, event) => {
  //   event.stopPropagation();
  //   navigate(`/profile/`);
  // };

  const handleListingDetail = (_id, event) => {
    event.stopPropagation();
    navigate(`/listing/${_id}`);
  };

  return (
    <>
      <Container>
        {listings?.map((item, id) => {
          return (
            <AdContainer
              key={id}
              onClick={(event) => {
                handleListingDetail(item?._id, event);
              }}
            >
              <UserInfo>
                <strong style={{ marginRight: "20px" }}>Posted by :</strong>{" "}
                <Avatar alt="userpicture" src={item?.userpicture} />
                {item?.nickname}
              </UserInfo>
              <Title>{item?.title}</Title>
              <TimeStamp>{moment(item?.timestamp).format("MMM Do")}</TimeStamp>
            </AdContainer>
          );
        })}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 40%;
  height: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  color: #65676b;
`;

const AdContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 125px;
  width: auto;
  border: 1px solid;
  border-radius: 3px;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  :hover {
    /* transform: translateY(1px) scale(1);
    transform-origin: 50%;
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1); */
    border: 1.5px solid #2c5ff6;
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 0;
  margin-bottom: 25px;
`;

const Avatar = styled.img`
  height: auto;
  width: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Title = styled.div`
  font-size: 24px;
`;

const TimeStamp = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

export default ListingFeed;
