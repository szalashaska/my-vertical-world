import styled from "styled-components";

export const StyledCanvas = styled.canvas`
  display: block;
  margin: 50px auto;
  background: ${({ url }) => (url ? `url(${url})` : lightblue)};
`;
