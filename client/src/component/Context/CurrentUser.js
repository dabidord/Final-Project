import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [status, setStatus] = useState("idle");
  const [isLogged, setIsLogged] = useState(false);
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      setStatus("loading");
      fetch(`/user/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (!data.data.userpicture) {
            console.log("hello");
            setNewUser(true);
            setStatus("loaded");
          } else {
            setCurrentUser(data.data);
            setStatus("loaded");
            setIsLogged(true);
          }
        });
    }
  }, [user]);

  console.log(newUser);
  console.log(currentUser);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, newUser, status, isLogged }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
