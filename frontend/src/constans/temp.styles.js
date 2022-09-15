import styled from "styled-components";

// ------Typography------

export const Heading1 = styled.h1`
  // Mobile
  margin-bottom: ${({ mb }) => mb || "0.9em"};
  text-align: ${({ align }) => align || "left"};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  color: ${({ light }) => (light ? "white" : "black")};
  font-size: 2rem;
  line-height: 36px;

  @media only screen and (min-width: ${({ theme }) => theme.width.mobile}) {
    // Tablet
    font-size: 3rem;
    line-height: 52px;
  }

  @media only screen and (min-width: ${({ theme }) => theme.width.tablet}) {
    // Desktop
    font-size: 3.5rem;
    line-height: 64px;
  }
`;

export const Heading2 = styled.h2`
  // Mobile
  margin-bottom: ${({ mb }) => mb || "0.9em"};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  text-align: ${({ align }) => align || "left"};
  color: ${({ light }) => (light ? "white" : "black")};

  font-size: 1.5rem;
  line-height: 28px;

  @media only screen and (min-width: ${({ theme }) => theme.width.mobile}) {
    // Tablet
    font-size: 2rem;
    line-height: 36px;
  }

  @media only screen and (min-width: ${({ theme }) => theme.width.tablet}) {
    // Desktop
    font-size: 3rem;
    line-height: 52px;
  }
`;

export const Heading3 = styled.h3`
  // Mobile
  margin-bottom: ${({ mb }) => mb || "0.9em"};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  text-align: ${({ align }) => align || "left"};
  color: ${({ light }) => (light ? "white" : "black")};

  font-size: 1.25rem;
  line-height: 24px;

  @media only screen and (min-width: ${({ theme }) => theme.width.mobile}) {
    // Tablet
    font-size: 1.5rem;
    line-height: 28px;
  }

  @media only screen and (min-width: ${({ theme }) => theme.width.tablet}) {
    // Desktop
    font-size: 2rem;
    line-height: 36px;
  }
`;

export const Heading4 = styled.h4`
  // Mobile
  margin-bottom: ${({ mb }) => mb || "0.9em"};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  text-align: ${({ align }) => align || "left"};
  color: ${({ light }) => (light ? "white" : "black")};

  font-size: 1rem;
  line-height: 20px;

  @media only screen and (min-width: ${({ theme }) => theme.width.mobile}) {
    // Tablet
    font-size: 1.25rem;
    line-height: 24px;
  }

  @media only screen and (min-width: ${({ theme }) => theme.width.tablet}) {
    // Desktop
    font-size: 1.5rem;
    line-height: 28px;
  }
`;

// export const h5Styled = styled.h5<{ bold: boolean }>`
//   // Mobile

//   font-weight: ${({ bold }) => (bold ? 700 : 400)};

//   @media only screen and (min-width: ${({ theme }) => theme.width.mobile}) {
//     // Tablet
//   }

//   @media only screen and (min-width: ${({ theme }) => theme.width.tablet}) {
//     // Desktop
//   }
// `;

export const Paragraph = styled.p`
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  font-size: ${({ small }) => (small ? "0.875rem" : "1rem")};
  line-height: ${({ small }) => (small ? "20px" : "24px")};
  text-align: ${({ align }) => align || "left"};
  color: ${({ light }) => (light ? "white" : "black")};

  @media only screen and (min-width: ${({ theme }) => theme.width.tablet}) {
    // Desktop
    font-size: ${({ small }) => (small ? "1rem" : "1.125rem")};
    line-height: ${({ small }) => (small ? "24px" : "28px")};
  }
`;

// ------Containers------

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.width.max};
  margin-inline: auto;
  padding: 0 1.5rem;
  @media screen and (min-width: 960px) {
    padding: 0 2rem;
  }
`;

export const Wrapper = styled.div`
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};
`;

export const FlexContainer = styled(Wrapper)`
  display: flex;
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  flex-wrap: ${({ $wrap }) => ($wrap ? "wrap" : "no-wrap")};
  gap: ${({ gap }) => gap || "normal"};
`;

// ------HTML ELements------

export const Button = styled.button`
  color: black;
  margin: 0.5rem;
  display: inline-block;
  padding: 1em 2em;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  text-align: center;
  text-decoration: none;
  border-radius: 2.25em;
  border: none;
  ${({ color }) => color || "#391400"};
  cursor: pointer;
  transition: all ease 0.3s;
  background-color: ${({ primary }) =>
    primary ? "transparent" : "rgb(119, 200, 210)"};

  &:hover {
    outline: ${({ primary }) =>
      primary
        ? "solid 4px rgba(119, 200, 210, 1)"
        : "solid 10px rgba(119, 200, 210, 0.5)"};
  }

  &:focus {
    box-shadow: 0 0 25px rgba(119, 200, 210, 0.8);
  }

  &:active {
    background-color: rgba(200, 200, 210, 1);
  }

  &:disabled {
    background-color: ${({ primary }) =>
      primary ? "transparent" : "rgba(119, 200, 210, 0.5);"};
    color: rgba(0, 0, 0, 0.5);
  }
  &:hover:disabled {
    outline: ${({ primary }) =>
      primary ? "solid 4px rgba(119, 200, 210, 0.4)" : "none"};
    cursor: default;
  }

  @media only screen and (min-width: ${({ theme }) => theme.width.tablet}) {
    // Desktop
    padding: 1.2em 2.25em;
    font-size: 1rem;
  }
`;

export const Input = styled.input`
  display: block;
  padding: 0.75rem;
  margin: 0.75rem 0;
  border-radius: 10px;
  border: solid 2px var(--clr-blue100);
`;

// ------Others------

export const HorizontalLine = styled.hr`
  color: ${({ color }) => color || "#391400"};
  max-width: 1400px;
  margin: 1rem auto;
  border-radius: 50%;
  @media screen and (min-width: 1680px) {
    margin: 2rem auto;
  }
`;
