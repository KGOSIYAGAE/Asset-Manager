import React from "react";

function IssueDevice({ onCanel, onDelete, data }) {
  return (
    <div>
      <div className="flex flex-col gap-2 -z-50">
        <span className="font-semibold p-2">Check Out Device</span>
        <div className="flex flex-col border-t-2 border-b-2 py-5 gap-3">
          <span className="text-sm">Are you sure you want to delete the following user?</span>
        </div>
        <div className="flex justify-end p-3 gap-8">
          <button className="flex  rounded-sm p-3" onClick={onCanel}>
            Cancel
          </button>
          <button className="flex bg-red-400 text-white  rounded-sm p-3" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default IssueDevice;
