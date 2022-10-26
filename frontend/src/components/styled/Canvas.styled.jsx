import styled from "styled-components";

export const StyledCanvas = styled.canvas`
  display: block;
  margin: 0 auto;
  background: ${({ url }) => (url ? `url(${url})` : "lightblue")};
  background-size: cover;
  touch-action: none;
`;

export const StyledCanvasShow = styled.canvas`
  display: block;
  background: ${({ url }) => (url ? `url(${url})` : "lightblue")};
  background-size: cover;
`;
