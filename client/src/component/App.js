import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import NavBar from "./NavBar";
import Home from "./Home";
import Profile from "./Profile";
import About from "./About";
import ListingCreation from "./ListingCreation";
import ListingDetail from "./ListingDetail";
import AuthProvider from "./Context/AuthLogin";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/create" element={<ListingCreation />}></Route>
          <Route exact path="/detail/:id" element={<ListingDetail />}></Route>
          <Route exact path="/about" element={<About />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

const GlobalStyle = createGlobalStyle`
body{ 
  padding:0;
  margin:0;
  font-family: 'Roboto', sans-serif;}
`;

export default App;
