import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import LoginButton from "./Login/LogInButton";
import LogoutButton from "./Login/LogoutButton";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import NavLogoBest from "../component/assets/NavLogoBest.png";
import { CurrentUserContext } from "./Context/CurrentUser";

const NavBar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Wrapper>
        <Container>
          <Logo src={NavLogoBest} />
          <ButtonContainer>
            <StyledLink to="/">
              <AiOutlineHome />
            </StyledLink>
            <StyledLink to={`/user/${currentUser?.email}`}>
              <AiOutlineUser />
            </StyledLink>
            <StyledLink to="/about">
              <AiOutlineInfoCircle />
            </StyledLink>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </ButtonContainer>
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 90px;
  background-color: #2c5ff6;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c5ff6;
  padding: 5px;
  width: 55%;
  margin: auto;
`;

const Logo = styled.img`
  height: 70px;
  width: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(NavLink)`
  padding: 10px;
  text-decoration: none;
  color: #d9d9d9;
  font-size: 24px;
  padding: 10px 30px;
  &:hover {
    border-bottom: 2px solid #d9d9d9;
    transform: translateY(-1px);
  }
`;

export default NavBar;
