import React, { useEffect, useMemo, useState } from "react";

const Pager = ({
  total = 0,
  itemsPerPage = 5,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);
  const paginationItems = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {" "}
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  }, [totalPages, currentPage]);
  // if ( totalPages === 0 ) return null ;
  return (
    <>
      <nav
        className="pagination is-small"
        role="navigation"
        aria-label="pagination"
      >
        <a
          className="pagination-previous"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </a>
        <ul className="pagination-list">
          <li> {paginationItems} </li>
        </ul>
        <a
          className="pagination-next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next page
        </a>
      </nav>{" "}
    </>
  );
};

export default Pager;
