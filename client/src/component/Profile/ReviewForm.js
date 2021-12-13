import React, { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import ReviewFeed from "./ReviewFeed";

const ReviewForm = ({ thisUser, currentUser }) => {
  const [rate, setRate] = useState(thisUser?.rating);
  const [formValue, setFormValue] = useState({
    from: currentUser?.email,
    rating: thisUser?.rating,
    review: "",
  });
  const email = thisUser?.email;
  //Round up rating value

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/userrate/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...formValue,
      }),
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      {currentUser?.email !== thisUser?.email ? (
        <Container>
          <form onSubmit={(e) => handleSubmit(e)}>
            <StarContainer>
              Give this user a rating : {"\u00a0"}
              {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                  <label>
                    <Radio
                      type="radio"
                      value={givenRating}
                      onClick={() => {
                        setRate(givenRating);
                      }}
                      onChange={(e) =>
                        setFormValue({ ...formValue, rating: e.target.value })
                      }
                    />
                    <Rating>
                      <FaStar
                        color={
                          givenRating < rate || givenRating === rate
                            ? "#e4d00a"
                            : "rgb(192,192,192)"
                        }
                      />
                    </Rating>
                  </label>
                );
              })}
            </StarContainer>
            <Label>
              Leave a review :
              <Text
                onChange={(e) => {
                  setFormValue({ ...formValue, review: e.target.value });
                }}
                type="text"
                name="review"
                placeholder="Leave a review..."
              />
            </Label>
            <Submit type="submit" value="Submit" />
          </form>
        </Container>
      ) : null}
      <ReviewFeed thisUser={thisUser} />
    </>
  );
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
// const StarContainer = styled.div`
//   display: flex;
//   font-weight: bold;
//   margin: 10px;
// `;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 20px;
  font-weight: bold;
  margin: 10px;
`;
const Radio = styled.input`
  display: none;
  color: #e4d00a;
`;
const Rating = styled.div`
  cursor: pointer;
  font-size: 20px;
`;

const Label = styled.label`
  margin: 10px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;

const Text = styled.textarea`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  width: 100%;
  height: 100px;
  resize: none;
  border: 1px solid;
  border-radius: 5px;
  margin: 10px 0;
  overflow: auto;
  outline: none;
`;

const Submit = styled.input`
  width: 120px;
  height: 40px;
  margin: 10px;
`;

export default ReviewForm;
