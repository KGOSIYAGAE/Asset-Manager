import React from "react";
import { IoIosAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";

function EditButton({ name, handleAdd }) {
  return (
    <button className="primary-btn" onClick={() => handleAdd()}>
      <MdEdit size={20} />
      {name}
    </button>
  );
}

export default EditButton;
