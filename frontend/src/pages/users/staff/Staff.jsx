import React, { useEffect, useState } from "react";

import SearchInput from "../../../components/inputs/searchInput/SearchInput";
import AddButton from "../../../components/buttons/AddButton";
import RefreshButton from "../../../components/buttons/RefreshButton";
import DataTable from "../../../components/dataGrid/DataTable";
import { staffTableHeaders } from "../../../utils/TableHeaders";

import { useStaffContext } from "../../../hooks/useStaffContext";
import { useSearchContext } from "../../../hooks/useSearchContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

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

  //Handle getData API CALL
  const getStaffData = async () => {
    try {
      const response = await axiosInstance.get("/users/staff/");

      if (response.data && response.data.staffData) {
        staffDispatch({ type: "SET_STAFF", payload: response.data.staffData });
      }
    } catch (error) {
      if (error.response.data && error.response.data.error) {
        return console.log(error.response.data.message);
      } else {
        return console.log("An unexpected error occured, please try again");
      }
    }
  };

  //Hanlde deleteStaff API
  const deleteStaff = async (staff_no) => {
    try {
      if (!staff_no) {
        return console.log("Staff number must be provided");
      }
      const response = await axiosInstance.delete("/users/staff/delete-staff/" + staff_no);

      if (response.data && !response.error) {
        return console.log(response.data.massage);
      }
    } catch (error) {
      if (error.response.data & error.response.error) {
        return console.log(error.response.message);
      } else {
        return console.log("An unexpected error occured, please try again");
      }
    }
  };

  //Handle delete
  const handleDelete = (cellValues) => {
    deleteStaff(cellValues.row.staff_no);
    getStaffData();
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
    getStaffData();
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
    </div>
  );
}

export default Staff;
