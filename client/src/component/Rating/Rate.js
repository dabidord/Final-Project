import React, { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Rate = ({ rating }) => {
  const [rate, setRate] = useState(rating);

  return (
    <Container>
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20px;
  font-size: 20px;
  color: #e4d00a;
`;
const Radio = styled.input`
  display: none;
`;
const Rating = styled.div`
  cursor: pointer;
`;

export default Rate;
