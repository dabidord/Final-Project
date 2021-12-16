import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentUserContext } from "./CurrentUser";
export const ListingContext = React.createContext(null);

export const ListingProvider = ({ children }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { user } = useAuth0();
  let initialValue = {
    title: "",
    category: "",
    zone: "",
    description: "",
    location: "",
    price: "",
  };
  const [formValue, setFormValue] = useState(initialValue);

  //onClickSubmit to server
  const submitListing = (e) => {
    if ((user, currentUser)) {
      e.preventDefault();
      fetch(`/listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formValue,
          email: user?.email,
          name: currentUser?.name,
          nickname: currentUser?.nickname,
          userpicture: currentUser?.userpicture,
        }),
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <ListingContext.Provider
      value={{
        formValue,
        setFormValue,
        submitListing,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};
