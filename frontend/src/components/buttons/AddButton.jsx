import React from "react";
import { IoIosAdd } from "react-icons/io";

function AddButton({ name, handleAdd }) {
  return (
    <button className="primary-btn" onClick={() => handleAdd()}>
      <IoIosAdd size={20} />
      {name}
    </button>
  );
}

export default AddButton;
