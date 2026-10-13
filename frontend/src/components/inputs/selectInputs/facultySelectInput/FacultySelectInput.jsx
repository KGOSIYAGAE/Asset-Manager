import React, { useEffect, useState } from "react";
import { getFaculties, getFacultiesList } from "../../../../services/api/organization/Organization";

function FacultySelectInput({ label, faculty_id, isDisabled, setFaculty_id }) {
  const [faculty_name, setFaculty_name] = useState();
  const [faculties, setFaculties] = useState();

  const handleSetFacultyId = (selectedFaculty) => {
    const foundFaculty = faculties?.find((faculty) => faculty.faculty_name === selectedFaculty);
    if (foundFaculty) {
      setFaculty_id(foundFaculty.faculty_id);
    }
  };

  const handleSetFacultyName = (faculty_id) => {
    const foundFaculty = faculties?.find((faculty) => faculty.faculty_id === faculty_id);

    if (foundFaculty) {
      setFaculty_name(foundFaculty.faculty_name);
    }
  };

  useEffect(() => {
    getFacultiesList(setFaculties);
  }, []);

  useEffect(() => {
    if (faculties?.length > 0) {
      handleSetFacultyName(faculty_id);
    }
  }, [faculty_id, faculties]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={faculty_name}
        isDisabled={isDisabled}
        onChange={(e) => {
          setFaculty_name(e.target.value);
          handleSetFacultyId(e.target.value);
        }}
      >
        <option></option>
        {faculties?.map((item) => (
          <option key={item.faculty_id}>{item.faculty_name}</option>
        ))}
      </select>
    </div>
  );
}

export default FacultySelectInput;
