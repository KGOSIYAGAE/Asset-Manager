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
import DateTimePicker from "../inputs/dateTimePicker/DateTimePicker";
import ToastMessage from "../toastMessage/ToastMessage";
import { useToastContext } from "../../hooks/useToastContext";
import { addStaff, updateStaff } from "../../services/api/staff/StaffApi";
import { useNavigate } from "react-router-dom";

function AddEditStaff({ path }) {
  const { staffState } = useStaffContext();
  const { toastState, toastDispatch } = useToastContext();
  const params = useParams();
  const navigate = useNavigate();

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

  const [formType, setFormType] = useState("add");

  //Toast close code
  const handleToastClose = () => {
    //setShowToast({ isShown: false, message: "" });
    toastDispatch({ type: "CLOSE", payload: { isShown: false, type: "", message: "" } });
  };

  const formAuthenticate = () => {};

  //Form submit
  const handleSubmit = () => {
    if (!name) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "First name must be provided" } });
    }

    if (!surname) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "Last name must be provided" } });
    }

    if (!staff_no) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "Staff number must be provided" } });
    }

    if (!phone_number) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "Phone number must be provided" } });
    }

    if (!email) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "Email must be provided" } });
    }

    if (!position) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "Position must be provided" } });
    }

    if (!isActive) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "User status must be provided" } });
    }

    if (!dateJoined) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "Start date must be provided" } });
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
    addStaff(userData, toastDispatch);
    hanldeFormClear();
    //navigate("/users/staff/");
  };

  //Set form data
  const setFormData = () => {
    const selectedId = params.id;

    if (selectedId) {
      setFormType("edit");
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
          setDateJoined(staffState.staffList[i].dateJoined);
          setEndDate(staffState.staffList[i].endDate);
        }
      }
      return;
    }
  };

  //handleUpdate
  const handleUpdate = () => {
    if (!name) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "First name must be provided" } });
    }

    if (!surname) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "Last name must be provided" } });
    }

    if (!staff_no) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "Staff number must be provided" } });
    }

    if (!phone_number) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "Phone number must be provided" } });
    }

    if (!email) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "Email must be provided" } });
    }

    if (!position) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "Position must be provided" } });
    }

    if (!isActive) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "User status must be provided" } });
    }

    if (!dateJoined) {
      return toastDispatch({ type: "ERROR", payload: { isShown: true, type: "", message: "Start date must be provided" } });
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
    updateStaff(staff_no, userData, toastDispatch);
  };

  //Form Clear
  const hanldeFormClear = () => {
    setName("");
    setSurname("");
    setStaff_no("");
    setPhone_Number("");
    setEmail("");
    setPosition("");
    setDepartment("");
    setContract_Type("");
    setIsActive("");
    setLaptopDetails("");
    setDateJoined("");
    setEndDate("");
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

          <div className="col-span-1">
            <DateTimePicker label={"Starting Date"} value={dateJoined} setOnChange={setDateJoined} />
          </div>

          {contract_type !== "Permanent" ? (
            <div className="col-span-1">
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
            {formType === "add" ? <SubmitButton text={"Submit"} onClick={handleSubmit} /> : <SubmitButton text={"Update"} onClick={handleUpdate} />}

            <CancelButton />
          </div>
        </div>
        {error ? <span className="text-sm text-red-500">{error}</span> : ""}
      </div>
      <ToastMessage isShown={toastState.isShown} type={toastState.type} message={toastState.message} onClose={handleToastClose} />
    </div>
  );
}

export default AddEditStaff;
