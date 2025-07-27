//import { assignReleaseUser } from "../services/api/devices/Device.Api";

import { assignDevice } from "../services/api/devices/Device.Api";

//Generate upgrade date for permanent staff members laptops
export const generateUpgradeDate = (startDate) => {
  const years = 3;

  const date = new Date(startDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const yearsFromNow = date.getFullYear() + years;
  const endDate = `${yearsFromNow}-${month}-${day}`;

  return endDate;
};

//Release User from device on Delete
export const releaseOnDelete = (id, setShowToast) => {
  const data = {
    status: "Available",
    loanStartDate: "None",
    userId: "None",
    location: "COO1 - Datacenter",
  };

  //assignReleaseUser(id, data, setShowToast);
};

//Get todays date
export const getTodayDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let finalMonth;

  if (month < 10) {
    finalMonth = "0" + month.toString();
  } else {
    finalMonth = month;
  }

  return `${year}-${finalMonth}-${day}`;
};

//Get todays date
export const getTodayFullDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return { year, month, day };
};

export const getMonthName = (month) => {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
};

export const handleCurrency = (value) => {
  if (value) {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(parseInt(value));
  }
};

export const handleFilter = (searchQuery, searchData) => {
  const searchResults = [];

  for (let i = 0; i < searchData.length; i++) {
    if (searchData[i].name?.toString() && searchData[i].name?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
      searchResults.push(searchData[i]);
    } else if (searchData[i].surname?.toString() && searchData[i].surname?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
      searchResults.push(searchData[i]);
    } else if (searchData[i].staff_no?.toString() && searchData[i].staff_no?.toString().includes(searchQuery.toLowerCase())) {
      searchResults.push(searchData[i]);
    } else if (searchData[i].id_number?.toString() && searchData[i].id_number?.toString().includes(searchQuery.toLowerCase())) {
      searchResults.push(searchData[i]);
    } else if (searchData[i].student_number?.toString() && searchData[i].student_number?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
      searchResults.push(searchData[i]);
    } else if (searchData[i].make?.toString() && searchData[i].make?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
      searchResults.push(searchData[i]);
    } else if (searchData[i].model?.toString() && searchData[i].model?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
      searchResults.push(searchData[i]);
    } else if (searchData[i].serial_no?.toString() && searchData[i].serial_no?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
      searchResults.push(searchData[i]);
    } else if (searchData[i].asset_tag?.toString() && searchData[i].asset_tag?.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
      searchResults.push(searchData[i]);
    }
  }

  return [...searchResults];
};

//Get user type based on userID
export const getUserType = (user_id, setUserType) => {
  let userId = user_id?.toString();

  if (userId?.length > 5) {
    return setUserType("Student");
  } else {
    return setUserType("Staff");
  }
};
