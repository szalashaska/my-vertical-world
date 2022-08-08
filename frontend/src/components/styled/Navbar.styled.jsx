import styled from "styled-components";

export const NavbarStyled = styled.nav`
  background-color: var(--clr-orange-strong);
  display: flex;
  color: white;
  & a {
    text-decoration: none;
    display: inline-block;
    color: white;
    padding: 1rem 2rem;
  }
`;

export const NavbarUsername = styled.span`
  display: inline-block;
  &::first-letter {
    text-transform: capitalize;
  }
`;

export const NavbarList = styled.ul`
  display: flex;
  list-style: none;
`;
export const NavbarListItem = styled.li``;
export const NavbarLogOut = styled.div`
  padding: 1rem 2rem;
`;

//   .navbar__menu {
//
//   }

//   nav a {
//     padding: 1em;
//     color: black;
//   }

//   nav p {
//     padding: 1em;
//   }
