import { bulkAddDevice } from "../services/api/devices/Device.Api";
import readXlsxFile from "read-excel-file";
import { bulkAddStudent } from "../services/api/students/Students.Api";
import { bulkAddStaff } from "../services/api/staff/Staff.Api";
import { toIsoDate } from "./dateConverter";
import { GetDeviceType } from "./helperMethods";

const dateCorrection = (wrongDate) => {
  const isoDate = new Date(wrongDate).toISOString().split("T")[0];
  console.log(isoDate);

  return isoDate;
};

//Bulk Add Devices
export const bulkCreateDevices = (file, setShowToast, onClose) => {
  readXlsxFile(file[0]).then((rows) => {
    let data = [];
    for (let i = 0; i < rows.length; i++) {
      data.push({
        make: rows[i][0],
        model: rows[i][1],
        category: rows[i][2],
        device_condition: rows[i][3],
        status: rows[i][4],
        assetTag: rows[i][5],
        serial_no: rows[i][6],
        spec: rows[i][7],
        device_type: rows[i][8],
        warranty_end_date: toIsoDate(rows[i][9]),
        purchaseValue: rows[i][10],
        currentValue: rows[i][11],
        supplier_name: rows[i][12],
        invoice_no: rows[i][13],
        user_id: rows[i][14],
        date_issued: (() => {
          if (rows[i][15]) {
            return toIsoDate(rows[i][15]);
          }
          return null;
        })(),
      });
    }

    const devicesData = {
      devices: data,
    };

    //console.log(devicesData);
    return bulkAddDevice(devicesData, setShowToast, onClose);
  });
};

//Bulk Add Students
export const bulkCreateStudents = (file, setShowToast, onClose) => {
  readXlsxFile(file[0]).then((rows) => {
    let data = [];
    for (let i = 0; i < rows.length; i++) {
      data.push({
        name: rows[i][0],
        surname: rows[i][1],
        studentNumber: rows[i][2],
        idNumber: rows[i][3],
        phone_number: rows[i][4],
        email: rows[i][5],
        faculty_name: rows[i][6],
        course_name: rows[i][7],
        course_code: rows[i][8],
        isActive: rows[i][9],
        registration_date: `${(() => {
          return dateCorrection(rows[i][10]);
        })()}`,
      });
    }

    const studentData = {
      students: data,
    };

    console.log(studentData);

    return bulkAddStudent(studentData, setShowToast, onClose);
  });
};

//Bulk Add Staff
export const bulkCreateStaff = (file, setShowToast, onClose) => {
  readXlsxFile(file[0]).then((rows) => {
    let data = [];
    for (let i = 0; i < rows.length; i++) {
      data.push({
        staff_no: rows[i][0],
        name: rows[i][1],
        surname: rows[i][2],
        start_date: rows[i][3],
        email: rows[i][4],
        phone_number: rows[i][5],
        contract_type: rows[i][6],
        position_name: rows[i][7],
        faculty_name: rows[i][8],
        department_name: rows[i][9],
        isActive: rows[i][10],
        endDate: rows[i][11],
      });
    }

    /*INSERT INTO public.staff(
	 name, surname, phone_number, email, staff_no, position_id, contract_type, acc_status)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); */
    const staffData = {
      staff: data,
    };

    return bulkAddStaff(staffData, setShowToast, onClose);
  });
};
