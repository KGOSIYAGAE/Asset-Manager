import React from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

function TablePagation({ currentPage, setCurrentPage, totalPages, limit }) {
  return (
    <div className="table-pagation">
      <span>
        {currentPage}–{limit} of {totalPages}
      </span>
      <div className="flex gap-3">
        <button
          className="pagation-button hover"
          onClick={() => {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
          }}
          disabled={currentPage === 1}
        >
          <MdArrowBackIos size={13} />
        </button>
        <button
          className="pagation-button"
          onClick={() => {
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
          }}
          disabled={currentPage === totalPages}
        >
          <MdArrowForwardIos size={13} />
        </button>
      </div>
    </div>
  );
}

export default TablePagation;
