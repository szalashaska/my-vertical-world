import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { FlexContainer } from "../constans/GlobalStyles";
import {
  PaginationContainer,
  CurrentPage,
  SelectContainer,
  PaginationButton,
  AscDescButton,
  ArrowUpIcon,
  ArrowDownIcon,
} from "./styled/Pagination.styled";

const Pagination = ({
  getData,
  nextPage,
  previousPage,
  baseURL,
  count,
  tableHead,
  pageSizes,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [orderBy, setOrderBy] = useState(tableHead[0]);
  const [lastPage, setLastPage] = useState(null);
  const [descending, setDescending] = useState(false);

  const selectSizeInput = {
    id: 1,
    name: "select_size",
    type: "select",
    options: pageSizes,
    placeholder: "Size",
    label: "By page:",
    value: pageSize,
    onChange: (e) => setPageSize(+e.target.value),
  };

  const selectOrderInput = {
    id: 2,
    name: "select_order",
    type: "select",
    options: tableHead,
    placeholder: "Order by",
    label: "Order by:",
    value: orderBy,
    onChange: (e) => {
      setOrderBy(e.target.value);
    },
  };

  useEffect(() => {
    setLastPage(Math.ceil(count / pageSize));
  }, [pageSize, count]);

  useEffect(() => {
    setPageNumber(1);
    getData(
      `${baseURL}?order_by=${
        descending ? `-${orderBy}` : orderBy
      }&page=${1}&size=${pageSize}`
    );
  }, [orderBy, pageSize, descending]);

  return (
    <PaginationContainer>
      <SelectContainer>
        <FormInput {...selectSizeInput} />
      </SelectContainer>

      <FlexContainer gap="0.5rem">
        <PaginationButton
          type="button"
          onClick={() => {
            getData(
              `${baseURL}?order_by=${
                descending ? `-${orderBy}` : orderBy
              }&page=${1}&size=${pageSize}`
            );
            setPageNumber(1);
          }}
          disabled={!previousPage}
        >
          &laquo;
        </PaginationButton>
        <PaginationButton
          type="button"
          onClick={() => {
            getData(
              `${baseURL}?order_by=${
                descending ? `-${orderBy}` : orderBy
              }&page=${pageNumber - 1}&size=${pageSize}`
            );
            setPageNumber(pageNumber - 1);
          }}
          disabled={!previousPage}
        >
          &lt;
        </PaginationButton>

        <CurrentPage>
          {pageNumber} of {lastPage}
        </CurrentPage>

        <PaginationButton
          type="button"
          onClick={() => {
            getData(
              `${baseURL}?order_by=${
                descending ? `-${orderBy}` : orderBy
              }&page=${pageNumber + 1}&size=${pageSize}`
            );
            setPageNumber(pageNumber + 1);
          }}
          disabled={!nextPage}
        >
          &gt;
        </PaginationButton>
        <PaginationButton
          type="button"
          onClick={() => {
            getData(
              `${baseURL}?order_by=${
                descending ? `-${orderBy}` : orderBy
              }&page=${lastPage}&size=${pageSize}`
            );
            setPageNumber(lastPage);
          }}
          disabled={!nextPage}
        >
          &raquo;
        </PaginationButton>
      </FlexContainer>

      <SelectContainer>
        <FormInput {...selectOrderInput} />
        <AscDescButton type="button" onClick={() => setDescending(false)}>
          <ArrowDownIcon active={!descending ? 1 : 0} />
        </AscDescButton>

        <AscDescButton type="button">
          <ArrowUpIcon
            active={descending ? 1 : 0}
            onClick={() => setDescending(true)}
          />
        </AscDescButton>
      </SelectContainer>
    </PaginationContainer>
  );
};

export default Pagination;
