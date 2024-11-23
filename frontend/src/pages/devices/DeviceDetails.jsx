import React, { useState } from "react";
import AddButton from "../../components/buttons/AddButton";

function DeviceDetails({ path }) {
  const [isAssigned, setIsAssigned] = useState(false);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Devices /</b> {path}
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md">
        <div className="flex justify-between">
          <span className="heading-text">Device Details</span>
          <div>
            <button className="primary-btn" onClick={() => {}}>
              Assign User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceDetails;
