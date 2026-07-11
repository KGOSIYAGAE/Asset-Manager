import React, { useEffect, useState } from "react";
import { departmentEntitiesList } from "../../utils/departmentList";
import { employmentTypes } from "../../utils/employmentTypeList";
import { useStaffContext } from "../../hooks/useStaffContext";
import { addYears } from "date-fns";
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

import DepartmentSelectInput from "../inputs/selectInputs/departmentSelectInput/DepartmentSelectInput";

import PositionSelectInput from "../inputs/selectInputs/positionSelectInput/PositionSelectInput";
import { handleTimeStamp } from "../../utils/dateConverter";
import { hasPermission } from "../../utils/getLoggedInUser";
//import { positionList } from "../../utils/positionsList";
import FacultySelectInput from "../inputs/selectInputs/facultySelectInput/FacultySelectInput";
import AssignDeviceToUser from "../cards/issueDevice/AssignDeviceToUser";

import Modal from "react-modal";

function AddEditStaff({ path }) {
  const { staffState } = useStaffContext();

  const params = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [staff_no, setStaff_no] = useState();
  const [phone_number, setPhone_Number] = useState();
  const [email, setEmail] = useState();
  const [faculty_name, setFaculty_name] = useState();
  const [department_name, setDepartment_name] = useState();
  const [position_name, setPosition_name] = useState();
  const [contract_type, setContract_Type] = useState();
  const [isActive, setIsActive] = useState();
  const [start_date, setStart_date] = useState();
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [laptopDetails, setLaptopDetails] = useState({
    make: null,
    model: null,
    serial_no: null,
  });

  const [departmentList, setDepartmentList] = useState(null);
  const [positionList, setPositionList] = useState(null);

  const [formType, setFormType] = useState("add");

  const [showToast, setShowToast] = useState({ isShown: false, type: null, message: null });

  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });

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
    setFaculty_name(userDetails.faculty_name);
    setPosition_name(userDetails.position_name);
    setDepartment_name(userDetails.department_name);
    setContract_Type(userDetails.contract_type);
    setIsActive(userDetails.acc_status);
    setLaptopDetails(userDetails.laptop);
    setStart_date(handleTimeStamp(userDetails.start_date));
    setEndDate(handleTimeStamp(userDetails.end_date));
  };

  //Handle Submit / Update
  const handleSubmit = () => {
    if (!name) {
      return setShowToast({ isShown: true, type: "error", message: "First name must be provided" });
    }

    if (!surname) {
      return setShowToast({ isShown: true, type: "error", message: "Last name must be provided" });
    }

    if (!staff_no) {
      return setShowToast({ isShown: true, type: "error", message: "Staff number must be provided" });
    }

    if (!phone_number) {
      return setShowToast({ isShown: true, type: "error", message: "Phone number must be provided" });
    }

    if (!email) {
      return setShowToast({ isShown: true, type: "error", message: "Email must be provided" });
    }

    if (!isActive) {
      return setShowToast({ isShown: true, type: "error", message: "User status must be provided" });
    }

    if (!faculty_name) {
      return setShowToast({ isShown: true, type: "error", message: "Faculty must be selected" });
    }

    if (!department_name) {
      return setShowToast({ isShown: true, type: "error", message: "Department must be selected" });
    }

    if (!position_name) {
      return setShowToast({ isShown: true, type: "error", message: "Position must be selected" });
    }

    if (!start_date) {
      return setShowToast({ isShown: true, type: "error", message: "Start date must be provided" });
    }

    setError(null);

    /*let end_date;

    if (contract_type !== "Permanent") {
      end_date = endDate;
    } else {
      end_date = null;
    }*/

    const userData = {
      name,
      surname,
      staff_no,
      phone_number,
      email,
      faculty_name,
      department_name,
      position_name,
      contract_type,
      isActive,
      start_date,
      endDate: endDate || null,
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
    setName();
    setSurname();
    setStaff_no();
    setPhone_Number();
    setEmail();
    setFaculty_name();
    setPosition_name();
    setDepartment_name();
    setContract_Type();
    setIsActive();
    setLaptopDetails();
    setStart_date();
    setEndDate();
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
  }, []);

  //handle post Message Response
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "form_submitted") {
        if (event.data.payload.error) {
          setShowToast({ isShow: true, type: "error", message: event.data.payload.message });
          setOpenModal({ isShown: true });
          return;
        }

        setShowToast({ isShow: true, type: "success", message: event.data.payload.message });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
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
            <TextInput label={"Staff Number"} value={staff_no} isDisabled={isDisabled} maxLength={5} setOnChange={setStaff_no} />
          </div>

          <div className="col-span-3">
            <TextInput label={"Phone Number"} value={phone_number} isDisabled={isDisabled} maxLength={10} setOnChange={setPhone_Number} />
          </div>

          <div className="col-span-3">
            <TextInput label={"Email Address"} value={email} isDisabled={isDisabled} maxLength={50} setOnChange={setEmail} />
          </div>

          <div className="col-span-2">
            <FacultySelectInput
              label={"Faculty"}
              value={faculty_name}
              departmentEntitiesList={departmentEntitiesList}
              isDisabled={isDisabled}
              setOnChange={setFaculty_name}
              setDepartmentList={setDepartmentList}
            />
          </div>

          <div className="col-span-2">
            <DepartmentSelectInput
              label={"Department"}
              value={department_name}
              departmentList={departmentList}
              isDisabled={isDisabled}
              setOnChange={setDepartment_name}
              setPositionList={setPositionList}
            />
          </div>

          <div className="col-span-2">
            <PositionSelectInput label={"Position"} value={position_name} positionsList={positionList} isDisabled={isDisabled} setOnChange={setPosition_name} />
          </div>

          <div className="col-span-2">
            <SelectInput label={"Contract Type"} value={contract_type} options={employmentTypes} optionName={"name"} isDisabled={isDisabled} setOnChange={setContract_Type} />
          </div>

          <div className="col-span-1">
            <DateTimePicker label={"Starting Date"} value={start_date} setOnChange={setStart_date} />
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

          <div className="col-span-4">
            {/*<FormLaptopDetails laptopDetails={laptopDetails} />*/}
            <span
              className="link-text"
              onClick={() => {
                setOpenModal({ isShown: true });
              }}
            >
              Assign Laptop
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-5">
            {formType === "add" ? hasPermission("create") && <SubmitButton text={"Submit"} onClick={handleSubmit} /> : hasPermission("edit") && <SubmitButton text={"Update"} onClick={handleSubmit} />}

            <CancelButton onClick={hanldeFormClear} />
          </div>
        </div>
        {error ? <span className="text-sm text-red-500">{error}</span> : ""}
      </div>

      <Modal
        isOpen={openModal.isShown}
        ariaHideApp={false}
        onRequestClose={() => {
          setOpenModal({ isShown: false });
        }}
        style={{
          overlay: { backgroundColor: "rgb(0,0,0,0.2)" },
        }}
        contentLabel=""
        className={`${
          openModal.type === "release" ? "w-[80%] max-h-3/4 bg-white" : openModal.type === "assign" ? "w-[80%] max-h-3/4 bg-white" : "w-[50%] max-h-full bg-white"
        } rounded-md mx-auto mt-14 p-5 overflow-auto`}
      >
        <AssignDeviceToUser
          onCanel={() => {
            setOpenModal({ isShown: false });
          }}
          onSubmit={() => {
            //getDeviceDetails();
            setOpenModal({ isShown: false });
          }}
          userId={staff_no}
          setShowToast={setShowToast}
        />
      </Modal>

      <ToastMessage isShown={showToast.isShown} type={showToast.type} message={showToast.message} onClose={() => setShowToast({ isShown: false })} />
    </div>
  );
}

export default AddEditStaff;
