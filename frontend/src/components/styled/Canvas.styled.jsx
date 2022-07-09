import styled from "styled-components";

export const StyledCanvas = styled.canvas`
  display: block;
  margin: 0 auto;
  background: ${({ url }) => (url ? `url(${url})` : "lightblue")};
`;
