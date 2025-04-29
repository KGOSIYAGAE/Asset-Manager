import React, { useEffect, useState } from "react";
import { departmentsList } from "../../utils/departmentList";
import { employmentTypes } from "../../utils/employmentTypeList";
import { useStaffContext } from "../../hooks/useStaffContext";
import { useParams } from "react-router-dom";
import TextInput from "../inputs/textInput/TextInput";
import SelectInput from "../inputs/selectInputs/selectInput/SelectInput";
import FormLaptopDetails from "../cards/formLaptopDetails/FormLaptopDetails";
import FormUserStatus from "../cards/formUserStatus/FormUserStatus";
import SubmitButton from "../buttons/SubmitButton";
import CancelButton from "../buttons/CancelButton";
import DateTimePicker from "../inputs/dateTimePicker/DateTimePicker";
import ToastMessage from "../toastMessage/ToastMessage";
import { addStaff, getUser, updateStaff } from "../../services/api/staff/Staff.Api";
import { useNavigate } from "react-router-dom";
import { generateLoanEndate } from "../../utils/helperMethods";
import { getAllDepartments } from "../../services/api/departments/Departments.Api";
import { useDepartmentContext } from "../../hooks/useDepartmentContext";
import DepartmentSelectInput from "../inputs/selectInputs/departmentSelectInput/departmentSelectInput";
import { getAllPositions } from "../../services/api/positions/Positions.Api";
import { usePositionContext } from "../../hooks/usePositionsContext";

function AddEditStaff({ path }) {
  const { staffState } = useStaffContext();
  const { departmentState, departmentDispatch } = useDepartmentContext();
  const { positionState, positionDispatch } = usePositionContext();

  const params = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [staff_no, setStaff_no] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [email, setEmail] = useState("");
  const [department_name, setDepartment_name] = useState("");
  const [department_id, setDepartment_id] = useState(0);
  const [position, setPosition] = useState("");
  const [contract_type, setContract_Type] = useState("");
  const [isActive, setIsActive] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [laptopDetails, setLaptopDetails] = useState({
    make: null,
    model: null,
    serial_no: null,
  });

  const [formType, setFormType] = useState("add");
  const [showToast, setShowToast] = useState({ isShown: false, type: null, message: null });

  //Toast close code
  const handleToastClose = () => {
    //setShowToast({ isShown: false, message: "" });
    setShowToast({ isShown: false, type: "", message: "" });
  };

  //Set form data
  const setFormData = (userDetails) => {
    setFormType("edit");
    setName(userDetails.name);
    setSurname(userDetails.surname);
    setStaff_no(userDetails.staff_no);
    setPhone_Number(userDetails.phone_number);
    setEmail(userDetails.email);
    setPosition(userDetails.position);
    setDepartment_name(userDetails.department);
    setDepartment_id(userDetails.department_id);
    setContract_Type(userDetails.contract_type);
    setIsActive(userDetails.acc_status);
    setLaptopDetails(userDetails.laptop);
    setDateJoined(userDetails.start_date);
    setEndDate(userDetails.end_date);
  };

  //Handle Submit / Update
  const handleSubmit = () => {
    if (!name) {
      return setShowToast({ isShown: true, type: "", message: "First name must be provided" });
    }

    if (!surname) {
      return setShowToast({ isShown: true, type: "", message: "Last name must be provided" });
    }

    if (!staff_no) {
      return setShowToast({ isShown: true, type: "", message: "Staff number must be provided" });
    }

    if (!phone_number) {
      return setShowToast({ isShown: true, type: "", message: "Phone number must be provided" });
    }

    if (!email) {
      return setShowToast({ isShown: true, type: "", message: "Email must be provided" });
    }

    if (!position) {
      return setShowToast({ isShown: true, type: "", message: "Position must be provided" });
    }

    if (!isActive) {
      return setShowToast({ isShown: true, type: "", message: "User status must be provided" });
    }

    if (!dateJoined) {
      return setShowToast({ isShown: true, type: "", message: "Start date must be provided" });
    }

    setError(null);

    const userData = {
      name,
      surname,
      staff_no,
      phone_number,
      email,
      department_id,
      position,
      contract_type,
      isActive,
      dateJoined,
      endDate,
    };

    if (formType === "add") {
      addStaff(userData, setShowToast);
      hanldeFormClear();
    } else {
      const { id } = params;
      if (id) {
        updateStaff(id, userData, setShowToast);
      }
    }
  };

  //Form Clear
  const hanldeFormClear = () => {
    setName("");
    setSurname("");
    setStaff_no("");
    setPhone_Number("");
    setEmail("");
    setPosition("");
    setDepartment_name("");
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

  //User details API call
  const getUserDetails = () => {
    const { id } = params;

    if (id) {
      getUser(id, setFormData);
    }
  };

  useEffect(() => {
    getUserDetails();
    getAllDepartments(departmentDispatch);
    getAllPositions(positionDispatch);
  }, []);

  useEffect(() => {
    console.log(positionState);
  }, [positionState]);

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
            <TextInput label={"Staff Number"} value={staff_no} isDisabled={isDisabled} maxLength={5} setOnChange={setStaff_no} />
          </div>

          <div className="col-span-3">
            <TextInput label={"Phone Number"} value={phone_number} isDisabled={isDisabled} maxLength={10} setOnChange={setPhone_Number} />
          </div>

          <div className="col-span-3">
            <TextInput label={"Email Address"} value={email} isDisabled={isDisabled} maxLength={50} setOnChange={setEmail} />
          </div>

          <div className="col-span-2">
            <DepartmentSelectInput
              label={"Department"}
              value={department_name}
              departmentId={department_id}
              options={departmentState?.departmentsList}
              optionName={"department_name"}
              isDisabled={isDisabled}
              setOnChange={setDepartment_name}
              onChoose={setDepartment_id}
            />
          </div>

          <div className="col-span-2">
            <TextInput label={"Position"} value={position} isDisabled={isDisabled} maxLength={50} setOnChange={setPosition} />
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
            {formType === "add" ? <SubmitButton text={"Submit"} onClick={handleSubmit} /> : <SubmitButton text={"Update"} onClick={handleSubmit} />}

            <CancelButton onClick={hanldeFormClear} />
          </div>
        </div>
        {error ? <span className="text-sm text-red-500">{error}</span> : ""}
      </div>
      <ToastMessage isShown={showToast.isShown} type={showToast.type} message={showToast.message} onClose={handleToastClose} />
    </div>
  );
}

export default AddEditStaff;
