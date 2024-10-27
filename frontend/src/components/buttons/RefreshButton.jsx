import React from "react";
import { IoReloadOutline } from "react-icons/io5";

function RefreshButton() {
  return (
    <button className="reload-btn">
      <IoReloadOutline size={20} />
    </button>
  );
}

export default RefreshButton;
