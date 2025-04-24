import React from "react";
import { IoReloadOutline } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";

function BulkAddButton({ onClick }) {
  return (
    <button className="reload-btn" onClick={onClick}>
      <MdAddToPhotos size={20} />
    </button>
  );
}

export default BulkAddButton;
