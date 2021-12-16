import React, { useContext, useState } from "react";
import { CurrentUserContext } from "./Context/CurrentUser";
import styled from "styled-components";
// import { useNavigate } from "react-router";
const ReactionPost = ({ _id, setIsSubmitted }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [formValue, setFormValue] = useState({
    from: currentUser?.userpicture,
    reaction: "",
    user: currentUser?.email,
  });
  // let navigate = useNavigate();

  const postReaction = (e) => {
    if (currentUser) {
      e.preventDefault();
      fetch(`/reaction/${_id}`, {
        method: "POST",
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
    }
    setIsSubmitted(true);
  };

  return (
    <>
      <FormContainer
        onSubmit={async (e) => {
          await postReaction(e);
        }}
      >
        <Label>
          <Text
            required
            onChange={(e) => {
              setFormValue({ ...formValue, reaction: e.target.value });
            }}
            type="text"
            name="reaction"
          />
        </Label>
        <Submit type="submit" value="Post" />
      </FormContainer>
    </>
  );
};

const FormContainer = styled.form`
  width: 50%;
  height: 100%;
  margin: 20px auto;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #65676b;
  border-radius: 4px;
  font-size: 16px;
`;

const Label = styled.label`
  margin: 10px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;

const Text = styled.input`
  width: 400px;
  height: 30px;
  resize: none;
  border: 1px solid;
  border-radius: 5px;
  margin: 10px 0;
  overflow: auto;
  outline: none;
`;

const Submit = styled.input`
  border: none;
  border-radius: 4px;
  width: 120px;
  height: 35px;
  margin: 10px;
  color: white;
  cursor: pointer;
  background-color: #2c5ff6;
  &:hover {
    opacity: 0.9;
  }
`;

export default ReactionPost;
