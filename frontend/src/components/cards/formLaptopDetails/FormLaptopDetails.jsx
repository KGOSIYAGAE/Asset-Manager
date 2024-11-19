import React from "react";

function FormLaptopDetails({ laptopDetails }) {
  return (
    <div>
      <span className="heading-text text-lg">Devices</span>
      <div className="flex flex-col pl-3 gap-1">
        <div className="flex gap-2">
          <span className="text-sm text-zinc-600">{laptopDetails ? laptopDetails.make : ""}</span>
          <span className="text-sm text-zinc-600">{laptopDetails ? laptopDetails.model : ""}</span>
        </div>
        <span className="text-sm text-zinc-600">{laptopDetails ? laptopDetails.serial_no : ""}</span>
        {laptopDetails ? <span className="link-text">View Laptop</span> : <span className="link-text">Assign Laptop</span>}
      </div>
    </div>
  );
}

export default FormLaptopDetails;
