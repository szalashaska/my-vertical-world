import styled from "styled-components";

export const StyledCanvas = styled.canvas`
  display: block;
  margin: 0 auto;
  background: ${({ url }) => (url ? `url(${url})` : "lightblue")};
`;

export const StyledCanvasShow = styled.canvas`
  display: block;
  margin: 0 auto;
  background: ${({ url }) => (url ? `url(${url})` : "lightblue")};
  background-size: cover;
  /* width: 100%; */
`;
