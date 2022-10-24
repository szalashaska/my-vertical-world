import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/* Variables */
:root {
  
  --ff-body:  'Exo 2', sans-serif;

  --max-vw: 93.75rem;
  --min-vw: 22.5rem;

  --clr-pink: #a14a76;
  --clr-red-light: #F45866;
  --clr-yellow-light: #ffe9a8;
  --clr-yellow: #FFDB70;
  --clr-orange-light: #f19143;
  --clr-orange: #ff773d;
  --clr-orange-strong: #f55536;
}

/* Reset settings */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

img {
  display: block;
  max-width: 100%;
}

body {
    font-family: var(--ff-body)
}

`;

export default GlobalStyles;

// ------Typography------

// https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/
// min-vv=360px, max vv=1500px

export const H1Styled = styled.h1`
  margin-bottom: ${({ mb }) => mb || "0.4em"};
  text-align: ${({ align }) => align || "left"};
  color: ${({ light }) => (light ? "white" : "black")};
  font-weight: ${({ bold }) => (bold ? 900 : 600)};
  font-size: clamp(2rem, 1.6842rem + 1.4035vw, 3rem);
  letter-spacing: -2px;
`;
export const H2Styled = styled.h2`
  margin-bottom: ${({ mb }) => mb || "0.4em"};
  text-align: ${({ align }) => align || "left"};
  font-weight: ${({ bold }) => (bold ? 800 : 600)};
  color: ${({ light }) => (light ? "white" : "black")};
  font-size: clamp(1.5rem, 1.3421rem + 0.7018vw, 2rem);
  letter-spacing: -1.8px;
`;
export const H3Styled = styled.h3`
  margin-bottom: ${({ mb }) => mb || "0.4em"};
  text-align: ${({ align }) => align || "left"};
  font-weight: ${({ bold }) => (bold ? 900 : 500)};
  color: ${({ light }) => (light ? "white" : "black")};
  font-size: clamp(1.2rem, 1.1053rem + 0.4211vw, 1.5rem);
`;
export const PStyled = styled.p`
  font-weight: ${({ bold }) => (bold ? 700 : 300)};
  text-align: ${({ align }) => align || "left"};
  color: ${({ light }) => (light ? "white" : "black")};
  font-size: clamp(0.8rem, 0.6737rem + 0.5614vw, 1.2rem);
  letter-spacing: 0px;
  margin-bottom: ${({ mb }) => mb || "0.4em"};
`;

// ------Containers------

export const PageContainer = styled.div`
  width: 100%;
  min-height: 90vh;
`;

export const Container = styled.main`
  width: 100%;
  max-width: var(--max-vw);
  margin-inline: auto;
  padding: 1.5rem;
  @media screen and (min-width: 960px) {
    padding: 2rem;
  }
`;

export const Wrapper = styled.div`
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};
  width: ${({ width }) => width || "auto"};
  max-width: ${({ maxWidth }) => maxWidth || "none"};
`;

export const FlexContainer = styled(Wrapper)`
  display: flex;
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  flex-wrap: ${({ wrap }) => wrap || "wrap"};
  gap: ${({ gap }) => gap || "normal"};
  flex-grow: ${({ grow }) => grow || 0};
`;

// ------HTML ELements------

export const UpperFirstLetter = styled.span`
  text-transform: capitalize;
`;

export const LinkStyled = styled(Link)`
  font-size: clamp(0.8rem, 0.6737rem + 0.5614vw, 1.2rem);
  color: ${({ color }) => color || "black"};
  display: ${({ display }) => display || "inline-block"};
  text-decoration: none;
`;

export const InputStyled = styled.input`
  display: block;
  padding: 0.75rem;
  margin: 0.75rem 0;
  border-radius: 10px;
  border: solid 2px var(--clr-orange-orange);
`;

export const ButtonStyled = styled.button`
  /* color: var(--clr-yellow-light); */
  color: ${({ primary }) =>
    primary ? "var(--clr-red-light)" : "var(--clr-yellow-light);"};
  margin: 0.4rem;
  display: inline-block;
  padding: 0.5em 1.2em;
  font-family: var(--ff-body);
  font-weight: 500;
  font-size: clamp(0.8rem, 0.6737rem + 0.5614vw, 1.2rem);
  text-align: center;
  text-decoration: none;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in;
  background-color: ${({ primary }) =>
    primary ? "transparent" : "var(--clr-red-light)"};
  outline: ${({ primary }) =>
    primary ? "3px var(--clr-red-light) solid" : "none"};

  &:focus,
  &:hover {
    box-shadow: 0 0 25px rgba(119, 200, 210, 0.8);
    background-color: ${({ primary }) =>
      primary ? "var(--clr-yellow-light)" : "var(--clr-orange-strong)"};
  }

  &:active {
    background-color: rgba(200, 200, 210, 1);
  }

  &:disabled,
  &:hover:disabled {
    cursor: auto;
    background-color: ${({ primary }) =>
      primary ? "transparent" : "rgba(244, 88, 102, 0.4)"};
    color: ${({ primary }) => (primary ? "rgba(244, 88, 102, 0.4)" : "white")};
    outline: ${({ primary }) =>
      primary ? "3px rgba(244, 88, 102, 0.4) solid" : "none"};
    box-shadow: none;
  }
`;
