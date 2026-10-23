import React, { useEffect, useState } from "react";
import { getCoursesList, getCoursesOfFaculty } from "../../../../services/api/academics/Academics";

function CourseSelctInput({ label, course_id, faculty_id, isDisabled, setCourse_id, setCourse_Code }) {
  const [course_name, setCourse_name] = useState();
  const [courses, setCourses] = useState([]);

  const handleSetCourseId = (selectedCourse) => {
    for (let i = 0; i < courses?.length; i++) {
      if (courses[i]?.course_name === selectedCourse) {
        setCourse_id(courses[i].course_id);
        setCourse_Code(courses[i].course_code);
      }
    }
  };

  const handleSetCourseName = (course_id) => {
    for (let i = 0; i < courses?.length; i++) {
      if (courses[i].course_id === course_id) {
        setCourse_name(courses[i]?.course_name);
        setCourse_Code(courses[i].course_code);
      }
    }
  };

  useEffect(() => {
    getCoursesList(setCourses);
  }, []);

  useEffect(() => {
    if (faculty_id) {
      getCoursesOfFaculty(faculty_id, setCourses);
    }
  }, [faculty_id]);

  useEffect(() => {
    if (courses?.length > 0) {
      handleSetCourseName(course_id);
    }
  }, [course_id, courses]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={course_name}
        isDisabled={isDisabled}
        onChange={(e) => {
          setCourse_name(e.target.value);
          handleSetCourseId(e.target.value);
        }}
      >
        <option></option>
        {courses?.map((item) => (
          <option key={item.course_id}>{item.course_name}</option>
        ))}
      </select>
    </div>
  );
}

export default CourseSelctInput;

/**
 import React, { useEffect, useState } from "react";

function CourseSelctInput({ label, value, courseId, options, optionName, isDisabled, setOnChange, onChoose, setCourseCode }) {
  const fnc = (option, name) => {
    return <option key={option.id}>{option?.invoice_number || option?.course_name}</option>;
  };

  const [inputValue, setInputValue] = useState();

  const handleGetId = (selectedItem) => {
    for (let i = 0; i < options?.length; i++) {
      if (options[i]?.course_name === selectedItem) {
        setCourseCode(options[i].course_code);

        return options[i].id;
      }
    }
  };

  const handleGetCourseName = (courseId) => {
    for (let i = 0; i < options?.length; i++) {
      if (options[i].id === courseId) {
        setCourseCode(options[i].course_code);
        console.log(options);
        return setInputValue(options[i].course_name);
      }
    }
  };

  useEffect(() => {
    handleGetCourseName(courseId);
    console.log(courseId);
  }, [courseId]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        disabled={isDisabled}
        value={inputValue}
        onChange={(e) => {
          setOnChange(e.target.value);
          onChoose(handleGetId(e.target.value));
        }}
      >
        <option></option>
        {options?.map((option) => fnc(option, optionName))}
      </select>
    </div>
  );
}

export default CourseSelctInput;

 */
