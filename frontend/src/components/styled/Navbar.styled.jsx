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

export const NavbarDropdown = styled.ul`
  display: ${({ dropdown }) => (dropdown ? "block" : "none")};
`;
export const NavbarItem = styled.li``;
export const NavbarSubitem = styled.li``;
export const NavbarLogOut = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
`;
