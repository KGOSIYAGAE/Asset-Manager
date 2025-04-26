//Staff TableHeaders
export const staffTableHeaders = [
  { field: "staff_no", headerName: "Staff No", width: 70 },
  { field: "name", headerName: "First name", width: 100 },
  { field: "surname", headerName: "Last name", width: 100 },
  { field: "phone_number", headerName: "Phone", width: 100 },
  { field: "department", headerName: "Department", width: 95 },
  { field: "position", headerName: "Job title", width: 170 },
  { field: "contract_type", headerName: "Employment type", width: 130 },
  { field: "isActive", headerName: "Status", cellClassName: "active", width: 70 },
  { field: "dateJoined", headerName: "Date joined", width: 100 },
  { field: "endDate", headerName: "End date", width: 120 },
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
  { field: "registration_date", headerName: "Registration Date", width: 140 },
];

//Device TableHeaders
export const devicesTableHeaders = [
  { field: "asset_tag", headerName: "Asset Tag", width: 100 },
  { field: "make", headerName: "Make", width: 100 },
  { field: "model", headerName: "Model", width: 100 },
  { field: "serial_no", headerName: "Serial Number", width: 120 },
  { field: "device_condition", headerName: "Condition", width: 110 },
  { field: "status", headerName: "Status", width: 100 },
  { field: "category", headerName: "Category", width: 100 },
  { field: "warranty_end_date", headerName: "Warranty End Date", width: 140 },
  { field: "user_id", headerName: "Assigned To", width: 110 },
];
