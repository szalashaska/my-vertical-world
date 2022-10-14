import React, { useEffect, useState } from "react";

const Pagination = ({ getData, nextPage, previousPage, baseURL, count }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [lastPage, setLastPage] = useState(null);

  useEffect(() => {
    setLastPage(Math.ceil(count / pageSize));
  }, [pageSize, count]);

  return (
    <div>
      {previousPage && (
        <>
          <button
            type="button"
            onClick={() => {
              getData(`${baseURL}?page=${1}&size=${pageSize}`);
              setPageNumber(1);
            }}
          >
            First
          </button>
          <button
            type="button"
            onClick={() => {
              getData(`${baseURL}?page=${pageNumber - 1}&size=${pageSize}`);
              setPageNumber(pageNumber - 1);
            }}
          >
            Previous
          </button>
        </>
      )}
      <p>
        {pageNumber} of {lastPage}
      </p>
      {nextPage && (
        <>
          <button
            type="button"
            onClick={() => {
              getData(`${baseURL}?page=${pageNumber + 1}&size=${pageSize}`);
              setPageNumber(pageNumber + 1);
            }}
          >
            Next
          </button>
          <button
            type="button"
            onClick={() => {
              getData(`${baseURL}?page=${lastPage}&size=${pageSize}`);
              setPageNumber(lastPage);
            }}
          >
            Last
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
