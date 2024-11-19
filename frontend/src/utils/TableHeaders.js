//Staff TableHeaders
export const staffTableHeaders = [
  { field: "staff_no", headerName: "Staff No", width: 70 },
  { field: "name", headerName: "First name", width: 100 },
  { field: "surname", headerName: "Last name", width: 100 },
  { field: "phone_number", headerName: "Phone", width: 110 },
  { field: "department", headerName: "Department", width: 100 },
  { field: "position", headerName: "Job title", width: 180 },
  { field: "contract_type", headerName: "Employment type", width: 130 },
  { field: "isActive", headerName: "Status", cellClassName: "active", width: 80 },
  { field: "dateJoined", headerName: "Date joined", width: 120 },
  { field: "endDate", headerName: "End date", width: 120 },
];

//Students TableHeaders
export const studentsTableHeaders = [
  { field: "student_no", headerName: "Student No", width: 100 },
  { field: "name", headerName: "First name", width: 100 },
  { field: "surname", headerName: "Last name", width: 100 },
  { field: "phone_number", headerName: "Phone", width: 110 },

  { field: "faculty", headerName: "Faculty", width: 90 },
  { field: "course", headerName: "Course", width: 270 },
  { field: "course_code", headerName: "Course Code", width: 110 },
  { field: "isActive", headerName: "Account status", width: 120 },
  { field: "registration_date", headerName: "Registration Date", width: 130 },
];

//Device TableHeaders
export const devicesTableHeaders = [
  { field: "make", headerName: "Make", width: 110 },
  { field: "model", headerName: "Model", width: 115 },
  { field: "serial_no", headerName: "Serial Number", width: 115 },
  { field: "device_condition", headerName: "Condition", width: 115 },
  { field: "status", headerName: "Status", width: 100 },
  { field: "assigned_to", headerName: "Assigned To", width: 110 },
  { field: "loan_start", headerName: "Loan Start Date", width: 120 },
  { field: "Loan_end", headerName: "Loan End Date", width: 130 },
];
