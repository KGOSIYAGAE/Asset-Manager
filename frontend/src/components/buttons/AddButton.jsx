import React from "react";
import { IoIosAdd } from "react-icons/io";

function AddButton({ name }) {
  return (
    <button className="primary-btn">
      <IoIosAdd size={20} />
      {name}
    </button>
  );
}

export default AddButton;
