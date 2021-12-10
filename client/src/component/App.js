import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import NavBar from "./NavBar";
import Home from "./Home";
import Profile from "./Profile/Profile";
import About from "./About";
import ListingCreation from "./ListingCreation";
import ListingDetail from "./ListingDetail";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/user/:email" element={<Profile />}></Route>
        <Route exact path="/create" element={<ListingCreation />}></Route>
        <Route exact path="/listing/:_id" element={<ListingDetail />}></Route>
        <Route exact path="/about" element={<About />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

const GlobalStyle = createGlobalStyle`
body{ 
  padding:0;
  margin:0;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;

}
  
`;

export default App;
