import React, { useEffect, useState } from "react";

import SearchInput from "../../../components/inputs/searchInput/SearchInput";
import AddButton from "../../../components/buttons/AddButton";
import RefreshButton from "../../../components/buttons/RefreshButton";
import DataTable from "../../../components/dataGrid/DataTable";
import { staffTableHeaders } from "../../../utils/TableHeaders";
import { useStaffContext } from "../../../hooks/useStaffContext";
import { useSearchContext } from "../../../hooks/useSearchContext";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../../components/toastMessage/ToastMessage";
import { getStaffData, deleteStaff } from "../../../services/api/staff/StaffApi";
import { useToastContext } from "../../../hooks/useToastContext";

function Staff({ path }) {
  //Context
  const { staffState, staffDispatch } = useStaffContext();
  const { searchState } = useSearchContext();
  const { toastState, toastDispatch } = useToastContext();

  const navigate = useNavigate();

  // Toast Close
  const handleToastClose = () => {
    toastDispatch({ type: "CLOSE", payload: { isShown: false, type: "", message: null } });
  };

  //Dummy Data
  const data = [
    {
      id: 0,
      name: "kgosi",
      surname: "Motabogi",
      staff_no: "11310",
      phone_number: "0789384743",
      email: "ccccc@gmail.com",
      department: "ICT",
      position: "Service Desk Operator",
      contract_type: "Permanent",
      isActive: "Active",
      laptop: {
        make_model: "HP 455 G10",
        serial_no: "1H84DSD525",
      },

      date_joined: new Date().getDate(),
    },
    {
      id: 1,
      name: "Thabang",
      surname: "segapo",
      staff_no: "11312",
      phone_number: "0789384743",
      email: "ccccc@gmail.com",
      department: "NAS",
      position: "Service Desk Operator",
      contract_type: "Permanent",
      isActive: "In Active",
      laptop: {
        make_model: "HP 455 G10",
        serial_no: "1H84DSD525",
      },

      date_joined: new Date().getDate(),
    },
    {
      id: 3,
      name: "kgosi",
      surname: "Segano",
      staff_no: "11315",
      phone_number: "0789384743",
      email: "ccccc@gmail.com",
      department: "EDU",
      position: "Lecture",
      contract_type: "Contract",
      isActive: "Active",
      laptop: null,

      date_joined: new Date().getDate(),
    },
  ];

  //Handle delete
  const handleDelete = (cellValues) => {
    //API CALL
    deleteStaff(cellValues.row.staff_no, toastDispatch);
  };

  //Handle Edit
  const handleEdit = (cellValues) => {
    navigate(`/users/staff/edit-staff/${cellValues.row.id}`);
  };

  //Handle Add
  const handleAdd = () => {
    navigate("/users/staff/add-staff");
  };

  useEffect(() => {
    //API CALL ON RENDER
    getStaffData(staffDispatch);
  }, []);

  return (
    <div className="h-svh flex flex-col p-3 gap-3 bg-zinc-50">
      <span className="text-sm">
        <b>Users / Staff /</b> {path}
      </span>
      <div className="flex flex-col bg-white p-3 gap-5 rounded-md shadow-md ">
        <div className="flex justify-between">
          <span className="heading-text">Staff List</span>
          <div className="flex gap-2">
            <SearchInput searchData={staffState.staffList} />
            <AddButton name={"Add New Staff"} handleAdd={handleAdd} />
            <RefreshButton />
          </div>
        </div>
        <DataTable rows={searchState.searchResults ? searchState.searchResults : staffState.staffList} colHeaders={staffTableHeaders} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
      <ToastMessage isShown={toastState.isShown} type={toastState.type} message={toastState.message} onClose={handleToastClose} />
    </div>
  );
}

export default Staff;
