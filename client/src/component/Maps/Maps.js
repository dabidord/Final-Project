import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Search from "./Search";
import { Circle, GoogleMap, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "400px",
  height: "275px",
};
const center = { lat: 45.5016889, lng: -73.567256 };

const Maps = ({ location }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [latLng, setLatLng] = useState(null);
  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 10000,
    zIndex: 1,
  };

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(10);
    setLatLng({ lat, lng });
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  let locationObj = null;

  if (location) {
    locationObj = { lat: location.lat, lng: location.lng };
  }
  return (
    <>
      <Container>
        {!locationObj ? <Search panTo={panTo} /> : null}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={locationObj ? locationObj : center}
          onLoad={onMapLoad}
        >
          <Circle
            center={locationObj ? locationObj : latLng}
            options={options}
          />
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
