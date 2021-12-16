import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useNavigate } from "react-router";

const ReactionFeed = ({ reactions, user }) => {
  let navigate = useNavigate();
  const handleProfileClick = (email, event) => {
    event.stopPropagation();
    navigate(`/user/${email}`);
  };

  console.log(reactions);

  return (
    <>
      <Title>User's reactions :</Title>
      {reactions?.map((item) => {
        return (
          <Container>
            <CommentContainer
              onClick={(event) => {
                handleProfileClick(item?.user, event);
              }}
              key={item._id}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar src={item?.from} alt="avatar" />
                {user === item.user ? (
                  <div style={{ color: "#2c5ff6", fontWeight: "Bold" }}>OP</div>
                ) : null}
                {"\u00a0"}
                {item?.reaction}
              </div>
              <TimeStamp>
                {moment(item?.timestamp, "YYYYMMDD").fromNow()}
              </TimeStamp>
            </CommentContainer>
          </Container>
        );
      })}
    </>
  );
};
const Title = styled.div`
  width: 50%;
  height: 100%;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #2c5ff6;
  padding-bottom: 20px;
  color: #65676b;
`;

const Container = styled.div`
  width: 50%;
  height: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  padding: 5px;
  color: #65676b;
  font-size: 16px;
`;

const Avatar = styled.img`
  height: auto;
  width: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid lightgrey;
  cursor: pointer;
`;

const TimeStamp = styled.div``;

export default ReactionFeed;
