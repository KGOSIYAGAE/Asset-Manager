import React, { useEffect, useState } from "react";
import { departmentsList } from "../../utils/departmentList";
import { employmentTypes } from "../../utils/employmentTypeList";
import { useStaffContext } from "../../hooks/useStaffContext";

function AddEditStaff({ path }) {
  const { staffState } = useStaffContext();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [staff_no, setStaff_no] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [contract_type, setContract_Type] = useState("");
  const [isActive, setIsActive] = useState("");
  const [error, setError] = useState(null);

  //Form submit
  const handleSubmit = () => {
    if (!name) {
      return setError("First name must be provided");
    }

    if (!surname) {
      return setError("Last name must be provided");
    }

    if (!staff_no) {
      return setError("Staff number must be provided");
    }

    if (!phone_number) {
      return setError("Phone number must be provided");
    }

    if (!email) {
      return setError("Email must be provided");
    }

    if (!position) {
      return setError("Position must be provided");
    }

    setError(null);

    const userData = [
      {
        name,
        surname,
        staff_no,
        phone_number,
        email,
        department,
        position,
        contract_type,
        isActive,
        laptop: {
          make_model: "",
          serial_no: "",
        },
      },
    ];

    console.log(userData);
  };

  //Set form data
  const setFormData = () => {
    let selecteUserStaff_no = localStorage.getItem("clickedUser");

    if (selecteUserStaff_no) {
      for (let i = 0; i < staffState.staffList.length; i++) {
        if (selecteUserStaff_no === staffState.staffList[i].staff_no) {
          setName(staffState.staffList[i].name);
          setSurname(staffState.staffList[i].surname);
          setStaff_no(staffState.staffList[i].staff_no);
          setPhone_Number(staffState.staffList[i].phone_number);
          setEmail(staffState.staffList[i].email);
          setPosition(staffState.staffList[i].position);
          setDepartment(staffState.staffList[i].department);
          setContract_Type(staffState.staffList[i].contract_type);
          setIsActive(staffState.staffList[i].isActive);
        }
      }
      localStorage.clear();
      return;
    }
  };

  useEffect(() => {
    setFormData();
  }, []);

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
            <select
              className="outline-none"
              value={department ? department : setDepartment("ICT")}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            >
              {departmentsList.map((departmet) => (
                <option key={departmet.id}>{departmet.name}</option>
              ))}
            </select>
          </div>

          <div className="text-input col-span-2">
            <span className="w-fit text-zinc-500 -mt-5 bg-white">Contract Type</span>
            <select type="text" className="outline-none text-zin-300" value={contract_type ? contract_type : setContract_Type("Permanent")} onChange={(e) => setContract_Type(e.target.value)}>
              {employmentTypes.map((employment) => (
                <option key={employment.id}>{employment.name}</option>
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
                <input type="radio" name="AccountStatus" id="" value={"Active"} checked={isActive === "Active" ? true : false} onChange={(e) => setIsActive("Active")} />
                <span className="text-sm text-zinc-600">Active</span>
              </div>
              <div className="flex gap-2">
                <input type="radio" name="AccountStatus" id="" value={"In Active"} checked={isActive === "In Active" ? true : false} onChange={(e) => setIsActive("In Active")} />
                <span className="text-sm text-zinc-600">In Active</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-5">
            <button className="primary-btn" onClick={() => handleSubmit()}>
              Submit
            </button>
            <button className="secondary-btn">Cancel</button>
          </div>
        </div>
        {error ? <span className="text-sm text-red-500">{error}</span> : ""}
      </div>
    </div>
  );
}

export default AddEditStaff;
