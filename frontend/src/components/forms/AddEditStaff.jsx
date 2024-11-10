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
import axiosInstance from "../../utils/axiosInstance";
import DateTimePicker from "../inputs/dateTimePicker/DateTimePicker";

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
  const [dateJoined, setDateJoined] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const params = useParams();

  //Add staff API CALL
  const addStaff = async (userData) => {
    try {
      const response = await axiosInstance.post("/users/staff/add-staff", userData);

      if (response.data) {
        return console.log(response);
      }
    } catch (error) {
      if (error.response.data && error.response.data.error) {
        return setError(error.response.data.message);
      } else {
        return setError("An unexpected error occured, please try again");
      }
    }
  };

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

    if (!isActive) {
      return setError("User status must be provided");
    }

    if (!dateJoined) {
      return setError("Start date must be provided");
    }

    setError(null);

    const userData = {
      name,
      surname,
      staff_no,
      phone_number,
      email,
      department,
      position,
      contract_type,
      isActive,
      dateJoined,
      endDate,
    };

    //api call
    addStaff(userData);
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
          setDateJoined(staffState.staffList[i].dateJoined);
          setEndDate(staffState.staffList[i].endDate);
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
            <TextInput label={"First Name"} value={name} isDisabled={isDisabled} maxLength={50} setOnChange={setName} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Last Name"} value={surname} isDisabled={isDisabled} maxLength={50} setOnChange={setSurname} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Staff Number"} value={staff_no} isDisabled={isDisabled} maxLength={6} setOnChange={setStaff_no} />
          </div>

          <div className="col-span-3">
            <TextInput label={"Phone Number"} value={phone_number} isDisabled={isDisabled} maxLength={10} setOnChange={setPhone_Number} />
          </div>

          <div className="col-span-3">
            <TextInput label={"Email Address"} value={email} isDisabled={isDisabled} maxLength={50} setOnChange={setEmail} />
          </div>

          <div className="col-span-2">
            <TextInput label={"Position"} value={position} isDisabled={isDisabled} maxLength={50} setOnChange={setPosition} />
          </div>

          <div className="col-span-2">
            <SelectInput label={"Department"} value={department} options={departmentsList} optionName={"name"} isDisabled={isDisabled} setOnChange={setDepartment} />
          </div>

          <div className="col-span-2">
            <SelectInput label={"Contract Type"} value={contract_type} options={employmentTypes} optionName={"name"} isDisabled={isDisabled} setOnChange={setContract_Type} />
          </div>

          <div className="col-span-2">
            <DateTimePicker label={"Starting Date"} value={dateJoined} setOnChange={setDateJoined} />
          </div>

          {contract_type !== "Permanent" ? (
            <div className="col-span-2">
              <DateTimePicker label={"End Date"} value={endDate} setOnChange={setEndDate} />
            </div>
          ) : (
            ""
          )}

          <div className="col-span-2">
            <FormUserStatus isActive={isActive} isDisabled={isDisabled} handleUserstatus={handleUserstatus} />
          </div>

          <div className="col-span-5">
            <FormLaptopDetails laptopDetails={laptopDetails} />
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
