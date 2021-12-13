import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import Search from "./Search";
import { Circle, GoogleMap, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "300px",
  height: "175px",
};
const center = { lat: 45.5016889, lng: -73.567256 };

const Maps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(10);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <Container>
        <Search panTo={panTo} />
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={7}
          center={center}
          onLoad={onMapLoad}
        >
          <Circle />
        </GoogleMap>
      </Container>
    </>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export default Maps;
