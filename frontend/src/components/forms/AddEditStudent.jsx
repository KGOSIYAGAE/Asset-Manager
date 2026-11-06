import React from "react";
import { useState, useEffect } from "react";

import { courseList, facultiesDataList } from "../../utils/course";

import { useStudentsContext } from "../../hooks/useStudentsContext";
import { useNavigate, useParams } from "react-router-dom";
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
import { addOneDay, handleTimeStamp, handleTimeStampToText } from "../../utils/dateConverter";
import { hasPermission } from "../../utils/getLoggedInUser";
import FacultySelectInput from "../inputs/selectInputs/facultySelectInput/FacultySelectInput";
import { departmentsList } from "../../utils/departmentList";
import AssignDeviceToUser from "../cards/issueDevice/AssignDeviceToUser";
import Modal from "react-modal";
import StudentFacultySelectInput from "../inputs/selectInputs/studentFacultySelectInput/StudentFacultySelectInput";
import { socket } from "../../utils/socket";
import { useToast } from "../../context/ToastContext";

function AddEditStudent({ path }) {
  const { showToast } = useToast();

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [studentNumber, setStudentNumber] = useState();
  const [idNumber, setIdNumber] = useState();
  const [phone_number, setPhone_Number] = useState();
  const [email, setEmail] = useState();

  const [faculty_id, setFaculty_id] = useState();
  const [faculty_name, setFaculty_name] = useState(null);

  const [course_id, setCourse_id] = useState();
  const [course_code, setCourse_Code] = useState();
  const [course, setCourse] = useState();

  const [isActive, setIsActive] = useState();
  const [laptopDetails, setLaptopDetails] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [registration_date, setRegistration_Date] = useState();
  //const [showToast, setShowToast] = useState({ isShow: false, type: null, message: null });
  const [courseList, setCourseList] = useState(null);

  const [formType, setFormType] = useState("add");

  const [openModal, setOpenModal] = useState({ isShown: false, type: null, data: null });

  const params = useParams();

  const navigate = useNavigate();

  //Form clear
  const clearForm = () => {
    setName();
    setSurname();
    setStudentNumber();
    setIdNumber();
    setPhone_Number();
    setEmail();
    setCourse_Code();
    setIsActive();
    setRegistration_Date();
  };

  //Form submit
  const handleSubmit = () => {
    if (!name) {
      return showToast("First name must be provided", "error");
    }

    if (!surname) {
      return showToast("Last name must be provided", "error");
    }

    if (!studentNumber) {
      return showToast("Student number must be provided", "error");
    }

    if (!idNumber) {
      return showToast("ID number must be provided", "error");
    }

    if (!phone_number) {
      return showToast("Phone number must be provided", "error");
    }

    if (!email) {
      return showToast("Email must be provided", "error");
    }

    if (!faculty_id) {
      return showToast("Faculty must be selected", "error");
    }

    if (!course_id) {
      return showToast("Course must be selected", "error");
    }

    const studentData = {
      name,
      surname,
      studentNumber,
      idNumber,
      phone_number,
      course_id,
      email,
      isActive,
      registration_date,
    };

    if (formType === "add") {
      addStudent(studentData, showToast);

      setTimeout(() => {
        navigate(`/users/students`);
      }, 3000);

      clearForm();
    } else {
      const { student_no } = params;
      if (student_no) {
        updateStudent(student_no, studentData, showToast);

        setTimeout(() => {
          navigate(`/users/students`);
        }, 3000);
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
    setIsActive(studentData.acc_status);
    setLaptopDetails(studentData.laptop);
    setRegistration_Date(studentData.registration_date);

    setFaculty_id(studentData.faculty_id);
    setCourse_id(studentData.course_id);
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

  //Navigate to student profile
  const viewStudentProfile = () => {
    const { student_no } = params;
    if (student_no) {
      return navigate(`/users/students/student-details/${student_no}`);
    }
  };

  //handle post Message Response
  useEffect(() => {
    const handleMessage = (event) => {
      console.log(event);
      if (event.data.type === "form_submitted") {
        if (event.data.payload.error) {
          showToast(event.data.payload.message, "error");
          return;
        }

        showToast(event.data.payload.message, "success");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    getSelectedUser();
  }, []);

  useEffect(() => {
    getSelectedUser();
  }, []);

  useEffect(() => {
    if (!socket.connected) {
      console.log("not connected");
      socket.connect();
    }

    // Debug check: Verify the laptop is physically hearing events
    console.log("Laptop listening for signature_saved event...");

    socket.on("signature_saved", (image) => {
      //setSignature(image.image);

      showToast("Device issue, has been sent for approval", "success");

      //getSelectedUser();
      socket.disconnect();
      navigate(`/users/students/student-details/${studentNumber}`);
    });

    return () => {
      socket.off("signature_saved");
    };
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

          <div className="col-span-3 lg:col-span-2">
            <FacultySelectInput label={"Faculty"} faculty_id={faculty_id} isDisabled={isDisabled} setFaculty_id={setFaculty_id} />
          </div>

          {/*<div className="col-span-2">
            <StudentFacultySelectInput
              label={"Faculty"}
              value={faculty_name}
              facultiesDataList={facultiesDataList}
              isDisabled={isDisabled}
              setOnChange={setFaculty_name}
              setCourseList={setCourseList}
            />
          </div>*/}

          <CourseSelctInput label={"Course"} course_id={course_id} faculty_id={faculty_id} isDisabled={isDisabled} setCourse_id={setCourse_id} setCourse_Code={setCourse_Code} />

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
            <CancelButton
              onClick={() => {
                navigate(`/users/students`);
              }}
            />
          </div>
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
            userId={studentNumber}
          />
        </Modal>
      </div>
    </div>
  );
}
export default AddEditStudent;
