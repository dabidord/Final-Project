import React, { useContext } from "react";
import styled from "styled-components";
import { ListingContext } from "./Context/ListingContext";
import Maps from "./Maps/Maps";

const ListingCreation = () => {
  const { formValue, setFormValue, submitListing } = useContext(ListingContext);

  //Zones creation
  const zones = [];
  for (let i = 1; i <= 29; i++) {
    zones.push(`Zone ${+i}`);
  }

  return (
    <>
      <FormContainer onSubmit={(e) => submitListing(e)}>
        <Title>
          <h3>Create new listing:</h3>
        </Title>
        <Container>
          <SmallTitle>Title :</SmallTitle>
          <TextInput
            onChange={(e) => {
              setFormValue({ ...formValue, title: e.target.value });
            }}
          ></TextInput>
        </Container>
        <Container>
          <SmallTitle>Category :</SmallTitle>
          <Radio>
            <Label> Land :</Label>
            <input
              type="radio"
              value="Land"
              name="Category"
              onChange={(e) => {
                setFormValue({ ...formValue, category: e.target.value });
              }}
            />
          </Radio>
          <Radio>
            <Label> Guide :</Label>
            <input
              type="radio"
              value="Guide"
              name="Category"
              onChange={(e) => {
                setFormValue({ ...formValue, category: e.target.value });
              }}
            />
          </Radio>
        </Container>
        <ZoneContainer>
          <div>Zone :</div>
          <Select
            onChange={(e) => {
              setFormValue({ ...formValue, zone: e.target.value });
            }}
          >
            {zones?.map((zone, id) => (
              <Option value={zone} key={id}>
                {zone}
              </Option>
            ))}
          </Select>
        </ZoneContainer>
        <Container>
          <SmallTitle>Price :</SmallTitle>
          <PriceInput
            placeholder="$"
            onChange={(e) => {
              setFormValue({ ...formValue, price: e.target.value });
            }}
          ></PriceInput>
        </Container>
        <MapsContainer>
          <SmallTitle>Location :</SmallTitle>
          <Maps />
        </MapsContainer>
        <Container>
          <SmallTitle>Description :</SmallTitle>
          <Text
            onChange={(e) => {
              setFormValue({ ...formValue, description: e.target.value });
            }}
          ></Text>
        </Container>
        <Container>
          <Submit type="submit" />
        </Container>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 50%;
  height: 100%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px 30px;
  color: #65676b;
  font-size: 16px;
`;

const MapsContainer = styled.div`
  display: flex;
  width: 50%;
  height: 400px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px 30px;
  color: #65676b;
  font-size: 16px;
`;

const ZoneContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100px;
  margin: 10px auto;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px 30px;
  color: #65676b;
  font-size: 20px;
`;

const Title = styled.div`
  width: 60%;
  margin: 20px auto;
  padding: 10px 30px;
  color: #65676b;
  font-size: 20px;
  border-bottom: 2px solid #2c5ff6;
`;

const SmallTitle = styled.div`
  width: 100%;
  color: #65676b;
  font-size: 20px;
  margin: 10px 0;
`;

const TextInput = styled.input`
  width: 400px;
  height: 30px;
  margin: 20px 0;
  border-radius: 5px;
  border: 1px solid;
  border: 1.9px solid #d3d3d3;
`;

const PriceInput = styled.input`
  width: 100px;
  height: 30px;
  margin: 20px 0;
  border-radius: 5px;
  border: 1.9px solid #d3d3d3;
`;

const Radio = styled.div`
  display: flex;
  flex-dirention: row;
  align-items: center;
  margin: 10px 0;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;

const Select = styled.select`
  margin-left: 30px;
  width: 250px;
  height: 50px;
  border: 1.9px solid #d3d3d3;
  border-radius: 4px;
`;

const Option = styled.option`
  margin: 20px;
`;

const Text = styled.textarea`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  width: 100%;
  height: 300px;
  resize: none;
  border: 1.9px solid #d3d3d3;
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

export default ListingCreation;
