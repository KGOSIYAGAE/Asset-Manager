import React, { useEffect } from "react";
import SearchInput from "../../../components/inputs/searchInput/SearchInput";
import AddButton from "../../../components/buttons/AddButton";
import RefreshButton from "../../../components/buttons/RefreshButton";
import { useNavigate } from "react-router-dom";

import DataTable from "../../../components/dataGrid/DataTable";
import { studentsTableHeaders } from "../../../utils/TableHeaders";

import { useSearchContext } from "../../../hooks/useSearchContext";
import { useStudentsContext } from "../../../hooks/useStudentsContext";
import axiosInstance from "../../../utils/axiosInstance";

function students({ path }) {
  const { searchState } = useSearchContext();
  const { studentState, studentDispatch } = useStudentsContext();

  const navigate = useNavigate();

  //Hanlde Edit
  const handleEdit = (cellValues) => {
    navigate(`/users/students/edit-student/${cellValues.row.id}`);
  };

  //Hanlde delete
  const handleDelete = () => {};

  //Handle Add
  const handleAdd = () => {
    navigate("/users/students/add-student");
  };

  const studentDummy = [
    {
      id: 0,
      name: "Thabang",
      surname: "Segwete",
      student_no: "201800446",
      phone_number: "0789384743",
      email: "201800446@spu.ac.za",
      faculty: "NAS",
      course: "ICT App Dev",
      course_code: "ICT601",
      registration_date: "05/02/2024",
      isActive: "Active",
      laptop: {
        make_model: "HP 455 G10",
        serial_no: "1H84DSD525",
      },

      createdAt: "",
    },
    {
      id: 1,
      name: "Lebo",
      surname: "Nothabe",
      student_no: "201800447",
      phone_number: "0789384743",
      email: "201800446@spu.ac.za",
      faculty: "EDU",
      course: "Teaching",
      course_code: "ICT601",
      isActive: "In Active",
      laptop: {
        make_model: "HP 255 G9",
        serial_no: "CND3360GHB",
      },

      registration_date: new Date().getDate(),
      createdAt: "",
    },
  ];

  //get All Students
  const getAllStudents = async () => {
    try {
      const response = await axiosInstance.get("/users/students");

      if (response.data && response.data.studentsData) {
        return studentDispatch({ type: "SET_STUDENTS", payload: response.data.studentsData });
      }
    } catch (error) {
      if (error.response && error.response.error) {
        return console.log(error.response.data.message);
      } else {
        return console.log("An unexpected error occured, please try again");
      }
    }
  };

  useEffect(() => {
    getAllStudents();
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
            <SearchInput searchData={studentState.studentsList} />
            <AddButton name={"Add New Student"} handleAdd={handleAdd} />
            <RefreshButton />
          </div>
        </div>
        <DataTable rows={searchState.searchResults ? searchState.searchResults : studentState.studentsList} colHeaders={studentsTableHeaders} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default students;
