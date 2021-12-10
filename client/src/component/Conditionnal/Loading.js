import React from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <>
      <Container>
        <CircularProgress />
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loading;
