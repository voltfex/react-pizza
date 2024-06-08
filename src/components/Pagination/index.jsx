import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.sass';
const Pagination = ({ curentPage, onChangePage }) => {
  return (
    <>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        forcePage={curentPage - 1}
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
