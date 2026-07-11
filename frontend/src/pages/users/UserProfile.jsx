import React, { useEffect, useState } from "react";
import TextInput from "../../components/inputs/textInput/TextInput";

import { useStaffContext } from "../../hooks/useStaffContext";

import { useNavigate, useParams } from "react-router-dom";
import DepartmentSelectInput from "../../components/inputs/selectInputs/departmentSelectInput/DepartmentSelectInput";
import PositionSelectInput from "../../components/inputs/selectInputs/positionSelectInput/PositionSelectInput";
import { employmentTypes } from "../../utils/employmentTypeList";
import DateTimePicker from "../../components/inputs/dateTimePicker/DateTimePicker";
import FormUserStatus from "../../components/cards/formUserStatus/FormUserStatus";
import SelectInput from "../../components/inputs/selectInputs/selectInput/SelectInput";
import { getLoggedInUser, hasPermission } from "../../utils/getLoggedInUser";
import SubmitButton from "../../components/buttons/SubmitButton";
import CancelButton from "../../components/buttons/CancelButton";
import { getUser, updateStaff } from "../../services/api/staff/Staff.Api";
import { handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { MdPerson } from "react-icons/md";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import { changePassword } from "../../services/api/admin/Admin.Api";
import { departmentEntitiesList, departmentsList } from "../../utils/departmentList";
import { positionList } from "../../utils/positionsList";
import FacultySelectInput from "../../components/inputs/selectInputs/facultySelectInput/FacultySelectInput";

function UserProfile({ path }) {
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

  const [oldPassowrd, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

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
    setPosition_name(userDetails.position_name);
    setFaculty_name(userDetails.faculty_name);
    setDepartment_name(userDetails.department_name);
    setContract_Type(userDetails.contract_type);
    setIsActive(userDetails.acc_status);
    setLaptopDetails(userDetails.laptop);
    setStart_date(handleTimeStampToText(userDetails.start_date));
    setEndDate(handleTimeStampToText(userDetails.end_date));
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

    if (!faculty_name) {
      return setShowToast({ isShown: true, type: "", message: "Faculty must be provided" });
    }

    if (!department_name) {
      return setShowToast({ isShown: true, type: "", message: "Department must be provided" });
    }

    if (!position_name) {
      return setShowToast({ isShown: true, type: "", message: "Position must be provided" });
    }

    if (!isActive) {
      return setShowToast({ isShown: true, type: "", message: "User status must be provided" });
    }

    if (!start_date) {
      return setShowToast({ isShown: true, type: "", message: "Start date must be provided" });
    }

    setError(null);

    let end_date;

    /*if (contract_type !== "Permanent") {
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
    getUserDetails();
  };

  //Password Form Clear
  const hanldePasswordFormClear = () => {
    setOldPassword();
    setNewPassword();
    setConfirmPassword();
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

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Users </b> {path}
      </span>
      <div className="flex justify-between">
        <span className="heading-text">Account Settings</span>
      </div>
      <div className="grid grid-cols-2 gap-5 mb-14 overflow-x-auto">
        {/* */}
        <div className=" flex flex-col bg-white p-2 gap-5 border rounded-md shadow-md ">
          <span className="heading-text">Profile Details</span>
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-1">
              <TextInput label={"First Name"} value={name} isDisabled={isDisabled} maxLength={50} setOnChange={setName} />
            </div>
            <div className="col-span-1">
              <TextInput label={"Last Name"} value={surname} isDisabled={isDisabled} maxLength={50} setOnChange={setSurname} />
            </div>
            <div className="col-span-2">
              <TextInput label={"Email"} value={email} isDisabled={isDisabled} maxLength={50} setOnChange={setEmail} />
            </div>
            <div className="col-span-1">
              <TextInput label={"Phone Number"} value={phone_number} isDisabled={isDisabled} maxLength={50} setOnChange={setPhone_Number} />
            </div>
            <div className="col-span-1">
              <TextInput label={"Staff Number"} value={staff_no} isDisabled={isDisabled} maxLength={50} setOnChange={setStaff_no} />
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
              <PositionSelectInput label={"Position"} value={position_name} department_name={department_name} positionsList={positionList} isDisabled={isDisabled} setOnChange={setPosition_name} />
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
          </div>
          <div className="flex justify-end">
            <div className="flex gap-5">
              <SubmitButton text={"Save"} onClick={handleSubmit} />

              <CancelButton onClick={hanldeFormClear} />
            </div>
          </div>
        </div>
        {/* */}
        <div className=" flex flex-col bg-white p-5 gap-5 border rounded-md shadow-md">
          <span className="heading-text">Your Photo</span>
          <div className="flex items-center gap-5">
            <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full border">
              <MdPerson size={70} className="text-zinc-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">
                {(() => {
                  const { fullName } = getLoggedInUser();
                  return fullName;
                })()}
              </span>
              <span>{position_name}</span>
            </div>
          </div>
        </div>
        {/* */}
        <div className=" flex flex-col bg-white p-5 gap-5 border rounded-md shadow-md">
          <span className="heading-text">Change Password</span>
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <div className="text-input">
                <span className="w-fit text-zinc-500 -mt-5 bg-white">Current Password</span>
                <input
                  type={"password"}
                  className="outline-none"
                  name="input-text"
                  value={oldPassowrd}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-input">
                <span className="w-fit text-zinc-500 -mt-5 bg-white">Current Password</span>
                <input
                  type={"password"}
                  className="outline-none"
                  name="input-text"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-span-2">
              <div className={`text-input ${newPassword === confirmPassword ? "" : "border-2 border-red-400"}`}>
                <span className={`w-fit -mt-5 bg-white ${newPassword === confirmPassword ? "text-zinc-500" : "text-red-400"}`}>Current Password</span>
                <input
                  type={"password"}
                  className="outline-none"
                  name="input-text"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex gap-5">
              {newPassword === confirmPassword ? (
                <SubmitButton
                  text={"Save"}
                  onClick={() => {
                    changePassword(email, oldPassowrd, newPassword, setShowToast);
                  }}
                />
              ) : (
                ""
              )}
              <CancelButton onClick={hanldePasswordFormClear} />
            </div>
          </div>
        </div>
      </div>
      <ToastMessage isShown={showToast.isShown} type={showToast.type} message={showToast.message} onClose={handleToastClose} />
    </div>
  );
}

export default UserProfile;
