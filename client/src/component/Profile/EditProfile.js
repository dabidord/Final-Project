import React, { useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const EditProfile = ({ modify, setModify }) => {
  const { user } = useAuth0();
  const [formValue, setFormValue] = useState({
    nickname: user?.nickname,
    name: "",
    location: "",
    bio: "",
    userpicture: user?.picture,
  });
  //************************************************************** */
  /// modifying profile
  //************************************************************** */
  const handleModify = (e) => {
    e.preventDefault();
    fetch(`/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...formValue,
        email: user.email,
      }),
    }).catch((err) => {
      console.log(err);
    });
    setModify(false);
  };

  return (
    <>
      <Container>
        <FormContainer onSubmit={(e) => handleModify(e)}>
          <Label>
            Nickname :
            <Input
              onChange={(e) => {
                setFormValue({ ...formValue, nickname: e.target.value });
              }}
              value={formValue.nickname}
              type="text"
              name="nickname"
            />
          </Label>
          <Label>
            Name :
            <Input
              onChange={(e) => {
                setFormValue({ ...formValue, name: e.target.value });
              }}
              type="text"
              name="name"
              placeholder={user?.name}
            />
          </Label>
          <Label>
            Location :
            <Input
              onChange={(e) => {
                setFormValue({ ...formValue, location: e.target.value });
              }}
              type="text"
              name="location"
            />
          </Label>
          <Label>
            Bio :
            <Text
              onChange={(e) => {
                setFormValue({ ...formValue, bio: e.target.value });
              }}
              type="text"
              name="bio"
              placeholder="Tell us a bit about you..."
            />
          </Label>
          <BtnContainer>
            <Cancel
              onClick={() => {
                setModify(false);
              }}
            >
              Cancel
            </Cancel>
            <Submit type="submit" value="Modify" />
          </BtnContainer>
        </FormContainer>
      </Container>
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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 10px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  margin: 20px 0;
  border-radius: 5px;
  border: 1px solid;
`;

const Text = styled.textarea`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  width: 100%;
  height: 150px;
  resize: none;
  border: 1px solid;
  border-radius: 5px;
  margin: 10px 0;
  overflow: auto;
  outline: none;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Cancel = styled.button`
  width: 120px;
  height: 40px;
  margin: 10px;
`;

const Submit = styled.input`
  width: 120px;
  height: 40px;
  margin: 10px;
`;

export default EditProfile;
