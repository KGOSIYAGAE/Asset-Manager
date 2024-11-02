import React, { useEffect } from "react";
import SearchInput from "../../../components/inputs/searchInput/SearchInput";
import AddButton from "../../../components/buttons/AddButton";
import RefreshButton from "../../../components/buttons/RefreshButton";

import DataTable from "../../../components/dataGrid/DataTable";
import { studentsTableHeaders } from "../../../utils/TableHeaders";

import { useSearchContext } from "../../../hooks/useSearchContext";
import { useStudentsContext } from "../../../hooks/useStudentsContext";

function students({ path }) {
  const { searchState } = useSearchContext();
  const { studentState, studentDispatch } = useStudentsContext();

  //Hanlde Edit
  const handleEdit = () => {};

  //Hanlde delete
  const handleDelete = () => {};

  const studentDummy = [
    {
      id: 0,
      name: "Thabang",
      surname: "Segwete",
      student_no: "201800446",
      faculty: "NAS",
      course: "ICT App Dev",
      course_code: "ICT601",
      registration_date: new Date().getDate(),
      createdAt: "",
    },
    {
      id: 1,
      name: "Lebo",
      surname: "Nothabe",
      student_no: "201800446",
      faculty: "NAS",
      course: "ICT App Dev",
      course_code: "ICT601",
      registration_date: new Date().getDate(),
      createdAt: "",
    },
  ];

  useEffect(() => {
    studentDispatch({ type: "SET_STUDENTS", payload: studentDummy });
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Users / Students /</b> {path}
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md">
        <div className="flex justify-between">
          <span className="heading-text">Students List</span>
          <div className="flex gap-2">
            <SearchInput searchData={studentDummy} />
            <AddButton name={"Add New Student"} handleAdd={() => {}} />
            <RefreshButton />
          </div>
        </div>
        <DataTable rows={searchState.searchResults ? searchState.searchResults : studentState.studentsList} colHeaders={studentsTableHeaders} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default students;
