import React, { useContext } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { TextField, Select, MenuItem } from "@mui/material";
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
          <h2>Create new listing:</h2>
          <TextFieldContainer>
            <h3>Title :</h3>
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
              <h3>Category :</h3>
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
              <h3>Zone :</h3>
              <Select
                value=""
                onChange={(e) => {
                  setFormValue({ ...formValue, Zone: e.target.value });
                }}
                style={{ marginLeft: 20, width: 250, height: 50 }}
              >
                {zones?.map((zone, id) => (
                  <MenuItem value={zone} key={id}>
                    {zone}
                  </MenuItem>
                ))}
              </Select>
            </ZoneContainer>
          </div>
          <TextFieldContainer>
            <h3>Description :</h3>
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
`;

const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default ListingCreation;
