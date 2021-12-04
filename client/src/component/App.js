import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import NavBar from "./NavBar";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import ListingCreation from "./ListingCreation";
import ListingDetail from "./ListingDetail";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <NavBar />
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/create" element={<ListingCreation />}></Route>
        <Route exact path="/detail/:id" element={<ListingDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

const GlobalStyle = createGlobalStyle`
body{ 
  padding:0;
  margin:0;
}
`;

export default App;
