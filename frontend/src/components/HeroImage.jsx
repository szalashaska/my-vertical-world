import React from "react";
import styled from "styled-components";
import { H1Styled } from "../constans/GlobalStyles";

const ImageContainer = styled.div`
  width: 100%;
  background: ${({ image }) => `url(${image})` || "lightblue"};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(14rem + 10vw);
  min-height: 20vh;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(241, 145, 67, 0.4),
    rgba(241, 145, 67, 0.2),
    rgba(255, 255, 255, 0.15),
    rgba(241, 145, 67, 0.2),
    rgba(241, 145, 67, 0.45)
  );
`;

const Text = styled(H1Styled)`
  text-shadow: 0 0 5px rgba(80, 80, 15, 0.5);
`;

const HeroImage = ({ image, text }) => {
  return (
    <ImageContainer image={image}>
      <Overlay />
      <Text bold light>
        {text}
      </Text>
    </ImageContainer>
  );
};

export default HeroImage;
