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
  console.log(page, itemsCount, totalCount, pageRange);
  return (
    <Pagination
      activePage={page}
      itemsCountPage={itemsCount}
      totalItemsCount={totalCount}
      pageRangeDisplayed={pageRange}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={onChange}
    />
  );
}

export default CustomPagination;
