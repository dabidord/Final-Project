import React, { useContext } from "react";
import styled from "styled-components";
import { ListingContext } from "../Context/ListingContext";
import { MapsContext } from "../Context/MapsContext";

import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

const Search = ({ panTo }) => {
  const { formValue, setFormValue } = useContext(ListingContext);
  const { coord } = useContext(MapsContext);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => 45.5016889, lng: () => -73.567256 },
      radius: 200 * 1000,
    },
  });

  return (
    <Container>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
            setFormValue({ ...formValue, location: { lat, lng, address } });
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <ComboboxInput
          style={{ width: "300px" }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setFormValue({ ...formValue, location: e.target.value });
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </Container>
  );
};

const Container = styled.div`
  margin-right: 200px;
`;

export default Search;
