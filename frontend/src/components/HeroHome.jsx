import React from "react";
import Video from "./Video";
import styled from "styled-components";
import {
  ButtonStyled,
  FlexContainer,
  H1Styled,
  H2Styled,
  LinkStyled,
} from "../constans/GlobalStyles";

const HeroHomeSection = styled(FlexContainer)`
  position: relative;
  overflow: hidden;
`;
const MaxWidthWrapper = styled.div`
  z-index: 1;
  width: 100%;
  max-width: var(--max-vw);
`;
const HeroText = styled.div`
  padding: 3rem 1rem;
  max-width: 50ch;
  & h1,
  & h2 {
    text-shadow: 0 0 5px rgba(80, 80, 15, 0.5);
  }
  @media screen and (min-width: 1500px) {
    padding: calc(3rem + 4vw) 1rem;
  }
`;
const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(241, 145, 67, 0.7),
    rgba(241, 145, 67, 0.2),
    rgba(255, 255, 255, 0.1),
    transparent,
    transparent
  );
`;

const HeroButton = styled(ButtonStyled)`
  margin: 0;
`;

const HeroHome = () => {
  return (
    <HeroHomeSection>
      <Video />
      <HeroOverlay />
      <MaxWidthWrapper>
        <HeroText>
          <H1Styled bold light>
            All your favourite climbing routes in one place
          </H1Styled>
          <H2Styled light>
            Use My Vertical World and have a wonderful climbing experience.
          </H2Styled>
          <HeroButton as={LinkStyled} to="/sign-up">
            Sign up now!
          </HeroButton>
        </HeroText>
      </MaxWidthWrapper>
    </HeroHomeSection>
  );
};

export default HeroHome;
