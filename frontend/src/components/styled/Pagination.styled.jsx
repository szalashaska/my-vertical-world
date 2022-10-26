import styled from "styled-components";
import ArrowUp from "../../assets/arrow-up.svg";
import ArrowDown from "../../assets/arrow-down.svg";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(0.8rem, 0.6737rem + 0.5614vw, 1.2rem);
  gap: 0.5rem;
  flex-direction: column;
  @media screen and (min-width: 710px) {
    gap: 1rem;
    flex-direction: row;
  }
`;

export const CurrentPage = styled.div``;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  & label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  & select {
    margin: 0;
  }
`;

export const PaginationButton = styled.button`
  cursor: pointer;
  padding: 0.5em 1em;
  background: transparent;
  outline: none;
  color: var(--clr-orange-strong);
  border-top: 3px var(--clr-pink) solid;
  border-bottom: 3px var(--clr-orange-strong) solid;
  border-right: 3px var(--clr-pink) solid;
  border-left: 3px var(--clr-orange-strong) solid;
  border-radius: 5px;
  transition: all 0.3s ease-in;

  &:focus {
    outline: 1px grey solid;
  }
  &:hover {
    background: var(--clr-yellow-light);
  }

  &:disabled,
  &:hover:disabled {
    color: #c1bfbf;
    border: 3px #c1bfbf solid;
    cursor: auto;
    background: transparent;
  }
`;

export const AscDescButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  padding: 10px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover svg {
    fill: var(--clr-pink);
    transform: scale(1.2);
  }
`;

export const ArrowUpIcon = styled(ArrowUp)`
  fill: ${({ active }) => (active ? "var(--clr-orange-strong)" : "black")};
  width: 25px;
  transition: all 0.3s ease-in;

  cursor: pointer;
`;
export const ArrowDownIcon = styled(ArrowDown)`
  fill: ${({ active }) => (active ? "var(--clr-orange-strong)" : "black")};
  width: 25px;
  transition: all 0.3s ease-in;

  cursor: pointer;
`;
