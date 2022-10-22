import React from "react";
import styled from "styled-components";
import {
  Container,
  FlexContainer,
  H3Styled,
  LinkStyled,
  PStyled,
} from "../constans/GlobalStyles";
import OpenLayers from "../assets/open-layers.png";
import Pin from "../assets/pin.png";
import Logo from "../assets/logo.png";

const FooterStyled = styled.footer`
  width: 100%;
  background: linear-gradient(
    135deg,
    rgba(245, 85, 54, 0.9),
    rgba(161, 74, 118, 0.8),
    rgba(162, 85, 124, 0.7),
    rgba(241, 145, 67, 0.4)
  );
`;

const ImageLinkContainer = styled.a`
  text-shadow: 0 0 5px rgba(80, 80, 15, 0.75);
  text-decoration: none;
  display: block;
  width: 300px;
  color: white;
  font-weight: 400;
  font-size: 0.7rem;
  padding-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media screen and (min-width: 800px) {
    font-size: 0.8rem;
  }
`;

const Image = styled.img`
  object-fit: contain;
  height: 25px;

  @media screen and (min-width: 800px) {
    height: 30px;
  }
`;

const LogoIcon = styled(Image)`
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(255, 185, 20, 0.6);
`;

const LogoText = styled(Image)`
  margin-left: 0.75rem;
  height: 40px;

  @media screen and (min-width: 800px) {
    height: 50px;
  }
`;

const Footer = () => {
  return (
    <FooterStyled>
      <Container>
        <FlexContainer>
          <LogoIcon src={Pin} />
          <LogoText src={Logo} />
        </FlexContainer>

        <ImageLinkContainer href="https://www.pexels.com" target="_blank">
          Photos provided by
          <Image src="https://images.pexels.com/lib/api/pexels-white.png" />
        </ImageLinkContainer>

        <ImageLinkContainer href="https://openlayers.org/" target="_blank">
          Maps provided by
          <Image src={OpenLayers} />
        </ImageLinkContainer>
      </Container>
    </FooterStyled>
  );
};

export default Footer;
