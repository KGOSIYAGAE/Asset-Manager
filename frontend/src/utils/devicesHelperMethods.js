import { handleTimeStamp } from "./dateConverter";
import { getTodayDate } from "./helperMethods";

//Filter for devices due to be returned by users at the end of contract
export const getDueReturnDevicesHelper = (devicesList) => {
  const today = getTodayDate();
  const list = [];

  if (devicesList) {
    for (let i = 0; i < devicesList.length; i++) {
      if (handleTimeStamp(devicesList[i].return_date && devicesList[i].status === "Assigned") < today) {
        list.push(devicesList[i]);
      }
    }
  }
  return list;
};

//Filter for devices assigned to users that are due upgrade
export const getDueUpgradeDevicesHelper = (devicesList) => {
  const today = getTodayDate();
  const list = [];

  if (devicesList) {
    for (let i = 0; i < devicesList.length; i++) {
      if (handleTimeStamp(devicesList[i].next_upgrade_date) < today) {
        list.push(devicesList[i]);
      }
    }
  }
  return list;
};

//Filter for devices by status
export const getAvailableDevicesHelper = (devicesList) => {
  const list = [];

  if (devicesList) {
    for (let i = 0; i < devicesList.length; i++) {
      if (devicesList[i].status === "Available") {
        list.push(devicesList[i]);
      }
    }
  }

  return list;
};

//Filter for devices by status = Loaned
export const getLoanedDevicesHelper = (devicesList) => {
  const list = [];

  if (devicesList) {
    for (let i = 0; i < devicesList.length; i++) {
      if (devicesList[i].status === "Loaned") {
        list.push(devicesList[i]);
      }
    }
  }

  return list;
};
