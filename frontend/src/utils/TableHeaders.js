import { handleTimeStamp } from "./dateConverter";

//Staff TableHeaders
export const staffTableHeaders = [
  { field: "staff_no", headerName: "Staff No", width: 100 },
  { field: "name", headerName: "First name", width: 120 },
  { field: "surname", headerName: "Last name", width: 120 },
  { field: "phone_number", headerName: "Phone", width: 100 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "contract_type", headerName: "Employment type", width: 130 },
  { field: "acc_status", headerName: "Status", cellClassName: "active", width: 100 },
  {
    field: "start_date",
    headerName: "Start date",
    width: 100,
    valueGetter: (value) => {
      if (value) {
        return handleTimeStamp(value);
      }
    },
  },
  {
    field: "end_date",
    headerName: "End date",
    width: 100,
    valueGetter: (value) => {
      if (value) {
        return handleTimeStamp(value);
      }
    },
  },
];

//Students TableHeaders
export const studentsTableHeaders = [
  { field: "student_number", headerName: "Student No", width: 100 },
  { field: "name", headerName: "First name", width: 200 },
  { field: "surname", headerName: "Last name", width: 110 },
  { field: "id_number", headerName: "ID Number", width: 125 },
  { field: "phone_number", headerName: "Phone", width: 100 },
  { field: "email", headerName: "Email", width: 180 },
  { field: "acc_status", headerName: "Account status", width: 115 },
  {
    field: "registration_date",
    headerName: "Registration Date",
    width: 140,
    valueGetter: (value) => {
      if (value) {
        return handleTimeStamp(value);
      }
    },
  },
];

//registration_date
//Device TableHeaders
export const devicesTableHeaders = [
  { field: "asset_tag", headerName: "Asset Tag", width: 100 },
  { field: "make", headerName: "Make", width: 100 },
  { field: "model", headerName: "Model", width: 100 },
  { field: "serial_no", headerName: "Serial Number", width: 120 },
  { field: "device_condition", headerName: "Condition", width: 110 },
  { field: "status", headerName: "Status", width: 100 },
  { field: "category", headerName: "Category", width: 100 },
  {
    field: "warranty_end_date",
    headerName: "Warranty End Date",
    width: 140,
    valueGetter: (value) => {
      if (value) {
        return handleTimeStamp(value);
      }
    },
  },
  { field: "user_id", headerName: "Assigned To", width: 110 },
];
