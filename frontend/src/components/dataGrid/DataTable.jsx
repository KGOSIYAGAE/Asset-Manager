import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoMdOpen } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";

function DataTable({ rows, colHeaders, handleEdit, handleDelete, handleViewDetails }) {
  const actionsColumn = [
    {
      field: "Actions",
      renderCell: (cellValues) => {
        return (
          <div className="flex items-center justify-center gap-2 mt-3">
            <div
              className="w-[30px] flex items-center justify-center text-yellow-500 bg-yello-100 p-1 rounded-md border border-yellow-500 cursor-pointer"
              onClick={() => handleViewDetails(cellValues)}
            >
              <CiViewList size={20} />
            </div>
            <div className="w-[30px] flex items-center justify-center text-green-500 bg-green-100 p-1 rounded-md border border-green-500 cursor-pointer" onClick={() => handleEdit(cellValues)}>
              <MdEdit size={20}></MdEdit>
            </div>
            <div className="w-[30px] flex items-center justify-center text-red-500 bg-red-100 p-1 rounded-md border border-red-500 cursor-pointer" onClick={() => handleDelete(cellValues)}>
              <MdDeleteForever size={20}></MdDeleteForever>
            </div>
          </div>
        );
      },
      width: 150,
    },
  ];

  const columns = [...colHeaders, ...actionsColumn];

  return (
    <DataGrid
      sx={{
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },
      }}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 9,
          },
        },
      }}
      pageSizeOptions={[9]}
    />
  );
}

export default DataTable;
