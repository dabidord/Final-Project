import React, { useContext } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { ListingContext } from "./Context/ListingContext";

const ListingCreation = () => {
  const { formValue, setFormValue, submitListing } = useContext(ListingContext);

  //Zones creation
  const zones = [];
  for (let i = 1; i <= 29; i++) {
    zones.push(`Zone ${+i}`);
  }

  return (
    <>
      <Wrapper>
        <Container>
          <h3>Create new listing:</h3>
          <TextFieldContainer>
            <h4>Title :</h4>
            <TextField
              onChange={(e) => {
                setFormValue({ ...formValue, Title: e.target.value });
              }}
              id="outlined-basic"
              label="Title"
              variant="outlined"
            ></TextField>
          </TextFieldContainer>
          <div>
            <CheckContainer>
              <h4>Category :</h4>
              <Label> Land :</Label>
              <input
                type="radio"
                value="Land"
                name="Category"
                onChange={(e) => {
                  setFormValue({ ...formValue, Category: e.target.value });
                }}
              />
              <Label> Guide :</Label>
              <input
                type="radio"
                value="Guide"
                name="Category"
                onChange={(e) => {
                  setFormValue({ ...formValue, Category: e.target.value });
                }}
              />
            </CheckContainer>
          </div>
          <div>
            <ZoneContainer>
              <h4>Zone :</h4>
              <Select
                onChange={(e) => {
                  setFormValue({ ...formValue, Zone: e.target.value });
                }}
              >
                {zones?.map((zone, id) => (
                  <Option value={zone} key={id}>
                    {zone}
                  </Option>
                ))}
              </Select>
            </ZoneContainer>
          </div>
          <TextFieldContainer>
            <h4>Description :</h4>
            <TextField
              onChange={(e) => {
                setFormValue({ ...formValue, Description: e.target.value });
              }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              fullWidth
            ></TextField>
          </TextFieldContainer>
        </Container>
        <Button onClick={submitListing} type="submit" variant="contained">
          Create Listing
        </Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #65676b;
  font-size: 18px;
`;

const Container = styled.div`
  width: 50%;
  height: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px 30px;
`;

const CheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;
const ZoneContainer = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: center;
`;

const Select = styled.select`
  margin-left: 20px;
  width: 250px;
  height: 50px;
  border: 1.9px solid #d3d3d3;
  border-radius: 4px;
`;

const Option = styled.option`
  margin: 20px;
`;

const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default ListingCreation;
