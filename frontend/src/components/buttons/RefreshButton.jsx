import React from "react";
import { IoReloadOutline } from "react-icons/io5";

function RefreshButton({ onClick }) {
  return (
    <button className="reload-btn" onClick={onClick}>
      <IoReloadOutline size={20} />
    </button>
  );
}

export default RefreshButton;
