import React from "react";

import Pagination from "react-js-pagination";

import "components/atoms/Paging.css";

function CustomPagination({
  page,
  itemsCount,
  totalCount,
  pageRange,
  onChange,
}) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={itemsCount}
      totalItemsCount={totalCount}
      pageRangeDisplayed={pageRange}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={onChange}
    />
  );
}

export default CustomPagination;
