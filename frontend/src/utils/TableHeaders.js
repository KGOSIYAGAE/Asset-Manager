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
  { field: "student_no", headerName: "Student No", width: 100 },
  { field: "name", headerName: "First name", width: 100 },
  { field: "surname", headerName: "Last name", width: 100 },
  { field: "phone_number", headerName: "Phone", width: 110 },
  { field: "faculty", headerName: "Faculty", width: 90 },
  { field: "course", headerName: "Course", width: 200 },
  { field: "course_code", headerName: "Course Code", width: 110 },
  { field: "isActive", headerName: "Account status", width: 120 },
  { field: "registration_date", headerName: "Registration Date", width: 150 },
];

//Device TableHeaders
export const devicesTableHeaders = [
  { field: "assetTag", headerName: "Asset Tag", width: 100 },
  { field: "make", headerName: "Make", width: 100 },
  { field: "model", headerName: "Model", width: 100 },
  { field: "serial_no", headerName: "Serial Number", width: 120 },
  { field: "device_condition", headerName: "Condition", width: 110 },
  { field: "status", headerName: "Status", width: 100 },
  { field: "category", headerName: "Category", width: 100 },
  { field: "userId", headerName: "Assigned To", width: 110 },
  { field: "loanStartDate", headerName: "Loan Start Date", width: 118 },
  { field: "loanEndDate", headerName: "Loan End Date", width: 118 },
];
