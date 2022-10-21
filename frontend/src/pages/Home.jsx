import React from "react";
import { HomeStyled } from "./Pages.styled";
import Search from "../components/Search";
import {
  ButtonStyled,
  Container,
  FlexContainer,
  H2Styled,
  H3Styled,
  PStyled,
} from "../constans/GlobalStyles";
import HeroHome from "../components/HeroHome";

const Home = () => {
  return (
    <HomeStyled>
      <HeroHome />
      <Container>
        <H2Styled align="center">
          Spectacular locations, iconic climbing walls and classic routes from
          people all around the world.
        </H2Styled>
        <H3Styled align="center">
          Join our community of climbers. Check out latest climbs.
        </H3Styled>
        <PStyled align="center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
          laboriosam quaerat iusto adipisci laudantium cupiditate, nam ipsa
          facilis maiores maxime?
        </PStyled>
        <FlexContainer padding="2rem 0 0 0">
          <ButtonStyled primary as="a" href="/sign-up">
            Sign up
          </ButtonStyled>
          <ButtonStyled as="a" href="/news">
            See what's new!
          </ButtonStyled>
        </FlexContainer>

        <H3Styled align="center">Looking for something specific?</H3Styled>
        <Search content={"all"} />
      </Container>
    </HomeStyled>
  );
};

export default Home;
