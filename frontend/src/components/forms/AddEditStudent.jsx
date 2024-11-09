import React from "react";
import { useState, useEffect } from "react";

import { facultyCourse } from "../../utils/course";

import { useStudentsContext } from "../../hooks/useStudentsContext";
import { useParams } from "react-router-dom";
import TextInput from "../inputs/textInput/TextInput";
import SelectInput from "../inputs/selectInput/SelectInput";
import FormLaptopDetails from "../cards/formLaptopDetails/FormLaptopDetails";
import FormUserStatus from "../cards/formUserStatus/FormUserStatus";
import SubmitButton from "../buttons/SubmitButton";
import CancelButton from "../buttons/CancelButton";

function AddEditStudent({ path }) {
  const { studentState } = useStudentsContext();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [student_no, setStudent_no] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [email, setEmail] = useState("");
  const [faculty, setFaculty] = useState("");
  const [course_code, setCourse_Code] = useState("");
  const [course, setCourse] = useState("");
  const [isActive, setIsActive] = useState("");
  const [laptopDetails, setLaptopDetails] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const [error, setError] = useState(null);

  const [courseList, setCourseList] = useState([]);

  const params = useParams();

  //Form submit
  const handleSubmit = () => {
    if (!name) {
      return setError("First name must be provided");
    }

    if (!surname) {
      return setError("Last name must be provided");
    }

    if (!student_no) {
      return setError("Student number must be provided");
    }

    if (!phone_number) {
      return setError("Phone number must be provided");
    }

    if (!email) {
      return setError("Email must be provided");
    }

    setError(null);

    const studentData = [
      {
        name,
        surname,
        student_no,
        phone_number,
        email,
        faculty,
        course,
        course_code,
        isActive,
        laptop: {
          make_model: "",
          serial_no: "",
        },
      },
    ];

    console.log(studentData);
  };

  //Set form data
  const setFormData = () => {
    const selectedId = params.id;

    if (selectedId) {
      for (let i = 0; i < studentState.studentsList.length; i++) {
        if (selectedId == studentState.studentsList[i].id) {
          setName(studentState.studentsList[i].name);
          setSurname(studentState.studentsList[i].surname);
          setStudent_no(studentState.studentsList[i].student_no);
          setPhone_Number(studentState.studentsList[i].phone_number);
          setEmail(studentState.studentsList[i].email);
          setFaculty(studentState.studentsList[i].faculty);
          setCourse(studentState.studentsList[i].course);
          setCourse_Code(studentState.studentsList[i].course_code);
          setIsActive(studentState.studentsList[i].isActive);
          setLaptopDetails(studentState.studentsList[i].laptop);
          setIsDisabled(true);
        }
      }
      return;
    }
  };

  //Populate Course based on faculty
  const getCourseName = (facultySelected) => {
    switch (facultySelected) {
      case "NAS":
        setCourseList([...facultyCourse[0].coursesOfferd]);
        setCourse(facultyCourse[0].coursesOfferd[0].course_name);
        setCourse_Code(facultyCourse[0].coursesOfferd[0].course_code);
        break;
      case "EDU":
        setCourseList([...facultyCourse[1].coursesOfferd]);
        setCourse(facultyCourse[1].coursesOfferd[0].course_name);
        setCourse_Code(facultyCourse[1].coursesOfferd[0].course_code);
        break;
      case "EMS":
        setCourseList([...facultyCourse[2].coursesOfferd]);
        setCourse(facultyCourse[2].coursesOfferd[0].course_name);
        setCourse_Code(facultyCourse[2].coursesOfferd[0].course_code);
        break;
      case "HUM":
        setCourseList([...facultyCourse[3].coursesOfferd]);
        setCourse(facultyCourse[3].coursesOfferd[0].course_name);
        setCourse_Code(facultyCourse[3].coursesOfferd[0].course_code);
        break;
      default:
        return setCourseList([]);
    }
  };

  //Populate course code for each course dynamically
  const getCourseCode = (courseName) => {
    for (let i = 0; i < courseList.length; i++) {
      if (courseName === courseList[i].course_name) {
        return setCourse_Code(courseList[i].course_code);
      }
    }
  };

  //Choose user status
  const handleUserstatus = (results) => {
    setIsActive(results);
  };

  useEffect(() => {
    setFormData();
    getCourseName("NAS");
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
            <TextInput label={"First Name"} value={name} isDisabled={isDisabled} setOnChange={setName} />
          </div>

          <div className=" col-span-2">
            <TextInput label={"Last Name"} value={surname} isDisabled={isDisabled} setOnChange={setSurname} />
          </div>

          <div className=" col-span-2">
            <TextInput label={"Student Number"} value={student_no} isDisabled={isDisabled} setOnChange={setStudent_no} />
          </div>

          <div className=" col-span-3">
            <TextInput label={"Phone Number"} value={phone_number} isDisabled={isDisabled} setOnChange={setPhone_Number} />
          </div>

          <div className=" col-span-3">
            <TextInput label={"Email Address"} value={email} isDisabled={isDisabled} setOnChange={setEmail} />
          </div>

          <SelectInput label={"Faculty"} value={faculty} options={facultyCourse} optionName={"faculty_name"} isDisabled={isDisabled} setOnChange={setFaculty} onChoose={getCourseName} />

          <SelectInput label={"Course"} value={course} options={courseList} optionName={"course_name"} isDisabled={isDisabled} setOnChange={setCourse} onChoose={getCourseCode} />

          <div className=" col-span-2">
            <TextInput label={"Course Code"} value={course_code} isDisabled={true} setOnChange={() => {}} />
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
export default AddEditStudent;
