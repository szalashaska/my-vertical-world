import React from "react";
import { HomeStyled } from "./Pages.styled";
import Search from "../components/Search";
import {
  ButtonStyled,
  Container,
  FlexContainer,
  H2Styled,
  H3Styled,
  LinkStyled,
  PStyled,
} from "../constans/GlobalStyles";
import HeroHome from "../components/HeroHome";
import styled from "styled-components";
import Climber from "../assets/climber1.jpg";
import Portal from "../assets/climber-portal.jpg";

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 960px) {
    flex-direction: row;
  }
`;

const Section = styled.section`
  padding: 1rem;
  width: 100%;

  @media screen and (min-width: 960px) {
    padding: 2rem;
    width: 50%;
  }
`;

const Image = styled.img`
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const Home = () => {
  return (
    <HomeStyled>
      <HeroHome />
      <Container>
        <H2Styled align="center">
          Spectacular locations, iconic climbing walls and classic routes from
          people all around the world.
        </H2Styled>

        <SectionContainer>
          <Section>
            <Image src={Portal} />
          </Section>
          <Section>
            <H3Styled align="center">
              Join our community of climbers. Check out latest climbs.
            </H3Styled>
            <PStyled align="center">
              Share your climbing experience, create route path, explore
              possibilities on various walls, find out which locations hides the
              best climbs. Comment, discuss and let others know if you like it!
            </PStyled>
            <PStyled align="center">
              It is all here with our free climbing application.
            </PStyled>
            <FlexContainer padding="2rem 0 0 0">
              <ButtonStyled as={LinkStyled} to="/sign-up" primary={1}>
                Sign up
              </ButtonStyled>
              <ButtonStyled as={LinkStyled} to="/news">
                See what's new!
              </ButtonStyled>
            </FlexContainer>
          </Section>
        </SectionContainer>

        <SectionContainer>
          <Section>
            <H3Styled align="center">Looking for something specific?</H3Styled>
            <Search content={"all"} />
          </Section>

          <Section>
            <Image src={Climber} />
          </Section>
        </SectionContainer>
      </Container>
    </HomeStyled>
  );
};

export default Home;
