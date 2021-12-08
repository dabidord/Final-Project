import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    fetch(`/user?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.data);
      });
  }, [user]);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
