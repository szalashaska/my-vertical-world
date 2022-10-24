import styled from "styled-components";
import { SearchResult, SearchResultsContainer } from "./Search.styled";

export const StyledCanvas = styled.canvas`
  display: block;
  margin: 0 auto;
  background: ${({ url }) => (url ? `url(${url})` : "lightblue")};
  background-size: cover;
`;

export const StyledCanvasShow = styled.canvas`
  display: block;
  background: ${({ url }) => (url ? `url(${url})` : "lightblue")};
  background-size: cover;
`;
