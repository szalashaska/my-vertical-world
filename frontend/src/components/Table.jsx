import React from "react";
import { LinkStyled } from "../constans/GlobalStyles";
import {
  DataTableStyled,
  DataTableBody,
  DataTableHead,
  DataTableHeading,
  DataTableRow,
  DataTableData,
  DataTableWrapper,
  DataTableImage,
} from "./styled/DataTable.styled";

const Table = ({ data, tableHead, content }) => {
  return (
    <DataTableWrapper>
      <DataTableStyled>
        <DataTableHeading>
          <DataTableRow>
            {tableHead.map((header) => (
              <DataTableHead key={header}>{header}</DataTableHead>
            ))}
          </DataTableRow>
        </DataTableHeading>
        <DataTableBody>
          {data.map((column) => (
            <DataTableRow key={column.id}>
              {tableHead.map((row) => {
                if (row === "name")
                  return (
                    <DataTableData key={row}>
                      <LinkStyled to={`/${content}/${column.id}`}>
                        {column.name}
                      </LinkStyled>
                    </DataTableData>
                  );

                if (row === "author")
                  return (
                    <DataTableData key={row}>
                      <LinkStyled to={`/user/${column.author.id}`}>
                        {column.author.username}
                      </LinkStyled>
                    </DataTableData>
                  );
                if (row === "created")
                  return (
                    <DataTableData key={row}>
                      {new Date(column.created).toLocaleDateString()}
                    </DataTableData>
                  );
                if (row === "image")
                  return (
                    <DataTableData key={row}>
                      <DataTableImage src={column.image} />
                    </DataTableData>
                  );
                return <DataTableData key={row}>{column[row]}</DataTableData>;
              })}
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTableStyled>
    </DataTableWrapper>
  );
};

export default Table;
