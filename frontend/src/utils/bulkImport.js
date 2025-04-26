import { bulkAddDevice } from "../services/api/devices/Device.Api";
import readXlsxFile from "read-excel-file";
import { bulkAddStudent } from "../services/api/students/Students.Api";

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
        warranty_end_date: `${rows[i][8]}`,
        purchaseValue: rows[i][9],
        currentValue: rows[i][10],
        invoice_id: rows[i][11],
      });
    }

    const devicesData = {
      devices: data,
    };

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
        idNumber: rows[i][2],
        phone_number: rows[i][3],
        email: rows[i][4],
        studentNumber: rows[i][5],
        course_id: rows[i][6],
        isActive: rows[i][7],
        registration_date: `${rows[i][8]}`,
      });
    }

    const studentData = {
      students: data,
    };

    console.log(studentData);

    return bulkAddStudent(studentData, setShowToast, onClose);
  });
};
