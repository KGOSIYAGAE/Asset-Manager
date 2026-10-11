import React from "react";
import CancelButton from "../../buttons/CancelButton";
import { TbTrashXFilled } from "react-icons/tb";

function DeleteConfirmation({ onCanel, onSubmit, onDelete, email, text, heading, laptopSerialNo }) {
  return (
    <div className="bg-white ">
      <div className="flex flex-col items-center -z-50">
        <div className="bg-red-100 rounded-md p-3">
          <TbTrashXFilled size={30} className="text-red-500" />
        </div>
        <span className="font-semibold p-2">{heading ? heading : "Confirm Delete"}</span>
        <div className="flex flex-col items-center gap-2 py-2 ">
          <span className="text-sm">{text ? text : "You want to delete all the marked items, this cant be undone once you delete."}</span>
          <span className="text-sm font-semibold">{email ? email : laptopSerialNo}</span>
        </div>
        <div className="flex justify-end p-3 gap-8">
          <CancelButton onClick={onCanel} />
          <button
            className="flex bg-red-500 hover:bg-red-600 text-white  rounded-md p-3"
            onClick={() => {
              onDelete();
              return onSubmit();
            }}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
