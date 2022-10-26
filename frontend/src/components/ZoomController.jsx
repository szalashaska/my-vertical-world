import React, { useState } from "react";
import styled from "styled-components";
import { ButtonStyled } from "../constans/GlobalStyles";

const ZoomControllerStyled = styled.div``;
const ZoomButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;
const ZoomWrapper = styled.div`
  margin-inline: auto;
  width: ${({ width }) => `${width}%`};
  transition: all 0.3s ease-in;
`;

const ZoomController = ({ children }) => {
  const [width, setWidth] = useState(window.screen.width < 800 ? 100 : 80);

  const handleZoom = (value) => {
    if (value + width <= 100 && value + width >= 30) setWidth(width + value);
  };

  return (
    <ZoomControllerStyled>
      <ZoomButtonContainer>
        <ButtonStyled
          type="button"
          onClick={() => handleZoom(5)}
          primary
          disabled={width === 100}
        >
          Zoom in
        </ButtonStyled>
        <ButtonStyled
          type="button"
          onClick={() => handleZoom(-5)}
          primary
          disabled={width === 30}
        >
          Zoom out
        </ButtonStyled>
      </ZoomButtonContainer>
      <ZoomWrapper width={width}>{children}</ZoomWrapper>
    </ZoomControllerStyled>
  );
};

export default ZoomController;
