import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(0.8rem, 0.6737rem + 0.5614vw, 1.2rem);
  gap: 0.5em;
`;

const CurrentPage = styled.div``;

const PaginationButton = styled.button`
  cursor: pointer;
  padding: 0.5em 1em;
  background: transparent;
  outline: none;
  color: var(--clr-orange-strong);
  border-top: 3px var(--clr-pink) solid;
  border-bottom: 3px var(--clr-yellow) solid;
  border-right: 3px var(--clr-orange-light) solid;
  border-left: 3px var(--clr-orange-strong) solid;
  border-radius: 5px;
  transition: all 0.3s ease-in;

  &:focus {
    outline: 1px grey solid;
  }
  &:hover {
    /* background: linear-gradient(135deg, #edd3e0, #f48dc2, #efdccd); */
    background: var(--clr-yellow-light);
  }

  &:disabled,
  &:hover:disabled {
  }
`;

const Pagination = ({ getData, nextPage, previousPage, baseURL, count }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [lastPage, setLastPage] = useState(null);

  useEffect(() => {
    setLastPage(Math.ceil(count / pageSize));
  }, [pageSize, count]);

  return (
    <PaginationContainer>
      {previousPage && (
        <>
          <PaginationButton
            type="button"
            onClick={() => {
              getData(`${baseURL}?page=${1}&size=${pageSize}`);
              setPageNumber(1);
            }}
          >
            &laquo;
          </PaginationButton>
          <PaginationButton
            type="button"
            onClick={() => {
              getData(`${baseURL}?page=${pageNumber - 1}&size=${pageSize}`);
              setPageNumber(pageNumber - 1);
            }}
          >
            &lt;
          </PaginationButton>
        </>
      )}
      <CurrentPage>
        {pageNumber} of {lastPage}
      </CurrentPage>
      {nextPage && (
        <>
          <PaginationButton
            type="button"
            onClick={() => {
              getData(`${baseURL}?page=${pageNumber + 1}&size=${pageSize}`);
              setPageNumber(pageNumber + 1);
            }}
          >
            &gt;
          </PaginationButton>
          <PaginationButton
            type="button"
            onClick={() => {
              getData(`${baseURL}?page=${lastPage}&size=${pageSize}`);
              setPageNumber(lastPage);
            }}
          >
            &raquo;
          </PaginationButton>
        </>
      )}
    </PaginationContainer>
  );
};

export default Pagination;
