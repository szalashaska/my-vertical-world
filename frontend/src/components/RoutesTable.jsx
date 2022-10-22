import React from "react";
import {
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableHeading,
  DataTableRow,
  DataTableData,
  DataTableWrapper,
} from "./styled/DataTable.styled";

const RoutesTable = ({ data }) => {
  return (
    <DataTableWrapper>
      <DataTable>
        <DataTableHeading>
          <DataTableRow>
            <DataTableHead>id</DataTableHead>
            <DataTableHead>Name</DataTableHead>
            <DataTableHead>Grade</DataTableHead>
            <DataTableHead>Author</DataTableHead>
            <DataTableHead>Date</DataTableHead>
          </DataTableRow>
        </DataTableHeading>
        <DataTableBody>
          {data.map((route) => (
            <DataTableRow key={route.id}>
              <DataTableData>{route.id}</DataTableData>
              <DataTableData>{route.name}</DataTableData>
              <DataTableData>{route.grade}</DataTableData>
              <DataTableData>{route.author.username}</DataTableData>
              <DataTableData>
                {new Date(route.created).toLocaleDateString()}
              </DataTableData>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </DataTableWrapper>
  );
};

export default RoutesTable;
