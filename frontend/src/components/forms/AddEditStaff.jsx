import React, { useState } from "react";
import { departmentsList } from "../../utils/departmentList";
import { employmentTypes } from "../../utils/employmentTypeList";

function AddEditStaff({ path }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [staff_no, setStaff_no] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [contract_type, setContract_Type] = useState("");
  const [isActive, setIsActive] = useState(true);

  /*
    id: 0,
      name: "kgosi",
      surname: "Motabogi",
      fullname: "",
      staff_no: "11310",
      phone_number: "0789384743",
      department: "ICT",
      position: "Service Desk Operator",
      contract_type: "Permanent",
      isActive: true,
      laptop: [
    */

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Users / Staff /</b> {path}
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md">
        <div className="flex justify-between">
          <span className="heading-text">Staff Details</span>
        </div>
        <div className="grid grid-cols-6 gap-8 pt-5">
          <div className="text-input col-span-2">
            <span className="w-fit text-zinc-500 -mt-5 bg-white">First Name</span>
            <input
              type="text"
              className="outline-none"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="text-input col-span-2">
            <span className="w-fit text-zinc-500 -mt-5 bg-white">Last Name</span>
            <input
              type="text"
              className="outline-none"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />
          </div>

          <div className="text-input col-span-2">
            <span className="w-fit text-zinc-500 -mt-5 bg-white">Staff Number</span>
            <input
              type="text"
              className="outline-none"
              value={staff_no}
              onChange={(e) => {
                setStaff_no(e.target.value);
              }}
            />
          </div>

          <div className="text-input col-span-3">
            <span className="w-fit text-zinc-500 -mt-5 bg-white">Phone Number</span>
            <input
              type="text"
              className="outline-none"
              value={phone_number}
              onChange={(e) => {
                setPhone_Number(e.target.value);
              }}
            />
          </div>

          <div className="text-input col-span-3">
            <span className="w-fit text-zinc-500 -mt-5 bg-white">Email Address</span>
            <input
              type="text"
              className="outline-none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="text-input col-span-2">
            <span className="w-fit text-zinc-500 -mt-5 bg-white">Position</span>
            <input
              type="text"
              className="outline-none"
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
            />
          </div>

          <div className="text-input col-span-2">
            <span className="w-fit text-zinc-500 -mt-5 bg-white">Department</span>
            <select>
              {departmentsList.map((departmet) => (
                <option key={departmet.id} value="">
                  {departmet.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-input col-span-2">
            <span className="w-fit text-zinc-500 -mt-5 bg-white">Department</span>
            <select>
              {employmentTypes.map((employment) => (
                <option key={employment.id} value="">
                  {employment.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-4">
            <span className="heading-text text-lg">Devices</span>
            <div className="flex flex-col pl-3 gap-1">
              <span className="text-sm text-zinc-600">HP Laptop</span>
              <span className="text-sm text-zinc-600">HP Monitor</span>
            </div>
          </div>

          <div className="col-span-2">
            <span className="w-fit text-zinc-500 bg-white">User Status</span>
            <div className="flex gap-5 pl-2">
              <div className="flex gap-2">
                <input type="radio" name="Active" id="" />
                <span className="text-sm text-zinc-600">Active</span>
              </div>
              <div className="flex gap-2">
                <input type="radio" name="Active" id="" />
                <span className="text-sm text-zinc-600">In Active</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-5">
            <button className="primary-btn">Submit</button>
            <button className="secondary-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditStaff;
