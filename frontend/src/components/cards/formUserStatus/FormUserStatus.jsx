import React from "react";

function FormUserStatus({ isActive, isDisabled, handleUserstatus }) {
  return (
    <div>
      <span className="w-fit text-zinc-500 bg-white">User Status</span>
      <div className="flex gap-5 pl-2">
        <div className="flex gap-2">
          <input type="radio" name="AccountStatus" id="" disabled={isDisabled} value={"Active"} checked={isActive === "Active" ? true : false} onChange={(e) => handleUserstatus("Active")} />
          <span className="text-sm text-zinc-600">Active</span>
        </div>
        <div className="flex gap-2">
          <input type="radio" name="AccountStatus" id="" disabled={isDisabled} value={"In Active"} checked={isActive === "In Active" ? true : false} onChange={(e) => handleUserstatus("In Active")} />
          <span className="text-sm text-zinc-600">In Active</span>
        </div>
      </div>
    </div>
  );
}

export default FormUserStatus;
