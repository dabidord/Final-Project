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
import { CurrentUserContext } from "./Context/CurrentUser";

const NavBar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Wrapper>
        <Container>
          <Title>HuntTree</Title>
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
  background-color: #2c5ff6;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c5ff6;
  padding: 15px;
  width: 60%;
  margin: auto;
`;

const Title = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #e4d00a;
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
    border-bottom: 2px solid #e4d00a;
    transform: translateY(-1px);
    color: #e4d00a;
  }
`;

export default NavBar;
