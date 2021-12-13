import React from "react";
import styled from "styled-components";
import Star from "../Rating/Star";
import moment from "moment";

const ReviewFeed = ({ thisUser }) => {
  const reviews = thisUser?.reviews;
  if (thisUser) {
    return (
      <>
        <Title>Past reviews from other users :</Title>
        {reviews?.map((item) => {
          return (
            <Container key={item._id}>
              <StarContainer>
                <div>
                  Reviewed by : {"\u00a0"}
                  {item?.from}
                  {"\u00a0"}
                </div>
                <Star rating={item?.rating} />
              </StarContainer>
              <ReviewContainer>
                <strong>Review :{"\u00a0"}</strong> {item?.review}
              </ReviewContainer>
              <TimeStamp>{moment(item?.timestamp).format("MMM Do")}</TimeStamp>
            </Container>
          );
        })}
      </>
    );
  }
};

const Container = styled.div`
  width: 50%;
  height: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 20px;
  color: #65676b;
  font-size: 16px;
`;

const Title = styled.div`
  width: 60%;
  height: 100%;
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #2c5ff6;
  padding-bottom: 20px;
  color: #65676b;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 20px;
  font-weight: bold;
  margin: 10px;
`;

const ReviewContainer = styled.div`
  display: flex;
  margin: 10px;
`;

const TimeStamp = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default ReviewFeed;
