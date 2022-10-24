import styled from "styled-components";

export const DataTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  min-height: 25rem;
`;

export const DataTableStyled = styled.table`
  width: 100%;
  margin-block: 2rem;
  border-collapse: collapse;
  font-size: clamp(0.8rem, 0.6737rem + 0.5614vw, 1.2rem);
`;
export const DataTableHead = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 2px solid black;
  text-transform: capitalize;
  cursor: pointer;
`;
export const DataTableHeading = styled.thead``;
export const DataTableBody = styled.tbody``;
export const DataTableRow = styled.tr`
  transition: all 0.3s ease-in;
  &:nth-child(even):hover,
  &:hover {
    background: linear-gradient(to right, white, #dab495, #a2557c, white);
  }
  &:nth-child(even) {
    background: linear-gradient(to right, white, #dab4951a, #9f5f7f17, white);
  }
`;
export const DataTableData = styled.td`
  text-align: left;
  padding: 0.75rem 0.5rem;
  text-transform: capitalize;
`;

export const DataTableImage = styled.img`
  height: 4em;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 5px;
`;
