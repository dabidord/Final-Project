import React, { useState, useRef, useCallback } from "react";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
export const MapsContext = React.createContext(null);

export const MapsProvider = ({ children }) => {
  const [coord, setCoord] = useState({});
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
  const mapRef = useRef();

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(10);
  }, []);

  const location = async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MapsContext.Provider value={{ coord, setCoord }}>
      {children}
    </MapsContext.Provider>
  );
};
