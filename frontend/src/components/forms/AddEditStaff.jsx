import React, { useEffect, useState } from "react";
import { departmentsList } from "../../utils/departmentList";
import { employmentTypes } from "../../utils/employmentTypeList";
import { useStaffContext } from "../../hooks/useStaffContext";
import { useParams } from "react-router-dom";
import TextInput from "../inputs/textInput/TextInput";
import SelectInput from "../inputs/selectInput/SelectInput";
import FormLaptopDetails from "../cards/formLaptopDetails/FormLaptopDetails";
import FormUserStatus from "../cards/formUserStatus/FormUserStatus";
import SubmitButton from "../buttons/SubmitButton";
import CancelButton from "../buttons/CancelButton";

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
  const [laptopDetails, setLaptopDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const params = useParams();

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
    const selectedId = params.id;

    if (selectedId) {
      for (let i = 0; i < staffState.staffList.length; i++) {
        if (selectedId == staffState.staffList[i].id) {
          setName(staffState.staffList[i].name);
          setSurname(staffState.staffList[i].surname);
          setStaff_no(staffState.staffList[i].staff_no);
          setPhone_Number(staffState.staffList[i].phone_number);
          setEmail(staffState.staffList[i].email);
          setPosition(staffState.staffList[i].position);
          setDepartment(staffState.staffList[i].department);
          setContract_Type(staffState.staffList[i].contract_type);
          setIsActive(staffState.staffList[i].isActive);
          setLaptopDetails(staffState.staffList[i].laptop);
          setIsDisabled(true);
        }
      }

      return;
    }
  };

  //Choose user status
  const handleUserstatus = (results) => {
    setIsActive(results);
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
          <div className="col-span-2">
            <TextInput label={"First Name"} value={name} isDisabled={isDisabled} setOnChange={setName} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Last Name"} value={surname} isDisabled={isDisabled} setOnChange={setSurname} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Staff Number"} value={staff_no} isDisabled={isDisabled} setOnChange={setStaff_no} />
          </div>

          <div className="col-span-3">
            <TextInput label={"Phone Number"} value={phone_number} isDisabled={isDisabled} setOnChange={setPhone_Number} />
          </div>

          <div className="col-span-3">
            <TextInput label={"Email Address"} value={email} isDisabled={isDisabled} setOnChange={setEmail} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Position"} value={position} isDisabled={isDisabled} setOnChange={setPosition} />
          </div>

          <div className="col-span-2">
            <SelectInput label={"Department"} value={department} options={departmentsList} optionName={"name"} isDisabled={isDisabled} setOnChange={setDepartment} />
          </div>

          <div className="col-span-2">
            <SelectInput label={"Contract Type"} value={contract_type} options={employmentTypes} optionName={"name"} isDisabled={isDisabled} setOnChange={setContract_Type} />
          </div>

          <div className="col-span-4">
            <FormLaptopDetails laptopDetails={laptopDetails} />
          </div>

          <div className="col-span-2">
            <FormUserStatus isActive={isActive} isDisabled={isDisabled} handleUserstatus={handleUserstatus} />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-5">
            <SubmitButton handleSubmit={handleSubmit} />
            <CancelButton />
          </div>
        </div>
        {error ? <span className="text-sm text-red-500">{error}</span> : ""}
      </div>
    </div>
  );
}

export default AddEditStaff;
