import React, { useState } from "react";
import Dots from "../assets/three-dots.svg";
import Cross from "../assets/cross.svg";
import styled from "styled-components";

const ExpendedOptionsStyled = styled.div`
  display: inline-block;
  position: relative;
`;

const DotsContainer = styled(Dots)`
  height: 22px;
  width: 22px;
  @media screen and (min-width: 800px) {
    height: 24px;
    width: 24px;
  }
`;

const CrossContainer = styled(Cross)`
  height: 22px;
  width: 22px;
  @media screen and (min-width: 800px) {
    height: 24px;
    width: 24px;
  }
`;

const OptionButton = styled.button`
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  padding: 0.3rem;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover,
  &:focus {
    box-shadow: 0 0 25px rgba(10, 10, 10, 0.5);
  }
  @media screen and (min-width: 800px) {
    padding: 0.5rem;
  }
`;

const OptionContainer = styled.div`
  background: white;
  box-shadow: 0 0 25px rgba(10, 10, 10, 0.5);
  margin-top: 0.5rem;
  border-radius: 15px;
  padding: 1rem 0.5rem;
  display: flex;
  transform-origin: top;
  height: ${({ showContent }) => (showContent ? "auto" : 0)};
  transform: scaleY(${({ showContent }) => (showContent ? 1 : 0)});
  transition: all 0.3s ease-out;
  flex-direction: column;
  position: absolute;
  right: 0;
  z-index: 2;
`;

const ExpendedOptions = ({ children }) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <ExpendedOptionsStyled>
      <OptionButton type="button" onClick={() => setShowContent(!showContent)}>
        {showContent ? <CrossContainer /> : <DotsContainer />}
      </OptionButton>
      <OptionContainer showContent={showContent}>{children}</OptionContainer>
    </ExpendedOptionsStyled>
  );
};

export default ExpendedOptions;
