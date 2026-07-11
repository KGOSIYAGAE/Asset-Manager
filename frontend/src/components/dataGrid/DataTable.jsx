import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoMdOpen } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";
import { hasPermission } from "../../utils/getLoggedInUser";

function DataTable({ rows, colHeaders, handleEdit, handleDelete, handleViewDetails, pagationModel, setPagationModel, rowCount }) {
  const actionsColumn = [
    {
      field: "Actions",
      renderCell: (cellValues) => {
        return (
          <div className="flex items-center justify-center gap-2 mt-3">
            {hasPermission("view") && (
              <div
                className="w-[30px] flex items-center justify-center text-orange-500 bg-orange-100 p-1 rounded-md border border-orange-500 cursor-pointer"
                onClick={() => handleViewDetails(cellValues)}
              >
                <CiViewList size={20} />
              </div>
            )}
            {hasPermission("edit") && (
              <div className="w-[30px] flex items-center justify-center text-blue-500 bg-blue-100 p-1 rounded-md border border-blue-500 cursor-pointer" onClick={() => handleEdit(cellValues)}>
                <MdEdit size={20}></MdEdit>
              </div>
            )}

            {hasPermission("delete") && (
              <div className="w-[30px] flex items-center justify-center text-red-600 bg-red-100 p-1 rounded-md border border-red-600 cursor-pointer" onClick={() => handleDelete(cellValues)}>
                <MdDeleteForever size={20}></MdDeleteForever>
              </div>
            )}
          </div>
        );
      },
      width: 150,
    },
  ];

  const columns = [...colHeaders, ...actionsColumn];

  useEffect(() => {
    console.log();
  }, []);

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
          paginationModel: pagationModel,
        },
      }}
      rowCount={rowCount}
      paginationMode="server"
      paginationMode={pagationModel}
      onPaginationModelChange={setPagationModel}
      pageSizeOptions={[8]}
    />
  );
}

export default DataTable;
