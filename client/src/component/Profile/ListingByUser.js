import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import Loading from "../Conditionnal/Loading";

const ListingByUser = ({ email }) => {
  let navigate = useNavigate();
  const [listings, setListings] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setStatus("loading");
    if (email) {
      fetch(`listing/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setListings(data.data);
        });
    }
    setStatus("loaded");
  }, [email]);

  const handleListingDetail = (_id, event) => {
    event.stopPropagation();
    navigate(`/listing/${_id}`);
  };

  if (status === "loading") {
    return <Loading />;
  } else {
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
                <Title>{item?.title}</Title>
                <TimeStamp>
                  {moment(item?.timestamp).format("MMM Do")}
                </TimeStamp>
              </AdContainer>
            );
          })}
        </Container>
      </>
    );
  }
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
  height: 100%;
  width: auto;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  :hover {
    transform: translate(0, 0) scale(1.01);
  }
`;

const Title = styled.div`
  font-size: 24px;
`;

const TimeStamp = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px;
`;

export default ListingByUser;
