import React, { useEffect, useState } from "react";

import SearchInput from "../../../components/inputs/searchInput/SearchInput";
import AddButton from "../../../components/buttons/AddButton";
import RefreshButton from "../../../components/buttons/RefreshButton";
import DataTable from "../../../components/dataGrid/DataTable";
import { staffTableHeaders } from "../../../utils/TableHeaders";

import { useStaffContext } from "../../../hooks/useStaffContext";
import { useSearchContext } from "../../../hooks/useSearchContext";
import { useNavigate } from "react-router-dom";

function Staff({ path }) {
  //Context
  const { staffState, staffDispatch } = useStaffContext();
  const { searchState } = useSearchContext();

  const navigate = useNavigate();

  //Dummy Data
  const data = [
    {
      id: 0,
      name: "kgosi",
      surname: "Motabogi",
      fullname: "",
      staff_no: "11310",
      phone_number: "0789384743",
      department: "ICT",
      position: "Service Desk Operator",
      contract_type: "Permanent",
      isActive: true,
      laptop: [
        {
          make_model: "HP 455 G10",
          serial_no: "1H84DSD525",
        },
      ],
      date_joined: new Date().getDate(),
    },
    {
      id: 1,
      name: "Thabang",
      surname: "segapo",
      fullname: "",
      staff_no: "11312",
      phone_number: "0789384743",
      department: "ICT",
      position: "Service Desk Operator",
      contract_type: "Permanent",
      isActive: true,
      laptop: [
        {
          make_model: "HP 455 G10",
          serial_no: "1H84DSD525",
        },
      ],
      date_joined: new Date().getDate(),
    },
    {
      id: 3,
      name: "kgosi",
      surname: "Segano",
      fullname: "",
      staff_no: "11310",
      phone_number: "0789384743",
      department: "ICT",
      position: "Service Desk Operator",
      contract_type: "Permanent",
      isActive: true,
      laptop: [
        {
          make_model: "HP 455 G10",
          serial_no: "1H84DSD525",
        },
      ],
      date_joined: new Date().getDate(),
    },
  ];

  //Handle delete
  const handleDelete = () => {
    console.log("delete");
  };

  //Handle Edit
  const handleEdit = (cellValues) => {
    localStorage.setItem("clickedUser", cellValues.row.staff_no);
    navigate("/users/staff/Edit-staff");
  };

  useEffect(() => {
    staffDispatch({ type: "SET_STAFF", payload: data });
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Users / Staff /</b> {path}
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md">
        <div className="flex justify-between">
          <span className="heading-text">Staff List</span>
          <div className="flex gap-2">
            <SearchInput searchData={staffState.staffList} />
            <AddButton name={"Add New Staff"} />
            <RefreshButton />
          </div>
        </div>
        <DataTable rows={searchState.searchResults ? searchState.searchResults : staffState.staffList} colHeaders={staffTableHeaders} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Staff;
