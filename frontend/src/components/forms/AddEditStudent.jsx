import React from "react";
import { useState, useEffect } from "react";

import { courseList } from "../../utils/course";

import { useStudentsContext } from "../../hooks/useStudentsContext";
import { useParams } from "react-router-dom";
import TextInput from "../inputs/textInput/TextInput";
import SelectInput from "../inputs/selectInputs/selectInput/SelectInput";
import FormLaptopDetails from "../cards/formLaptopDetails/FormLaptopDetails";
import FormUserStatus from "../cards/formUserStatus/FormUserStatus";
import SubmitButton from "../buttons/SubmitButton";
import CancelButton from "../buttons/CancelButton";
import axiosInstance from "../../utils/axiosInstance";
import DateTimePicker from "../inputs/dateTimePicker/DateTimePicker";
import ToastMessage from "../toastMessage/ToastMessage";
import { addStudent, getStudent, updateStudent } from "../../services/api/students/Students.Api";
import { getAllCourses } from "../../services/api/courses/course.Api";
import OptionsSelctInput from "../inputs/selectInputs/CourseSelctInput/CourseSelctInput";
import CourseSelctInput from "../inputs/selectInputs/CourseSelctInput/CourseSelctInput";
import { handleTimeStamp } from "../../utils/dateConverter";
import { hasPermission } from "../../utils/getLoggedInUser";
import FacultySelectInput from "../inputs/selectInputs/facultySelectInput/FacultySelectInput";
import { departmentsList } from "../../utils/departmentList";

function AddEditStudent({ path }) {
  const { studentState } = useStudentsContext();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [email, setEmail] = useState("");
  const [faculty_name, setFaculty_name] = useState("");
  const [course_code, setCourse_Code] = useState("");
  const [course, setCourse] = useState("");
  const [isActive, setIsActive] = useState("");
  const [laptopDetails, setLaptopDetails] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [registration_date, setRegistration_Date] = useState("");
  const [showToast, setShowToast] = useState({ isShown: false, type: null, message: null });
  const [formType, setFormType] = useState("add");

  const params = useParams();

  //Form clear
  const clearForm = () => {
    setName("");
    setSurname("");
    setStudentNumber("");
    setIdNumber("");
    setPhone_Number("");
    setEmail("");
    setFaculty("");
    setCourse("");
    setCourse_Code("");
    setIsActive("");
    setRegistration_Date("");
  };

  //Form submit
  const handleSubmit = () => {
    if (!name) {
      return setShowToast({ isShown: true, type: "error", message: "First name must be provided" });
    }

    if (!surname) {
      return setShowToast({ isShown: true, type: "error", message: "Last name must be provided" });
    }

    if (!studentNumber) {
      return setShowToast({ isShown: true, type: "error", message: "Student number must be provided" });
    }

    if (!idNumber) {
      return setShowToast({ isShown: true, type: "error", message: "ID number must be provided" });
    }

    if (!phone_number) {
      return setShowToast({ isShown: true, type: "error", message: "Phone number must be provided" });
    }

    if (!email) {
      return setShowToast({ isShown: true, type: "error", message: "Email must be provided" });
    }

    const studentData = {
      name,
      surname,
      studentNumber,
      idNumber,
      phone_number,
      faculty_name,
      course,
      course_code,
      email,
      isActive,
      registration_date,
    };

    if (formType === "add") {
      console.log("add");
      addStudent(studentData, setShowToast);
      clearForm();
    } else {
      console.log("update");
      const { student_no } = params;
      if (student_no) {
        updateStudent(student_no, studentData, setShowToast);
      }
    }
  };

  //Set form data
  const setFormData = (studentData) => {
    setFormType("edit");
    setName(studentData.name);
    setSurname(studentData.surname);
    setIdNumber(studentData.id_number);
    setStudentNumber(studentData.student_number);
    setPhone_Number(studentData.phone_number);
    setEmail(studentData.email);
    setFaculty_name(studentData.faculty_name);
    setCourse(studentData.course_name);
    setCourse_Code(studentData.course_code);
    setIsActive(studentData.acc_status);
    setLaptopDetails(studentData.laptop);
    setRegistration_Date(handleTimeStamp(studentData.registration_date));
  };

  //Get User API Call
  const getSelectedUser = () => {
    const { student_no } = params;
    if (student_no) {
      getStudent(student_no, setFormData);
    }
  };

  //Choose user status
  const handleUserstatus = (results) => {
    setIsActive(results);
  };

  useEffect(() => {
    getSelectedUser();
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Users / Student /</b> {path}
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md">
        <div className="flex justify-between">
          <span className="heading-text">Student Details</span>
        </div>
        <div className="grid grid-cols-6 gap-8 pt-5">
          <div className=" col-span-2">
            <TextInput label={"First Name"} value={name} isDisabled={isDisabled} maxLength={50} setOnChange={setName} />
          </div>

          <div className=" col-span-2">
            <TextInput label={"Last Name"} value={surname} isDisabled={isDisabled} maxLength={50} setOnChange={setSurname} />
          </div>

          <div className=" col-span-2">
            <TextInput label={"Student Number"} value={studentNumber} isDisabled={isDisabled} maxLength={9} setOnChange={setStudentNumber} />
          </div>

          <div className=" col-span-1">
            <TextInput label={"ID Number"} value={idNumber} isDisabled={isDisabled} maxLength={13} setOnChange={setIdNumber} />
          </div>

          <div className=" col-span-1">
            <TextInput label={"Phone Number"} value={phone_number} isDisabled={isDisabled} maxLength={10} setOnChange={setPhone_Number} />
          </div>

          <div className=" col-span-3">
            <TextInput label={"Email Address"} value={email} isDisabled={isDisabled} maxLength={50} setOnChange={setEmail} />
          </div>

          <div className="col-span-2">
            <FacultySelectInput label={"Faculty"} value={faculty_name} departmentList={departmentsList} isDisabled={isDisabled} setOnChange={setFaculty_name} />
          </div>

          <CourseSelctInput label={"Course"} value={course} faculty={faculty_name} courseList={courseList} isDisabled={isDisabled} setOnChange={setCourse} setCourseCode={setCourse_Code} />

          <div className=" col-span-2">
            <TextInput label={"Course Code"} value={course_code} isDisabled={true} setOnChange={() => {}} />
          </div>

          <div className="col-span-1">
            <DateTimePicker label={"Registration Date"} value={registration_date} setOnChange={setRegistration_Date} />
          </div>

          <div className="col-span-2">
            <FormUserStatus isActive={isActive} isDisabled={isDisabled} handleUserstatus={handleUserstatus} />
          </div>

          <div className="col-span-4">
            <FormLaptopDetails laptopDetails={laptopDetails} />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-5">
            {formType === "add" ? hasPermission("create") && <SubmitButton text={"Submit"} onClick={handleSubmit} /> : hasPermission("edit") && <SubmitButton text={"Update"} onClick={handleSubmit} />}
            <CancelButton />
          </div>
        </div>

        <ToastMessage
          isShown={showToast.isShown}
          type={showToast.type}
          message={showToast.message}
          onClose={() => {
            setShowToast({ isShown: false });
          }}
        />
      </div>
    </div>
  );
}
export default AddEditStudent;
