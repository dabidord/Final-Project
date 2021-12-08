import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const ListingContext = React.createContext(null);

export const ListingProvider = ({ children }) => {
  const { user } = useAuth0();
  let initialValue = {
    title: "",
    category: "",
    zone: "",
    description: "",
  };
  const [formValue, setFormValue] = useState(initialValue);

  //onClickSubmit to server
  const submitListing = () => {
    fetch(`/listing`, {
      method: "POST",
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
  };

  return (
    <ListingContext.Provider value={{ formValue, setFormValue, submitListing }}>
      {children}
    </ListingContext.Provider>
  );
};
