import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/* Variables */
:root {
  --ff-body: "Montserrat", sans-serif;
  --ff-heading: "Montserrat", sans-serif;

  --max-vv: 93,75rem;
  --min-vv: 22.5rem;

  --clr-black: #210f04;
  --clr-white: #fff;
  --clr-pink: #a14a76;
  --clr-orange-light: #f19143;
  --clr-orange-orange: #ff773d;
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

/* Typography */
// https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/
// min-vv=360px, max vv=1500px

export const H1Styled = styled.h1`
  color: var(--clr-black);
  font-size: clamp(5rem, 4.6842rem + 1.4035vw, 6rem);
  letter-spacing: -1.5px;
`;
export const H2Styled = styled.h2`
  color: var(--clr-black);
  font-size: clamp(3rem, 2.6842rem + 1.4035vw, 4rem);
  letter-spacing: -0.5px;
`;
export const H3Styled = styled.h3`
  color: var(--clr-black);
  font-size: clamp(2rem, 1.6842rem + 1.4035vw, 3rem);
`;
export const PStyled = styled.p`
  color: var(--clr-black);
  font-size: clamp(0.8rem, 0.6737rem + 0.5614vw, 1.2rem);
`;

export const ButtonStyled = styled.button`
  font-family: var(--ff-body);
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  &:hover,
  &:focus {
    transform: scale(1.1);
  }
`;

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const Container = styled.main`
  width: 100%;
  max-width: var(--max-vv);
  margin-inline: auto;
  padding: 1.5rem;
  @media screen and (min-width: 960px) {
    padding: 2rem;
  }
`;
