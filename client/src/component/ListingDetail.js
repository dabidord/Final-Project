import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
//libraries
import moment from "moment";
//components
import Loading from "./Conditionnal/Loading";
import Maps from "./Maps/Maps";
import ReactionPost from "./ReactionPost";
import ReactionFeed from "./ReactionFeed";

const ListingDetail = () => {
  const [listing, setListing] = useState(null);
  const [status, setStatus] = useState("idle");
  const [isSubmitted, setIsSubmitted] = useState(false);
  let { _id } = useParams();

  //************************************************************** */
  /// fetching listingDetail by _id
  //************************************************************** */
  useEffect(() => {
    setStatus("loading");
    fetch(`/listing/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setStatus("loaded");
  }, [_id, isSubmitted]);

  if (status === "loading") {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <>
        <Container>
          <UserInfo>
            <strong style={{ marginRight: "20px" }}>Posted by :</strong>
            <Avatar alt="userpicture" src={listing?.userpicture} />
            {listing?.nickname}
          </UserInfo>
          <Title>{listing?.title}</Title>
          <Description>
            <strong style={{ marginBottom: "10px" }}>Description : </strong>
            {"\u00a0"}
            {listing?.description}
          </Description>
          <strong style={{ marginBottom: "10px" }}>Location : </strong>{" "}
          <Maps location={listing?.location} />
          <Category>
            <strong>Category :</strong> {"\u00a0"}
            {listing?.category}
          </Category>
          <Category>
            <strong>Zone : </strong>
            {"\u00a0"}
            {listing?.zone}
          </Category>
          <Category>
            <strong>Price : </strong>
            {"\u00a0"}
            {`${listing?.price}$`}
          </Category>
          <TimeStamp>
            {moment(listing?.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
          </TimeStamp>
        </Container>
        <ReactionPost _id={listing?._id} setIsSubmitted={setIsSubmitted} />
        <ReactionFeed user={listing?.email} reactions={listing?.reactions} />
      </>
    );
  }
};

const Container = styled.div`
  width: 50%;
  height: 100%;
  margin: 20px auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #65676b;
  border: 1px solid lightgrey;
  border-radius: 4px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 0;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  height: auto;
  width: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Title = styled.div`
  font-size: 24px;
  margin: 10px 0;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
`;

const Category = styled.div`
  margin: 10px 0;
`;

const TimeStamp = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

export default ListingDetail;
