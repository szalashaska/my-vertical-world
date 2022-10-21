import styled from "styled-components";

export const SearchContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: 500px) {
    justify-content: center;
  }
`;

export const SearchRadioLabel = styled.label`
  cursor: pointer;
  text-transform: capitalize;
  padding-block: 0.5rem;
  @media screen and (min-width: 500px) {
    padding-right: 2rem;
  }
`;

export const SearchRadioInput = styled.input`
  display: inline-block;
  margin-right: 0.5rem;
`;

export const SearchResultsContainer = styled.ul`
  padding: 1rem;
  list-style: none;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  max-height: 10rem;
  overflow-y: auto;
`;
export const SearchResult = styled.li`
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.3s ease-in;
  & a {
    width: 100%;
  }

  &:hover,
  &:focus {
    background: linear-gradient(to right, white, #dab495, #a2557c, white);
  }
`;

export const SearchResultAdditional = styled.span`
  font-size: 0.75em;
  color: grey;
`;
