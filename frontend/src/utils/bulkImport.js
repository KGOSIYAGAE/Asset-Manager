import { bulkAddDevice } from "../services/api/devices/Device.Api";
import readXlsxFile from "read-excel-file";

//Bulk Add Devices
export const bulkCreateDevices = (file, setShowToast, onClose) => {
  readXlsxFile(file[0]).then((rows) => {
    let data = [];
    for (let i = 0; i < rows.length; i++) {
      data.push({
        assetTag: rows[i][0],
        serial_no: rows[i][1],
        make: rows[i][2],
        model: rows[i][3],
        category: rows[i][4],
        device_condition: rows[i][5],
        status: rows[i][6],
        specification: rows[i][7],
        warrantyExpiration: `${rows[i][8]}`,
        supplier: rows[i][9],
        invoice_no: rows[i][10],
        description_no: rows[i][11],
        purchaseValue: rows[i][12],
        purchaseDate: `${rows[i][13]}`,
        location: rows[i][14],
      });
    }

    const devicesData = {
      devices: data,
    };

    return bulkAddDevice(devicesData, setShowToast, onClose);
  });
};
