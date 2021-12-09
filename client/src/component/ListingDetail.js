import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";

const ListingDetail = () => {
  const [listing, setListing] = useState();
  let { _id } = useParams();

  useEffect(() => {
    fetch(`/listing/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id]);

  console.log(listing);

  return (
    <>
      <Container>
        <div>Detail HERE</div>
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

export default ListingDetail;
