import React, { useEffect, useState } from "react";
import CancelButton from "../../buttons/CancelButton";
import SubmitButton from "../../buttons/SubmitButton";
import TextInput from "../../inputs/textInput/TextInput";
//import { createDepartment, updateDepartment } from "../../../services/api/organization/jobDetails";
import FacultySelectInput from "../../inputs/selectInputs/facultySelectInput/FacultySelectInput";
import { createCourses } from "../../../services/api/academics/Academics";
import { useToast } from "../../../context/ToastContext";

function CreateCourse({ onCanel, onSubmit, modalType, modalData }) {
  const [courseName, setCourseName] = useState();
  const [course_code, setCourse_code] = useState();
  const [faculty_id, setFaculty_id] = useState();

  const { showToast } = useToast();

  useEffect(() => {
    if (modalData) {
      setCourseName(modalData.course_name);
      setCourse_code(modalData.course_code);
      setFaculty_id(modalData.faculty_id);
    }
  }, [modalData]);

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-2 ">
        <span className="font-semibold p-2">Add Course</span>
        <div className="flex flex-col gap-5">
          {/** */}
          <div>
            <TextInput label={"Course Name"} value={courseName} isDisabled={false} maxLength={255} setOnChange={setCourseName} type={"text"} />
          </div>
          <div>
            <TextInput label={"Course Code"} value={course_code} isDisabled={false} maxLength={255} setOnChange={setCourse_code} type={"text"} />
          </div>
          <div>
            <FacultySelectInput label={"Faculty Name"} faculty_id={faculty_id} isDisabled={false} setFaculty_id={setFaculty_id} />
          </div>
          <div className="flex justify-end p-3 gap-8">
            <CancelButton onClick={onCanel} />
            {modalType && modalType === "add-course" ? (
              <SubmitButton
                text={"Add Course"}
                onClick={() => {
                  createCourses({ course_name: courseName, course_code: course_code, faculty_id: faculty_id }, showToast);
                  onSubmit();
                }}
              />
            ) : (
              <SubmitButton
                text={"Update Course"}
                onClick={() => {
                  updateDepartment(department_id, { department_name: departmentName, faculty_id: faculty_id }, showToast);
                  onSubmit();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
